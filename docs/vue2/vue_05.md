---
lang: zh-CN
title: 【05】相关面试问题
description: 【05】相关面试问题
---

[村长-原文链接](https://github.com/57code/vue-interview)

[村长-视频链接](https://www.bilibili.com/video/BV11i4y1Q7H2/?vd_source=3cf5150c83707fd658ae9eb368adbc01)

> 以下内容仅用来自己学习复习用。
> 原文链接与视频链接请看上面。

## 1. v-if和v-for哪个优先级更高？
### 思路分析：总分总模式
1. 先说结论
2. 为什么是这样的
3. 它们能放在一起吗
4. 如果不能，那应该怎样
5. 总结

### 回答
1. 在`Vue2`中，`v-for`优先于`v-if`被解析；但是在`vue3`中完全相反，`v-if`的优先级高于`v-for`
2. 我曾经做过实验，把`Vue2`输出的渲染函数`app.$options.render`打印出来，可以看出所先执行循环在判断条件
3. 不应该放在一起，因为就是我们只渲染列表中的一部分元素，也得在每次组件重新渲染的时候会遍历整个列表
4. 通常有两种场景会导致我们这样做：
   + 为了过滤列表中的项目 (比如`v-for="user in users" v-if="user.isActive"`)。此时定义一个计算属性 (比如`activeUsers`)，让其返回过滤后的列表即可。
   + 为了避免渲染本应该被隐藏的列表 (比如`v-for="user in users" v-if="shouldShowUsers"`)。此时把`v-if`移动至容器元素上 (比如 ul、ol)即可。
5. 官方文档明确指出永远不要把`v-if`和`v-for`同时用在同一元素上，显然是一个重要的注意事项
6. 看过源码里关于代码生成的部分，能够看到是先处理`v-if`还是`v-for`

### 知其所以然
在Vue2中的测试显示的渲染函数：
```js
ƒ anonymous(
) {
with(this){return _c('div',{attrs:{"id":"app"}},_l((items),function(item){return (item.isActive)?_c('div',{key:item.id},[_v("\n      "+_s(item.name)+"\n    ")]):_e()}),0)}
}
```
在vue3中的测试显示的渲染函数：
```js
(function anonymous(
) {
const _Vue = Vue

return function render(_ctx, _cache) {
  with (_ctx) {
    const { renderList: _renderList, Fragment: _Fragment, openBlock: _openBlock, createElementBlock: _createElementBlock, toDisplayString: _toDisplayString, createCommentVNode: _createCommentVNode } = _Vue

    return shouldShowUsers
      ? (_openBlock(true), _createElementBlock(_Fragment, { key: 0 }, _renderList(items, (item) => {
          return (_openBlock(), _createElementBlock("div", { key: item.id }, _toDisplayString(item.name), 1 /* TEXT */))
        }), 128 /* KEYED_FRAGMENT */))
      : _createCommentVNode("v-if", true)
  }
}
})
```

源码中找答案：
`Vue 2`：[compiler/codegen/index.js](https://github1s.com/vuejs/vue/blob/dev/src/compiler/codegen/index.js#L65-L69)
`Vue 3`：[compiler-core/src/codegen.ts](https://github1s.com/vuejs/core/blob/main/packages/compiler-core/src/codegen.ts#L586-L587)

## 2. 你知道key的作用吗？