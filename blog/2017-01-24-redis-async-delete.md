---
title: Redis 4.0 非阻塞删除 
slug: posts-redis-async-delete
tags: [Redis]
---

对于 Redis 这种单线程模型的服务来说，一些耗时的命令阻塞其他请求是个头痛的问题。典型的命令如 KEYS/FLUSHALL/FLUSHDB 等等，一般线上也会禁用这些会遍历整个库的命令。而像 DEL/LRANGE/HGETALL 这些可能导致阻塞的命令经常被工程师忽视，这些命令在 value 比较大的时候跟 KEYS 这些并没有本质区别。

Redis 4.0 开始针对 DEL/FLUSHALL/FLUSHDB 做了一些优化。

<!--truncate-->


### 1) DEL/FLUSHALL/FLUSHDB 异步化

FLUSHALL/FLUSHDB 清除库的时候因为要对每个 kv 进行遍历会比较耗时。同理对于 DEL 命令也是，如 VALUE 是链表，集合或者字典，同样要遍历删除。在 Redis 4.0 针对这三个命令引入了异步化处理，避免阻塞其他请求。FLUSHALL/FLUSHDB 加了一个 `ASYNC` 参数，同时新增 `UNLINK` 来表示异步化的删除命令。

***为什么 DEL 也不使用类似 FLUSHALL/FLUSHDB  命令加个参数的方式？***

调皮的作者是这么说的:

> There are reasons why UNLINK is not the default for DEL. I know things… I can’t talk (**).

意思大概就是: 「原因我知道但不告诉你...」

不过我猜主要原因是因为 DEL 命令是支持不定参数，如果加个 ASYNC 参数没办法判断到底这个是 key 还是异步删除的选项。


### 2) DEL 异步化的实现

我们可以直接来看 `UNLINK` 命令的实现:

```c
void unlinkCommand(client *c) {
	// lazy 参数设置 1，表示异步删除
    delGenericCommand(c,1);
}

void delGenericCommand(client *c, int lazy) {
    int numdel = 0, j;

    for (j = 1; j < c->argc; j++) {
        expireIfNeeded(c->db,c->argv[j]);
        // 如果是异步删除调用 dbAsyncDelete
        int deleted  = lazy ? dbAsyncDelete(c->db,c->argv[j]) :
                              dbSyncDelete(c->db,c->argv[j]);
	    ...
    }    
    addReplyLongLong(c,numdel);
}
```

我们可看到 unlink 命令会调用 `dbAsyncDelete` 来实现异步调用。

```c
#define LAZYFREE_THRESHOLD 64
int dbAsyncDelete(redisDb *db, robj *key) {
	// 先把 key 从过期时间字典里面删除
	if (dictSize(db->expires) > 0) dictDelete(db->expires,key->ptr);
	// 把 kv 从字典里面摘除但不是删除 value，后续命令就查询不到
	dictEntry *de = dictUnlink(db->dict,key->ptr);
    if (de) {
        robj *val = dictGetVal(de);
        // 不是所有的 key 都会走异步化删除，如果 value 比较小会直接删除
        // 如果 value 是字典/链表/集合且不能是压缩的返回对应的元素数目，其他都返回 1
        size_t free_effort = lazyfreeGetFreeEffort(val);

	    // 只有计算出来的 free_effort 大于 LAZYFREE_THRESHOLD(64) 才会进入异步处理
        if (free_effort > LAZYFREE_THRESHOLD) {
            atomicIncr(lazyfree_objects,1,lazyfree_objects_mutex);
            // 创建 BIO_LAZY_FREE 任务，放到异步队列
            bioCreateBackgroundJob(BIO_LAZY_FREE,val,NULL,NULL);
            dictSetVal(db->dict,de,NULL);
        }
    }

	if (de) {// 如果 key 存在，释放字典里面结构
        dictFreeUnlinkedEntry(db->dict,de);
        if (server.cluster_enabled) slotToKeyDel(key);
        return 1;
    } else {
        return 0;
    }
}
```

`unlink` 命令处理上并不是所有的 kv 都会走异步化删除，而是会根据 value 的大小进行评分后筛选，超过阀值的才会走异步化删除。这个计算函数是 `lazyfreeGetFreeEffort`。

同时 Redis 4.0 专门多开了一个后台线程专门来异步处理 DEL, FLUSHALL 和 FLUSHDB 这三个命令。

```c
        } else if (type == BIO_LAZY_FREE) {
            if (job->arg1) // 处理 DEL 过来的 key
                lazyfreeFreeObjectFromBioThread(job->arg1);
            else if (job->arg2 && job->arg3) //  处理 flush 命令 
                lazyfreeFreeDatabaseFromBioThread(job->arg2,job->arg3);
            else if (job->arg3)
                lazyfreeFreeSlotsMapFromBioThread(job->arg3);
        }
```

### 3) FLUSHALL/FLUSHDB

这两个命令也是比较类似，Redis 会先检查这两个命令是否有带 `async`:

```c
int getFlushCommandFlags(client *c, int *flags) {
    if (c->argc > 1) { 
	    // 判断第二个参数是否为 async
        if (c->argc > 2 || strcasecmp(c->argv[1]->ptr,"async")) {
            addReply(c,shared.syntaxerr);
            return C_ERR;
        }    
        *flags = EMPTYDB_ASYNC;
    } else {
        *flags = EMPTYDB_NO_FLAGS;
    }    
    return C_OK;
}
```

接着在 `emptyDb` 判断是异步清数据，如果是异步清除则会调用 `emptyDbAsync`:

```c
void emptyDbAsync(redisDb *db) {
	// 保留老的数据库指针并重新创建新的数据库
    dict *oldht1 = db->dict, *oldht2 = db->expires;
    db->dict = dictCreate(&dbDictType,NULL);
    db->expires = dictCreate(&keyptrDictType,NULL);
    atomicIncr(lazyfree_objects,dictSize(oldht1),
        lazyfree_objects_mutex);
    // 把要清空的 db 作为一个 job 添加到后台的处理队列
    bioCreateBackgroundJob(BIO_LAZY_FREE,NULL,oldht1,oldht2);
}
```

### 4) 总结

FLUSHALL/FLUSHDB 这种命令线上环境基本都会禁用，大家犯错的概率比较小。而像 DEL 这种命令属于高频的操作，删除大 value 导致的阻塞问题容易被忽视，异步化删除可以一定程度上规避这种问题。

参考连接: [http://antirez.com/news/110](http://antirez.com/news/110)
