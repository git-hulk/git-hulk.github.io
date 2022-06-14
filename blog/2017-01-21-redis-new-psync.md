---
title: Redis 4.0 psync 优化 
slug: posts-redis-new-sync
tags: [Redis]
---

上一篇介绍了 [<Redis-4.0 module实现>](http://www.hulkdev.com/posts/redis-module)，同时也提到 redis 4.0 一个比较大的改动就是 psync 优化, 本篇会介绍这个优化的部分。

在 2.8 版本之前 redis 没有增量同步的功能，主从只要重连就必须全量同步数据。如果实例数据量比较大的情况下，网络轻轻一抖就会把主从的网卡跑满从而影响正常服务，这是一个蛋疼的问题。2.8 为了解决这个问题引入了 psync (partial sync)功能，顾名思义就是增量同步。

<!--truncate-->

### 1) 2.8 版本的 psync 机制

2.8 引入 psync 之后的同步机制:

* 从库尝试发送 psync 命令到主库，而不是直接使用 sync 命令进行全量同步
* 主库判断是否满足 psync 条件, 满足就返回 `+CONTINUE` 进行增量同步, 否则返回 `+FULLRESYNC runid offfset`


***redis 判断是否允许 psync 有两个条件:***

* 条件一: psync 命令携带的 runid 需要和主库的 runid 一致才可以进行增量同步，否则需要全量同步。

> NOTE: 主库的 runid 是在主库进程启动之后生成的唯一标识(由进程id加上随机数组成), 在第一次全量同步的时候发送给从库，上面有看到 FULLSYNC 返回带有 runid 和 offset, 从库会在内存缓存这个 runid 和 offset 信息


```c
    if (strcasecmp(master_runid, server.runid)) {
        if (master_runid[0] != '?') {
            redisLog(REDIS_NOTICE,"Partial resynchronization not accepted: "
                "Runid mismatch (Client asked for '%s', I'm '%s')",
                master_runid, server.runid);
        } else {
            redisLog(REDIS_NOTICE,"Full resync requested by slave %s",
                replicationGetSlaveName(c));
        }    
        goto need_full_resync;
    } 
```

* 条件二:  psync 命令携带的 offset 是否超过缓冲区。如果超过则需要全量同步，否则就进行增量同步。

> NOTE: backlog 是一个固定大小(默认1M)的环形缓冲区，用来缓存主从同步的数据。如果 offset 超过这个范围说明中间有一段数据已经丢失，需要全量同步。

```c
    if (!server.repl_backlog ||
        psync_offset < server.repl_backlog_off ||
        psync_offset > (server.repl_backlog_off + server.repl_backlog_histlen))
    {    
        redisLog(REDIS_NOTICE,
            "Unable to partial resync with slave %s for lack of backlog (Slave request was: %lld).", replicationGetSlaveName(c), psync_offset);
        if (psync_offset > server.master_repl_offset) {
            redisLog(REDIS_WARNING,
                "Warning: slave %s tried to PSYNC with an offset that is greater than the master replication offset.", replicationGetSlaveName(c));
        }
        goto need_full_resync;
    }
```

有了 psync 之后主从短时间断掉重连就可以不用全量同步数据。前提也是这段时间的写入不能超过缓冲区。如果写入量比较大的，也建议稍微调大这个缓冲区。


### 2) 问题

虽然 2.8 引入的 psync 可以解决短时间主从同步断掉重连问题，但以下几个场景仍然是需要全量同步:

1. 主库/从库有重启过。因为 runnid 重启后就会丢失，所以当前机制无法做增量同步。
2. 从库提升为主库。其他从库切到新主库全部要全量不同数据，因为新主库的 runnid 跟老的主库是不一样的。

这两个应该是我们比较常见的场景。主库切换或者重启都需要全量同步数据在从库实例比较大或者多的场景下，那内网网络带宽和服务都会有很大的影响。所以 redis 4.0 对 psync 优化之后可以一定程度上规避这些问题。

### 3）新版 psync 机制

为了解决主从角色切换导致的重新全量同步，redis 4.0 引入多另外一个变量 replid2 来存放同步过的主库的 replid，同时 replid 在不同角色意义也有写变化。replid 在主库的意义和之前 replid 仍然是一样的，但对于从库来说，replid 表示当前正在同步的主库的 replid 而不再是本身的 replid。replid2 则表示前一个主库的 replid，这个在主从角色切换的时候会用到。

```c
struct redisServer {
	...
    /* Replication (master) */                                        
    char replid[CONFIG_RUN_ID_SIZE+1];  /* My current replication ID. */
    char replid2[CONFIG_RUN_ID_SIZE+1]; /* replid inherited from master*/ 
```

在主库判断是否允许 psync 的判断条件也有了一些变化：

```c
	// 从库发送过来的 replid 是当前实例的 replid, 说明之前就是这个实例的从库
	// 或者和该主库曾经属于同一主库可以但同步进度不能比当前主库还快
    if (strcasecmp(master_replid, server.replid) &&                        
        (strcasecmp(master_replid, server.replid2) ||                           
         psync_offset > server.second_replid_offset))                                {
     	...
    		goto need_full_resync;
    ｝
    
    // 判断同步进度是否已经超过范围
    if (!server.repl_backlog ||                                                        
        psync_offset < server.repl_backlog_off ||                                      
        psync_offset > (server.repl_backlog_off + server.repl_backlog_histlen))        
    {                                                                                  
        serverLog(LL_NOTICE,                                                           
            "Unable to partial resync with slave %s for lack of backlog (Slave request was: %lld).", replicationGetSlaveName(c), psync_offset);
        if (psync_offset > server.master_repl_offset) {
            serverLog(LL_WARNING,
                "Warning: slave %s tried to PSYNC with an offset that is greater than the master replication offset.", replicationGetSlaveName(c));
        }       
        goto need_full_resync;
    }  
```

从代码可以看到，主库判断条件相比之前版本多了一个 replid2 的判断。如果之前这两个曾经属于同一个主库(多级也允许)， 那么新主库的 replid2 就是之前主库的 replid。只要之前是同一主库且新主库的同步进度比这个从库还快就允许增量同步。当然前提也是新主从的写入落后不能超过 backlog 大小。

举个栗子，假设 A <- B <- C 这种部署结构来说， A 是 B 的主库，B 是 C 的主库。如果把 C 提成新的主库，C <- A 以及 C <- B 都可以增量同步，因为切换后 C 的 replid2 其实就是 A。

另外一方面，在做 rdb 备份的时候 replid 和 offset 会被持久化到 rdb 文件，也就是说甚至是服务重启了也可以进行增量同步，具体见 `rdbSaveInfoAuxFields` 函数实现。

### 4）总结

在主库有问题的时候想要把其中的一个从库提为主库，只要这个从库是这批从库之中同步最快的就其他从库切过来不需要全量同步数据。同时 rdb 里面还对 replid 和 offset 进行持久化，即使实例重启也可以做增量同步。有了这个优化之后之后切换的成本就大大降低了，服务也会更加平滑。

> NOTE: 博客这是记录自己当前阶段一些想法, 不保证完全正确。如果有误的地方，你倒是来打我啊?
