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
 
``` 

