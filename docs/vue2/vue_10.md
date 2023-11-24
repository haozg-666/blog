---
lang: zh-CN
title: 【10】Nuxt3 文档说明
description: 【10】Nuxt3 文档说明
---

# 文档

## 介绍

## 安装

## 配置

## 视图

## 资源

## 样式化

## 路由

## SEO和Meta

## 过渡效果

## 数据获取

## 状态管理

## 错误处理

Nuxt3是一个全栈框架，这意味着在不同的上下文中可能会发生几种无法预防的用户运行时错误：
+ Vue渲染声明周期中的错误（SSR和CSR）
+ Nitro服务器声明中期中的错误（`server/`目录）
+ 服务器和客户端启动错误（SSR和CSR）
+ 下载JS chunk时错误
`SSR代表 Server-Side Rendering，CSR代表 Client-Side Rendering`

### Vue渲染声明周期
1. 可以使用`onErrorCaptured`来捕获Vue错误。
2. Nuxt提供了`Vue:error`钩子，如果有任何错误传播到顶层，将会调用该钩子。
3. 可以通过`vueApp.config.errorHandler`提供一个全局处理程序。它将接收所有的Vue错误，即使这些错误已经被处理。

```ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // 处理错误，例如上报到一个服务
  }

  // 也可以这样
  nuxtApp.hook('vue:error', (error, instance, info) => {
    // 处理错误，例如上报到一个服务
  })
})
```

### 启动错误
如果启动Nuxt应用时出现任何错误，Nuxt将会调用`app:error`钩子。
+ 运行Nuxt插件
+ 处理`app.created`和`app:beforeMount`钩子
+ 将你的Vue应用渲染为HTML(在SSR期间)
+ 挂载应用程序（在客户端），不过应该使用`onErrorCaptured`或`vue:error`来处理这种情况
+ 处理`app:mounted`钩子

### Nitor服务器声明周期
目前无法为这些错误定义一个服务器端处理程序，但可以渲染一个错误页面

### JS chunk错误
由于网络连接故障或新部署（使旧的散列JS chunk URL失效）,你可能会遇到块加载错误。Nuxt提供了内置支持来处理块加载错误，当在路由导航过程中某个块加载错误，它会执行硬刷新。

你可以通过将`experimental.emitRouteChunkError`设置为false(完全禁用对这些错误的处理)或`manual`(手动处理错误)来更改此行为。如果你想手动处理块加载错误，

原生实现可通过监听`router.error()`实现。

### 错误页面

::: warning 当Nuxt遇到致命错误（服务器上的任何未处理的错误，或客户端上使用`fatal: true`创建的错误），它将要么渲染一个JSON响应（如果使用`Accept: application/json`头部请求），要么触发一个全屏错误页面。
:::

在以下情况喜爱，可能会在服务器生命周期中发生错误：
+ 处理Nuxt插件
+ 将你的Vue应用程序渲染为HTML
+ 服务器API路由抛出错误

它也可能在客户端上发生以下情况：
+ 处理Nuxt插件
+ 在改在应用程序之前（`app:beforeMount`钩子）
+ 如果错误没有使用`onErrorCaptured`或`vue:error`钩子进行处理，则在挂载应用程序时
+ 在浏览器中初始化和挂载Vue应用程序（`app:mounted`）

通过在应用程序原目录中添加`~/error.vue`，可以自定义默认错误页面，与`app.vue`放在一起。




## 服务器

## 图层

## 部署

## 测试

