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
+ [Vue 2](https://github1s.com/vuejs/vue/blob/dev/src/compiler/codegen/index.js#L65-L69)
+ [Vue 3](https://github1s.com/vuejs/core/blob/main/packages/compiler-core/src/codegen.ts#L586-L587)

## 3. 简述vue生命周期
### 思路
1. 给出概念
2. 列举生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 扩展：vue3变化

### 回答范例
1. 每个Vue组件实例被创建后都会经过一系列初始化步骤，比如，数据观测，模板编译，挂载实例到dom上，以及数据变化时更新dom。这个过程中会运行叫做生命周期的函数，以便用户在特定阶段有机会添加它们自己的代码。
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
+ [vue3中生命周期的派发时刻](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/componentOptions.ts#L554-L555)
+ [vue2中声明周期的派发时刻](https://github1s.com/vuejs/vue/blob/HEAD/src/core/instance/init.js#L55-L56)

## 4.v-model使用和原理
### 思路分析 3w1h
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

```vue
<div>
  <slot>这个内容会被父组件传递的内容替换</slot>
</div>
```
父组件Parent

```vue
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
+ ElementUI里的$message，我们使用this.$message('hello')的时候，其实就是通过这种方式创建一个组件实例，然后再将这个组件挂载到了body上
+ [参考](https://juejin.cn/post/6914970829621035021)

## 6.子组件可以修改父组件中的数据吗 onw-way data flow
### 思路
1. 讲讲单项数据流原则，表明为何不能这么做
2. 举几个场景场景的例子说说解决方案
3. 结合实践讲讲如果需要修改父组件状态应该如何做

### 回答范例
1. 所有的prop都使得其父子之间形成了一个单选下行绑定；父级prop的更新会向下流动到子组件中，但是反过来不行。这样会防止从子组件意外变更父组件状态，从而导致你的应用的数据流向难以理解。另外，每次父级组件发生变更时，子组件所有的prop都将会刷新为最新的值。这意味着你不应该在一个子组件内部改变prop。如果你这样做了,Vue会在浏览器控制台中发出警告。 const props = defineProps(['foo']) // ❌ 下面行为会被警告, props是只读的! props.foo = 'bar'
2. 实际开发过程中会有两个场景会想要修改一个属性
   + 这个prop用来传递一个初始值；这个子组件接下来希望将其作为本地的prop数据来使用。再这种情况下，最好定义一个本地的data，并将这个prop用作初始值。const props = defineProps(['initialCounter']) const counter = ref(props.initialCounter)
   + 这个prop以一种原始的值传入且需要进行转换。再这种情况下，最好使用这个prop的值来定义一个计算属性：const props = defineProps(['size']) // prop变化，计算属性自动更新 const normalizedSize = computed(() => props.size.trim().toLowerCase())
3. 实践中如果确实想要改变父组件属性应该emit一个事件，让父组件去做这个变更。注意虽然我们不能直接修改一个传入的对象或数组类型的prop，但是我们还是能够修改内嵌的对象或属性。

## 7.Vue项目权限管理如何做
### 分析
综合实践题目，实际开发中经常需要面临权限管理的需求，考查实际应用能力。

权限管理一般需求是两个，页面权限和按钮权限，从这两个方面论述即可。

### 思路
1. 权限管理需求分析：页面和按钮权限
2. 权限系统的实现方案：分后端方案和前端方案阐述
3. 说说各自的优缺点

### 回答范例
1. 权限管理一般需求是**页面权限**和**按钮权限**的管理
2. 具体实现的时候分后端和前端两种方案
   + 前端方案会**把所有路由信息再前端配置**，通过路由守卫要求用户登录，用户**登录后根据角色过滤路由表**。比如我会配置一个`asyncRoutes`数组，需要认证的页面在其路由的meta中添加一个roles字段，等获取用户角色之后取两者的交集，若结果不为空则说明可以访问。此过滤过程结束，剩下的路由就是改用户能访问的页面，**最后通过router.addRoute(accessRoutes)方式动态添加路由**即可。
   + 后端方案会**把所有页面路由信息存在数据库中**，用户登录的时候根据其角色**查询得到其能访问的所有页面路由信息**返回给前端，前端**再通过addRoutes动态添加路由**信息
   + 按钮权限的控制通常会**实现一个指令**，例如`v-permission`，**将按钮要求角色通过值传递给v-permission指令**，在指令的mounted钩子中可以**判断当前用户角色和按钮是否存在交集**，有则保留按钮，无则移除按钮
3. 纯前端方案的优点是实现简单，不需要额外权限管理页面，但是维护起来问题比较大，有新的页面和角色需求就要修改前端代码重新打包部署；服务端方案就不存在这个问题，通过专门的角色和权限管理页面，配置页面和按钮权限信息到数据库，应用每次登陆时获取的都是最新的路由信息，可谓一劳永逸！

### 知其所以然
+ [路由守卫](https://github1s.com/PanJiaChen/vue-element-admin/blob/HEAD/src/permission.js#L13-L14)
+ [路由生成](https://github1s.com/PanJiaChen/vue-element-admin/blob/HEAD/src/store/modules/permission.js#L50-L51)
+ [动态追加路由](https://github1s.com/PanJiaChen/vue-element-admin/blob/HEAD/src/permission.js#L43-L44)

### 可能的追问
1. 类似Tabs这类组件能不能使用v-permission指令实现按钮权限控制？
```vue
<el-tabs> 
  <el-tab-pane label="⽤户管理" name="first">⽤户管理</el-tab-pane> 
	<el-tab-pane label="⻆⾊管理" name="third">⻆⾊管理</el-tab-pane>
</el-tabs>
```
2. 服务端返回的路由信息如何添加到路由器中？
```js
// 前端组件名和组件映射表
const map = {
  //xx: require('@/views/xx.vue').default // 同步的⽅式
  xx: () => import('@/views/xx.vue') // 异步的⽅式
}
// 服务端返回的asyncRoutes
const asyncRoutes = [
  { path: '/xx', component: 'xx',... }
]
// 遍历asyncRoutes，将component替换为map[component]
function mapComponent(asyncRoutes) {
  asyncRoutes.forEach(route => {
    route.component = map[route.component];
    if(route.children) {
      route.children.map(child => mapComponent(child))
    }
	})
}
mapComponent(asyncRoutes)
```

## 8.说说对Vue数据响应式的理解
### 思路分析
1. 啥是响应式
2. 为什么Vue需要响应式
3. 它能给我们带来什么好处
4. Vue的响应式是怎么实现的？有哪些优缺点
5. Vue3中的响应式的新变化

### 回答范例
1. 所谓数据响应式就是能够使数据变化可以被检查并对这种变化做出响应的机制
2. mvvm框架中要解决的一个核心问题是连接数据层和视图层，通过数据驱动应用，数据变化，视图更新，要做到这点就需要对数据做响应式处理，这样一旦数据发生变化就可以立即做出更新处理
3. 以vue为例说明，通过数据响应式加上虚拟dom和patch算法，可以使我们只需要操作数据，完全不用接触繁琐的dom操作，从而大大提升开发效率，降低开发难度
4. vue2中的数据响应式会根据数据类型来做不同处理，如果是对象则采用Object.defineProperty()的方式定义数据拦截，当数据被访问或发生变化时，我们感知并作出响应；如果是数组则通过覆盖该数组原型的办法，扩展它的7个变更方法，使这些方法可以额外的做更新通知，从而作出响应。这种机制很好的解决了数据响应化的问题，但在实际使用中也存在一些缺点：比如初始化时的递归遍历会造成性能损失；新增或删除属性时需要用户使用Vue.set/delete这样特殊的api才能生效；对于es6中新增的Map、Set这种数据结构不支持等问题
5. 为了解决这些问题，vue3重新编写了这一部分的实现：利用ES6的proxy机制代理要响应化的数据，它有很多好处，编程体验一致，不需要使用特殊api，初始化性能和内存消耗都得到了大幅改善；另外由于响应化的实现代码抽取为独立的reactivity包，使得我们可以更灵活的使用它，我们甚至不需要引入vue都可以体验。

### 知其所以然
+ [vue2响应式](https://github1s.com/vuejs/vue/blob/HEAD/src/core/observer/index.ts#L128)
+ [vue3响应式 reactive](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/reactive.ts#L89-L90)
+ [vue3响应式 ref](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/ref.ts#L67-L68)

## 9.虚拟DOM
### 思路
1. vDom是什么
2. 引入vDom的好处
3. vDom如何生成，又如何成为dom
4. 再后续的diff中的作用

### 回答范例
1. 虚拟dom顾名思义就是虚拟的dom对象，它本身就是一个js对象，只不过它是通过不同的属性去描述一个视图结构
2. 通过引入vDom我们可以获得如下好处：
   1. **将真实元素节点抽象成VNode，有效减少直接操作dom次数，从而提高程序性能**
      + 直接操作dom是有限制的，比如diff、clone等操作，一个真实元素上有许多的内容，如果直接对其进行diff操作，会去额外diff一些没有必要的内容；同样的，如果需要进行clone那么需要将其全部内容进行复制，这也是没有必要的。但是，如果将这些操作转移到js对象上，那么就会变的简单了
      + 操作dom是比较昂贵的操作，频繁的dom操作容易引起页面的重绘和回流，但是通过抽象VNode进行中间处理，可以有效减少直接操作dom的次数，从而减少页面重绘和回流
   2. **方便实现跨平台**
      + 同一VNode节点可以渲染成不同平台上的对应的内容，比如：渲染在浏览器是dom元素节点，渲染在Native（IOS,Android）变为对应的控件、可以实现SSR、渲染到webGL中等等
      + vue3允许开发者基于VNode实现自定义渲染器（render），以便于针对不同平台进行渲染
3. vDom是如何生成？在vue中，我们常常会为组件编写模板-template,这个模板会被编译器-compiler编译为渲染函数，在接下来的挂载mount过程中会调用render函数，返回的对象就是虚拟dom。但是他们还不是真正的dom，所以在后续的patch过程中进一步转化为dom
![](./vue_05imgs/vnode.png)
4. 挂载过程结束后，vue程序进入更新流程。如果某些响应式数据发生变化，将会引起组件重新render,此时就会生成新的vdom，和上一次的渲染结果diff就能得到变化的部分，从而转换为最小量的dom操作，高效更新试图。

### 知其所以然
+ [vnode定义](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/vnode.ts#L127-L128)
+ [创建vnode：createElementBlock:](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/vnode.ts#L291-L292)
+ [createVnode:](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/vnode.ts#L486-L487)
+ [mount:](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/renderer.ts#L1171-L1172)
调试mount过程：mountComponent

## 10.diff算法
### 分析
![](./vue_05imgs/diff.png)

### 思路
1. diff算法是干什么的
2. 它的必要性
3. 它何时执行
4. 具体执行方式
5. 拔高：说一下vue3中的优化

### 回答范例
1. Vue中的diff算法称为patching算法，它由Snabbdom修改而来，虚拟DOM要想转化为真实DOM就需要通过patch方法转换
2. 最初Vue1.x视图中每个依赖均有更新函数对应，可以做到精准更新，因此并不需要虚拟DOM和patching算法支持，但是这样粒度过细导致Vue1.x无法承载较大应用；Vue2.x中为了降低Watcher粒度，每个组件只有一个Watcher与之对应，此时就需要引入patching算法才能精准找到发生变化的地方并高效更新
3. vue中diff执行的时刻是组件内响应式数据变更触发实例执行其更新函数时，更新函数会再次执行render函数获得最新的虚拟DOM，然后执行patch函数，并传入新旧两次虚拟DOM,通过两者比对找到变化的地方，最后将其转化为对应的DOM操作
4. patch过程是一个递归过程，遵循深度优先、同层比较的策略；以Vue3的patch为例：
   1. 首先判断两个节点是否为相同同类节点，不同则删除重新创建
   2. 如果双方都是文本则更新文本内容
   3. 如果双方都是元素节点则递归更新子元素，同时更新元素属性
   4. 更新子节点时又分了几种情况
      + 新的子节点是文本，老的子节点是数组则清空，并设置文本；
      + 新的子节点是文本，老的子节点是文本，则直接更新文本；
      + 新的子节点是数组，老的子节点是文本，则清空文本，并创建新子节点数组中的子元素
      + 新的子节点是数组，老的子节点是数组，那么比较两组子节点，
        + 首首：老开始和新开始相同，打补丁，游标同时向后移动
        + 尾尾：老结束和新结束相同，打补丁，游标向前移动
        + 首尾：老开始和新结束相同，打补丁，游标移动
        + 尾首：老结束和新开始相同，打补丁，游标移动
        + 首尾没有找到相同，老老实实查找
5. vue3中引入的更新策略：编译期优化patchFlags、block等

### 知其所以然
+ [patch关键代码](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/renderer.ts#L354-L355)

## 11.说说你知道的vue3新特性
### 分析
官网列举的最值得注意的[新特性](https://v3-migration.vuejs.org/zh/)

也就是下面这些
+ Composition API
+ SFC Composition API语法糖
+ Teleport传送门
+ Fragments片段
+ Emits选项
+ 自定义渲染器
+ SFC CSS变量
+ Suspense
以上这些是api相关，另外还有很多框架特性

### 回答范例
1. api层面Vue3新特性主要包括：Composition API、SFC Composition API语法糖、Teleport传送门、Fragments 片段、Emits选项、自定义渲染器、SFC CSS变量、Suspense
2. 另外，Vue3.0在框架层面也有很多亮眼的改进：
   + 更快
     + 虚拟DOM重写
     + 编译器优化：静态提示、patchFlags、block等
     + 基于Proxy的响应式系统
   + 更小：更好的摇树优化
   + 更容易维护：TypeScript + 模块化
   + 更容易扩展
     + 独立的响应化模块
     + 自定义渲染器

### 知其所以然
+ [体验编译器优化](https://sfc.vuejs.org/)
+ [reactive实现](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/reactive.ts#L90-L91)

## 12.vue-router动态路由有什么用？
### 思路
1. 什么是动态路由
2. 什么时候使用动态路由，怎么定义动态路由
3. 参数如何获取 
4. 细节，注意事项

### 回答范例
1. 很多时候，我们需要**将给定匹配模式的路由映射到同一个组件**，这种情况就需要定义动态路由
2. 例如，我们可能有一个 User 组件，它应该对所有用户进行渲染，但用户 ID 不同。在 Vue Router 中，我们可以在路径中使用一个动态字段来实现，例如：`{ path: '/users/:id', component: User }`，其中:id就是路径参数
3. 路径参数 用冒号 : 表示。当一个路由被匹配时，它的 params 的值将在每个组件中以`this.$route.params`的形式暴露出来。
4. 参数还可以有多个，例如`/users/:username/posts/:postId`；除了`$route.params`之外，`$route`对象还公开了其他有用的信息，如`$route.query`、`$route.hash`等。

### 可能的追问
1. [如何响应动态路由参数的变化](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96)
2. [如何处理404 Not Found路由](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-Not-found-%E8%B7%AF%E7%94%B1)

## 13.如何实现一个vue-router?
### 思路分析
首先思考Vue路由要解决的问题：用户点击跳转链接内容切换，页面不刷新
+ 借助hash或者history api实现url跳转页面不刷新
+ 同时监听hashchange事件或者popstate事件处理跳转
+ 根据hash值或者state值从routes表中匹配对应component并渲染它

### 回答范例
一个SPA应用的路由需要解决的问题是**页面跳转内容改变同时不刷新**，同时路由还需要以插件形式存在，所以：
1. 首先我会定义一个`createRouter`函数，返回路由器实例，实例内部做几件事
   1. 保存用户传入的配置项
   2. 监听hash或者popstate事件
   3. 回调里根据patch匹配对应路由
2. 将router定义成一个Vue插件，既实现install方法，内部做两件事：
   1. 实现两个全局组件：`router-link`和`router-view`，分别实现页面跳转和内容显示
   2. 定义两个全局变量：`$route`和`$router`，组件内可以访问当前路由和路由器实例

### 知其所以然
+ [createRouter如何创建实例](https://github1s.com/vuejs/router/blob/HEAD/src/router.ts#L355-L356)
+ [事件监听](https://github1s.com/vuejs/router/blob/HEAD/src/history/html5.ts#L314-L315)
+ [页面跳转RouterLink](https://github1s.com/vuejs/router/blob/HEAD/src/RouterLink.ts#L184-L185)
+ [内容显示RouterView](https://github1s.com/vuejs/router/blob/HEAD/src/RouterView.ts#L43-L44)

## 14.key的作用
### 思路
1. 给出结论，key的作用是用于优化patch性能
2. key的必要性
3. 实际使用方式
4. 总结：可从源码层面描述一下vue如何判断两个节点是否想过

### 回答范例
1. key的作用主要是为了更高效的更新虚拟DOM
2. vue在patch过程中**判断两个节点是否是相同节点是key是一个必要条件**，渲染一组列表时，key往往是唯一标识，所以如果不定义key的话，vue只能认为比较的两个节点是同一个，哪怕它们实际上不是，这导致了频繁更新元素，使得整个patch过程比较低效，影响性能。
3. 实际使用中在渲染一组列表时key必须设置，而且必须是唯一标识，应该避免使用数组索引作为key，这可能导致一些隐藏的bug；vue中在使用相同标签元素过渡切换时，也会使用key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。
4. 从源码中可以知道，vue判断两个节点是否相同时主要判断两个的key和元素类型等，因此如果不设置key，它的值就是undefined，则永远认为这是两个相同节点，只能去做更新操作，这造成了大量的dom更新操作，明显是不可取的。

```vue
<template>
  <div>
    <p v-for="item in items" :key="item">{{item}}</p>
  </div>
</template>
<script>
export default{
  data() {
    return { items: ['a', 'b', 'c', 'd', 'e'] }
  },
  mounted () {
    setTimeout(() => {
      this.items.splice(2, 0, 'f')
    }, 2000);
  },
};
</script>
```

上面案例重现的是以下过程

![](./vue_05imgs/key1.jpg)

不使用key

![](./vue_05imgs/key2.jpg)

如果使用key

```
// 首次循环patch A
A B C D E
A B F C D E

// 第2次循环patch B
B C D E
B F C D E

// 第3次循环patch E
C D E
F C D E

// 第4次循环patch D
C D
F C D

// 第5次循环patch C
C 
F C

// oldCh全部处理结束，newCh中剩下的F，创建F并插入到C前面
```

## 15.nextTick使用和原理
### 思路
1. nextTick是啥？下定义
2. 为什么需要它？用异步更新队列实现原理解释
3. 我再什么地方用它呢？
4. 介绍如何使用
5. 说出源码实现

先看看官方订阅
> Vue.nextTick( [callback, context] )
> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
```js
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
// DOM 更新了
})
```

### 回答范例
1. nextTick是Vue提供的一个全局API，由于vue的异步更新策略导致我们对数据的修改不会立刻体现在dom变化上，此时如果想要立即获取更新后的dom状态，就需要使用这个方法
2. Vue在更新DOM时是异步执行的。只要侦听到数据变化，Vue将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更，如果同一个watcher被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作所非常重要的。
   nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用。
3. 所以当我们想在修改数据后立即看到dom执行结果就需要用到nextTick方法。
4. 我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数，然后用timeFunc异步方式调用它们，首选的异步方式会是promise。这让我明白了为什么可以在nextTick中看到dom操作结果。

### 回答范例
1. [nextTick](https://cn.vuejs.org/api/general.html#nexttick)是等待下一次DOM更新刷新的工具方法。
2. Vue有个异步更新策略，意思是如果数据变化，Vue不会立即更新DOM，而是开启一个队列，把组件更新函数保存在队列中，在同一事件循环中发生的所有数据变更会异步的批量更新。这一策略导致我们对数据的修改不会立刻体现在DOM上，此时如果想要获取更新后的DOM状态，就需要使用nextTick
3. 开发时，有两个场景我们会用到nextTick:
   1. created中想要获取DOM时
   2. 响应式数据变化后获取DOM更新后的状态，比如希望获取列表更新后的高度
4. nextTick签名如下：`function nextTick(callback? () => void): Promise<void>`
   所以我们只需要在传入的回调函数中访问最新DOM状态即可，或者我们可以await nextTick()方法返回的Promise之后做这件事
5. 在Vue内部，nextTick之所以能够让我们看到DOM更新后的结果，是因为我们传入的callback会被添加到队列刷新函数（flushSchedulerQueue）后面，这样等队列内部的更新函数都执行完毕，所有DOM操作也就结束了，callback自然能够获取到最新的DOM值

### 知其所以然
+ [组件更新函数入队](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/renderer.ts#L1547-L1548)
+ [入队函数](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/scheduler.ts#L79)
+ [nextTick定义](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/scheduler.ts#L53)

## 16.computed和watch的区别
### 思路
1. 先看[computed](https://cn.vuejs.org/api/reactivity-core.html#computed)、[watch](https://cn.vuejs.org/api/reactivity-core.html#watch)两者定义，列举使用上的差异
2. 列举使用场景上的差异，如何选择
3. 使用细节、注意实现
4. vue3变化

### 回答范例
1. 计算属性可以**从组件数据派生出新数据**，最常见的使用方式是设置一个函数，返回计算之后的具有响应式的结果，computed和methods的差异所它具备缓存性，如果依赖项不变时不会重新计算。侦听器**可以侦测某个响应式数据的变化并执行副作用**，常见用法是传递一个函数，执行副作用，watch没有返回值，但可以执行异步操作等复杂逻辑
2. 计算属性常见场景是简化行内模板中的复杂表达式，模板中出现太多逻辑会使模板变得臃肿不易维护。侦听器常见场景是状态变化之后做一些往额外的DOM操作或异步操作。选择采用何种方案时首先看是否需要派生出新值，基本能用计算属性实现的方式首选计算属性
3. 使用过程中有一些细节，比如计算属性也是可以传递对象，成为既可读又可写的计算属性。watch可以传递对象，设置deep、immediate等选项
4. vue3watch选项发生了一些变化，例如不再能监测一个点操作符之外的字符串的表达式；reactivity API中新出现了watch、watchEffect可以完全替代目前的watch选项，且功能更加强大

### 可能的追问
1. watch会不会立即执行？
   看immediate
2. watch和watchEffect有什么差异？
   [差异](https://cn.vuejs.org/guide/essentials/watchers.html#watcheffect)

### 知其所以然
+ [computed的实现](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/computed.ts#L79-L80)
+ [ComputedRefImpl](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/computed.ts#L26-L27)
+ [缓存性](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/computed.ts#L45-L60)
+ [watch](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/apiWatch.ts#L172)

## 17.父子组件创建，挂载顺序所怎样的
### 思路
1. 给结论
2. 阐述理由

### 回答范例
1. 创建过程自上而下，挂载过程自下而上：
   + parent created
   + child created
   + child mounted
   + parent mounted
2. 之所以会这样所因为Vue创建过程是一个递归过程，先创建父组件，有子组件就会创建子组件，因此创建时先有父组件再有子组件；子组件首次创建时会添加mounted钩子到队列，等到patch结束再执行它们，可见子组件的mounted钩子是先进入队列中的，因此等到patch结束执行这些钩子时也先执行。

### 知其所以然
+ [观察beforeCreated和created钩子的处理](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/componentOptions.ts#L554-L555)
+ [观察beforeMount和mounted钩子的处理](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/renderer.ts#L1310-L1311)

## 18.如何缓存组件、缓存后怎么更新？
缓存组件使用keep-alive组件，这是一个常见且有用的优化手段，vue3中keep-alive也有比较大的更新，能说的点比较多
### 思路
1. 缓存用keep-alive，它的作用与用法
2. 使用细节，例如缓存指定/排除、结合router和transition
3. 组件缓存后更新可以利用activated或者beforeRouteEnter
4. 原理阐述

### 回答范例
1. 开发中缓存组件使用keep-alive组件，keep-alive是vue内置组件，keep-alive包裹动态组件component时，会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染DOM
```vue
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```
2. 结合属性include和exclude可以明确指定缓存哪些组件或排除缓存指定组件。vue3结合vue-router时变化较大，之前所keep-alive包裹router-view，现在需要反过来用router-view包裹keep-alive
```vue
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"></component>
  </keep-alive>
</router-view>
```
3. 缓存后如果想要获取数据，解决方案可以有以下两种：
  + beforeRouteEnter：在有vue-router的项目，每次进入路由的时候，都会执行beforeRouteEnter
  + actived：在keep-alive缓存的组件被激活的时候，都会执行actived钩子
4. keep-alive是一个通用组件，它内部定义了一个map，缓存创建过的组件实例，它返回的渲染函数内部会查找内嵌的component组件对应组件的vnode，如果该组件在map中存在就直接返回它。由于component的is属性是个响应式数据，因此只要它变化，keep-alive的render函数就会重新执行。

### 知其所以然
+ [KeepAlive定义](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/components/KeepAlive.ts#L73-L74)
+ [缓存定义](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/components/KeepAlive.ts#L102-L103)
+ [缓存组件](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/components/KeepAlive.ts#L215-L216)
+ [获取缓存组件](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/components/KeepAlive.ts#L241-L242)

## 19.如何从0到1架构一个vue项目
### 思路
1. 构建项目，创建项目基本结构
2. 引入必要的插件
3. 代码规范：prettier eslint
4. 提交规范：husky list-staged
5. 其他常用：svg-loader vueuse nprogress
6. 常见目录结构

### 回答范例
1. 从0创建一个项目我大致会做以下事情：项目创建、引入必要插件、代码规范、提交规范、常用库和组件
2. 目前vue3项目我会用vite或者create-vue创建项目
3. 接下来引入必要插件：路由vue-router、状态管理pinia、ui库element-plus、http工具axios
4. 其他比较常用的库有vueuse、nprogress，图标使用icon-moon
5. 下面是代码规范：结合prettier和eslint
6. 最后是提交规范，可以使用husky、lint-staged、commitlint
7. 目录结构
   + plugins:用来放 vite 插件的 plugin 配置
   + public：用来放一些诸如 页头icon 之类的公共文件，会被打包到dist根目录下
   + src：用来放项目代码文件
   + api：用来放http的一些接口配置
   + assets：用来放一些 CSS 之类的静态资源
   + components：用来放项目通用组件
   + layout：用来放项目的布局
   + router：用来放项目的路由配置
   + store：用来放状态管理Pinia的配置
   + utils：用来放项目中的工具方法类
   + views：用来放项目的页面文件

## 20.你知道哪些Vue最佳实践？
![](./vue_05imgs/bestPractice.jpg)

### 思路
查看vue官方文档

+ [风格指南](https://vuejs.org/style-guide/)
+ [性能](https://vuejs.org/guide/best-practices/performance.html#overview)
+ [安全](https://vuejs.org/guide/best-practices/security.html)
+ [访问性](https://vuejs.org/guide/best-practices/accessibility.html)
+ [发布](https://vuejs.org/guide/best-practices/production-deployment.html)

### 回答范例
从编码风格、性能、安全等几方面说几条：
1. 编码风格方面
   1. 命名组件时使用“多词”风格避免和HTML元素冲突
   2. 使用“细节化”方式定义属性而不是只有一个属性名
   3. 属性名声明时使用“驼峰命名”，模板或jsx中使用“肉串命名”
   4. 使用v-for时务必加上key，且不要跟v-if写在一起
2. 性能方面
   1. 路由懒加载减少应用尺寸
   2. 利用SSR减少首屏加载时间
   3. 利用v-once渲染那些不需要更新的内容
   4. 一些长列表可以利用虚拟滚动技术避免内存过度占用
   5. 对于深层嵌套对象的大数组可以使用shallowRef或shallowReactive降低开销
   6. 避免不必要的组件抽象
3. 安全方面
   1. 不使用不可信模板，例如使用用户输入拼接模板：template: <div> + userProvidedString + </div>
   2. 小心使用v-html，:url，:style等，避免html、url、样式等注入

## 21.说说对vuex的理解
单向数据流

![](https://vuex.vuejs.org/flow.png)

vuex
![](https://vuex.vuejs.org/vuex.png)

### 回答策略：3w1h
1. 首先给vuex下一个定义
2. 必要性阐述，解决了哪些问题
3. 什么时候我们需要vuex
4. 你的具体用法，个人思考，实践经验
5. 简述原理

> 官网定义
> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用**集中式**存储管理应用的所有组件的状态，并以相应的规则保证状态以一种**可预测**的方式发生变化。

### 回答范例
1. Vuex 是一个专为 Vue.is 应用开发的状态管理模式+库。它采用集中式存储，管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
2. 我们期待以一种简单的“单向数据流”的方式管理应用，即状态->视图->操作单向循环的方式。但当我们的应用遇到多个组件共享状态时，比如:多个视图依赖于同一状态或者来自不同视图的行为需要变更同一状态。此时单向数据流的简洁性很容易被破坏。因此，我们有必要把组件的共享状态抽取出来，以一个全局单例模式管理。通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。这是vuex存在的必要性，它和react生态中的redux之类是一个概念。
3. vuex并非必须的，它帮我们管理共享状态，但却带来更多的概念和框架。Vuex 解决状态管理的同时引入了不少概念: 例如state、mutation、action等，是否需要引入还需要根据应用的实际情况衡量一下:如果不打算开发大型单页应用，使用 Vuex 反而是繁琐几余的，一个简单的 store 模式就足够了。但是，如果要构建一个中大型单页应用，Vuex 基本是标配
4. 我在使用vuex过程中有如下理解：首先是对核心概念的理解和运用，将全局状态放入state对象中，它本身一棵状态树，组件中使用store实例的state访问这些状态；然后有配套的mutation方法修改这些状态，并且只能用mutation修改状态，在组件中调用commit方法提交mutation；如果应用中有异步操作或者复杂逻辑组合，我们需要编写action，执行结束如果有状态修改仍然需要提交mutation，组件中调用这些action使用dispatch方法派发。最后是模块化，通过modules选项组织拆分出去的各个子模块，在访问状态时注意添加子模块的名称，如果子模块有设置namespace，那么在提交mutation和派发action时还需要额外的命名空间前缀。
5. vuex在实现单项数据流时需要做到数据的响应式，通过源码的学习发现是借用了vue的数据响应化特性实现的，它会利用Vue将state作为data对其进行响应化处理，从而使得这些状态发生变化时，能够导致组件重新渲染。

## 22.从template到render发生了什么？
### 分析
从template到render过程，其实是问vue编译器原理

### 思路
1. 引入vue编译器概念
2. 说明编译器的必要性
3. 阐述编译器工作流程

### 回答范例
1. vue中有个独特的模块，称为“compiler”，它的主要作用是将用户编写的template编译为js中可执行的render函数
2. 之所以需要这个编译过程是为了便于前端程序员能高效的编写视图模板。相比而言，我们还是更愿意用HTML来编写视图，直观且高效。手写render函数不仅效率低下，而且失去了编译期的优化能力
3. 在Vue中编译器会先对template进行解析，这一步称为parse，结束之后的会得到一个js对象，我们称为抽象语法树AST，然后是对AST进行深加工的转换过程，这一步称为transform，最后将前面得到的AST生成JS代码，也就是render函数

### 知其所以然
+ [vue3编译过程窥探](https://github1s.com/vuejs/core/blob/HEAD/packages/compiler-core/src/compile.ts#L61-L62)

### 可能的追问
1. vue中编译器何时执行？ 根据引入vue的运行时不同而不同。
   + webpack，预打包环境，vue-loader，在打包阶段将模板编译，预编译
   + 非运行时版本，携带编译器的vue版本，编译发生在运行时，组件创建阶段，发现组件没有render函数就会编译template
2. react有没有编译器？
   + jsx 不是编译器(compiler)，语言没有发生变化，是转义器(transpiler)，将jsx转成js，严格来说，没有编译器

## 23.vue实例挂载过程发生了什么？
### 分析
挂载过程完成了最重要的两件事：
1. 初始化
2. 建立更新机制（数据与视图关联）

### 回答范例
1. 挂载过程指的是app.mount()过程，这个是个初始化过程，整体上做了两件事：初始化和建立更新机制
2. 初始化会创建组件实例，初始化组件状态，创建各种响应式数据
3. 建立更新机制这一步会立即执行一次组件更新函数，这会首次执行组件渲染函数并执行patch将前面获得vnode转换为dom；同时首次执行渲染函数会创建它内部响应式数据和组件更新函数之间的依赖关系，这使得以后数据变化时会执行对应的更新函数

### 知其所以然
+ [mount函数](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/apiCreateApp.ts#L319)
+ [首次render](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/renderer.ts#L2320)

### 可能的追问
1. 响应式数据怎么创建
2. 依赖关系如何建立

## 24.Vue3设计目标和优化点有哪些？
### 思路
从以下几方面分门别类阐述：易用性、性能、扩展性、可维护性、开发体验等

### 回答范例
1. Vue3的最大设计目标所替代Vue2，为了实现这一点，Vue3在以下几个方面做了很大改进，如：易用性、框架性能、扩展性、可维护性、开发体验等
2. 易用性方面主要是API简化，比如v-model在Vue3中变成Vue2中v-model和sync修饰符的结合体，用户不用区分两者不同，也不用选择困难，类似的简化还有用于渲染函数内部生成VNode的h(type, props, children)，其中props不用考虑区分属性、特性、事件等，框架替我们判断，易用性大增
3. 开发体验方面，新组件teleport传送门，fragments，suspense等都会简化特定场景的代码编写，SFC composition API语法糖更是极大提升我们开发体验
4. 扩展性方面提升，如独立的reactivity模块，custom renderer API等
5. 可维护性方面主要是Composition API，更容易编写高复用性的业务逻辑，还有对TS支持的提升
6. 性能方面的改进也很显著，例如编译器优化，基于proxy的响应式系统

### 可能的追问
1. vue3做了哪些编译优化？
2. proxy和defineProperty有什么不同？

## 25. Vue优化方面有哪些？
### 回答范例
1. 这里我主要从Vue代码编写层面说一些优化手段，例如：代码分割，服务端渲染，组件缓存，长列表优化等
2. 最常见的路由懒加载：有效拆分APP尺寸，访问时才异步加载
```js
const router = createRouter({
  routes: [
    // 借助webpack的import()实现异步组件
    { path: '/foo', component: () => import('./Foo.vue') }
  ]
})
```
3. keep-alive缓存页面：避免重复创建组件实例，且能保留缓存组件状态
```vue
<router-view v-slot="{ Component }">
	<keep-alive>
  	<component :is="Component"></component>
  </keep-alive>
</router-view>
```
4. v-show复用组件：避免重复创建组件
5. v-for遍历避免同时使用v-if
6. v-once和v-memo：不再变化的数据使用v-once
```vue
<!-- single element -->
<span v-once>This will never change: {{msg}}</span>
<!-- the element have children -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- component -->
<my-component v-once :comment="msg"></my-component>
<!-- `v-for` directive -->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
```
按条件跳过更新时使用v-memo：下面这个列表只会更新选中状态变化项
```vue
<div v-for="item in list" :key="item.id" v-memo="[item.id === selected]">
  <p>ID: {{ item.id }} - selected: {{ item.id === selected }}</p>
  <p>...more child nodes</p>
</div>
```
7. 长列表性能优化：如果所大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容
```vue
<recycle-scroller
  class="items"
  :items="items"
  :item-size="24"
>
  <template v-slot="{ item }">
    <FetchItemView
      :item="item"
      @vote="voteItem(item)"
    />
  </template>
</recycle-scroller>
```
> 一些开源库：
>
> - [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)
> - [vue-virtual-scroll-grid](https://github.com/rocwang/vue-virtual-scroll-grid)
8. 事件的销毁：Vue组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件
```js
export default {
  created() {
    this.timer = setInterval(this.refresh, 2000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  }
}
```
9. 图片懒加载
   对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载， 等到滚动到可视区域后再去加载。
```vue
<img v-lazy="/static/img/1.png">
```
> 参考项目：[vue-lazyload](https://github.com/hilongjw/vue-lazyload)
10. 第三方插件按需引入: 像element-plus这样的第三方组件库可以按需引入避免体积太大。
```js
import { createApp } from 'vue';
import { Button, Select } from 'element-plus';

const app = createApp()
app.use(Button)
app.use(Select)
```
11. 子组件分割策略：较重的状态组件适合拆分
```vue
<template>
  <div>
    <ChildComp/>
  </div>
</template>

<script>
export default {
  components: {
    ChildComp: {
      methods: {
        heavy () { /* 耗时任务 */ }
      },
      render (h) {
        return h('div', this.heavy())
      }
    }
  }
}
</script>
```
但同时也不宜过度拆分组件，尤其是为了所谓组件抽象将一些不需要渲染的组件特意抽出来，组件实例消耗远大于纯dom节点。参考：[避免不必要的组件抽象](https://cn.vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures)

12. 服务端渲染/静态网站生成：SSR/SSG。如果SPA应用有首屏渲染慢的问题，可以考虑SSR、SSG方案优化。参考[SSR Guide](https://cn.vuejs.org/guide/scaling-up/ssr.html)

## 26. Vue2组件为什么只能有一个根节点？
这题现在有些落伍了，vue3已经不用一个根了。
### 思路
1. 给自己一个结论
2. 解释为什么会这样
3. vue3解决方法原理

### 回答范例
1. vue2组件确实只能有一个根，但是vue3已经可以有多个根了
2. 之所以这样所因为vdom是一棵单根树形结构，patch方法在遍历的时候从根节点开始遍历，它要求只有一个根节点，组件也会转换为一个vdom，自然需要满足这个要求
3. vue3之所以可以写多个根节点，是因为引入了fragment的概念，这是一个抽象的节点，如果发现组件是多根的，就创建一个fragment节点，把多根节点作为它的children,将来patch的时候，如果发现所一个fragment节点，则直接遍历children创建或更新

### 知其所以然
+ [patch方法接收单根vdom](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/renderer.ts#L354-L355)
```js
// 直接获取type等，没有考虑数组的可能性
const { type, ref, shapeFlag } = n2
```
+ [patch方法对Fragment的处理](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/renderer.ts#L1091-L1092)
```js
// a fragment can only have array children
// since they are either generated by the compiler, or implicitly created
// from arrays.
mountChildren(n2.children as VNodeArrayChildren, container, ...)
```

## 27.使用过vuex的module吗？
### 体验
[modules](https://vuex.vuejs.org/zh/guide/modules.html)

### 思路
1. 概念和必要性
2. 怎么拆
3. 使用细节
4. 优缺点

### 回答范例
1. 用过module，项目规模变大之后，单独一个store对象会过于庞大臃肿，通过模块方式可以拆分开来便于维护
2. 可以按之前规则单独编写子模块代码，然后在主文件中通过modules选项组织起来：createStore({modules:{...}})
3. 不过使用时要注意访问子模块状态时需要加上注册时模块名：store.state.a.xxx，但同时getters、mutations和actions又在全局空间中，使用方式和之前一样。如果要做到完全拆分，需要在子模块加上namespace选项，此时再访问它们就要加上命名空间前缀。
4. 很显然，模块的方式可以拆分代码，但是缺点也很明显，就是使用起来比较繁琐复杂，容易出错。而且类型系统支持很差，不能给我们带来帮助。pinia显然在这方面有了很大改进，是时候切换过去了。

### 可能的追问
1. 用过pinia吗？都做了哪些改善？
Pinia API 与 Vuex ≤4 有很大不同，即：
+ mutations 不再存在。他们经常被认为是 非常 冗长。他们最初带来了 devtools 集成，但这不再是问题。
+ 无需创建自定义复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能利用 TS 类型推断。
+ 不再需要注入、导入函数、调用函数、享受自动完成功能！
+ 无需动态添加 Store，默认情况下它们都是动态的，您甚至都不会注意到。请注意，您仍然可以随时手动使用 Store 进行注册，但因为它是自动的，您无需担心。
+ 不再有 modules 的嵌套结构。您仍然可以通过在另一个 Store 中导入和 使用 来隐式嵌套 Store，但 Pinia 通过设计提供平面结构，同时仍然支持 Store 之间的交叉组合方式。 您甚至可以拥有 Store 的循环依赖关系。
+ 没有 命名空间模块。鉴于 Store 的扁平架构，“命名空间” Store 是其定义方式所固有的，您可以说所有 Store 都是命名空间的。

## 28.为什么路由需要懒加载？
### 分析
当打包应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问时才加载对应组件，这样就会更加高效。
```js
// 将
// import UserDetails from './views/UserDetails'
// 替换为
const UserDetails = () => import('./views/UserDetails')

const router = createRouter({
  // ...
  routes: [{ path: '/users/:id', component: UserDetails }],
})
```

### 思路
1. 必要性
2. 何时用
3. 怎么用
4. 使用细节

### 回答范例
1. 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。利用路由懒加载我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样会更加高效，是一种优化手段。
2. 一般来说，对所有的路由都使用动态导入是个好主意。
3. 给component选项配置一个返回 Promise 组件的函数就可以定义懒加载路由。例如：`{ path: '/users/:id', component: () => import('./views/UserDetails') }`
4. 结合注释() => import(/* webpackChunkName: "group-user" */ './UserDetails.vue')可以做webpack代码分块; vite中结合[rollupOptions](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E4%BD%BF%E7%94%A8-vite)定义分块
5. 路由中不能使用异步组件

### 知其所以然
component (和 components) 配置如果接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。
[参考](https://github1s.com/vuejs/router/blob/HEAD/src/navigationGuards.ts#L292-L293)

## 29.ref和reactive有何差异？
### 体验
[ref](https://vuejs.org/api/reactivity-core.html#ref)
```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

[reactive](https://vuejs.org/api/reactivity-core.html#reactive)
```js
const obj = reactive({ count: 0 })
obj.count++
```

### 思路
1. 两者概念
2. 两个使用场景
3. 两者异同
4. 使用细节
5. 原理

### 回答范例
1. ref接收内部值，返回响应式Ref对象，reactive返回响应式代理对象
2. 从定义上看ref通常用于处理单值的响应式，reactive用于处理对象类型的数据响应式
3. 两者均是用来构造响应式数据，但是ref主要解决原始值的响应式问题
4. ref返回的响应式数据在js中使用需要加上.value才能访问其值，在视图中使用会自动脱ref,不需要.value。ref可以接收对象或数组等非原始值，但内部依然是reactive实现响应式；reactive内部如果接收Ref对象会自动脱ref;使用展开运算符(...)展开reactive返回的响应式对象会使其失去响应性，可以结合toRefs()将值转换为Ref对象之后再展开
5. reactive内部使用Proxy代理传入对象并拦截该对象各种操作(trap)，从而实现响应式。ref内部封装了一个RefImpl类，并设置get value/set value，拦截用户对值的访问，从而实现响应式。

### 知其所以然
+ [ref](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/ref.ts#L73-L74)
+ [reactive](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/reactive.ts#L90-L91)

## 30.watch和watchEffect异同？
### 体验
watchEffect立即运行一个函数，然后被动地追踪它的依赖，当这些依赖改变时重新执行该函数。
```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

count.value++
// -> logs 1
```

watch侦测一个或多个响应式数据源并在数据源变化时调用一个回调函数。
```js
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

### 思路
1. 给出两个定义
2. 给出场景上的不同
3. 给出使用方式和细节
4. 原理阐述

### 回答范例
1. watchEffect立即执行一个函数，然后被动地追踪它的依赖，当这些依赖改变时重新执行该函数。watch侦测一个或多个响应式数据源并在数据源变化时调用一个回调函数
2. watchEffect是一种特殊的watch，传入的函数既是依赖收集的数据源也是回调函数。如果我们不关心响应式数据变化前后的值，只想拿这些数据做些事情，那么watchEffect就是我们需要的。watch更底层，可以接收多种数据源，包括用于依赖收集的getter函数，因此它完全可以实现watchEffect的功能，同时由于可以指定getter函数，依赖可以控制的更精确，还能获取数据变化前后的值，因此如果需要这些，我没会使用watch
3. watchEffect在使用时，传入的函数会立即执行一次，watch默认情况下并不会执行回调函数，除非我们手动设置immediate选项
4. 从实现上来说，watchEffect(fn)相当于watch(fn, fn, {immediate:true})

### 知其所以然
+ [watchEffect](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/apiWatch.ts#L80-L81)
```ts
export function watchEffect(
  effect: WatchEffect,
  options?: WatchOptionsBase
): WatchStopHandle {
  return doWatch(effect, null, options)
}
```
+ [watch](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/apiWatch.ts#L158-L159)
```ts
export function watch<T = any, Immediate extends Readonly<boolean> = false>(
  source: T | WatchSource<T>,
  cb: any,
  options?: WatchOptions<Immediate>
): WatchStopHandle {
  return doWatch(source as any, cb, options)
}
```

## 31.SPA和SSR异同？
我们现在编写的Vue、React和Angular应用大多数情况下都会在一个页面中，点击链接跳转页面通常是内容切换而非页面跳转，由于良好的用户体验逐渐成为主流的开发模式。但同时也会有首屏加载时间长，SEO不友好的问题，因此有了SSR，这也是为什么面试中会问到两者的区别。

### 思路
1. 两者概念
2. 两者优缺点
3. 使用场景差异
4. 其他选择

### 回答范例
1. SPA（Single Page Application）即单页面应用。一般也称为 客户端渲染（Client Side Render）， 简称 CSR。SSR（Server Side Render）即 服务端渲染。一般也称为 多页面应用（Mulpile Page Application），简称 MPA。
2. SPA应用只会首次请求html文件，后续只需要请求JSON数据即可，因此用户体验更好，节约流量，服务端压力也较小。但是首屏加载的时间会变长，而且SEO不友好。为了解决以上缺点，就有了SSR方案，由于HTML内容在服务器一次性生成出来，首屏加载快，搜索引擎也可以很方便的抓取页面信息。但同时SSR方案也会有性能，开发受限等问题。
3. 在选择上，如果我们的应用存在首屏加载优化需求，SEO需求时，就可以考虑SSR。
4. 但并不是只有这一种替代方案，比如对一些不常变化的静态网站，SSR反而浪费资源，我们可以考虑预渲染（prerender）方案。另外nuxt.js/next.js中给我们提供了SSG（Static Site Generate）静态网站生成方案也是很好的静态站点解决方案，结合一些CI手段，可以起到很好的优化效果，且能节约服务器资源。

### 知其所以然
1. 内容生成上的区别

SSR
![](./vue_05imgs/SSR.jpeg)
SPA
![](./vue_05imgs/SPA.jpeg)

2. 部署上的区别
![](./vue_05imgs/deploy.jpeg)

## 32.vue-loader是什么？它有什么作用
### 体验
使用官方提供的SFC playground可以很好的体验vue-loader。

有了vue-loader加持，我们才可以以SFC的方式快速编写代码。

[Vue SFC Playground](https://play.vuejs.org/#eNp9kUFLwzAUx79KfJcqzA3ZbXQDlYF6UFHBSy6je+sy0yQkL7NQ+t19SVn1ILv1/X//l/7SdnDr3PQYERZQhsorRyIgRbeSRjXOehKd8LgTvdh524iCq4U00lTWBBJNqMUy8cviAbW24tN6vb0orqQpZ8NxfBAPhI3TG0KehCj3N6uuy8t9X854yqkyLpI4Xjd2i3opgbkERuVs3IYJUOBX71Q9PQRr2LpLuxIq2zil0b84UqwmYSEySWzDZt9POSMfcXLKqz1WX//kh9CmTMKrx4D+iBJGRhtfIw14/f6MLT+PkM2j5vYZ+IbB6pgch9pdNFvW/tPLto/52ytTf4R1S2jC6VJJNDX73JfA/+P+zNV/defTed6Tpof+B7x8phs=)

### 思路
1. 是什么
2. 做什么用的
3. 何时生效
4. 如何工作

### 回答范例
1. vue-loader是用于处理单文件组件(SFC,Single-File Component)的webpack loader
2. 因为用了vue-loader，我们就可以在项目中编写SFC格式的Vue组件，我们可以把代码分割为 <script>和<style>，代码会异常清晰。结合其他loader我们还可以用Pug编写，用sass、less编写<style>，用TS编写<script>
3. webpack打包时，会以loader的方式调用vue-loader
4. vue-loader被执行时，它会对SFC中的每个语言块使用单独的loader链处理，最后将这些单独的块装配成最终的组件模板

### 知其所以然
1. vue-loader会调用@vue/compiler-sfc模块解析SFC源码为一个描述符（Descriptor），然后为每个语言块生成import代码，返回的代码类似下面：
```js
// source.vue被vue-loader处理之后返回的代码

// import the <template> block
import render from 'source.vue?vue&type=template'
// import the <script> block
import script from 'source.vue?vue&type=script'
export * from 'source.vue?vue&type=script'
// import <style> blocks
import 'source.vue?vue&type=style&index=1'

script.render = render
export default script
```

2. 我们想要script块中的内容被作为js处理（当然如果是<script lang="ts">被作为ts处理），这样我们想要webpack把配置中跟.js匹配的规则都应用到形如source.vue?vue&type=script的这个请求上。例如我们对所有*.js配置了babel-loader，这个规则将被克隆并应用到所在Vue SFC的<script>块上。内部的请求比如：
```js
import script from 'source.vue?vue&type=script'
```

将被展开为：

```js
import script from 'babel-loader!vue-loader!source.vue?vue&type=script'
```

类似的，如果我们对.sass文件配置了style-loader + css-loader + sass-loader，下面的代码：

```vue
<style scoped lang="scss"></style>
```

vue-loader将会返回给我们下面请求：

```js
import 'source.vue?vue&type=style&index=1&scoped&lang=scss'
```

然后webpack会展开如下：

```js
import 'style-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
```

1. 当处理展开请求时，vue-loader将被再次调用。这次，loader将会关注那些有查询串的请求，且仅针对特定块，它会选中特定块内部的内容并传递给后面匹配的loader。
2. 对于`<script>`块，处理到这就可以了，但是`<template>` 和 `<style>`还有一些额外任务要做，比如：

- 需要用Vue 模板编译器编译template，从而得到render函数
- 需要对`<style scoped>`中的CSS做后处理（post-process），该操作在css-loader之后但在style-loader之前

实现上这些附加的loader需要被注入到已经展开的loader链上，最终的请求会像下面这样：

```js
// <template lang="pug">
import 'vue-loader/template-loader!pug-loader!source.vue?vue&type=template'

// <style scoped lang="scss">
import 'style-loader!vue-loader/style-post-loader!css-loader!sass-loader!vue-loader!source.vue?vue&type=style&index=1&scoped&lang=scss'
```

## 33.你写过自定义指令吗？使用场景有哪些？
### 思路
1. 定义
2. 何时用
3. 怎么用
4. 常用指令
5. vue3变化

### 回答范例
1. Vue有一组默认指令，比如v-model或v-for，同时Vue也运行用户注册自定义指令来扩展Vue能力
2. 自定义指令主要完成一些可复用低层级DOM操作
3. 使用自定义指令分为定义、注册和使用三步：
   1. 定义自定义指令有两种方式，对象和函数形式，前者类似组件定义，有各种生命周期；后者只会在mounted和updated时执行
   2. 注册自定义指令类似组件，可以使用app.directive()全局注册，使用{directive: {xxx}}局部注册
   3. 使用时在注册名称前加上v-即可，比如v-focus
4. 我在项目中常用到的一些自定义指令，例如：
   1. 复制粘贴：v-copy
   2. 长按：v-longpress
   3. 防抖：v-debounce
   4. 图片懒加载：v-lazy
   5. 页面水印：v-waterMarker
   6. 拖拽指令：v-draggable
5. vue3中指令发生了较大的变化，主要是钩子的名称保持与组件一致，这样开发人员更容易记忆，不易犯错。另外在v3.2之后，可以在setup中以一个小写v开头方便定义自定义指令，更方便了。

### 知其所以然
编译后的自定义指令会被withDirective函数装饰，进一步处理生成的vnode，添加到特定属性中。
[v-focus](https://play.vuejs.org/#eNp9UstKAzEU/ZVrNm1BO4g7GQUVRV2oqOAmmzK9raOZJORRC8OsxJ3oRv0Gl4JQKfg7rd35C97J2NaFFGYx55HknJvkbEvrZs8jW2exTUyqHVh0Xm9ymWZaGQc5GOxAAR2jMqiRtcYll4mS1kFmu7BR6vXaPgqh4EIZ0V6qNeaW3p5KvCVXziVAprx02K6jaFQEQBTB5OFj9PiSSu3d9+f9aDiYvN1+Pb2O7gadcnG9MX4Zjt+fKz+K5i9b4oJL+uKoyk6pCTjMtGg5JAQQX65u5nlIWhRxRCiw4TDorWSqjWKDM9I5Ixy2JksczXZhy8xZKtNJu80rqySNKkTnLFGZTgWaY+1SKsvZ+rQUZy0ax81h4JzxuDzlk0tMrv/hr2y/5Dg7MWjR9JCzmeZapouuknfPjrBP/zORGnhB7gXiKVolfJmxsm172abYf3wh7UG48FR2z+1u36G001Jl0DDs4OeMHsHOgurzuGvNteklseIH2rnXfg==)

## 34.$attrs和$listeners是做什么的？
### 思路
1. 这两个api的作用
2. 使用场景分析
3. 使用方式和细节
4. vue3变化

### 回答范例
1. 我们可能会有一些属性和事件没有在props中定义，这类称为非属性特性，结合v-bind指令可以直接透传给内部的子组件
2. 这类“透传属性”常常用于包装高阶组件时往内部传递属性，常用于爷孙组件之间传参。比如我在扩展A组件时创建了组件B,然后在C组件中使用B,此时传递给C的属性中只有props里面声明的属性是给B使用的，其他都是A需要的，此时就可以利用v-bind=$attrs透传下去
3. 最常见用法是结合v-bind做展开；$attrs本身不是响应式的，除非访问的属性本身是响应式对象
4. vue2中使用$listeners获取事件，vue3中已移除，均合并到$attrs中，使用起来更简单

### 知其所以然
查看透传属性foo和普通属性bar，发现vnode结构完全相同，这说明vue3中将分辨两者工作由框架完成而非用户指定：
```vue
<template>
  <h1>{{ msg }}</h1>
  <comp foo="foo" bar="bar" />
</template>
```

```vue
<template>
  <div>
    {{$attrs.foo}} {{bar}}
  </div>
</template>
<script setup>
defineProps({
  bar: String
})
</script>
```

```js
_createVNode(Comp, {
    foo: "foo",
    bar: "bar"
})
```

[代码](https://play.vuejs.org/#eNp9UlFLwzAQ/isxCFUYLbK30Q1UBuqDDif4kpfaXrvONgnJdQ5K/ruX1NUi6kvI3ffdd99d0vNrreNDB3zBU5ubWiOzgJ1eCVm3WhlkPTNQMsdKo1oWETUaoVvV6q98nPjAKxGcK2mRtbZiS198Ed1B0yj2qkxTnEWXQqbJ0Iu6UIDQ6iZDoIixdHe16vtQ7FyaUBSyeWil1FJwOgVnb5mhO510T4iTJqMMn/GTGT/WRF5gWtSHoMhY359niMbGJOgchSTmXOiWDKyJJgU/1lNAWUvYGKXtRe+rqHzBtmhqWQnpplOSIbS0lLKu4r1VklyFCsH9WHUD5kljTUsTfMEC4rGMdvbxEHJoOpid8vkO8vdf8nt79DnBNwYsmAMIPmKYmQpwgNfbRzjSfQRbVXQNsf8Bn8GqpvMeB9pNJwuyPeEFt/fhX9ACXuz6iCDtaShv1DNd4AtOT+Of6K/Rv+3O43moo41y9wkUxOX9)

## 35.v-once使用场景有哪些？
### 思路
1. v-once是什么
2. 什么时候使用
3. 如何使用
4. 扩展v-memo
5. 探索原理

### 回答范例
1. v-once是vue的内置指令，作用是仅渲染指定组件或元素一次，并跳过未来对其更新
2. 如果我们有一些元素或组件在初始化渲染之后不再需要变化，这种情况下适合使用v-once，这样哪怕数据变化，vue也会跳过更新，是一种代码优化手段
3. 我们只需要作用的组件或元素上加上v-once即可
4. vue3.2之后，又增加了v-memo指令，可以有条件缓存部分模板并控制它们的更新，可以说控制力更强了
5. 编译器发现元素上面有v-once时，会将首次计算结果存入缓存对象，组件再次渲染时就会从缓存获取，从而避免再次计算

### 知其所以然
下面例子使用了v-once

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1 v-once>{{ msg }}</h1>
  <input v-model="msg">
</template>
```

我们发现v-once出现后，编译器会缓存作用元素或组件，从而避免以后更新时重新计算这一部分

```js
// ...
return (_ctx, _cache) => {
  return (_openBlock(), _createElementBlock(_Fragment, null, [
    // 从缓存获取vnode
    _cache[0] || (
      _setBlockTracking(-1),
      _cache[0] = _createElementVNode("h1", null, [
        _createTextVNode(_toDisplayString(msg.value), 1 /* TEXT */)
      ]),
      _setBlockTracking(1),
      _cache[0]
    ),
// ...
```

## 36.什么是递归组件？使用场景有哪些？
### 分析
递归组件在tree、menu这类组件中会被用的

### 体验
组件通过组件名称引用它自己，这种情况就是递归组件
> An SFC can implicitly refer to itself via its filename.
```vue
<template>
  <li>
    <div> {{ model.name }}</div>
    <ul v-show="isOpen" v-if="isFolder">
      <!-- 注意这里：组件递归渲染了它自己 -->
      <TreeItem
        class="item"
        v-for="model in model.children"
        :model="model">
      </TreeItem>
    </ul>
  </li>
<script>
export default {
  name: 'TreeItem',
  // ...
}
</script>
```

### 思路
1. 下定义
2. 使用场景
3. 使用细节
4. 原理阐述

### 回答范例
1. 如果某个组件通过组件名称引用它自己，这种情况就是递归组件
2. 实际开发中类似Tree、Menu这类组件，它们的节点往往包含子节点，子节点结构和父节点往往是相同的。这类组件的数据往往也是树形结构，这种都是使用递归组件的典型场景
3. 使用递归组件时，由于我们并未也不能在组件内部导入它自己，所以设置组件name属性，用来查找组件定义，如果使用SFC,则可以通过SFC文件名推断。组件内部通常也要有递归结束条件，比如model.children这样的判断
4. 查看生成渲染函数可知，递归组件查找时会传递一个布尔值给resolveComponent，这样实际获取的组件就是当前组件本身

### 知其所以然
递归组件编译结果中，获取组件时会传递一个标识符 `_resolveComponent("Comp", true)`

```js
const _component_Comp = _resolveComponent("Comp", true)
```

就是在传递`maybeSelfReference`

```js
export function resolveComponent(
  name: string,
  maybeSelfReference?: boolean
): ConcreteComponent | string {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name
}
```

resolveAsset中最终返回的是组件自身：

```js
if (!res && maybeSelfReference) {
    // fallback to implicit self-reference
    return Component
}
```

[resolveAssets](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/helpers/resolveAssets.ts#L22-L23)
[playground](https://play.vuejs.org/#eNp9U81u1DAQfpWRL2mlNlG3tyhdCVAPcKAIuGEOaTK7m8WxI9tZVooiceAJ+jBcKt4GhHgLxpOf3RXQkzPzff78zWenE8+aJt61KFKRucJWjQeHvm2WUld1Y6yHDiyuoIeVNTVERI1mqDB1M/bj5AUVQYngwmjnoXZruAmbz6LfXx5+fn/49fj1x+O36HwmmBIVUTqpAVR+jyqFSFPz8iq6CL1iU6nSok7hQygBulMW8Xom/o0soj4AH6WmNUuG0WgoKjzWjco9UgWQba6WXcde+z5LqOIuT5aywRspeJVimSWhT4wsmUXEhZgmDxmeipfVjj/IX8ciMdvs2VuWTHAWFGB3uTKWTqtIAyo9xBNPGUhx8BMYbCfsOxhejAYXpw6pOIzvcc9XV+IqbxXd7mBP5zVSeEFviB6gsaZx6USAwU4Kd/dbLPzQnMIPhxqN2h/z2clRDfQUdIn27Lzj8Vlg1AnL8T1RqN7RI1lV63jrjKZkWUeKoFoptHeNr+gRSTGfIEWulPn8invetjiaoz0bLD79o791+9CT4o1Fh3aHUsyYz+0a/QDfvnuNe/qeQYqiVcR+AnyLzqg2eBxoz1tdku0jHrt9yT9Spdfv3e3eo3bTUMEop8J8Keh5hcv53+gHu9fx9ZhmL/o/+vFGeg==)

## 37.什么是异步组件？
### 体验
大小应用中，我们需要分割应用为更小的块，并且再需要组件时再加载它们

```js
import { defineAsyncComponent } from 'vue'
// defineAsyncComponent定义异步组件
const AsyncComp = defineAsyncComponent(() => {
  // 加载函数返回Promise
  return new Promise((resolve, reject) => {
    // ...可以从服务器加载组件
    resolve(/* loaded component */)
  })
})
// 借助打包工具实现ES模块动态导入
const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
```

### 思路
1. 异步组件作用
2. 什么时候使用异步组件
3. 使用细节
4. 和路由懒加载的不同

### 回答范例
1. 在大型应用中，我们需要分割应用为更小的块，并且在需要组件时再加载它们
2. 我们不仅可以在路由切换时懒加载组件，还可以再页面组件中继续使用异步组件，从而实现更细的分割粒度
3. 使用异步组件最简单的方式是直接给defineAsyncComponent指定一个loader函数，结合ES模块动态导入函数import可以快速实现。我们甚至可以指定loadingComponent和errorComponent选项从而给用户一个很好的加载反馈。另外Vue3中还可以结合suspense组件使用异步组件
4. 异步组件容易和路由懒加载混淆，实际上不是一个东西。异步组件不能被用于定义懒加载路由上，处理它的是vue框架，处理路由组件加载的是vue-router。但是可以在懒加载的路由组件中使用异步组件

### 知其所以然
defineAsyncComponent定义了一个高阶组件，返回一个包装组件。包装组件根据加载器的状态决定渲染什么内容。

[defineAsyncComponent](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/apiAsyncComponent.ts#L43-L44)

## 38.Vue项目中如何处理错误？
### 思路
1. 首先区分错误类型
2. 根据错误不同类型做相应收集
3. 收集的错误是如何上报服务器的

### 回答范例
1. 应用中的错误类型分为接口异常和代码逻辑异常
2. 我们需要根据不同错误类型做相应处理：接口异常是我们请求后端接口过程中发生的异常，可能是请求失败，也可能是请求获得了服务器响应，但是返回的是错误状态。以Axios为例，这类异常我们可以通过封装Axios，在拦截器中统一处理整个应用中请求的错误。代码逻辑异常是我们编写的前端代码中存在逻辑上的错误造成的异常，vue应用中最常见的方式是使用全局错误处理函数app.config.errorHandler收集错误。
3. 收集到错误之后，需要统一处理这些异常：分析错误，获取需要错误信息和数据。这里应该有效区分错误类型，如果是请求错误，需要上报接口信息，参数，状态码等；对于前端逻辑异常，获取错误名称和详情即可。另外还可以收集应用名称、环境、版本、用户信息，所在页面等。这些信息可以通过vuex存储的全局状态和路由信息获取。

### 实践
+ axios拦截器中处理捕获异常：
```js
// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 存在response说明服务器有响应
    if (error.response) {
      let response = error.response;
      if (response.status >= 400) {
        handleError(response);
      }
    } else {
      handleError(null);
    }
    return Promise.reject(error);
  },
);
```

+ vue中全局捕获异常：
```js
import { createApp } from 'vue'

const app = createApp(...)

app.config.errorHandler = (err, instance, info) => {
  // report error to tracking services
}
```

+ 处理接口请求错误：
```js
function handleError(error, type) {
  if(type == 1) {
    // 接口错误，从config字段中获取请求信息
    let { url, method, params, data } = error.config
    let err_data = {
       url, method,
       params: { query: params, body: data },
       error: error.data?.message || JSON.stringify(error.data),
    })
  }
}
```

+ 处理前端逻辑错误：
```js
function handleError(error, type) {
  if(type == 2) {
    let errData = null
    // 逻辑错误
    if(error instanceof Error) {
      let { name, message } = error
      errData = {
        type: name,
        error: message
      }
    } else {
      errData = {
        type: 'other',
        error: JSON.strigify(error)
      }
    }
  }
}
```

## 39.从0实现vuex?
### 思路
1. vuex需求分析
2. 如何实现这些需求

### 回答范例
1. 官方说vuex是一个状态管理模式的库，并确保这种状态以可预期的方式变更。可见要实现一个vuex:
   1. 要实现一个store存储全局状态
   2. 要提供修改状态所需API: commit(type, payload), dispatch(type, payload)
2. 实现store时，可以定义Store类，构造函数接收选项options,设置属性state对外暴露状态，提供commit和dispatch修改属性state。这里需要设置state为响应式对象，同时将Store定义为一个vue插件
3. commit(type, payload)方法中可以获取用户传入的mutations并执行它，这样可以按用户提供的方法修改状态。dispatch(type, payload)类似，但需要注意它可能是异步的，需要返回一个Promise给用户以处理异步结果。

### 实践
Store的实现
```js
class Store {
    constructor(options) {
        this.state = reactive(options.state)
        this.options = options
    }
    commit(type, payload) {
        this.options.mutations[type].call(this, this.state, payload)
    }
}
```

### 知其所以然
[Vuex中Store的实现](https://github1s.com/vuejs/vuex/blob/HEAD/src/store.js#L19-L20)

## 40.mutation和action有什么区别？
### 体验
看下面例子可知，Action 类似于 mutation，不同在于：
+ Action 提交的是 mutation，而不是直接变更状态。
+ Action 可以包含任意异步操作。
```js
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

### 思路
1. 给出两者概念说明区别
2. 举例说明应用场景
3. 使用细节不同
4. 简单阐述实现上差异

### 回答范例
1. 官方文档说：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，mutation 非常类似于事件：每个 mutation 都有一个**字符串的类型 (type)**和一个**回调函数 (handler)**。Action 类似于 mutation，不同在于：Action可以包含任意异步操作，但它不能修改状态， 需要提交mutation才能变更状态。
2. 因此，开发时，包含异步操作或者复杂业务组合时使用action；需要直接修改状态则提交mutation。但由于dispatch和commit是两个API，容易引起混淆，实践中也会采用统一使用dispatch action的方式。
3. 调用dispatch和commit两个API时几乎完全一样，但是定义两者时却不甚相同，mutation的回调函数接收参数是state对象。action则是与Store实例具有相同方法和属性的上下文context对象，因此一般会解构它为{commit, dispatch, state}，从而方便编码。另外dispatch会返回Promise实例便于处理内部异步结果。
4. 实现上commit(type)方法相当于调用`options.mutations[type](state)`；dispatch(type)方法相当于调用`options.actions[type](store)`，这样就很容易理解两者使用上的不同了。

### 知其所以然
我们可以像下面这样简单实现commit和dispatch，从而辨别两者不同：
```js
class Store {
    constructor(options) {
        this.state = reactive(options.state)
        this.options = options
    }
    commit(type, payload) {
        // 传入上下文和参数1都是state对象
        this.options.mutations[type].call(this.state, this.state, payload)
    }
    dispatch(type, payload) {
        // 传入上下文和参数1都是store本身
        this.options.actions[type].call(this, this, payload)
    }
}
```

## 41.Vue长列表优化思路
### 思路
1. 描述大数据量带来的问题
2. 分不同情况做不同处理
3. 总结一下

### 回答范例
1. 在大型企业级项目中经常需要渲染大量数据，此时很容易发生卡顿的情况。比如大数据量的表格、树等
2. 处理时需要根据情况做不同处理：
   1. 可以采用分页的方式获取，避免渲染大量数据
   2. 虚拟滚动方案，只渲染视口范围内的数据
   3. 如果不需要更新，可以使用v-once方式只渲染一次
   4. 通过v-memo可以缓存结果，结合v-for使用，避免数据变化时不必要的VNode创建
   5. 可以采用懒加载方式，在用户需要的时候再加载数据，比如tree组件子树的懒加载
3. 总之，还是要看具体需求，首先从设计上避免大数据获取和渲染；实在需要这样做可以采用虚拟列表的方式优化渲染；最后优化更新，如果不需要更新可以v-once处理，需要更新可以v-memo进一步优化大数据更新性能。其他可以采用的是交互方式优化，无限滚动，懒加载等方案

## 42.如何监听vuex状态变化
### 分析
vuex数据状态是响应式的，所以状态变视图跟着变，但是有时还需要指导数据状态变了从而做一些事情

既然状态都是响应式的，那自然可以watch，另外vuex也提供了订阅API:store.subscribe()

### 思路
1. 总述知道的办法
2. 分别阐述用法
3. 选择和场景

### 回答范例
1. 我知道几种方法：
   1. 可以通过watch选项或者watch方法监听状态
   2. 可以使用vuex提供的API：store.subscribe()
2. watch选项方式，可以以字符串形式监听$store.state.xx;subscribe方式，可以调用store.subscribe(cb)，回调函数接收mutation对象和state对象，这样可以进一步判断mutation.type是否是期待的那个，从而进一步做后续处理
3. watch方式简单好用，且能获取变化前后的值，首选；subscribe方法会被所有commit行为触发，隐藏还需要判断mutation.type，用起来略繁琐，一般用于vuex插件中

### 实践
+ watch方式
```js
const app = createApp({
    watch: {
      '$store.state.counter'() {
        console.log('counter change!');
      }
    }
  })
```
+ subscribe方式
```js
  store.subscribe((mutation, state) => {
    if (mutation.type === 'add') {
      console.log('counter change in subscribe()!');
    }
  })
```

## 43.router-link和router-view是如何生效的？
### 思路
1. 两者作用
2. 阐述整体流程
3. 分析两个组件实现方式

### 回答范例
1. vue-router中两个重要组件router-link和router-view，分别起到**路由导航作用**和**组件内容渲染作用**
2. vue-router会监听popstate事件，点击router-link后之后页面不会刷新，而是拿出当前path去和routes中path匹配，获得匹配组件后，router-view会将匹配组件渲染出来
3. 使用router-link默认生成一个a标签，点击后取消默认行为而是执行一个navigate方法，它会pushState以激活事件处理函数，重新匹配出一个路由injectedRoute；router-view的渲染函数依赖这个路由，它根据该路由获取要渲染的组件并重新渲染它
4. router-link组件内部根据custom属性判断如何渲染最终生成节点，内部提供导航方法navigate，用户点击之后实际调用的是该方法，此方法最终会修改响应式的路由变量，然后重新去routes匹配出数组结果，router-view则根据其所处深度deep在匹配数组结果中找到对应的路由并获取组件，最终将其渲染出来

### 知其所以然
+ [routerLink](https://github1s.com/vuejs/router/blob/HEAD/src/RouterLink.ts#L184-L185)
+ [routerView](https://github1s.com/vuejs/router/blob/HEAD/src/RouterView.ts#L43-L44)

## 44.Vue3性能提升体现在哪些方面？
### 分析
vue3在设计时有几个目标：更小、更快、更友好，这些改进多数与性能相关，因此可以围绕介绍

### 思路
1. 总述和性能相关的新特性
2. 逐个说细节
3. 能说点原理更佳

### 回答范例
1. 分别从代码、编译、打包三个方面介绍vue3的性能提升
2. 代码层面性能优化主要体现在全新响应式API，基于Proxy实现，初始化时间和内存占用均大幅改进
3. 编译层面做了更多编译优化处理，比如静态提升、动态内容标记、事件缓存、区块等，可以有效跳过大量diff过程
4. 打包时更好的tree-shaking，因此整体提交更小，加载更快

### 知其所以然
1. 为什么基于Proxy更快了：初始化时懒出来，用户访问才做拦截处理，初始化更快[源代码](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/baseHandlers.ts#L148-L153)
2. 轻量的依赖关系保存：利用weakMap、Map和Set保存响应式数据和副作用之间的依赖关系[源代码](https://github1s.com/vuejs/core/blob/HEAD/packages/reactivity/src/effect.ts#L18-L19)

## 45.Vue3为什么用proxy代替defineProperty?
### 分析
vue3中最重大的更新之一就是响应式模块`reactivity`的重写。主要的修改就是`Proxy`替换`defineProperty`实现响应式。此变化主要是从性能方面考量。

### 思路
1. 属性拦截的几种方式
2. defineProperty的问题
3. Proxy的优点
4. 其他考量

### 回答范例
1. JS中做属性拦截常见的方式有三种：defineProperty、getter/setters、proxies
2. Vue2中使用`defineProperty`的原因是，2013年只能使用这种方式。由于该API的局限性，比如对于数组的拦截有问题，为此vue需要专门为数组响应式做一套实现。另外不能拦截那些新增、删除属性；最后`definePr0perty`方案在初始化时需要深度递归遍历待处理的对象才能对他进行完全拦截，明显增加了初始化的时间；通知更新过程需要维护大量dep实例和watcher实例，额外占用内存较多
3. 以上两点在Proxy出现后，迎刃而解，不仅可以对数组实现拦截，还能对Map、Set实现拦截；另外Proxy的拦截也是懒处理行为，如果用户没有访问嵌套对象，那么也不会实施拦截，这就让初始化的速度和内存占用都改善了
4. 当然Proxy是有兼容性问题的，IE完全不支持，所以如果需要兼容IE就不合适

### 知其所以然
+ Proxy属性拦截的原理：利用get、set、deleteProperty这三个trap实现拦截
```js
function reactive(obj) {
  return new Proxy(obj, {
    get(traget, key) {},
    set(traget, key) {},
    deletePropterty(target, key) {}
  })
}
```
+ Object.defineProperty属性拦截原理：利用get、set这两个trap实现拦截
```js
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get(key) {},
    set(key, val) {}
  })
}
```

## 46.history和hash模式有何区别？
差别主要在现实形式和部署上。
### 体验
vue-router4.x中设置模式已经变化：
```ts
const router = createRouter({
  history: createWebHashHistory(), // hash模式
  history: createWebHistory(), // history模式
  history: createMemoryHistory(), // memory模式
})
```

用起来一模一样

```vue
<router-link to="/abort">go to abort</router-link>
```

区别只在url形式
```
hash: `http://xx.com/#/abort`
history: `http://xx.com/abort`
```

### 思路
1. 总述两者区别
2. 详细阐述使用细节
3. 实现方式

### 回答范例
1. vue-router有3个模式，其中history和hash更为常用。两者区别主要在显示形式和部署上
2. hash模式在地址栏显示的时候是以哈希的形式：#/xxx，这种方式使用和部署上都比较简单；history模式url看起来更优雅美观，但是应用在部署时需要做特殊配置，web服务器需要做回退处理，否则会出现刷新页面404的问题
3. 在实现上不管哪种模式，最终都是通过监听popstate事件触发路由跳转处理，url显示不同只是显示效果上的差异

### history nginx配置
```
server {
  listen  80;
  server_name xxx.com;
  
  location /admin {
    root /User/adc/www/admin
    index index.html
    try_files $uri $uri/ /admin/index.html 
  }
}
```

## 47.什么场景使用嵌套路由？
### 思路
1. 概念和使用场景
2. 使用方式
3. 实现原理

### 回答范例
1. 平时开发中，应用的有些界面是由多层级组件组合而来的，这种情况下，url各部分通常对应某个嵌套的组件，vue-router中可以使用嵌套路由表示这种关系
2. 表现形式是在两个路由间切换时，它们有公用的视图内容。此时通常提取一个父组件，内部放上`<router-vie />`，从而形成物理上的嵌套，和逻辑上的嵌套对应起来。定义嵌套路由时使用`children`属性组织嵌套关系
3. 原理上是在`router-view`组件内部判断其所处嵌套层级的深度，将这个深度作为匹配组件数组matched的索引，获取对应渲染组件并渲染之

### 知其所以然
router-view获取自己所在的深度`viewDepthKey`：默认0，加1之后传给后代，同时根据深度获取匹配路由

## 48.刷新后vuex状态丢失怎么解？
### 思路
1. 问题描述
2. 解决方法
3. 个人理解
4. 三方库原理探讨

### 回答范例
1. vuex只是在内存保存状态，刷新之后就会丢失，如果要持久化就要存起来
2. localstorage就很合适，提交mutation的时候同时存入localStorage，store中把值取出作为state的初始化即可
3. 这里有两个问题，不是所有状态都需要持久化；如果需要保存的状态很多，编写的代码就不够优雅，每个提交的地方都需要单独做保存处理。这里就可以利用vuex的subscribe方法做一个统一的处理。设置可以封装一个vuex插件以便使用
4. 类似的插件有vuex-persist,vuex-persistedstate,内部的实现就是通过订阅mutation变化做统一处理，通过插件的选项控制哪些需要持久化

## 49.你觉得vuex有什么缺点？
### 思路
1. 先夸在贬
2. 使用感受
3. 解决方案

### 回答范例
1. vuex利用响应式，使用起来已经相当方便编辑了，但是在使用付出中感觉模块化这一块做的过于复杂，用的时候容易出错，还要经常查看文档
2. 比如：访问state时要带上模块key，内嵌模块的话会很长，不得不配合mapState使用，加不加namespace区别也很大，getters，mutations,actions这么默认全局，加上之后必须用字符串类型的path匹配。使用模式不统一，容易出错；对ts的支持也不友好，在使用模块时没有代码提示
3. pinia出现之后使用体验好了很大，vue3+pinia会是更好的组合

## 50. Composition API和Options API有何不同？
### 分析
1. vue3最重要的更新之一
2. 它具有一系列的优点，针对Options API暴露的一些问题量身打造
3. 是vue3的推荐写法，掌握它对掌握好Vue3至关重要
4. 灵感源于react hooks，又青出于蓝

### 思路
1. 总述不同点
2. 开发动机
3. 如何选择

### 回答范例
1. composition API是一组API,包括：reactivity API,生命周期钩子，依赖注入，使用户可以通过导入函数方式编写vue组件。而options API则通过声明组件选项的对象形式编写组件
2. composition APi最主要作用是能够简洁、高效复用逻辑。解决了过去options API中mixins的各种缺点；另外composition API具有更加敏捷的代码组织能力，很多用户喜欢options API，认为所有东西都有固定位置的选项放置代码，但是单个组件增长过大之后这反而成为限制，一个逻辑关注点分散在组件各处，形成代码碎片，维护时需要反复横跳，composition API则可以将它们有效组织在一起。最后composition API拥有更好的类型推断，对ts支持更友好，options API在设计之初并未考虑类型推断因素，虽然官方为此做了很多复杂的类型体操，确保用户可以在使用options API时获得类型推断，然而还是没办法用在mixins和provide/inject上
3. vue3首推composition API，但是这会让我们再代码组织上多花点心思，因此在选择上，如果我们项目属于中低复杂度的场景，options API仍是一个好选择。对于那些大型，高扩展，高维护的项目上，composition API会获得更大收益
