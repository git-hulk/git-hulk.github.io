---
title: php-memcached 的一些坑
slug: posts-holes-in-php-memcached
tags: [tcp, linux, php, memcached]
---



美图 PHP 业务团队在使用 php-memcached 扩展陆陆续续遇到一些隐蔽的 ”坑”，而这些坑在 php-memcached 也是比较容易踩到。其中有如 `TCP_NODELAY` 这类常见的坑，也有一些 php-memcached 本身设计带来的问题。这里分享出来希望可以给遇到类似问题或者正在坑里的同学带来一些帮助。

<!--truncate-->

### 1.  TCP_NODELAY 导致 40ms 延时

先说问题，php-memcached 在开启二进制协议和未开启 `TCP_NODELAY`(默认关闭)时会导致 Get 命令在 cache miss 场景下的内网延时会到达 40ms 左右。这个是由于 `TCP_NODELAY` 和 `TCP Delay ACK` 的综合效果带来的，相信大家应该多多少少都有遇到类似的问题，下面会具体解释原因。

重现代码：

```php
<?php

$memc = new Memcached();
$memc->addServer("127.0.0.1", 11211);
$memc->setOption(Memcached::OPT_BINARY_PROTOCOL, true);

for ($i = 0; $i < 2; $i++) {
    $start = microtime();
    $memc->get("foo"); // key `foo` wasn't exists
    var_dump(microtime()-$start);
}
```

代码逻辑开启了二进制协议并两次 `Get` 不存在的 key，输出如下:

```
float(0.00018799999999997)
float(0.039426)
```

第一次的请求的延时是 0.18 ms 而第二次则是 40ms，这里有两个问题:

1. 为什么第二个请求需要 40ms？
2. 第一次请求为什么没有问题？

我们从数据包的角度来分析第一个 40 ms 的问题:

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/holes-in-php-memcached-tcpdump.jpg)

可以看到 GET 命令在 php-memcached 里面的首先并不是直接发送 GET 命令， 而是由 GetKQ 和 NOOP 两个命令组成。GetKQ 和 GET 的区别是在 `key` 不存在时不会返回数据，所以客户端依赖的 noop 请求来确定 GetKQ 是否是 cache miss，这是因为 memcached 处理请求在连接内是串行的，如果 noop 请求返回了而 GetKQ 没有返回则说明是 key 不存在。

另外，上面的第一条和第二条数据包可以看到由于 `TCP Delay ACK` 机制导致了 `GetKQ` 请求数据包 ACK 被延时了 40ms，而刚好 `TCP_NODELAY` 默认不开启，触发了 negla 算法（因为未发送数据包未满 MSS 大小）从而导致 `NOOP` 命令延时到 ACK 回来，最终整个请求耗时到达 40 ms。

至于为什么要使用 GetKQ 和 NOOP 组合请求来替代 GET 请求？主要是因为这种方式在大量 Get Miss 的场景下可以节省很多没用的 Not Found 返回，这个在 [Memcached Binary Wiki](https://github.com/memcached/memcached/wiki/BinaryProtocolRevamped#get-get-quietly-get-key-get-key-quietly) 里面有提到。 如果对于 TCP_NODELAY 和 TCP Delay ACK 不熟悉的同学可以参考:

* [wikipedia: TCP delayed acknowledgment](https://en.wikipedia.org/wiki/TCP_delayed_acknowledgment)

* [wikipedia: Nagle's algorithm](https://en.wikipedia.org/wiki/Nagle's_algorithm)

接着可以回过头来看第二个问题，为什么第一个 Get 请求延时是正常的呢？这个需要从 TCP ack 逻辑来看：

```c
// 代码文件: net/ipv4/tcp_input.c 

static void tcp_event_data_recv(struct sock *sk, struct sk_buff *skb) {
   ... // 省略逻辑不相关代码
   if (!icsk->icsk_ack.ato) {
        /* 
         * 第一次收到数据包则马上返回 ACK，并把 ato 设置为 TCP_ATO_MIN,
         * TCP_ATO_MIN 默认最小值是 40ms
         */
        tcp_incr_quickack(sk);
        icsk->icsk_ack.ato = TCP_ATO_MIN;
    } else {
			// 重新计算 ato
      ...
    }
}
```

TCP 协议栈在第一个数据包到来时不触发 delay ACK 机制的主要原因是因为，TCP 在刚建立完连接之后会进入 `slow start` 阶段，`slow start` 允许发送未 ACK 的窗口大小取决于之前的 ACK 数量，所以为了避免 slow start 阶段过慢，第一个数据包不触发 delay ack 逻辑。

> 问题修复也比较简单，如果开启二进制协议的时候，需要手动把 `TCP_NODELAY` 也开起来。

### 2. 不合理的默认重试策略

在一次配合业务定位 php memcached 读写超时不符合预期发现了 SET 命令在超时的场景下会自动进行两次重试，后面通过代码发现 `store_retry_count` 默认值为 2， 也就是 SET/ SET Multi/ INCR/ DECR 这几个命令在失败的场景会自动重试 2 次，具体代码见: `php_memcached.c` 的 `s_memc_write_zval` 函数实现，这里不再贴代码。

对于一个通用的基础库来说，这种隐式的重试策略在类似 `incr/decr` 这类非幂等的操作可能会出现预期之外的不一致问题，应该留给用户显示去设置重试。这块已经提了 PR: [#452](https://github.com/php-memcached-dev/php-memcached/pull/452) ，应该在下一个 release 版本会合并。

### 3. 错误的代码姿势导致长连接失效

这个问题也是相当简单但隐蔽，php-memcached 的依赖库 `libmemcached` 在反复去设置一些 option（比如设置 `OPT_BINARY_PROTOCOL`），即使在 option 没有修改的场景下也会导致把老连接关闭重连。理论上，如果 option 没有的话是没有必要去关闭老连接，应该从 libmemcached 修复这个问题。不过，libmemcached 迭代比较慢，从兼容性的角度来说，在 php-memcached 里面修复也没什么问题，具体 PR: [#451](https://github.com/php-memcached-dev/php-memcached/pull/451)



## 总结

作为基础库来说，出现第二点提到默认重试策略这个坑其实是不太应该的，基础库可以实现重试功能，但默认行为是什么应该考虑请求。`TCP_NODELAY` 这个属于常见问题(其实也是 `libmemcached` 实现的问题)，之前也有人反馈过，maintainer 自己也开过相关 PR 修复但最终不知道什么原因没有合并。第三点也是 `libmemcached` 的问题，不过也需要在 php-memcached 做一些简单的兼容性修复。虽然 `php-memcached` 有不少问题，但整体属于瑕不掩瑜。
