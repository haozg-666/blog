---
lang: zh-CN
title: 防抖与节流指令
description: 页面的描述
---

## 前言

防抖11与节流指令防抖与节流指令防抖与节流指令防抖与节流指令
防抖11与节流指令防抖与节流指令防抖与节流指令防抖与节流指令
防抖11与节流指令防抖与节流指令防抖与节流指令防抖与节流指令
如图

<!-- more-->

### 1. debounce 防抖 主要用于按钮的防抖
```javascript
/**
 *@file debounce
 *@version 1.0.0
 *@author haozg
 *@createTime 2021/01/22
 *@updateTime 2021/01/22
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description debounce 防抖 主要用于按钮的防抖
 */

const defaultTime = 300;

/**
 * 防抖 单位时间只触发最后一次
 *  @param {?Number|defaultTime} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|'click'} event - 事件类型 例：'click'
 *  @param {Array} binding.value - [fn,event,time]
 *  @example
 *  例：<button v-debounce="[reset,`click`,300]">刷新</button>
 *  也可简写成：<button v-debounce="[reset]">刷新</button>
 *  传递参数则：<button v-debounce="[()=>reset(param),`click`,300]">刷新</button>
 */
const debounce = {
    timer: null,
    fn: null,
    time: defaultTime,
    debounceFun: () => {
        debounce.timer && clearTimeout(debounce.timer);
        debounce.timer = setTimeout(() => debounce.fn(), debounce.time);
    },
    inserted: function (el, binding) {
        const [fn, event = 'click', time = defaultTime] = binding.value;
        debounce.fn = fn;
        debounce.time = time;
        el.addEventListener(event, debounce.debounceFun);
    },
    unbind(el, binding) {
        const [event = 'click'] = binding.value;
        el.removeEventListener(event, debounce.debounceFun);
    }
};

export default debounce;
```



### 2. throttle 节流 主要用于按钮的节流

```javascript
/**
 *@file throttle
 *@version 1.0.0
 *@author haozg
 *@createTime 2021/01/22
 *@updateTime 2021/01/22
 *@see [jsDoc中文文档]{@link  http://www.dba.cn/book/jsdoc/JSDOCKuaiBiaoQianBLOCKTAGS/CONSTRUCTS.html}
 @description throttle 节流 主要用于按钮的节流
 */

const defaultTime = 300;

/**
 *  节流 每单位时间可触发一次
 *  第一次瞬间触发，最后一次不管是否达到间隔时间依然触发
 * 【考虑到input的change事件】
 *  @param {?Number|defaultTime} time - 间隔时间
 *  @param {Function} fn - 执行事件
 *  @param {?String|'click'} event - 事件类型 例：'click'
 *  @param {Array} binding.value - [fn,event,time]
 *  @example
 *  例：<button v-throttle="[reset,`click`,300]">刷新</button>
 *  也可简写成：<button v-throttle="[reset]">刷新</button>
 *  传递参数则：<button v-throttle="[()=>reset(param),`click`,300]">刷新</button>
 */
const throttle = {
    timer: null,
    fn: null,
    time: defaultTime,
    timer_end: null,
    throttleFun: () => {
        if (throttle.timer) {
            clearTimeout(throttle.timer_end);
            throttle.timer_end = setTimeout(() => throttle.fn(), throttle.time);
            return false;
        }
        throttle.fn();
        // eslint-disable-next-line
        throttle.timer = setTimeout(() => throttle.timer = null, throttle.time);
    },
    inserted: function (el, binding) {
        const [fn, event = 'click', time = defaultTime] = binding.value;
        throttle.fn = fn;
        throttle.time = time;
        el.addEventListener(event, throttle.throttleFun);
    },
    unbind(el, binding) {
        const [event = 'click'] = binding.value;
        el.removeEventListener(event, throttle.throttleFun);
    }
};

export default throttle;
```

### 啊1throttle 节流 主要用于按钮的节流DD
### 啊2throttle 节流 主要用于按钮的节流DD
### 啊3throttle 节流 主要用于按钮的节流DD
#### 啊4throttle 节流 主要用于按钮的节流DD
#### 啊5throttle 节流 主要用于按钮的节流DD
#### 啊6throttle 节流 主要用于按钮的节流DD
##### 啊7throttle 节流 主要用于按钮的节流DD
##### 啊8throttle 节流 主要用于按钮的节流DD
###### 啊9throttle 节流 主要用于按钮的节流DD