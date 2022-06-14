---
title: Redis 4.0 模块功能 
slug: posts-redis-module
tags: [Redis]
---

直到今天为止 (2017-01-17) Redis 4.0 已经发布了两个 rc 版本, 相比于上个版本(3.2)，这个版本的改动应该说是巨大的。主要有以下几个点:

* 增加了模块的功能, 用户可以自己扩展命令和数据结构
* psync 优化，避免主从切换过程需要重新全量同步
* DEL, FLUSHALL/FLUSHDB异步化，不会阻塞主线程
* RDB-AOF 混合持久化
* 新增 MEMORY 命令
* 集群兼容  NAT / Docker

每个功能都很值得期待，本篇博客会重点来介绍 Redis 的模块功能。

<!--truncate-->

### 1) 为什么引入模块

下面是引用 Redis 作者的一段说明:

> 「At the same time, years of experience with scripting, demonstrated that scripting is a way to “compose” existing features, but not a way to extend the capabilities of a system towards use cases it was not designed to cover.」

当前虽然支持 lua 脚本来作为扩展但更多的只是功能的组合，也就是说从设计上 lua 脚本的方式并不能满足扩展的需求，如我们想加个数据结构或者命令之类。

### 2) 模块内部实现

#### 2.1）模块加载
Redis 通过 `module load` 命令来加载模块， 格式如下:

```shell
MODULE LOAD <path> [args...]
```

加载时指定模块(so文件)的路径以及加载的参数列表, 没有参数可以忽略。

我们来看看这个命令内部的实现模块加载的功能(module.c):

```c
int moduleLoad(const char *path, void **module_argv, int module_argc) {
    int (*onload)(void *, void **, int);
    void *handle;
    RedisModuleCtx ctx = REDISMODULE_CTX_INIT;

	// 加载指定路径的动态库
    handle = dlopen(path,RTLD_NOW|RTLD_LOCAL);
    if (handle == NULL) {
        serverLog(LL_WARNING, "Module %s failed to load: %s", path, dlerror());
        return C_ERR;
    }
    // 检查是否有实现 RedisModule_OnLoad 函数
    onload = (int (*)(void *, void **, int))(unsigned long) dlsym(handle,"RedisModule_OnLoad");
    if (onload == NULL) {
        serverLog(LL_WARNING,
            "Module %s does not export RedisModule_OnLoad() "
            "symbol. Module not loaded.",path);
        return C_ERR;
    }
    // 回调用户自定义的 RedisModule_OnLoad 函数
    if (onload((void*)&ctx,module_argv,module_argc) == REDISMODULE_ERR) {
        if (ctx.module) moduleFreeModuleStructure(ctx.module);
        dlclose(handle);
        serverLog(LL_WARNING,
            "Module %s initialization failed. Module not loaded",path);
        return C_ERR;
    }    

    // 把模块注册到模块列表，主要是方便后面卸载
    dictAdd(modules,ctx.module->name,ctx.module);
    ctx.module->handle = handle;
    serverLog(LL_NOTICE,"Module '%s' loaded from %s",ctx.module->name,path);
    moduleFreeContext(&ctx);
    return C_OK;
}
```

模块加载的实现很简单，主要逻辑就是加载动态库并回调指定的函数。其他比如添加数据结构和命令之类就可以在这个回调函数里面来实现。最后再把模块添加到已加载的模块列表中。

#### 2.2） 自定义命令

接着看一下如何往 Redis 新增用户命令或者数据结构。

我们以 `modules/helloblock.c` 模块为例，上面已经说到模块加载的时候会回调用户实现的 `RedisModule_OnLoad`, 下面是该模块的实现:

```c
int RedisModule_OnLoad(RedisModuleCtx *ctx, RedisModuleString **argv, int argc) {
    REDISMODULE_NOT_USED(argv);
    REDISMODULE_NOT_USED(argc);

	// 模块初始化函数，每个模块都必须调用
    if (RedisModule_Init(ctx,"helloblock",1,REDISMODULE_APIVER_1)
        == REDISMODULE_ERR) return REDISMODULE_ERR;

	// 添加一个 hello.block 命令
    if (RedisModule_CreateCommand(ctx,"hello.block",
        HelloBlock_RedisCommand,"",0,0,0) == REDISMODULE_ERR)
        return REDISMODULE_ERR;

    return REDISMODULE_OK;
}
```

这个回调函数主要做了两个事情，一个是调用模块初始化函数, 这个函数会将 Redis 对外提供的接口暴露给模块来调用，每个模块加载时都必须调用。另外做一个事情就是我们这里要关心的，如何添加命令到 Redis。

```c
int RM_CreateCommand(RedisModuleCtx *ctx, const char *name, RedisModuleCmdFunc cmdfunc, const char *strflags, int firstkey, int lastkey, int keystep) {
    struct redisCommand *rediscmd;
    RedisModuleCommandProxy *cp;
	...
	// 忽略次要的代码路径

    cp = zmalloc(sizeof(*cp));
    cp->module = ctx->module;
    // 真正的处理函数
    cp->func = cmdfunc;
    cp->rediscmd = zmalloc(sizeof(*rediscmd));
    cp->rediscmd->name = cmdname;
    // 命令处理函数设置为 RedisModuleCommandDispatcher
    cp->rediscmd->proc = RedisModuleCommandDispatcher;
    cp->rediscmd->arity = -1;
    cp->rediscmd->flags = flags | CMD_MODULE;
    cp->rediscmd->getkeys_proc = (redisGetKeysProc*)(unsigned long)cp;
    cp->rediscmd->firstkey = firstkey;
    cp->rediscmd->lastkey = lastkey;
    cp->rediscmd->keystep = keystep;
    cp->rediscmd->microseconds = 0;
    cp->rediscmd->calls = 0;
    dictAdd(server.commands,sdsdup(cmdname),cp->rediscmd);
    dictAdd(server.orig_commands,sdsdup(cmdname),cp->rediscmd);
    return REDISMODULE_OK;
    
```

这个逻辑很简单，创建一个 `RedisModuleCommandProxy` 并把它的 `rediscmd` 作为命令的处理函数，也就是当有命令过来的时候会调用 `RedisModuleCommandDispatcher`, 然后它再来调用我们真正的处理函数。

```c
void RedisModuleCommandDispatcher(client *c) {
    RedisModuleCommandProxy *cp = (void*)(unsigned long)c->cmd->getkeys_proc;
    RedisModuleCtx ctx = REDISMODULE_CTX_INIT;

    ctx.module = cp->module;
    ctx.client = c;
    // 调用真正的处理函数
    cp->func(&ctx,(void**)c->argv,c->argc);
    moduleHandlePropagationAfterCommandCallback(&ctx);
    moduleFreeContext(&ctx);
}
```

为什么不直接回调处理函数而要加一层代理? 这个留给你们自己思考吧...
另外眼尖的小伙伴也可能注意到我们调用的是 `RedisModule_CreateCommand`, 为什么变成 `RM_CreateCommand`? 这是因为 Redis 做了一层重命名。内部实现上是 `RM_` 开头, 对外暴露使用 `RedisModule_`, 这个是在 RedisModule_Init 里面做的。

### 2.3) 自定义数据结构

我们也以具体模块(modules/hellotype.c)为例,

```c
int RedisModule_OnLoad(RedisModuleCtx *ctx, RedisModuleString **argv, int argc) {
    REDISMODULE_NOT_USED(argv);
    REDISMODULE_NOT_USED(argc);

    if (RedisModule_Init(ctx,"hellotype",1,REDISMODULE_APIVER_1)
        == REDISMODULE_ERR) return REDISMODULE_ERR;

    RedisModuleTypeMethods tm = { 
        .version = REDISMODULE_TYPE_METHOD_VERSION,
        .rdb_load = HelloTypeRdbLoad,
        .rdb_save = HelloTypeRdbSave,
        .aof_rewrite = HelloTypeAofRewrite,
        .free = HelloTypeFree
    };  
    HelloType = RedisModule_CreateDataType(ctx,"hellotype",0,&tm);
    if (HelloType == NULL) return REDISMODULE_ERR
}
```

创建一个数据结构很简单，只要定义好几个回调函数即可。Redis 并不关心外部的数据是如何操作的(由命令决定)， 只需要关心数据要怎么来持久化以及释放即可。

更加详细的说明可以参照:

[https://github.com/antirez/redis/blob/unstable/src/modules/TYPES.md](https://github.com/antirez/redis/blob/unstable/src/modules/TYPES.md)

#### 2.4) 其他

其他一些东西由于篇幅没有细说。接口详细说明见:

[https://github.com/antirez/redis/blob/unstable/src/modules/INTRO.md](https://github.com/antirez/redis/blob/unstable/src/modules/INTRO.md)

### 3）总结

我们可以看到 Redis 4.0 很简单就可以进行功能扩展，对 Redis 也没有侵入性。 同时模块是否稳定也直接影响到服务的质量。有了这个模块功能之后就可以支持很多不同业务的定制化数据结构，后面 Redis 的玩法也会越来越多。

另外除了模块功能之外，psync 优化，RDB-AOF 混合持久化以及一些命令的异步化还是很值得期待，接着也会来分析这几个新功能的实现。


参考链接:
[http://antirez.com/news/110](http://antirez.com/news/110)
[http://antirez.com/news/106](http://antirez.com/news/106)
