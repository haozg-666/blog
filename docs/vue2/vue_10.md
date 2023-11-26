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
+ Nitro服务器生命周期中的错误（`server/`目录）
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

### Nitor服务器生命周期
目前无法为这些错误定义一个服务器端处理程序，但可以渲染一个错误页面

### 启动错误
如果启动Nuxt应用时出现任何错误，Nuxt将会调用`app:error`钩子。
+ 运行Nuxt插件
+ 处理`app.created`和`app:beforeMount`钩子
+ 将你的Vue应用渲染为HTML(在SSR期间)
+ 挂载应用程序（在客户端），不过应该使用`onErrorCaptured`或`vue:error`来处理这种情况
+ 处理`app:mounted`钩子

### JS chunk错误
由于网络连接故障或新部署（使旧的散列JS chunk URL失效）,你可能会遇到块加载错误。Nuxt提供了内置支持来处理块加载错误，当在路由导航过程中某个块加载错误，它会执行硬刷新。

你可以通过将`experimental.emitRouteChunkError`设置为false(完全禁用对这些错误的处理)或`manual`(手动处理错误)来更改此行为。如果你想手动处理块加载错误，

原生实现可通过监听`router.error()`实现。

### 错误页面

::: warning 当Nuxt遇到致命错误（服务器上的任何未处理的错误，或客户端上使用`fatal: true`创建的错误），它将要么渲染一个JSON响应（如果使用`Accept: application/json`头部请求），要么触发一个全屏错误页面。
:::

在以下情况下，可能会在服务器生命周期中发生错误：
+ 处理Nuxt插件
+ 将你的Vue应用程序渲染为HTML
+ 服务器API路由抛出错误

它也可能在客户端上发生以下情况：
+ 处理Nuxt插件
+ 在挂载应用程序之前（`app:beforeMount`钩子）
+ 如果错误没有使用`onErrorCaptured`或`vue:error`钩子进行处理，则在挂载应用程序时
+ 在浏览器中初始化和挂载Vue应用程序（`app:mounted`）

通过在应用程序原目录中添加`~/error.vue`，可以自定义默认错误页面，与`app.vue`放在一起。

尽管它被称为“错误页面”，但它不是一个路由，不应该放在`~/pages`目录中。出于同样的原因，你不应该在此页面中使用`definePageMeta`。

错误页面有一个单一的prop-`error`，其中包含一个待处理的错误。

error对象提供以下字段：
```ts
{
  url: string
  statusCode: number
  statusMessage: string
  message: string
  description: string
  data: any
}
```

如果你有一个带有自定义字段的错误，它们将会丢失；你应该将它们分配给`data`：
```ts
throw createError({
  status: 404,
  statusMessage: 'page Not Found',
  data: {
    myCustomField: true
  }
})
```

对于自定义错误，我们强烈建议使用`onErrorCaptured`组合式，它可以在页面/组件设置函数中调用，或者使用`vue:error`运行时的Nuxt钩子，可以在Nuxt插件中进行设置。

```ts
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('vue:error', (err) => {
    //
  })
})
```

当你准备移除错误页面时，你可以调用`clearError`辅助函数，它接受一个可选的路径进行重定向（例如，如果你想导航到一个“安全”的页面）。

### 错误工具

#### `useError`

```ts
function useError (): Ref<Error | (url, statusCode, statusMessage, message, description, data }>
```

从函数将返回正在处理的全局Nuxt错误。

#### `createError`

```ts
function createError(err: {cause, data, message, name, stack, statusCode, statusMessage, fatal}) : Error
```

使用附加元数据创建错误对象。它可以在你的应用程序中的vue和服务器部分中使用，并且意在被抛出。

如果你抛出使用`createError`创建的错误：
+ 在服务器端，它将触发一个全屏错误页面，你可以使用`clearError`清除该错误。
+ 在客户端，它将抛出一个非致命错误供你处理。如果你需要触发一个全屏错误页面，你可以通过设置`fatal: true`来实现。

```vue
<script setup lang="ts">
  const route = useRoute();
  const {data} = await useFetch(`/api/movies/${route.params.slug}`);
  if (!data.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'page Not Found'
    })
  }
</script>
```

#### `showError`
```ts
function showError (err: string | Error | {statusCode, statusMessage}): Error
```

你可以在客户端的任何地方调用此函数，或者（在服务器端）直接在中间件、插件或`setup()`函数中使用。它将触发一个全屏错误页面，你可以使用`clearError`清除该错误。

建议使用`throw createError()`。

#### `clearError`

```ts
function clearError (options?: {redirect?: string}) : Promise<void>
```

此函数将清除当前正在处理的Nuxt错误。它还接受一个可选的路径进行重定向（例如，如果你想导航到一个“安全”的页面）。

### 在组件中渲染错误

Nuxt还提供了一个`<NuxtErrorBoundary>`组件，运行你在应用程序中处理客户端错误，而无需用错误页面替换整个站点。

该组件负责处理其默认插槽中发生的错误。在客户端上，它将阻止错误冒泡到顶层，并渲染`#error`插槽。

`#error`插槽将接收`error`作为prop。（如果你设置`error=null`，它将触发重新渲染默认插槽；你需要确保错误已经完全解决，否则错误插槽将被再次渲染。

```vue
<template>
  <NuxtErrorBoundary @error="someErrorLogger">
    <template #error="{error, clearError}">
      {{error}}
      <button @click="clearError">
        这将清除错误
      </button>
    </template>
  </NuxtErrorBoundary>
</template>
```

## 服务器
从单一代码库中构建全栈应用程序，从数据库获取数据，创建API，甚至生成静态的服务器端内容，如站点地图或RSS订阅源。

Nuxt的服务器框架允许你构建**全栈应用程序**。例如，你可以从数据库或其他服务器获取内容，创建API，甚至生成静态的服务器端内容，如站点地图或RSS订阅源 - 一切都可以从单一代码库中完成。

### 有Nitro驱动

Nuxt的服务器使用的是`Nitro`。Nitro最初所为Nuxt创建的，但现在所UnJS的一部分，也被其他创建使用，甚至可以单独使用。

使用Nitro基于Nuxt超能力：
+ 对应用程序的服务器端部分拥有完全控制权
+ 对任何提供者上进行通用部署（许多无需配置）
+ 混合渲染

### 对应用程序的服务器端部分拥有完全控制权

使用Nitro,你可以轻松管理Nuxt应用程序的服务器部分，从API端点到中间件，

端点和中间件可以像这样定义：

```ts
export default defineEventHandler(async event => {
  // ...在这里可以做任何你想做的事情
})
```

你可以直接返回`text`、`json`、`html`甚至`stream`。

Nitro默认支持**热模块替换**和**自动导入**，就像Nuxt应用程序的其他部分一样。

### 通用部署
Nitro提供了在任何地方部署Nuxt应用程序的能力，从裸机服务器到边缘网络，启动时间仅为几毫秒。

### 混合渲染

你的Nuxt应用程序是否需要静态和动态页面？Nitro为你提供支持！

Nitro有一个强大的功能叫做`routeRules`，它允许你定义一组规则来自定义Nuxt应用程序的每个路由的渲染方式（以及更多）。

```ts
export default defineNuxtConfig({
  routeRules: {
    // 为了SEO目的，在构建时生成
    '/': {prerender: true},
    // 缓存1小时
    '/api/*': {cache: {maxAge: 60 * 60}},
    // 重定向以避免404
    '/old-page': {
      redirect: {to: {'/new-page', statusCOde: 302}}
    }
  }
})
```

此外，还有一些路由规则（例如ssr和experimentalNoScripts）不是Nuxt特定的，用于改变渲染页面为HTML时的行为。

一些路由规则（redirect和prerender）也会影响客户端行为。

Nitro用于构建具有服务器端渲染和预渲染功能的应用程序。

## 图层

## 部署

## 测试

