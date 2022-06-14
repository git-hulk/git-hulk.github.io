---
title: Kvrocks 一款开源的企业级磁盘KV存储服务
slug: intro-opensource-kvrocks
tags: [Redis, SSD, Storage]
---

Kvrocks 是基于 RocksDB 之上兼容 Redis 协议的 NoSQL 存储服务，设计目标是提供一个低成本以及大容量的 Redis 服务，作为 Redis 在大数据量场景的互补服务，选择兼容 Redis 协议是因为简单易用且业务迁移成本低。目前线上使用的公司包含:  美图、携程、百度以及白山云等，在线上经过两年多大规模实例的验证。

项目核心功能包含:

- 兼容 Redis 协议
- 支持主从复制
- 支持通过 Namespace 隔离不同业务的数据
- 高可用，支持 Redis Sentinel 自动主从切换
- 集群模式 (进行中，预计在 7-8 月份完成)

GitHub地址：[https://github.com/bitleak/kvrocks](https://github.com/bitleak/kvrocks)

<!--truncate-->

## 实现方案对比

除了 Kvrocks 之外，社区也有一些类似的基于磁盘存储兼容 Redis 协议的开源产品，从存储设计来看可以分为几类:

1. 基于磁盘 KV 存储引擎(比如 RocksDB/LevelDB) 实现 Redis 协议
2. 基于 Redis 存储之上将冷数据交换到磁盘(类似早期 Redis VM 的方案)
3. 基于分布式 KV(比如 TiKV) 实现 Redis 协议代理，本地不做存储

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/disk-kv-compare.png)

**方案 1:** 是基于磁盘 KV 之上兼容 Redis 协议，绝大多数的本地磁盘 KV 只提供最简单的 Get/Set/Delete 方法，对于 Hash/Set/ZSet/List/Bitmap 等数据结构需要基于磁盘 KV 之上去实现。优点是可以规避下面方案 2 里提到的大 Key 问题，缺点是实现工作量大一些。

**方案 2:** 基于 Redis 把冷数据交换磁盘是以 Key 作为最小单元，在大 Key 的场景下会有比较大的挑战。交换大 Key 到磁盘会有严重读写放大，如果是读可能会导致整个服务不可用，所以这种实现只能限制 Value 大小，优点在于实现简单且可按照 Key 维度来做冷热数据分离。

**方案 3:** 是基于分布式 KV 之上实现 Redis 协议，最大的区别在于所以的操作都是通过网络。这种实现方式最大优点是只需要实现 Redis 协议的部分，服务本身是无状态的，无须考虑数据复制以及扩展性的问题。缺点也比较明显，因为所有的命令都是通过网络 IO，对于非 String 类型的读写一般都是需要多次网络 IO 且需要通过事务来保证原子，从而在延时和性能上都会比方案 1 和 2 差不少。

**Kvrocks 设计的初衷是作为 Redis 场景的互补，低成本、低延时和高吞吐是最重要的设计目标。**基于 Redis 实现冷热数据交换的方式在大 Key 场景下可能导致不可用，从而需要限制单个 Key 大小，这个对于我们想实现一个通用的 NoSQL 存储服务是无法接受的。而对于方案 3 这种远程存储的方案，延时和吞吐一定是无法满足预期，所以我们最终选择的方案 1 这种基于磁盘 KV 之上实现 Redis 协议以及复制。除了数据存储方式之外， Kvrocks 并没有淘汰策略，所以一般是作为存储服务而不是缓存，当写入的数据量达到实例最大容量或者磁盘容量不足时会写入失败。

## 性能

需要注意的是以下提供的性能数据是基于特定的配置进行压测，不同配置会有比较大的差异。压测的硬件以及 Kvrocks 配置说明可参考: [https://github.com/bitleak/kvrocks#performance](https://github.com/bitleak/kvrocks#performance)

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/benchmark.png)

这里提供性能数据只是为了给读者更加直观了解 Kvrocks 的性能情况，大部分命令由于可多线程并行执行，从 QPS 的维度来看会比 Redis 更好一些，但延时肯定会比 Redis 略差。

## 功能

Kvrocks 支持 Redis String、 List、 Hash、Set、 ZSet 五种基本数据类型， 以及 Bitmap、Geo 和自定义的 Sorted Int 类型。当前支持大多数命令，也支持 Pub/Sub、事务以及备份等功能。

具体可参考：[https://github.com/bitleak/kvrocks/blob/unstable/docs/support-commands.md](https://github.com/bitleak/kvrocks/blob/unstable/docs/support-commands.md)

## 快速体验

可以使用 Docker 的方式来启动 Kvrocks:

```bash
docker run -it -p 6666:6666 bitleak/kvrocks
```

接着可以跟使用 Redis 一样使用:

```bash
➜  ~ redis-cli -p 6666

127.0.0.1:6666> set foo bar
OK
127.0.0.1:6666> get foo
"bar"
```

## 整体设计

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/kvrocks-arch.png)

Kvrocks 主要有两类线程:

- Worker 线程，主要负责收发请求，解析 Redis 协议以及请求转为 RocksDB 的读写
- 后台线程，目前包含一下几种后台线程:
    - Cron 线程，负责定期任务，比如自动根据写入 KV 大小调整 Block Size、清理 Backup 等
    - Compaction Checker 线程，如果开启了增量 Compaction 检查机制，那么会定时检查需要 Compaction 的 SST 文件
    - Task Runner 线程，负责异步的任务执行，比如后台全量 Compaction，Key/Value 数量扫描
    - 主从复制线程，每个 slave 都会对应一个线程用来做增量同步

**下面以 Hash 为例来说明 Kvrocks 是如何将复杂的数据结构转为 RocksDB 对应的 KV?**

最简单的方式是将 Hash 所有的字段进行序列化之后写到同一个 Key 里面，每次修改都需要将整个 Value 读出来之后修改再写入，当 Value 比较大时会导致严重的读写方法问题。所以我们参考 `blackwidow` 的实现，把 Hash 拆分成 Metadata 和 Subkey 两个部分，Hash 里面的每个字段都是独立的 KV，再使用 Metadata 来找到这些 Subkey:

```jsx
        +----------+------------+-----------+-----------+
key =>  |  flags   |  expire    |  version  |  size     |
        | (1byte)  | (4byte)    |  (8byte)  | (8byte)   |
        +----------+------------+-----------+-----------+
                            (hash metadata)

                     +---------------+
key|version|field => |     value     |
                     +---------------+
              (hash subkey)
```

里面的 flags 目前是来标识当前 Value 的类型，比如是 Hash/Set/List 等。expire 是 Key 的过期时间，size 是这个 Key 包含的字段数量，这两个比较好理解。version 是在 Key 创建时自动生成的单调递增的 id，每个 Subkey 前缀会关联上 version。当 Metadata 本删除时，这个 version 就无法被找到，也意味着关联这个 version 的全部 Subkey 也无法找到，从而实现快速删除，而这些无法找到的 Subkey 会在后台 Compact 的时候进行回收。

以 HSET 命令为例，伪代码如下:

```jsx
HSET key, field, value:
  // 先根据 hash key 找到对应的 metadata 并判断是否过期
  // 如果不存在或者过期则创建一个新的 metadata
  metadata = rocksdb.Get(key)
  if metadata == nil || metadata.Expired() {
     metadata = createNewMetadata();
  }
  // 根据 metadata 里面的版本组成 subkey
  subkey = key + metadata.version+field
	if rocksdb.Get(subkey) == nil {
     metadata.size += 1
  }
  // 写入 subkey 以及更新 metadata
	rocksdb.Set(subkey, value)
  rocksdb.Set(key, metadata)
```

更多的数据结构设计可以参考: [https://github.com/bitleak/kvrocks/blob/unstable/docs/metadata-design.md](https://github.com/bitleak/kvrocks/blob/unstable/docs/metadata-design.md)

**Kvrocks 是如何进行数据复制?**

Kvocks 的定位是作为大数据量场景下 Redis 的替代方案，提供与 Redis 一样的数据最终一致性保证，采用了类似 Redis 的主从异步复制模型。考虑到需要应对更多的业务场景，后续会支持半同步复制模型。在实现上，全量复制利用 RocksDB 的 CheckPoint 特性，`增量复制采用直接发送 WAL 的方式，从库接收到WAL直接操作后端引擎`，相比于 Binlog 复制方式（回放从客户端接收到的命令），省去了命令解析和处理的开销，复制速度大幅提升，这样也就解决了其它采用 Binlog 复制方式的存储服务所存在的复制延迟问题。

**Kvrocks 是如何实现分布式集群？**

业界常用Redis集群方案主要有两类：类似 Codis 中心化的集群架构和社区 Redis Cluster 去中心化的集群架构。Kvrocks 集群方案选择了类似 Codis 中心化的架构，集群元数据存储在配置中心，但不依赖代理层，配置中心为存储节点推送元数据，`对外提供 Redis Cluster 集群协议支持，对于使用 Redis Cluster SDK 或者 Proxy 的用户不需要做任何修改`。同时也可以避免类似Redis Cluster 受限于 Gossip 通信的开销而导致集群规模不能太大的问题。另外，单机版的 Kvrocks 和 Redis 一样可以直接支持 Twmeproxy，通过Sentinel实现高可用，对于 Codis 通过简单的适配也能够比较快的支持。目前集群方案处在测试阶段，预计7月份发布，待正式发布后会给大家详细介绍，这里不过多展开。

**对于分布式集群来说，弹性伸缩的能力是必不可少的，Kvrocks 是如何实现弹性伸缩的？**

整个扩缩容拆分为迁移全量数据、迁移增量数据、变更拓扑三个阶段。迁移全量数据利用 RocksDB的 Snapshot 特性，生成 Snapshot 迭代数据发送到目标节点。同时，为了加快迭代效率数据编码上Key 增加 SlotID 前缀。迁移增量数据阶段直接发送 WAL。当待迁移的增量 WAL 小于设定的阈值则开始阻写，等发送完剩余的 WAL 切换拓扑之后解除阻写，这个过程通常是毫秒级的。

## 优化点

相比内存型服务来说，最常见的问题是磁盘的吞吐和延时带来的毛刺点问题。除了通过慢日志命令来确认是否有慢请求产生之外，还提供了 perflog 命令用来定位 RocksDB 访问慢的问题，使用方式如下:

```jsx
# 第一条命令设定只对 SET 命令收集 profiling 日志
# 第二条命令设定随机采样的比例
# 第三条命令设定超过多长时间的命令才写到 perf 日志里面(如果是为了验证功能可以设置为 0)
127.0.0.1:6666> config set profiling-sample-commands set
OK
127.0.0.1:6666> config set profiling-sample-ratio 100
OK
127.0.0.1:6666> config set profiling-sample-record-threshold-ms 1
OK

# 执行 Set 命令，在去看 perflog 命令就可以看到对应的耗时点
127.0.0.1:6666> set a 1
OK
127.0.0.1:6666> perflog get 2
1) 1) (integer) 1
   2) (integer) 1623123739
   3) "set"
   4) (integer) 411
   5) "user_key_comparison_count = 7, write_wal_time = 122300, write_pre_and_post_process_time = 91867, write_memtable_time = 47349, write_scheduling_flushes_compactions_time = 13028"
   6) "thread_pool_id = 4, bytes_written = 45, write_nanos = 46030, prepare_write_nanos = 21605"
```

之前通过这种方式发现了一些 RocksDB 参数配置不合理的问题，比如之前 SST 文件大小默认是 256MiB，当业务的 KV 比较小的时候可能会导致一个 SST 文件里面可能有百万级别的 KV，从而导致 index 数据块过大(几十 MiB)，每次从磁盘读取数据需要耗费几十 ms。但线上不同业务的 KV 大小可能会差异比较大，通过 DBA 手动调整的方式肯定不合理，所以有了根据写入 KV 大小在线自动调整 SST 和 Block Size 的功能，具体描述见: [https://github.com/bitleak/kvrocks/issues/118](https://github.com/bitleak/kvrocks/issues/118)

另外一个就是 RocksDB 的全量 Compact 导致磁盘 IO 从而造成业务访问的毛刺点问题，之前策略是每天凌晨低峰时段进行一次，过于频繁会导致访问毛刺点，频率过低会导致磁盘空间回收不及时。所以增加另外一种部分 Compact 策略，优先对那些比较老以及无效 KV 比较多的 SST进行 Compact。开启只需要在配置文件里面增加一行，那么则会在凌晨 0 到 7 点之间去检查这些 SST 文件并做 Compact

```jsx
compaction-checker-range 0-7
```

## 总结

在设计和实现上，Kvrocks 更注重简洁高效、稳定可靠、易于使用和问题定位。目前 Kvrocks 已经在线上大规模运行两年之久，基本功能已充分验证，大家可以放心使用。如遇到问题，大家可以在微信群，Slack(见 GitHub README)，Issue 上反馈和交流，我们也欢迎提 PR 来一起完善 Kvrocks。

在社区维护上，希望可以有更加开放的交流氛围，而不只是把代码放到 GitHub 的开源。不管是功能设计还是代码开发，都会尽量把相关细节都在 GitHub 里面公开去讨论。

另外，2.0  版本预计在 7-8 月份会完成全部功能的开发，大家可以期待一下（具体进展见:  [https://github.com/bitleak/kvrocks/projects/](https://github.com/bitleak/kvrocks/projects/1)

欢迎大家扫码关注 **「Kvrocks 官方社区」**公众号并回复: **进群**，来加入我们的微信群！

![image](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/qrcode.jpg)
