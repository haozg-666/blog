---
lang: zh-CN
title: 【05】相关面试问题
description: 【05】相关面试问题
---

[村长-原文链接](https://github.com/57code/vue-interview)

[村长-视频链接](https://www.bilibili.com/video/BV11i4y1Q7H2/?vd_source=3cf5150c83707fd658ae9eb368adbc01)

> 以下内容仅用来自己学习复习用。
> 原文链接与视频链接请看上面。

## 1. Vue组件之间通信方式有哪些
vue是组件化开发框架，所以对于vue应用来说组件间的数据通信非常重要。此题主要考察vue基本功，对于vue基础api运用熟练度。另外一些边界知识，如provide/inject/$attrs则体现了面试者的知识广度。

### 思路分析: 总分
1. 总述知道的所有方式
2. 按组件关系阐述使用场景

### 回答
1. 组件通信方式大体有以下8种：
   + props
   + $emit/~~$on~~
   + ~~$children~~/$parent
   + $attrs/~~$listeners~~
   + ref
   + $root
   + eventbus
   + vuex
2. 根据组件之间关系讨论组件通信
   + 父子组件
     + props
     + $emit/$on
     + $parent/$children
     + ref
     + $attrs/$listeners
   + 兄弟组件
     + $parent
     + $eventbus
     + vuex
   + 跨层级组件
     + provide/inject
     + $root
     + eventbus
     + vuex

## 2. v-if和v-for哪个优先级更高？
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

## 3. 简述vue生命周期
### 思路
1. 给出概念
2. 列举生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 扩展：vue3变化

### 回答范例
1. 每个Vue组件实例被创建后都会经过一系列初始化布置，比如，数据观测，模板编译，挂载实例到dom上，以及数据变化时更新dom。这个过程中会运行叫做生命周期的函数，以便用户在特定阶段有机会添加它们自己的代码。
2. Vue生命周期总共可以分为8个函数，创建前后，载入前后，更新前后，销毁前后，以及一些特殊场景的生命周期。vue3新增了三个用于调试和服务端渲染场景。

| 生命周期v2    | 生命周期v3          | 描述                                     |
| ------------- | ------------------- | ---------------------------------------- |
| beforeCreate  | beforeCreate        | 组件实例被创建之初                       |
| created       | created             | 组件实例已经完全创建                     |
| beforeMount   | beforeMount         | 组件挂载之前                             |
| mounted       | mounted             | 组件挂载到实例上去之后                   |
| beforeUpdate  | beforeUpdate        | 组件数据发生变化，更新之前               |
| updated       | updated             | 数据数据更新之后                         |
| beforeDestroy | **beforeUnmount** | 组件实例销毁之前                         |
| destroyed     | **unmounted**       | 组件实例销毁之后                         |
| activated     | activated           | keep-alive 缓存的组件激活时              |
| deactivated   | deactivated         | keep-alive 缓存的组件停用时调用          |
| errorCaptured | errorCaptured       | 捕获一个来自子孙组件的错误时被调用       |
| -             | **renderTracked**   | 调试钩子，响应式依赖被收集时调用         |
| -             | **renderTriggered** | 调试钩子，响应式依赖被触发时调用         |
| -             | **serverPrefetch**  | ssr only，组件实例在服务器上被渲染前调用 |

3. Vue生命周期流程图
   1. ![Vue2](https://v2.cn.vuejs.org/images/lifecycle.png)
   2. ![Vue3](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)
4. 结合实践
   + **beforeCreate**: 通常用于插件开发中执行一些初始化任务
   + **created**: 组件初始化完毕，可以访问各种数据，获取接口数据等
   + **mounted**：dom已创建，可用于获取访问数据和dom元素；访问子组件等
   + **beforeUpdate**: 此时`view`层还未更新，可用于获取更新前各种状态
   + **update**: 完成`view`层的更新，更新后，所有状态已经所最新
   + **beforeUnmount**:实例被销毁前调用，可用于一些定时器或订阅的取消
   + **unmounted**: 销毁一个实例。可清理它与其他实例的连接，解绑它的全部指令及事件监听器
### 可能的追问
   1. setup和created谁先执行？
   2. setup中为什么没有beforeCreated和created?
### 知其所以然
vue3中生命周期的派发时刻：

[https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/componentOptions.ts#L554-L555](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/componentOptions.ts#L554-L555)

vue2中声明周期的派发时刻：

[https://github1s.com/vuejs/vue/blob/HEAD/src/core/instance/init.js#L55-L56](https://github1s.com/vuejs/vue/blob/HEAD/src/core/instance/init.js#L55-L56)

## 4.v-model使用和原理
### 思路分析
1. 给出双绑订阅
2. 双绑带来的好处
3. 在哪里使用双绑
4. 使用方式
5. 扩展：使用细节、原理实现描述
### 回答范例
1. Vue中双向绑定是一个指令v-model，可以绑定一个动态值到视图，同时视图中变化能改变该值。v-model是语法糖，默认情况下相当于.value和@input
2. 使用v-model可以减少大量繁琐的事件处理代码，提高开发效率，代码可读性也更好
3. 通常在表单项上使用v-model
4. 原生的表单项可以直接使用v-model，自定义组件上如果使用它需要再组件内绑定value并处理输入事件
5. 我打印过包含v-model模板的组件渲染函数，发现它会被转换为value属性的绑定和一个事件监听，事件回调函数中会做想要变量更新操作，说明实际上是vue的编译器完成的
### 可能的追问
1. v-model和sync修饰符有什么区别？
   + 相同点：
     + 都是语法糖，都可以实现父子组件中的数据的双向通信
   + 不同点：
     + 格式不同：v-model="num"  :num.sync="num"
     + v-model  @input + :value = "num"
     + :num.sync  @update:a + :a = "num"
     + v-model只能使用一次，.sync可以有多个
2. 自定义组件使用v-model如果想改变事件名和属性名应该怎么做？
   + vue3和vue2不同，当使用v-model时，不论是绑定多个值还是单个值，vue3都不必要写model:{prop:'xxx', event: 'xxx'}，vue2则必须要写
   + vue3和vue2都必须要定义props:{xxx: [String, Number]}
   + vue3默认值 modelValue  vue2默认值 model{prop:value, event: input}
### 知其所以然
```js
// <input type="text" v-model="foo">
_c('input', { 
  directives: [{ name: "model", rawName: "v-model", value: (foo), expression: "foo" }], 
  attrs: { "type": "text" }, 
  domProps: { "value": (foo) }, 
  on: { 
    "input": function ($event) { 
      if ($event.target.composing) return; 
      foo = $event.target.value 
    } 
  } 
})
```

```js
// <input type="checkbox" v-model="bar">
_c('input', { 
  directives: [{ name: "model", rawName: "v-model", value: (bar), expression: "bar" }], 
  attrs: { "type": "checkbox" }, 
  domProps: { 
    "checked": Array.isArray(bar) ? _i(bar, null) > -1 : (bar) 
  }, 
  on: { 
    "change": function ($event) { 
      var $$a = bar, $$el = $event.target, $$c = $$el.checked ? (true) : (false); 
      if (Array.isArray($$a)) { 
        var $$v = null, $$i = _i($$a, $$v); 
        if ($$el.checked) { $$i < 0 && (bar = $$a.concat([$$v])) } 
        else { 
          $$i > -1 && (bar = $$a.slice(0, $$i).concat($$a.slice($$i + 1))) } 
      } else { 
        bar = $$c 
      } 
    } 
  } 
})
```

```js
// <select v-model="baz">
//     <option value="vue">vue</option>
//     <option value="react">react</option>
// </select>
_c('select', { 
  directives: [{ name: "model", rawName: "v-model", value: (baz), expression: "baz" }], 
  on: { 
    "change": function ($event) { 
      var $$selectedVal = Array.prototype.filter.call(
        $event.target.options, 
        function (o) { return o.selected }
      ).map(
        function (o) { 
          var val = "_value" in o ? o._value : o.value; 
          return val 
        }
      ); 
      baz = $event.target.multiple ? $$selectedVal : $$selectedVal[0] 
    } 
  } 
}, [
  _c('option', { attrs: { "value": "vue" } }, [_v("vue")]), _v(" "), 
  _c('option', { attrs: { "value": "react" } }, [_v("react")])
])
```

## 5.Vue中如何扩展一个组件
### 思路分析
1. 按照逻辑扩展和内容扩展来列举
   + 逻辑扩展：mixins、extends、composition api;
   + 内容扩展：slots;
2. 分别说出它们的使用方法、场景差异、和问题
3. 作为扩展，还可以说说vue3中新引入的composition api带来的变化
### 回答范例
1. 常见的组件扩展方法有：mixins，slots，extends等
2. 混入mixins是分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。
```js
// 复用代码：它是一个配置对象，选项和组件里面一样
const mymixin = {
	methods: {
		dosomething(){}
	}
}
// 全局混入：将混入对象传入
Vue.mixin(mymixin)

// 局部混入：做数组项设置到mixins选项，仅作用于当前组件
const Comp = {
	mixins: [mymixin]
}
```
3. 插槽主要用于vue组件中的内容分发，也可以用于组件扩展。

子组件Child

```html
<div>
  <slot>这个内容会被父组件传递的内容替换</slot>
</div>
```
父组件Parent

```html
<div>
	<Child>来自老爹的内容</Child>
</div>
```
如果要精确分发到不同位置可以使用具名插槽，如果要使用子组件中的数据可以使用作用域插槽。

4. 组件选项中还有一个不太常用的选项extends，也可以起到扩展组件的目的
```js
// 扩展对象
const myextends = {
	methods: {
		dosomething(){}
	}
}
// 组件扩展：做数组项设置到extends选项，仅作用于当前组件
// 跟混入的不同是它只能扩展单个对象
// 另外如果和混入发生冲突，该选项优先级较高，优先起作用
const Comp = {
	extends: myextends
}
```

5. 混入的数据和方法不能明确判断来源且可能和当前组件内变量产生命名冲突，vue3中引入的composition api，可以很好解决这些问题，利用独立出来的响应式模块可以很方便的编写独立逻辑并提供响应式的数据，然后在setup选项中有机组合使用。例如：
```js
// 复用逻辑1
function useXX() {}
// 复用逻辑2
function useYY() {}
// 逻辑组合
const Comp = {
	setup() {
		const {xx} = useXX()
		const {yy} = useYY()
		return {xx, yy}
	}
}
```

### 可能的追问
Vue.extend方法你用过吗？它能用来做组件扩展吗？
+ 作用所扩展组件生成一个构造器，通常和$mount一起使用
+ 二次封装element的message组件

## 6.子组件可以修改父组件中的数据吗 onw-way data flow

## 7.Vue项目权限如何做

## 8.说说对Vue数据响应式的理解

## 9.虚拟DOM

## 10.diff算法

## 11.

## 12.vue-router动态路由有什么用？

## 13.如何实现一个vue-router?

## 14.key的所用

## 15.nextTick使用和原理

## 16.computed和watch的区别

## 17.父子组件创建，挂载顺序所怎样的

## 18.如何缓存组件、更新组件

## 19.如何从0到1架构一个vue项目

## 20.你知道哪些Vue最佳实践？

## 21.说说对vuex的理解

## 22.从template到render发生了什么？

## 23.vue实例挂载过程发生了什么？

## 24.Vue3设计目标和优化点有哪些？

## 25.

## 26.

## 27.什么情况需要使用Vuex模块？

## 28.为什么路由需要懒加载？

## 29.ref和reactive有何差异？

## 30.watch和watchEffect异同？

## 31.SPA和SSR异同？

## 32.vue-loader是什么？

## 33.你写过自定义指令吗？

## 34.$attrs和$listeners是做什么的？

## 35.v-once使用场景有哪些？

## 36.什么是递归组件？使用场景有哪些？

## 37.什么是异步组件？

## 38.Vue项目中如何处理错误？

## 39.从0实现vuex?

## 40.mutation和action有什么区别？

## 41.Vue长列表优化思路

## 42.如何监听vuex状态变化

## 43.router-link和router-view是如何生效的？

## 44.Vue3性能提升体现在哪些方面？

## 45.Vue3为什么用proxy代替defineProperty?

## 46.history和hash模式有何区别？

## 47.什么场景使用嵌套路由？

## 48.刷新后vuex状态丢失怎么解？

## 49.你觉得vuex有什么缺点？

## 50. Composition API和Options API有何不同？