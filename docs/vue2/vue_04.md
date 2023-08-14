---
lang: zh-CN
title: 【04】组件化原理和手写vue2
description: 【04】组件化原理和手写vue2
---

# 目标
+ 组件化原理
+ 手写vue2

## 组件化机制

### 组件声明：Vue.component()

initAssetRegisters(Vue) `src/cord/global-api/assets.js`

组件注册使用extend方法将配置转换为构造函数并添加到components选项
+ 全局声明 Vue.component()
+ 局部声明 components:{}

### 组件实例创建和挂载
观察生成的渲染函数
```js
"with(this){return _c('div',{attrs:{"id":"demo"}},[
 _c('h1',[_v("虚拟DOM")]),_v(" "),
 _c('p',[_v(_s(foo))]),_v(" "),
 _c('comp') // 对于组件的处理并⽆特殊之处
],1)}"
```

**整体流程**

首先创建的是根实例，首次_render()时，会得到整棵树的VNode结构，其中自定义组件相关的主要有：createComponent()

组件VNode创建

**createComponent()**

创建组件实例并挂载，VNode转换为dom

整体流程：new Vue() -> $mount() -> vm_render() -> createElement() -> createComponent() -> vm._update() -> patch() -> createEle() -> createComponent()

**创建组件VNode**

_createElement实际执行VNode创建的函数，由于闯入tag是非保留标签，因此判定为自定义组件通过createComponent去创建

createComponent创建VNode，保存了上一步处理得到的组件构造函数，props events等

**创建组件实例**

根组件执行更新函数时，会递归创建子元素和子组件，入口createElm

createEle首次执行_update()时，patch()会通过createEle()创建根元素，子元素创建研究从这里开始
