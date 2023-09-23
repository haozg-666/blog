---
lang: zh-CN
title: 【09】ssr-express
description: 【09】ssr-express
---

# 概念
服务端渲染：将vue实例渲染为HTML字符串直接返回，在前端激活为交互程序

# 优点
+ seo
+ 首屏内容到达时间

# 服务端知识 express
```shell
npm i express -S
```

基础http服务
```js
// nodejs代码
const express = require('express');
// 获取express实例
const server = express();
// 编写路由处理不同url请求
server.get('/', (req, res) => {
  res.send('hello world!');
});
// 监听端口
server.listen(80, () => {
  console.log('server running!');
}); 
```

## 基础实现
使用渲染器将vue实例成HTML字符串并返回

安装`vue-server-renderer`
```shell
npm i vue-server-renderer -S
```
> vue vue-server-renderer 的版本要一致

```js
// nodejs代码
const express = require('express');
const Vue = require("vue");
const {createRenderer} = require("vue-server-renderer");
const renderer = createRenderer()
// 获取express实例
const server = express();
// 编写路由处理不同url请求
server.get('/', (req, res) => {
  // 1.创建Vue实例
  const app = new Vue({
    template: `<div @click="onClick">{{msg}}</div>`,
    data() {
      return {msg: 'Hello World! SSR'}
    },
    methods: {
      // 不起作用
      onClick() {
        console.log('onClick', this.msg);
      }
    }
  })
  // 3.用渲染器渲染vue实例
  renderer.renderToString(app).then(html => {
    console.log('html =>', html);
    res.send(html);
  }).catch(err => {
    console.log('err =>', err);
    res.status(500);
    res.end('Internal Server Error, 500 !')
  })
});
// 监听端口
server.listen(80, () => {
  console.log('server running!');
});
```

## 事件激活


# 知识点

## 理解ssr

### 传统web开发
传统web开发，网页内容在服务端渲染完成，一次性传输到浏览器

### 单页应用 Single Page App
单页应用优秀的用户体验，使其逐渐成为主流，页面内容由js渲染出来，这种方式成为客户端渲染。

```sequence
客户端->服务器: 访问url请求
```

```sequence Greetings
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
```

 





