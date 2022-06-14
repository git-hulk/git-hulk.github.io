---
title: Redis 4.0 RDB 和 AOF 混合存储 
slug: posts-redis-mixed-format
tags: [Redis]
---

Redis 当前支持 aof 和 rdb 这两种持久化方式。 有些对 Redis 不是特别的了解同学误解持久化是读写数据也会到磁盘。这里辟谣一下:

> Redis 读写都是全内存的, 持久化数据只是作为磁盘备份, 实例重启或者机器断电的时候可以从磁盘加载到内存

由于本篇博客主要是为了分析 4.0 版本的 rdb 和 aof 混合存储的实现，所以不会详细介绍 rdb 和 aof。如果有想进一步了解可参考 《Redis 设计与实现》 一书。

<!--truncate-->


### 1) aof 和 rdb

#### 1.1) rdb 简介

rdb 是某一个时刻的内存镜像数据写入到磁盘文件，之后的写入数据会丢失。 rdb 持久化方式的优点是持久化后的文件比较小(只有某一个时刻的数据且会压缩)，实例重启时加载会更快。缺点是如果实例重启，备份时刻之后的写入数据会丢失。

#### 1.2) aof 简介

aof 是将 Redis 写入命令写入追加到磁盘文件。根据配置的刷盘策略不同，实例重启丢掉的数据量也不一样。现在有下面三种方式:

* appendfsync = always 每条写入都会刷盘, 最多只会丢失当前正在写入的命令
* appendfsync = everysec 每秒刷一次盘, 最多丢失一秒的数据
* appendfsync = no 不显式刷盘。注意不是不刷盘而是由操作系统来决定何时刷盘(linux 貌似大部分默认是 30s)。可能会丢失刷盘之前的写入数据。

aof 持久化方式的优点就是重启丢失的数据会比 rdb 少。缺点因为写入命令追加写入的方式，在写入比较多的场景下会导致重启加载数据太慢。举个例子，如果对 key 做 1000 次 incr, 则 aof 文件则会记录 1000 次 incr，而 rdb 只存储 1000 这个值即可。不过 aof 允许 rewrite, 比如把例子里面的 1000 次 incr a 变成一次 incr a 1000 命令，这个是另外一个话题了。

### 2) 混合写入

上面已经说明了 rdb 和 aof 各自的优缺点，Redis 4.0 开始支持 rdb 和 aof 的混合持久化(默认关闭)。如果把混合持久化打开，aof rewrite 的时候就直接把 rdb 的内容写到 aof 文件开头。aof 文件内容会变成如下:


```
             +------------------------+
             |                        |   
             |                        |   
             |          RDB           |   
             |         FORMAT         |   
             |                        |   
             |                        |   
             |                        |   
             +------------------------+
             |                        |   
             |        AOF             |   
             |       FORMAT           |   
             +------------------------+
```

这样做的好处是可以结合 rdb 和 aof 的优点, 快速加载同时避免丢失过多的数据。当然缺点也是有的， aof 里面的 rdb 部分就是压缩格式不再是 aof 格式，可读性差。

#### 2.1) 混合持久化实现

下面是 aof.c 里面在做 aof 文件写入的代码，具体函数 `rewriteAppendOnlyFile` :

```c
	// aof_use_rdb_preamble = 1 表示打开混合存储模式
    if (server.aof_use_rdb_preamble) {
        int error;
        // aof 文件前面部分就是直接写入 rdb 文件
        if (rdbSaveRio(&aof,&error,RDB_SAVE_AOF_PREAMBLE,NULL) == C_ERR) {
            errno = error;
            goto werr;
        }    
    } else {
    	    // 如果是关闭混合存储和之前一样，保持 aof 格式
        if (rewriteAppendOnlyFileRio(&aof) == C_ERR) goto werr;
    } 
```


#### 2.2) 混合 aof 加载

开启混合存储模式后 aof 文件加载的流程如下:

1. aof 文件开头是 rdb 的格式, 先加载 rdb 内容再加载剩余的 aof
2. aof 文件开头不是 rdb 的格式，直接以 aof 格式加载整个文件

```c
    char sig[5]; /* "REDIS" */
    if (fread(sig,1,5,fp) != 5 || memcmp(sig,"REDIS",5) != 0) { 
    	    // 前部分内容不是 rdb 格式，不是混合持久化的方式
        if (fseek(fp,0,SEEK_SET) == -1) goto readerr;
    } else {
        rio rdb; 

        serverLog(LL_NOTICE,"Reading RDB preamble from AOF file...");
        if (fseek(fp,0,SEEK_SET) == -1) goto readerr;
        rioInitWithFile(&rdb,fp);
        // 前面部分是 rdb 格式说明是混合持久化，先加载 rdb 后面逻辑再加载 aof
        if (rdbLoadRio(&rdb,NULL) != C_OK) {
            serverLog(LL_WARNING,"Error reading the RDB preamble of the AOF file, AOF loading aborted");
            goto readerr;
        } else {
            serverLog(LL_NOTICE,"Reading the remaining AOF tail...");
        }    
    } 
    ...
    // 加载 aof 格式的数据
    
```

判断 aof 文件的前面部分是否为 rdb 格式，只需要判断前 5 个字符是否是 `REDIS`。这个是因为 rdb 持久化开头就是 `REDIS`, 同时 aof 命令开头一定不会是 REDIS（命令开头都是 `*`）。
