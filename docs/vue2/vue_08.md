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
## 新建一个基于ts的vue项目 
```bash
vue create hello-world
```

## 在已存在项目中安装typescript 
```bash
vue add @vue/typescript
```

## ts特点
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

