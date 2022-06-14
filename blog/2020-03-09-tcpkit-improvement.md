---
title: tcpkit 一些改进 
slug: posts-tcpkit-improvement
tags: [TCPKIT, TCP]
---


`tcpkit` 是支持用 lua 脚本分析网络数据包的工具，附带简单协议解析(Redis/Memcached)和延时统计。最早开发 `tcpkit` 主要原因是经常需要通过网络包来分析资源慢请求问题，在数据包量比较大的场景下人肉分析会浪费比较时间，所以希望可以通过编码的方式来分析这类问题。从开发至今已经帮助我们团队以及美图 DBA 定位无数的线上问题，之前甚至通过 `tcpkit` 找到了 BCM 网卡驱动到 kernel 偶发产生几百毫秒延时问题。

Github 地址: [https://github.com/git-hulk/tcpkit](https://github.com/git-hulk/tcpkit)

<!--truncate-->

第一个版本存在的主要问题是过于参数复杂导致使用很不友好，使用者明确告诉 `tcpkit` 当前是跑在客户端还是资源端，最近想到通过 `syn` 包自动分析的方式，周末花了两天时间重新实现了一版。这个版本另外一个改进点是 `tcpkit` 参数和 `tcpdump` 基本一致，可以减少上手的学习成本，同时也支持了分析多个端口的功能。


下面主要是 `tcpkit` 使用到几种场景:

### case 1. 如何分析 Redis/Memcached 延时

通过网络包来分析资源慢请求一般只会用在偶发且没有规律的场景，如果是大面积慢请求应该先通过资源监控来快速定位是否到达瓶颈。对于只有个别业务机器出现慢请求的场景则优先去查看业务端问题(比如对应时刻是否有长时间 GC，php/python 这类引用计数的就不用看了)。对于无规律偶发的场景，可以把 `tcpkit`  同时跑在客户端和业务端进行抓包分析，在客户端执行如下命令: 

`sudo tcpkit -i any tcp port 6379 -p redis` 

那么 tcpkit 会监听端口 `6379` 的数据包并使用 Redis 协议进行解析:

```
2020-03-08 19:23:06.258761 192.168.0.1:51137 => 192.168.0.2:6379 | 1.102 ms | set foo bared
```

意思是从客户端发出 `SET` 命令数据包到 Redis 返回响应总共耗时 `1.102` ms， 这个延时包含了内网 RTT。

如果是在资源端(如 `Redis`)  也是执行上面的命令，会输出类似如下的数据包:

```
2020-03-08 19:23:06.258761 127.0.0.1:51137 => 127.0.0.1:6379 | 0.059 ms | set foo bared
```

意思是从收到 `SET` 命令数据包到处理完响应总共耗时 `0.059` ms， 这个延时是不包含内网 RTT，所以推断内网的延时大概是 1ms 左右。

这个例子里面是正常的请求，对于慢请求通过对比客户端的延时和资源处理时间，大部分都可以推断慢请求到底是业务端、服务端还是中间链路问题。另外，在定位问题的时候一般只希望输出耗时比较长的请求，这个可以通过加上 `-t` 参数指定打印延时超过这个阀值的请求。

### case 2.  作为延时统计监控工具

除了之外实时分析工具之外，`tcpkit` 还可以作为常驻进程和资源部署在一起，作为资源延时监控的手段，输出资源的延时分布情(默认监听 `33333` 端口)，输出是 json 格式:

```json
➜  ~ telnet 127.0.0.1 33333
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.

{
	"127.0.0.1:6379":	{
		"requests":	1700,
		"request_bytes":	184100,
		"responses":	1700,
		"response_bytes":	1413764,
		"latency":	[{
				"<0.1ms":	326
			}, {
				"0.1ms~0.2ms":	371
			}, {
				"0.2~0.5ms":	589
			}, {
				"0.5ms~1ms":	291
			}, {
				"1ms~5ms":	123
			}]
	}
}
```

### case 3. 自定义分析脚本

除此之外，对于一些个性化的分析需求可以通过定义 `Lua` 脚本来分析，`-S` 用来指定 lua 脚本文件的位置，tcpkit 在数据包产生时会回调脚本文件里面的 `process` 函数， 例子见: [scripts/example.lua](https://github.com/git-hulk/tcpkit/blob/master/scripts/example.lua)

```lua
function process(packet)
    if packet.size ~= 0 then -- skip the syn and ack
        local time_str = os.date('%Y-%m-%d %H:%M:%S', packet.tv_sec).."."..packet.tv_usec
        print(string.format("%s %s:%d=>%s:%d %s %u %u %d %u %s",
            time_str,
            packet.sip, -- source ip
            packet.sport, -- source port
            packet.dip, -- destination ip
            packet.dport, -- destination port
            type, -- request or response packet
            packet.seq, -- sequence number
            packet.ack, -- ack number
            packet.flags, -- flags, e.g. syn|ack|psh..
            packet.size, -- payload size
            packet.payload -- payload
        ))
    end
end
```

再比如我们想看看 TCP 建连耗时以及是否有 `syn` 包重传，几十行 Lua 脚本就搞定了，见示例代码: [scripts/tcp-connect.lua](https://github.com/git-hulk/tcpkit/blob/master/scripts/tcp-connect.lua)

## 最后

tcpkit 可以做的还有很多，比如默认支持更多协议如 gRPC, memcached 二进制协议，kafka 协议等等。因为作为 `side project` ，能分配的精力和时间有限会推进慢一些，欢迎大家多多使用和返回，更加欢迎 PR 或者建设性的意见。

Github 地址: [https://github.com/git-hulk/tcpkit](https://github.com/git-hulk/tcpkit)
