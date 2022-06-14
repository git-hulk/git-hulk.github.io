---
title: 谈谈 overcommit memory
slug: posts-overcommit-memory
tags: [linux, memory]
---


春节前几天运维大侠说要扩容 Redis 从库但同步一直失败，看日志发现在做 bgsave 的时候一直失败。 日志如下:

```shell
[41738] 04 Feb 11:16:39.859 * Full resync requested by slave.
[41738] 04 Feb 11:16:39.859 * Starting BGSAVE for SYNC
[41738] 04 Feb 11:16:39.860 # Can't save in background: fork: Cannot allocate memory
[41738] 04 Feb 11:16:39.860 * Replication failed, can't BGSAVE
```

从日志可以看到 fork 的时候内存分配失败导致 bgsave 无法成功，那就是可用内存不足?

<!--truncate-->

使用 `info memory` 看了一下实例使用内存， 差不多用了 `8G`:

```shell
used_memory:8045067888
used_memory_human:7.49G
used_memory_rss:8216522752
used_memory_peak:50615269608
used_memory_peak_human:47.14G
```

然后用 `free -m` 看到系统空闲页加上 pagecache 也有 21G，这个空闲内存远大于实例使用的 8G 呀，为什么会 fork 失败呢？

使用 `top` 发现这个 Redis 实例虚拟内存使用了 48.7G, 常驻内存使用是 7.6G。

![img](https://cdn.jsdelivr.net/gh/git-hulk/git-hulk.github.io/images/overcommit-memory-top.jpeg)

### 2) 那么问题来了

> Q1. Redis 统计的虚拟内存为什么占用这么多?

从现象来看是峰值分配了这么多(见 peak_memory)。 但在内存释放的时候，物理内存释放而虚拟内存无法收缩。这个跟内存分配有关, 当前 Redis 默认是用的是 jemalloc。

在 github 上面提了一个 issue 说这个问题， Redis 作者也大概是这个意思。至于为什么虚拟内存无法收缩的原因，有待进一步研究。

> Q2. fork 是根据虚拟内存来检查内存是否够用? 

显然是的。因为如果是根据物理内存，fork 是可以成功的。那其实剩余的系统内存是足够的，而我需要的内存并没有这么大，有什么办法可以让进程继续 fork 么？ 答案就是把 `vm.overcommit_memory` 设置为 1。

### 3） 解决方案

`vm.overcommit_memory` 用来控制在 fork 进程时用什么姿势来检查内存是否够用。 Redis 在实例启动的时候给出了提示信息。

```shell
WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. 
To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf 
and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
```

vm.overcommit_memory 取值是 0, 1, 2, 默认是 0。 具体数值的意义可参考下面的文档，后面会结合代码来说明。

[https://www.kernel.org/doc/Documentation/vm/overcommit-accounting](https://www.kernel.org/doc/Documentation/vm/overcommit-accounting)

### 4) Overcommit memory

我们具体从内核代码(Linux-2.6.32)来看这个参数如何在 fork 进程的时候进行内存校验。

```c
#define OVERCOMMIT_GUESS        0
#define OVERCOMMIT_ALWAYS       1
#define OVERCOMMIT_NEVER        2
```


我们在程序执行 fork() 的时候，会通过系统调用中断切换到内核态，再调用 sys_fork。

下面是 fork 进程时，内核的系统调用链:

```c
sys_fork -> copy_mm -> dup_mm -> dup_mmap -> 
security_vm_enough_memory -> cap_vm_enough_memory -> __vm_enough_memory
```

最后调用 __vm_enough_memory 进行内存检查，我们重点来看这个函数。

```c
int __vm_enough_memory(struct mm_struct *mm, long pages, int cap_sys_admin) {
	...
	/*    
     * Sometimes we want to use more memory than we have
     */
    // OVERCOMMIT_ALWAYS = 1, 什么都不检查直接返回
    if (sysctl_overcommit_memory == OVERCOMMIT_ALWAYS)
        return 0;
    if (sysctl_overcommit_memory == OVERCOMMIT_GUESS) {
        unsigned long n;
        
        // 剩余容量 = page cache使用的页 + 空闲swap + 可回收 slab + 系统空闲页
        free = global_page_state(NR_FILE_PAGES);
        free += nr_swap_pages;
        free += global_page_state(NR_SLAB_RECLAIMABLE);
        
        // root 如果是非 root 用户需要保留 3%
        if (!cap_sys_admin)
            free -= free / 32;
            
        // 如果空闲的页足够直接返回
        if (free > pages)
            return 0;
            
        // 计算系统空闲页比较耗时，所有上面 3 种空闲已经足够就不计算。
        n = nr_free_pages();
       
        // 去掉一些系统保留页
        if (n <= totalreserve_pages)
            goto error;
        else
            n -= totalreserve_pages;
        
        // root 如果是非 root 用户需要保留 3%
        if (!cap_sys_admin)
            n -= n / 32;
        free += n;
       
        if (free > pages)
            return 0;

        goto error;
    }
    
    // 上面两个分支分别是值为 1 和 0 的情况，下面则是值为 2 的判断条件
    // 因为我们计算的是 normal page, 所以计算允许使用的内存需要扣掉 huge page
    // sysctl_overcommit_ratio 系统控制的比例参数
    allowed = (totalram_pages - hugetlb_total_pages())
            * sysctl_overcommit_ratio / 100;

    //非root 用户保留 3%
    if (!cap_sys_admin)
        allowed -= allowed / 32;
    // 加上 swap 空闲页
    allowed += total_swap_pages;
    
    // 防止单进程占用过多内存，需要保留 3% 给其他进程
    if (mm)
        allowed -= mm->total_vm / 32;

    if (percpu_counter_read_positive(&vm_committed_as) < allowed)
        return 0;
error:
    vm_unacct_memory(pages);

    return -ENOMEM;
}
```

从代码层面来看：

1. overcommit_memory = 1, 不检查，有锅自己背。
2. overcommit_memory = 0，检查当前进程需要的虚拟内存 < (当前剩余的物理 + swap分区)
3. overcommit_memory = 2, 检查整个系统已经分配的内存 < (物理内存*允许比例 + swap分区)


### 5） END

调整系统参数还是需要谨慎再谨慎，在没有详细查看官方文档以及全面了解参数对系统的影响的时候，切勿手贱随意调整。
