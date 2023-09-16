---
lang: zh-CN
title: 【08】vue2+ts
description: 【08】vue2+ts
---

# 知识点
1. ts核心语法
2. ts+vue
3. 装饰器应用
4. 装饰器原理
5. vue-property-decorator源码解析

# 准备工作

新建一个基于ts的vue项目 

```bash
vue create hello-world
```

在已存在项目中安装typescript 

```bash
vue add @vue/typescript
```

# ts特点
+ 类型注解、类型检测
+ 类
+ 接口
+ 泛型
+ 装饰器
+ 类型声明
   
## 类型注解和编译时类型检查
使用类型注解约束变量类型，编译器可以做静态类型检查，使程序更加健壮

### 类型基础
```ts
// ts-test.ts
let var1: string; // 类型注解
var1 = "开课吧"; // 正确
// var1 = 4; // 错误

// 编译器类型推断可省略这个语法
let var2 = true;
// var2 = 4; // 错误

// 常见原始类型: string,number,boolean,undefined,null,symbol

// 类型数组
let arr: string[];
arr = ["Tom"]; // 或Array<string>

// 任意类型any
let varAny: any;
varAny = "xx";
varAny = 3;

// any类型也可用于数组
let arrAny: any[];
arrAny = [1, true, "free"];
arrAny[1] = 100;

// 函数中的类型约束
function greet(person: string): string {
  return "hello, " + person;
}
// void类型，常用于没有返回值的函数
function warn(): void {}
```

### 类型别名 联合类型 交叉类型
使用类型别名自定义类型 `type Foobar={foo: string, bar: string}`

联合类型：希望某个变量或参数的类型是多种类型其中之一 `let union: string | number`

交叉类型：想要定义某种由多种类型合并而成的类型使用交叉类型 `let union: string & number`

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="feature in features"
          :class="{selected: feature.selected}"
          :key="feature.id">
        {{feature.name}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

// 类型别名
type Feature = {
  id: number;
  name: string;
}

// 交叉类型
type FeatureSelect = Feature & {selected: boolean}

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  features: FeatureSelect[] = [
    {id: 1, name: '类型注解', selected: false},
    {id: 2, name: '编译形语言', selected: true},
  ]
}
</script>
```

### 函数
必填参数：参数一旦声明，就要求传递，且类型需符合

可选参数：参数名后面加上问号，变成可选参数

默认值

```ts
function greeting(persion: string, persion2?: string, persion3: string  = '123'): string {
  return `${persion}-${persion2}-${persion3}`;
}
```

## 类
class的特性

ts中的类和es6中大体相同，这里重点关注ts带来的访问控制等特性

```ts
 // class
class Parent {
  private _foo = "foo"; // 私有属性，不能在类的外部访问
  protected bar = "bar"; // 保护属性，可以在子类中访问

  // 参数属性：构造函数参数加修饰符，能够定义为成员属性
  constructor(public tua = "tua") {}

  // 方法也有修饰符
  private someMethod() {}

  // 存取器：属性方式访问，可添加额外逻辑，控制读写性
  get foo() {
    return this._foo;
  }
  set foo(val) {
    this._foo = val;
  }
}
```

利用get实现计算属性
```vue
<template>
  <li>总数：{{count}}</li>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  features = [
    {id: 1, name: '类型注解', selected: false},
    {id: 2, name: '编译形语言', selected: true},
  ];

  get count() {
    return this.features.length
  }
}
</script>
```

## 接口
接口仅约束结构，不要求实现，使用更简单

```ts
interface Person {
  firstName: string;
  lastName: string;
}

// greeting函数通过Person接口约束参数解构
function greeting2(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
greeting2({ firstName: "Jane", lastName: "User" }); // 正确
// greeting2({firstName: 'Jane'}); // 错误
```

> [interface vs type aliases](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)

## 泛型
泛型（Generice）是指在定义函数、接口和类的时候，不预先指定具体类型，而是在使用的时候在指定类型的一种特性。以此增加代码通用性

```ts
// 不用泛型
interface Result {
  ok: 0 | 1;
  data: Feature[];
}
// 使用泛型
interface Result<T> {
  ok: 0 | 1;
  data: T;
}
// 泛型方法
function getResult<T>(data: T): Result<T> {
  return {ok: 1, data};
}
// 用尖括号方式指定T为string
getResult<string>('hello')
// 用类型推断指定T为number
getResult(1)
```

> 泛型优点：
> 
> 函数和类可以支持多种类型，更加通用
> 
> 不必编写多条重载，冗长联合类型，可读性好
> 
> 灵活控制类型约束
> 
> 不仅通用且能灵活控制，泛型被广泛用于通用库的编写

范例：使用axios获取数据

安装axios `npm i axios -S`

配置一个模拟接口，vue.config.js

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get("/api/list", (req, res) => {
        res.json([
          { id: 1, name: "类型注解", selected: true },
          { id: 2, name: "编译型语言", selected: false },
        ]);
      });
    },
  },
})
```

vue中使用

```vue
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Axios from 'axios';
// 类型别名
type Feature = {
  id: number;
  name: string;
}
// 交叉类型
type FeatureSelect = Feature & {selected: boolean}

interface Result<T> {
  ok: number;
  data: T;
}

@Component
export default class HelloWorld extends Vue {
  created() {
    Axios.get<FeatureSelect[]>('/api/list').then(res => {
      this.features = res.data;
    })
  }
}
</script>
```

## 声明文件
使用ts开发时，如果要使用第三方js库的同时还想利用ts诸如类型检查等特性就需要声明文件，类似xx.d.ts

同时，vue项目中还可以在shims-vue.d.ts中对已存在模块进行补充

*npm i @types/xxx*

范例：利用模块补充$axios属性到vue实例，从而在组件里面直接用

```ts
// main.ts
import axios from 'axios';
Vue.property.$axios = axios;
```
```ts
// shime-vue.d.ts
import Vue from 'vue';
import {AxiosInstanse} from 'axios';

declare module 'vue/types/vue' {
  interface vue {
    $axios: AxiosInstanse;
  }
}
```
 
## 装饰器
装饰器用于扩展类或者它的属性和方法。@xxx就是装饰器的写法

### 属性声明：@Prop
除了在@Component中声明，还可以采用@Prop的方式声明组件属性

```ts
export default class HelloWorld extends Vue {
  // @Prop()参数是为Vue提供属性选项
  // !称为明确赋值断言，它是提供给ts的
  @Prop({type: String, required: true})
  private msg!: string;
}
```

### 事件处理：@Emit
新增特性时派发事件通知

```ts
export default class HelloWorld extends Vue {
// 通知父类新增事件，若未指定事件名则函数名作为事件名 (kebab-case)
  @Emit()
  addFeature(e: KeyboardEvent) {// 若没有返回值，形参将作为事件参数
    const input = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: input.value,
      selected: false
    }
    this.features.push(feature);
    input.value = '';
    return feature; // 若有返回值，则返回值作为事件参数
  }
}
```

### 变更监测：@Watch
```ts
export default class HelloWorld extends Vue {
  @Watch('features', {
    immediate: true,
    deep: true,
  })
  onFeaturesChange(val: FeatureSelect[], old: FeatureSelect[]) {
    console.log('onFeaturesChange', val.length, old && old.length);
  }
}
```


### 状态管理推荐：`vuex-module-decorators`
`vuex-module-decorators`通过装饰器提供模块化声明vuex模块的方法，可以有效利用ts的类型系统。

+ 安装：`npm i vuex-module-decorators -D`
+ 根模块清空，修改store/index.ts `export default new Vuex.Store({})`
+ 定义counter模块，创建store/counter
```ts
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import store from './store';

@Module({dynamic: true, store: store, name: 'counter', namespaced: true})
class CounterModule extends VuexModule {
  count = 1;
  
  @Mutation
  add() {
    // 通过this直接访问count
    this.count++;
  }
  
  // 定义getters
  get doubleCount() {
    return this.counut * 2;
  }
  
  @Action
  asyncAdd() {
    setTimeout(() => {
      // 通过this访问add
      this.add()
    }, 1000)
  }
}

// 导出模块应该是getModule的结果
export default getModule(CounterModule);
```

+ 使用

```vue

<template>
  <div>
    <p @click="add">{{$store.state.counter.count}}</p>
    <p @click="asyncAdd">{{count}}</p>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CounterModule from '@/store/CounterModule';

@Component
export default class Test extends Vue {
  get count() {
    return CounterModule.count;
  }
  add() {
    CounterModule.add()
  }
  asyncAdd() {
    CounterModule.asyncAdd();
  }
}
</script>
```


### 装饰器原理
装饰器是工厂函数，它能访问和修改装饰目标

+ 类修饰器
```ts
// 类修饰器表达式会在运行时当做函数被调用，类的构造函数作为其唯一的参数
function Log(fn: any) {
  return function (target: Function)  {
    // target是构造函数
    target.prototype.log = function () {
      fn(this.bar)
    }
  }
}

@Log(console.log)
class Foo {
  bar: 'foo'
}

const foo = new Foo();
// @ts-ignore
foo.log();
```

+ 方法装饰器
```ts
function rec(target: any, name: string, descriptor: any) {
  // 这里通过修改descriptor.value扩展了bar方法
  const baz = descriptor.value;
  descriptor.value = function(val: string) {
    console.log('run method', name);
    baz.call(this, val);
  }
}
class Foo {
  @rec 
  setBar(val: string) {
    this.bar = val;
  }
}
```

+ 属性装饰器
```ts
// 属性装饰器
function mua(param: string = 'mua~~') {
  return function (target, name) {
    target[name] = param;
  }
}
class Foo {
  @mua
  ns!: string;
}

const foo = new Foo();
console.log(foo.ns);
```

### 实战：实现Component装饰器
```vue
<template>
  <div class="AchieveComponent">
    <h1>{{ msg }}</h1>
    <p>
      <input type="text" @keydown.enter="addFeature">
    </p>
    <ul>
      <li v-for="feature in features"
          :class="{selected: feature.selected}"
          :key="feature.id">
        {{feature.name}}
      </li>
      <li>总数：{{count}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Prop, Vue, Emit, Watch} from 'vue-property-decorator';
import Axios from 'axios';

// 类型别名
type Feature = {
  id: number;
  name: string;
}

// 交叉类型
export type FeatureSelect = Feature & {selected: boolean}

function Component(target: any): any {
  const options: any = {};
  const proto = target.prototype;
  const keys = Object.getOwnPropertyNames(proto);
  keys.forEach(key => {
    if (key !== 'constructor') {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        if (typeof desc.value === 'function') {
          const lifeCycle = ['beforeCreated', 'created', 'beforeMounted', 'mounted'];
          if (lifeCycle.includes(key)) {
            options[key] = proto[key];
            // options[key] = desc.value;
          } else {
            const methods = options.methods = options.methods || {};
            methods[key] = desc.value;
          }
        } else if (desc.get || desc.set) {
          const computed = options.computed = options.computed || {};
          computed[key] = {
            get: desc.get,
            set: desc.set,
          }
        }
      }
    }
  });
  options.data = function () {
    const data: any = {};
    const vm = new target();
    Object.keys(vm)
        .filter(key => !key.startsWith('_') && !key.startsWith('$'))
        .forEach(key => {
          data[key] = vm[key];
        })
    return data;
  }

  return Vue.extend(options);
}

@Component
export default class AchieveComponent extends Vue {
  @Prop({type: String, required: true})
  private msg!: string;

  features: FeatureSelect[] = [];

  async created() {
    // this.features = (await getResult<FeatureSelect[]>()).data;
    Axios.get<FeatureSelect[]>('/api/list').then(res => {
      this.features = res.data;
    })
  }

  @Emit()
  addFeature(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    const feature: FeatureSelect = {
      id: this.features.length + 1,
      name: input.value,
      selected: false
    }
    this.features.push(feature);
    input.value = '';
    return feature;
  }

  get count() {
    return this.features.length
  }

  @Watch('features', {
    immediate: true,
    deep: true,
  })
  onFeaturesChange(val: FeatureSelect[], old: FeatureSelect[]) {
    console.log('onFeaturesChange', val.length, old && old.length);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.selected {
  background: #63c68f;
}

a {
  color: #42b983;
}
</style>
```