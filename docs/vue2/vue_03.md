---
lang: zh-CN
title: 【03】异步更新、VNode、Diff
description: 【03】异步更新、VNode、Diff
---

# 目标
+ 理解Vue批量异步更新策略
+ 掌握虚拟DOM和Diff算法

## 异步更新队列
Vue高效的秘诀是一套批量、异步的更新策略。

### 概念解释
![](./vue_03imgs/img-2.png)
+ 事件循环Event Loop: 浏览器为了协调时间处理、脚本执行、网络请求和渲染等任务而制定的工作机制。
+ 宏任务Task: 代表一个个离散的、独立的工作单元。浏览器完成一个宏任务，在下一个宏任务执行开始前，会对页面进行重新渲染，主要包括创建文档对象、解析HTML、执行主线js代码以及各种事件如页面加载、输入、网络事件和定时器等。
+ 微任务microtasks: 微任务是更小的任务，是在当前宏任务执行结束后立即执行的任务。如果存在微任务，浏览器会清空微任务之后再重新渲染。微任务的例子有Promise回调函数、DOM变化等。

[task体验-歪果仁](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/?utm_source=html5weekly)



