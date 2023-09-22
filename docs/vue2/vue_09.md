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