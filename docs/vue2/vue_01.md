---
lang: zh-CN
title: 【01】手写简单版vue
description: 【01】手写简单版vue
---

# 理解Vue的设计思想 MVVM
将视图View的状态和行为抽象化，让我们将视图UI和业务逻辑分开。

MVVM的三要素：数据响应式、模板引擎、渲染
数据响应式：监听数据变化并在视图中更新
+ Object.defineProperty()
+ Proxy

模板引擎：提供描述视图的模板引擎
+ 插值表达式：{{}}
+ 指令：v-bind、v-on、v-model、v-for、v-if...

渲染：将模板转换成html
+ 模板 => vDom => dom

## 数据响应式原理
数据变更能否响应在视图中，就是数据响应式。
利用`Object.defineProperty()`实现变更检测。 

简单实现将`js`中对象的`name`属性渲染到`html`。
```js
function 
```
