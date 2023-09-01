---
lang: zh-CN
title: 【06】组件化实践
description: 【06】组件化实践
---

# 目标
+ 总结vue组件化常用技术
+ 深入理解vue的组件化
+ 设计并实现多种类型的组件
+ 组件库源码学习
+ vue3组件化注意事项

# 知识要点
+ 组件通信方式
+ 组件复合
+ 组件构造函数和实例化
+ 渲染函数
+ 组件挂载
+ 递归组件
+ ...

# 知识点

## 组件化

vue组件系统提供了一种抽象，让我们可以使用独立可复用的组件来构建大型应用，任意类型的应用界面都可以抽象为一个组件树，组件化能**提高开发效率，方便重复使用，简化调试步骤，提示项目可维护性，便于多人协同开发。**

![](https://v2.cn.vuejs.org/images/components.png)

### 组件通信常用方式
+ props
+ $emits/$on
+ eventBus
+ vuex

### 边界情况
+ $parent
+ $children
+ $root
+ $refs
+ provide/inject
+ 非prop特性
  + $attrs
  + $listeners

### 组件通信
#### props
父给子传值

```vue
// child
props: { msg: String }
// parent
<HelloWorld msg="Welcome to Your Vue.js App"/>
```

#### 自定义事件
子给父传值

````vue
// child
this.$emit('add', good)
// parent
<Cart @add="cartAdd($event)"></Cart>
````

#### 事件总线
任意两个组件之间传值常用事件总线或vuex的方式

```js
// Bus：事件派发、监听和回调管理
class Bus {
 constructor(){
  this.callbacks = {}
 }
 $on(name, fn){
   this.callbacks[name] = this.callbacks[name] || []
   this.callbacks[name].push(fn)
 }
  $emit(name, args){
   if(this.callbacks[name]){
    this.callbacks[name].forEach(cb => cb(args))
   }
 }
}
// main.js
Vue.prototype.$bus = new Bus()

// child1
this.$bus.$on('foo', handle)
// child2
this.$bus.$emit('foo')
```
> 实践中通常用Vue代替Bus，因为Vue已经实现了$on和$emit

#### vuex
创建唯一的全局数据管理者store，通过它管理数据并通知状态变更

#### $parent/$root
兄弟组件之间通信可通过共同祖辈搭桥，$parent或$root

```js
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```

#### $children
父组件可以通过$children访问子组件实现父子通信

```js
// parent
this.$children[0].xx = 'xxx'
```
> 注意：$children不能保证子元素顺序

#### refs
获取子节点引用

```vue
// parent
<HelloWorld ref="hw"/>
mounted() {
 this.$refs.hw.xx = 'xxx'
}
```

#### $attrs/$listeners
包含了父作用域中**不作为prop被识别**(且获取)的特性绑定(`class`和`style`除外)。当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定(`class`和`style`除外)，并且可以通过`v-bind="$attrs"`传入内部组件——在创建高级别的组件时非常有用。

```vue
// child：并未在props中声明foo
<p>{{$attrs.foo}}</p>
// parent
<HelloWorld foo="foo"/>
```

```vue
// 给Grandson隔代传值，communication/index.vue
<Child2 msg="lalala" @some-event="onSomeEvent"></Child2>
// Child2做展开
<Grandson v-bind="$attrs" v-on="$listeners"></Grandson>
// Grandson使⽤
<div @click="$emit('some-event', 'msg from grandson')">
 {{msg}}
</div>
```

#### provide/inject
能够实现祖先和后代之间传值

```js
// ancestor
provide() {
 return {foo: 'foo'}
}
// descendant
inject: ['foo']
```

### 插槽
插槽语法是vue实现的内容分发API，用于复合组件开发。该技术在通用组件库中有大量应用。

### 匿名插槽
```vue
// comp1
<div>
 <slot></slot>
</div>
// parent
<comp>hello</comp>
```

### 具名插槽
将内容分发到子组件指定位置

```vue
// comp2
<div>
 <slot></slot>
 <slot name="content"></slot>
</div>
// parent
<Comp2>
 <!-- 默认插槽⽤default做参数 -->
 <template v-slot:default>具名插槽</template>
 <!-- 具名插槽⽤插槽名做参数 -->
 <template v-slot:content>内容...</template>
</Comp2>
```

#### 作用域插槽
分发内容要用到子组件中的数据
```vue
// comp3
<div>
 <slot :foo="foo"></slot>
</div>
// parent
<Comp3>
 <!-- 把v-slot的值指定为作⽤域上下⽂对象 -->
 <template v-slot:default="slotProps">
 来⾃⼦组件数据：{{slotProps.foo}}
 </template>
</Comp3>
```

### async-validate
```js
import Schema from "async-validator";
validate() {
 // 获取对应FormItem校验规则
 const rules = this.form.rules[this.prop];
 // 获取校验值
 const value = this.form.model[this.prop];
 // 校验描述对象
 const descriptor = { [this.prop]: rules };
 // 创建校验器
 const schema = new Schema(descriptor);
 // 返回Promise，没有触发catch就说明验证通过
 return schema.validate({ [this.prop]: value }, errors => {
 if (errors) {
 // 将错误信息显示
 this.error = errors[0].message;
 } else {
 // 校验通过
 this.error = "";
 }
 });
}
```

