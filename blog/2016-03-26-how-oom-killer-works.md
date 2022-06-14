---
title: oom killer 实现 
slug: posts-how-oom-killer-works
tags: [linux, mmeory]
---
作为一个不合格的开发人员多多少少都被 OOM(Out of memory) x 过，只是一般大家对于为什么被选中，可能没太考究。

简单来说之所以会出现 OOM, 就是已分配的虚拟内存大于物理内存和 Swap 分区大小，导致需要内存无法分配。如果 overcommit = 2, 在申请虚拟内存时，如果超过限制的内存比例 + Swap 空间会直接返回失败，只要分配虚拟内存不超过物理内存，也就不会有 OOM。

<!--truncate-->

### 2) 进程选择

既然无法分配内存，就有两种下面的两种选择:

1. 向申请内存报告申请内存失败
2. 选择一个杀掉其他的进程来释放内存


内核 2.4 版本之前是第一种做法(走在路上听别人说的), 后面的内核版本才采用第二种。我们这里要来看的是第二种，原因很简单，因为第一种做法没什么好看的...

下面的代码基于内核 2.6.32, 代码在 `arch/不同型号/mm/fault.c` 和 `mm/oom_kill.c`: 

我们分配物理内存的时候是通过缺页中断来实现的，然后会调用 `do_page_fault` ，如果内存不足就会通过 `mm_fault_error` 来处理，调用链如下:

```c
out_of_memory->pagefault_out_of_memory->__out_of_memory
->select_bad_process->badness
```

`select_bad_process` 调用 `badness` 来计算每个进程的得分（范围 0-1000），然后干掉 score 最高的进程。每个进程的 score 我们通过 `/proc/pid/oom_score` 来查看。我们下面来看这个 score 是如何计算，主要是下面几个纬度:

* 子进程内存消耗，越多越容易被选中
* CPU 密集型以及老进程，比刚启动的进程更不容易被选中
* root 启动的进程更不容易被选中
* 用户通过控制 oom_adj 来控制进程选中优先级(范围是-17到15)

```c
unsigned long badness(struct task_struct *p, unsigned long uptime)
{
	...
	// 这个 oom_adj 值是从 /proc/pid/oom_adj 获取
	// 用户可以通过控制 oom_adj 来控制 score
	int oom_adj = p->signal->oom_adj;
	...
	
	// 系统总内存大小作为基础分数
	points = mm->total_vm;
	
	if (p->flags & PF_OOM_ORIGIN)
		return ULONG_MAX;
	
	// 如果 fork 的进程子进程也太多子进程被选到的概率也比较大。
	list_for_each_entry(child, &p->children, sibling) {
        task_lock(child);
        if (child->mm != mm && child->mm)
            points += child->mm->total_vm/2 + 1;
        task_unlock(child);
    }
    
    thread_group_cputime(p, &task_time);
    // 进程用户空间消耗的 cpu 分片数
    utime = cputime_to_jiffies(task_time.utime);
    // 进程系统消耗的 cpu 分片数
    stime = cputime_to_jiffies(task_time.stime);
    cpu_time = (utime + stime) >> (SHIFT_HZ + 3);
    
    // 计算启动时间
    if (uptime >= p->start_time.tv_sec)
        run_time = (uptime - p->start_time.tv_sec) >> 10;
    else
        run_time = 0;
    
    // 消耗 CPU 越多的进程，降低 score
    if (cpu_time)
        points /= int_sqrt(cpu_time);
    // 根据启动时间降低 score, 所以最新启动的进程最可能被杀
    if (run_time)
        points /= int_sqrt(int_sqrt(run_time));
    
    // 降低 root 用户启动的进程的 score
    if (has_capability_noaudit(p, CAP_SYS_ADMIN) ||
        has_capability_noaudit(p, CAP_SYS_RESOURCE))
        points /= 4;
    
    if (!has_intersects_mems_allowed(p))
        points /= 8;
     
     if (oom_adj) {
        if (oom_adj > 0) {
            if (!points)
                points = 1;
            points <<= oom_adj;
        } else
            points >>= -(oom_adj);
    }
    return points;
}
```

### 3) 总结

从整体来看，占用内存越大，非CPU消耗刑，非 Root 启动以及新启动的进程更加容易被选中。而用户可以通过调整 `/proc/$pid/oom_adj` 来调整进程的优先级。

