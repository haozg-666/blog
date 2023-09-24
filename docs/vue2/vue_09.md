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

```sequence
客户端->>服务器: 访问url(请求)
Note right of 服务器: 查询数据库，拼接html字符串(模板)
服务器-->>客户端: 给你html(响应)
Note left of 客户端: 渲染html
```

### 单页应用 Single Page App
单页应用优秀的用户体验，使其逐渐成为主流，页面内容由js渲染出来，这种方式成为客户端渲染。

```sequence
客户端->>服务器: 访问url(请求)
Note right of 服务器: 返回html结构
服务器-->>客户端: 给你html(没有dom结构)
Note left of 客户端: 渲染html
Note left of 客户端: 渲染执行js 比如vue.js
Note left of 客户端: 渲染template
客户端->>服务器: 要数据
服务器-->>客户端: 给json
```

打开页面查看源码，浏览器拿到的仅有宿主元素#app,并没有内容。

spa两个问题。
+ 首屏内容到达数据长
+ seo不友好

### 服务端渲染 Server Side Render
ssr解决方案，后端渲染出完整的首屏dom结构返回，前端拿到的内容包括首屏及完整spa结构，应用激活后仍然按照spa方式运行买这种页面渲染方式被称为服务端渲染

```sequence
客户端->>服务器: 访问url(请求)
Note right of 服务器: 读取Vue模板，解析成dom节点
Note right of 服务器: 返回html结构
服务器-->>客户端: 给你html(首屏HTML)
Note left of 客户端: 显示首屏、激活
```

### 路由
路由支持仍然使用vue-router

### 创建路由实例
每次亲故去的url委托给vue-router处理
```js
// 引入vue-router

```

## 同构开发SSR应用
对于同构开发，我们仍然使用webpack打包，我们要解决两个问题：**服务器首屏渲染和客户端渲染**

### 构建流程
目标是生成一个【服务器bundle】用于服务器首屏渲染，和一个【客户端bundle】用于客户端激活。

![](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

### 代码结构
除了两个不同入口之外，其他结构和之前vue应用完全相同。
```
|-- src
    |-- router
    |   |-- index.js #路由声明
    |-- store
    |   |-- index.js #全局状态
    |-- main.js #用于创建vue实例
    |-- entry-client.js #客户端入口，用于静态内容"激活"
    |-- entry-server.js #服务端入口，用于首屏内容渲染
```

### 路由配置
创建 src/router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import abortView from '../views/AboutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: abortView
  }
]

// 返回一个工厂函数，它可以创建路由实例
export default function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes
  })
}
```

### 主文件
跟之前不同，主文件是负责创建vue实例的工厂，每次请求均会有独立的vue实例创建。创建main.js

```js
import Vue from 'vue'
import App from './App.vue'
import createRouter from './router'

Vue.config.productionTip = false

// 需要返回一个应用程序工厂, 返回Vue实例和Router实例、 Store实例
export default function createApp(context) {
  // 处理首屏，就要先处理路由跳转
  const router = createRouter();
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  })
  return {app, router};
}
```

### 服务器入口
上面的bundle就是webpack打包的服务器bundle，我们需要编写服务端入口文件 src/entry-server.js

它的任务是创建Vue实例并根据传入url指定首屏
```js
import createApp from "@/main";

// 用于首屏渲染
// context由renderer传入
export default context => {
  return new Promise((resolve, reject) => {
    // 获取路由器和app实例
    const {app, router} = createApp();
    // 获取首屏地址
    router.push(context.url);
    router.onReady(() => {
      resolve(app);
    }, reject);
  })
};
```

### 客户端入口
客户端入口只需创建vue实例并执行挂载，这一步称为激活。创建entry-client.js

```js
import createApp from "@/main";

// 客户端激活
const {app, router} = createApp();

router.onReady(() => {
  // 挂载激活
  app.$mount('#app');
});
```

### webpack配置

安装依赖
```shell
npm install webpack-node-externals loadsh.merge -D
```

具体配置，vue.config.js
```js
const { defineConfig } = require('@vue/cli-service');
// 两个插件分别负责打包客户端和服务端
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const merge = require("lodash.merge");
// 根据传入环境变量决定入口文件和相应配置项
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: false
  },
  outputDir: './dist/'+target,
  configureWebpack: () => ({
    // 将 entry 指向应用程序的 server / client 文件
    entry: `./src/entry-${target}.js`,
    // 对 bundle renderer 提供 source map 支持
    devtool: 'source-map',
    // target设置为node使webpack以Node适用的方式处理动态导入，
    // 并且还会在编译Vue组件时告知`vue-loader`输出面向服务器代码。
    target: TARGET_NODE ? "node" : "web",
    // 是否模拟node全局变量
    node: TARGET_NODE ? undefined : false,
    output: {
      // 此处使用Node风格导出模块
      libraryTarget: TARGET_NODE ? "commonjs2" : undefined
    },
    // https://webpack.js.org/configuration/externals/#function
    // https://github.com/liady/webpack-node-externals
    // 外置化应用程序依赖模块。可以使服务器构建速度更快，并生成较小的打包文件。
    externals: TARGET_NODE
      ? nodeExternals({
        // 不要外置化webpack需要处理的依赖模块。
        // 可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 还应该将修改`global`（例如polyfill）的依赖模块列入白名单
        allowlist: [/\.css$/]
      })
      : undefined,
    optimization: {
      splitChunks: undefined
    },
    // 这是将服务器的整个输出构建为单个 JSON 文件的插件。
    // 服务端默认文件名为 `vue-ssr-server-bundle.json`
    // 客户端默认文件名为 `vue-ssr-client-manifest.json`。
    plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
  }),
  chainWebpack: config => {
    // cli4项目添加
    if (TARGET_NODE) {
      config.optimization.delete('splitChunks')
    }

    config.module
      .rule("vue")
      .use("vue-loader")
      .tap(options => {
        merge(options, {
          optimizeSSR: false
        });
      });
  }
})
```

### 脚本配置

安装依赖
```shell
npm i cross-env -D
```

定义创建脚本，package.json
```json
{
  "scripts": {
    "build": "npm run build:server & npm run build:client",
    "build:client": "vue-cli-service build",
    "build:server": "cross-env WEBPACK_TARGET=node vue-cli-service build"
  }
}
```
> 执行打包：npm run build

### 宿主文件
最后需要定义宿主文件，修改 public/index.html
```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>SSR</title>
  </head>
  <body>
    <!--vue-ssr-outlet-->
  </body>
</html>
```

### 服务器启动文件
修改服务器启动文件，现在需要处理所有路由。 server/04-ssr.js

```js
// nodejs代码
const express = require('express');
const fs = require('fs');
const path = require('path');
const {createBundleRenderer} = require("vue-server-renderer");

// 获取express实例
const server = express();

// 获取文件绝对路径
const resolve = dir => path.resolve(__dirname, dir)

// 第 1 步：开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
server.use(express.static(resolve('../dist/client'), {index: false}))

// 获取渲染器
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json");
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template: fs.readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
  clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})

// 编写路由处理不同url请求
server.get('*', (req, res) => {
  // 用渲染器渲染vue实例
  const context = {url: req.url};
  renderer.renderToString(context).then(html => {
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



