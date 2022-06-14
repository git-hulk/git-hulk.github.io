---
author: hulk
slug: posts-how-php-check-tcp-liveness
title: php 如何检查 TCP 连接是否关闭
tags: [PHP,TCP]
---

长连接可以减少建立连接的过程, 使用长连接可以提高服务的性能。php 很多扩展都支持长连接，如 redis, memcache, mysql 的主流扩展都支持。

我们知道长连接就是一次建立连接，使用之后不会马上释放，而是把这个连接放到连接池。那么引发的一个问题就是，我们下次使用时如何知道这个连接是否已经被关闭。

<!--truncate-->

我们来看看 phpredis 是如何来判断，连接是否可用。 phpredis 检查的函数在 library.c 的 `redis_check_eof` 的方法，而这个方法调用的是 php 内部的方法 `php_stream_eof`, 我们来看这个方法的具体实现。

```c
PHPAPI int _php_stream_eof(php_stream *stream TSRMLS_DC)
{
	// 如果有数据未读取，说明 socket 还是可用
    if (stream->writepos - stream->readpos > 0) {
        return 0;
    }

	// 咦? 这里通过 php_stream_set_option 来检查
    if (!stream->eof && PHP_STREAM_OPTION_RETURN_ERR ==
            php_stream_set_option(stream, PHP_STREAM_OPTION_CHECK_LIVENESS,
            0, NULL)) {
        stream->eof = 1;
    }

    return stream->eof;
}
```

判断socket 是否可用, 有两个条件:

1. writepos > readpos, 说明还有数据未读, 连接正在使用中
2. php_stream_set_option 通过 PHP_STREAM_OPTION_CHECK_LIVENESS 选项来判断

解析来看看 php_stream_set_option 是如何实现的:

```c
PHPAPI int _php_stream_set_option(php_stream *stream, int option, int value, void *ptrparam TSRMLS_DC)
{
    int ret = PHP_STREAM_OPTION_RETURN_NOTIMPL;

    if (stream->ops->set_option) {
        ret = stream->ops->set_option(stream, option, value, ptrparam TSRMLS_CC);
    }
    ...
}
```
这个函数调用的是 stream 的 set_option 方法，我们知道 php 的stream 是一类文件操作的抽象。在 php 里面的 tcp, udp，socket, 普通文件, 文件流等都是 stream, 只是他们实现的方法各有差异，我们这里只关注 tcp 的实现：

```c
php_stream_ops php_stream_socket_ops = {
    php_sockop_write, php_sockop_read,
    php_sockop_close, php_sockop_flush,
    "tcp_socket",
    NULL, /* seek */
    php_sockop_cast,
    php_sockop_stat,
    php_tcp_sockop_set_option,
};
```
对于 socket 的stream, 它的 set_option 就是 php_tcp_sockop_set_option, 实现如下:

```c
if (php_pollfd_for(sock->socket, PHP_POLLREADABLE|POLLPRI, &tv) > 0) {
	if (0 >= recv(sock->socket, &buf, sizeof(buf), MSG_PEEK) && php_socket_errno() != EWOULDBLOCK) {
    		alive = 0;
	}
}
```
这里我们看到, 检查一个 socket 是否存活, 是通过 poll 来查询 socket 的可读些状态。然后使用 recv 来判断 socket 是否关闭，或者出错。

```shell
1. recv = 0 时, 说明连接已经关闭
2. recv < 0 且  errno != EWOULDBLOCK 时，说明 socket 出错了。
```

部门细心的小伙伴，发现了这个判断条件有一个小 bug。 如果上一次查询结果的 errno = EWOULDBLOCK，因为只有异常才会覆盖 errno，所以recv = 0时，也会认为 socket 是存活的。

php_pollfd_for 的实现也有一些小技巧：

```c
static inline int php_pollfd_for(php_socket_t fd, int events, struct timeval *timeouttv)
{
    php_pollfd p;
    int n;

    p.fd = fd;
    p.events = events;
    p.revents = 0;
	
    n = php_poll2(&p, 1, php_tvtoto(timeouttv));

    if (n > 0) {
        return p.revents;
    }

    return n;
}
```

`php_poll2` 第二个参数是 1， poll 只会查询一个 fd, poll 不会引入查询多个无用 fd 的问题。 第三那个参数在 check_liveness 时，是设置为 0, poll 也不会阻塞。
