---
title: beanstalkd 设计与实现 
slug: posts-thinking-in-beanstalkd
tags: [Queue, Beanstalkd]
---

beanstalkd 是单机版本的任务队列服务, 任务队列跟消息队列在使用场景上最大的区别是： 任务之间是没有顺序约束而消息要求顺序(FIFO)，且可能会对任务的状态更新而消息一般只会消费不会更新。 类似 Kafka 利用消息 FIFO 和不需要更新(不需要对消息做索引)的特性来设计消息存储，将消息读写变成磁盘的顺序读写来实现比较好的性能。而任务队列需要能够任务状态进行更新则需要对每个消息进行索引，如果把两者放到一起实现则很难实现在功能和性能上兼得。在美图内部选型上，如果是异步消息模型一般会选择消息队列，比如类似日志上报，抢购等。而对于需要延时/定时下发或者修改状态任务则是使用任务队列。

<!--truncate-->

比如在以下几种场景会使用任务队列:
定时任务，如每天早上 8 点开始推送消息，定期删除过期数据等
任务流，如自动创建 Redis 流程由资源创建，资源配置，DNS 修改等部分组成，使用任务队列可以简化整体的设计和重试流程
重试任务，典型场景如离线图片处理

目前开源任务队列并不多, 比如原生支持任务队列语义比较知名只有类似 disque, beanstalkd。 公司部分场景比较适合引入任务队列，所以我们从整体上来看当前已有的一些开源产品的设计和实现。

### 1) 初识

先从几个大的层面来看一下 beanstalkd，再来看内部的实现细节:

1. 协议，类 Memcached 协议, 非二进制安全
2. 全内存, 可开启 binlog, 断电从 binlog 恢复数据
3. 单线程, 使用 epoll/kqueue 来实现事件机制

### 2) 几个概念

* tube - 消息通道，类似于 kafka 里面的 topic, 用来存储某一类或者业务的任务
* job  - 生产和消费的基本单元，每个 job 都会有一个 id 和 优先级

### 3) 状态迁移

一个 job 的状态可能是 DELAYED, READY, RESERVED, BURIED 其中之一，状态之间可以互相迁移。

```
   //------------------- 状态图来自官方文档 -------------------//
   
   put with delay               release with delay
  ----------------> [DELAYED] <------------.
                        |                   |
                 kick   | (time passes)     |
                        |                   |
   put                  v     reserve       |       delete
  -----------------> [READY] ---------> [RESERVED] --------> *poof*
                       ^  ^                |  |
                       |   \  release      |  |
                       |    `-------------'   |
                       |                      |
                       | kick                 |
                       |                      |
                       |       bury           |
                    [BURIED] <---------------'
                       |
                       |  delete
                        `--------> *poof*
```


#### 3.1 生产

生产者通过 `PUT` 命令来产生一条消息, 命令格式如下:

```shell
put <pri> <delay> <ttr> <bytes>\r\n
<data>\r\n
```

1. delay = 0，进入就绪(READY)队列, 可以直接被消费。
2. dealy > 0, 进入延时队列(DELAYED), 等到延时时间到了之后自动迁移就绪队列。

#### 3.2 消费

消费者通过 `RESERVE` 命令从就绪队列取出一个任务, 格式如下:

```shell
reserve\r\n
```

任务状态会从 READY 变为 RESERVED(预定)，其他人就无法获取。 PUT 产生消息的时候，携带了 ttr(time to run)，如果这个时间内，消费者没有发送 delete, release 或者 buried 命令。 任务会自动回到 READY 状态，其他人可以继续获取。

我们从状态图中可以看到：

1. 消费者返回 delete 命令，这个任务就从此消失
2. 消费者返回 buried 命令, 这个任务就进入休眠状态
3. 消费者返回 release 命令或者不返回，就回到 READY/DELAYED 状态，可以重新被消费

休眠(BURIED)状态的任务，可以通过 kick 命令让任务回到 READY 队列中去。

具体的协议请移步官方文档: [https://github.com/kr/beanstalkd/blob/master/doc/protocol.txt](https://github.com/kr/beanstalkd/blob/master/doc/protocol.txt)

### 4) 内部实现

#### 4.1) tube
上面说到 beanstalkd 可以根据消息类型或者业务拆分成多个通道(tube), 用户可以使用 `use tube_name` 来进行切换，如果没有这个 tube 就直接创建。beanstalkd 内部使用一个数组来保存所有的 tubes, 结构见 `struct ms`。

我们下面来看一下 tube 结构里面有哪些东西:

```c
struct tube {
    uint refs;  // tube 当前被引用的次数                        
    char name[MAX_TUBE_NAME_LEN]; // tube 名称, 最长 200byte
    Heap ready; // 保存就绪队列的最小堆                        
    Heap delay; // 保存延时队列的最小堆                       
    struct ms waiting; // 正在使用 tube 的连接    
    struct stats stat; // tube 对应的统计项
    uint using_ct; // tube using 使用次数   
    uint watching_ct; // 被watch的次数
    int64 pause; // tube 是否整个被延时  
    int64 deadline_at; // tube 延时截止时间 
    struct job buried; // buried 队列
};
```

这里可以看到每个 tube 里面都包含了就绪, 延时和休眠三种队列。我们上面说了每个 job 的状态可能是 DELAYED/READY/RESERVED/BURIED， 那么 RESERVED 状态的 job 是保存在那里呢？ 每个连接结构里面会有一个 RESERVED 链表用来保存当前连接预取的所有 job。

其中 READY/DELAYED 队列实现都是最小堆，而 BURIED/RESERVED 是普通的链表，job 根据不同的状态会在这四个队列中迁移。

#### 4.2) 最小堆

READY/DELAYED 队列采用最小堆，下面分别是两个队列的比较方法:

* 就绪队列最小堆比较方法:

```c
int
job_pri_less(void *ax, void *bx)
{
    job a = ax, b = bx; 
    // 最小堆比较方法, 先比较优先级再比较 id
    if (a->r.pri < b->r.pri) return 1;
    if (a->r.pri > b->r.pri) return 0;
    return a->r.id < b->r.id;
}
```

> 先比较优先级，再比较 job id，所以当我们想实现优先级队列的时候，只需要设置优先级。pri 值越小优先级越高。如果我们想利用 beanstalkd 作为普通的先进先出队列，把优先级都设置为一样即可，消费的时候就会根据 job id 出队。

* 延时队列的最小堆比较方法

```c
int
job_delay_less(void *ax, void *bx)
{
    job a = ax, b = bx; 
    if (a->r.deadline_at < b->r.deadline_at) return 1;
    if (a->r.deadline_at > b->r.deadline_at) return 0;
    return a->r.id < b->r.id;
}
```
> 先比较延时截止时间，再比较 job id。

#### 4.3) 状态迁移

再获取网络事件之前，都会调用 `prottick` 方法来做一些常规的的状态迁移。

```c
void
srvserve(Server *s)
{
	...
    for (;;) {
        // 实现一些状态迁移检查
        period = prottick(s);

        // 获取下一个处理的事件
        int rw = socknext(&sock, period);
        if (rw == -1) {
            twarnx("socknext");
            exit(1);
        }

        // 回调处理
        if (rw) {
            sock->f(sock->x, rw);
        }
    }
	...
}

int64
prottick(Server *s)
{
	...
	// 这个循环检查延时队列是否有 job 截止时间到了，是的话迁移到就绪队列
    // 如果大量的 delay 变成ready 会导致其他请求得不到响应而超时
    now = nanoseconds();
    while ((j = delay_q_peek())) {
        d = j->r.deadline_at - now;
        if (d > 0) {
            period = min(period, d);
            break;
        }
        // 返回延时队列第一个
        j = delay_q_take();
        // job 进入就绪处理
        r = enqueue_job(s, j, 0, 0);
        // OOM?
        if (r < 1) bury_job(s, j, 0); /* out of memory, so bury it */
    }
    ...
}
```

prottick 里面除了检查延时队列，还检查整个 tube 的延时截止时间是否已经到以及连接是否等待超时等等。

#### 4.3) job 查找

为了快速查找一个 job, 内部采用 hashtable 来存放 job。

```c
// 根据 id 查找对应的任务
job
job_find(uint64 job_id)
{
    job jh = NULL;
    // 根据job id 取模获取 bucket 下标
    int index = _get_job_hash_index(job_id);

    // 链表查找
    for (jh = all_jobs[index]; jh && jh->r.id != job_id; jh = jh->ht_next);

    return jh; 
}
```

当 hashtable 元素超过 bucket 的 4倍的时候，会进行 Rehash 来扩容。

```c
static void
store_job(job j)
{
	...
    /* accept a load factor of 4 */
    // 一次性 rehash 可能导致访问毛刺点
    if (all_jobs_used > (all_jobs_cap << 2)) rehash();
}
```

这里有两个问题:

1. 当前只实现了扩容没有缩容，这个有人提了 pr, 后续版本应该会解决
2. 一次性 rehash, hashtable 数据比较多的时候，迁移时间会比较久，产生访问毛刺点

### 5) 一些问题

从代码层面来看，beanstalkd 通过几千行 C 代码实现了一个优先级/延时队列，这个实在是很 cool，但问题还是有不少。

1. 无最大内存控制, 如果有消息堆积或者业务使用方式有误，而导致内存暴涨拖垮机器
2. 上面说的 Rehash 导致访问变长，甚至产生大量连接超时
3. 部分操作无时长控制，可能导致大量连接超时。 如事件查询之前的常规检查方法 `prottick`， 以及 `kicked` 命令无控制 count 大小。
4. 不少代码不够精简， 比如回放时读取 job 的方法，两个不同版本读取方法实际上差别不大
5. 跟 mc 类似，没有 master-slave 方式，需要自己解决单点问题


### 6) END

如果是有优先级/延时任务的需求的话, beanstalkd 是个不错选择。如果作为常规的先进先出队列来说，以性能和稳定来说 kafka/redis 会是更好的选择，redis 本身也是全内存，队列操作 O(1), 而 benastalkd 是 log(n)。redis 也更加成熟和稳定，同时支持本地持久化和主从。

另外有一个加分项是 beanstalkd 作者本身比较活跃，之前提了一个 pr, 当天就得到回馈，这也是作为开源项目选择一个很重要的因素。

