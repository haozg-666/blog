---
lang: zh-CN
title: 【10】Nuxt3 文档说明
description: 【10】Nuxt3 文档说明
---

# 文档

## 介绍

Nuxt是一个免费且开源的创建，它提供了一种直观且可扩展的方式来创建类型安全、高性能和生产级别的全栈Web应用和网站，使用的是Vue.js。

我们做了一切，让你从一开始就可以编写`.vue`文件，同时在开发中享受到热模块替换的便利，并在生产中获得高性能的应用，其中默认启用了服务器端渲染。

Nuxt没有供应商锁定，允许你将应用部署到任何地方、甚至是边缘。

### 自动化和约定
Nuxt使用约定和一套规范的目录结构来自动化重复的任务，让开发者可以专注于推动功能的开发。配置文件仍然可以自定义和覆盖其默认行为。

+ **基于文件的路由**：根据pages/目录的结构定义结构。这样可以更容易地组织应用程序，避免手动配置路由的需要。
+ **代码分割**：Nuxt自动将代码拆分成较小的块，这有助于减少应用程序的初始加载时间。
+ **内置服务器端渲染**：Nuxt具备内置的服务器端渲染能力，因此你不需要自己设置单独的服务器。
+ **自动导入**：在各自的目录中编写Vue组件和可组合函数，并在使用时无需手动导入，享受树摇和优化JS捆绑包的好处。
+ **数据获取工具**：Nuxt提供了可用于处理于服务器端渲染兼容的数据获取的可组合函数，以及不同的策略。
+ **零配置的TypeScript支持**：可以编写类型安全的代码，无需学习TypeScript，因为我们提供了自动生成的类型和`tsconfig.json`配置文件。
+ **配置好的构建工具**：我们默认使用Vite来支持开发中的热模块替换（HMR)，以及在生产中将代码打包成符合最佳实践的形式。

Nuxt负责处理这些事情，并提供前端和后端的能力，让你可以专注于创建你的Web应用。

### 服务器端渲染
Nuxt默认具备内置的服务器端渲染（SSR）能力，无需自己配置服务器，这对于Web应用有许多好处：

+ **更快的初始页面加载时间**：Nuxt向浏览器发送完全渲染的HTML页面，可以立即展示。这可以提供更快的页面加载时间和更好的用户体验（UX），特别是在网络或设备较慢的情况下。
+ **改善SEO**：搜索引擎可以更好地索引SSR页面，因为HTML内容立即可用，而不需要依赖JavaScript在客户端渲染内容。
+ **在低功率设备上更好的性能**：减少了需要再客户端下载和执行的JavaScript量，这对于处理重型JavaScript应用程序可能有困难得低功率设备非常有益。
+ **更好的可访问性**：内容在初始页面加载时立即可用，改善了依赖屏幕阅读器或其他辅助技术的用户的可访问性。
+ **更容易得缓存**：页面可以在服务器端缓存，这可以通过减少生成和发送内容所需的时间而进一步提高性能。

总体而言，服务器端渲染可以提供更快更高效的用户体验，同时改善搜索引擎优化和可访问性。

由于Nuxt是一个多功能的框架，它允许你将整个应用程序静态渲染为静态托管，使用`nuxt generate`进行部署，通过`ssr: false`选项在全局禁用SSR，或通过设置`routeRules`选项来实现混合渲染。

#### 服务器引擎
Nuxt的服务器引擎Nitro开启了全新的全栈能力。

在开发中，它使用`Rollup`和`Node.js`工作线程来处理你的服务器代码和上下文隔离。它还通过读取`server/api/`中的文件生成你的服务器API，以及读取`server/middleware/`中的文件生成服务器中间件。

在生产中，Nitro将你的应用程序和服务器构建为一个通用的`.output`目录。这个输出所轻量级的；经过压缩，并且不包含任何Node.js模块（处理polyfills）。你可以将此输出部署到支持JavaScript的任何系统上，包括Node.js，无服务器（Serverless），Worders，边缘渲染或纯静态环境。

#### 生产就绪
Nuxt应用程序可以部署到`Node`或`Deno`服务器上，预渲染以在静态环境中托管，或部署到无服务器和边缘提供商。

#### 模块化
Nuxt的模块系统允许你扩展Nuxt以添加自定义功能和与第三方服务的集成。

#### 架构
Nuxt由不同的核心包组成：
+ 核心引擎：`nuxt`
+ 打包工具：`@nuxt/vite-builder`和`@nuxt/webpack-builder`
+ 命令行界面：`nuxi`
+ 服务器引擎：`nitro`
+ 开发工具包：`@nuxt/kit`
+ Nuxt2桥接：`@nuxt/bridge`

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

Nuxt的服务器使用的是`Nitro`。Nitro最初所为Nuxt创建的，但现在是UnJS的一部分，也被其他创建使用，甚至可以单独使用。

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
Nuxt提供了一个强大的系统，允许你扩展默认的文件、配置等。

Nuxt3的核心功能之一就是图层和扩展支持。你可以扩展默认的Nuxt应用程序，以便重组组件、工具和配置。图层结构几乎与标准的Nuxt应用程序相同，这使得它们易于编写和维护。

### 使用场景
+ 使用`nuxt.config`和`app.config`在项目之间共享可重用的配置预设
+ 使用`components/`目录创建组件库
+ 使用`composables/`和`utils/`目录创建实用工具和可组合库
+ 创建Nuxt模块预设
+ 在项目之间共享标准设置
+ 创建Nuxt主题

### 使用方法

你可以通过在`nuxt.config.ts`文件中添加`extends`属性来扩展一个图层。

```ts
export default defineNuxtConfig({
  extends: [
    // 从本地图层扩展
    '../base',
    // 从已安装的npm包扩展
    '@my-themes/awesome',
    // 从git仓库扩展
    'github:my-themes/awwsome#v1'
  ]
})
```

## 部署

Nuxt应用可以部署在Node.js服务器上，预渲染以进行静态托管，或部署到无服务器或边缘（CDN）环境中。

### Node.js服务器

使用Nitro中的Node.js服务器预设可以在任何Node托管上部署。
+ **默认输出格式**，如果没有指定或自动检测
+ 仅加载渲染请求所需的块，以获得最佳的冷启动时间
+ 适用于将Nuxt应用部署到任何Node.js托管上

#### 入口点
使用Node服务器预设运行`Nuxt build`后，将得到一个启动准备就绪的Node服务器的入口点。
```shell
node .output/server/index.mjs
```

这将启动你的生产Nuxt服务器，默认监听端口为3000。

它会遵循以下运行时环节变量：
+ `NITRO_PORT`或`PORT`（默认为`3000`）
+ `NITRO_HOST`或`HOST`（默认为`0.0.0.0`）
+ `NITRO_SSL_CERT`或`BITRO_SSL_KEY`-如果两者都存在，则会以HTTPS模式启动服务器。在绝大多数情况下，除了测试之外，不应该使用这个选项，Nitro服务器应该在像nginx或Cloudflare这样的反向代理后面运行，由它们终止SSL。

#### PM2
要使用`pm2`，请使用`ecosystem.config.js`文件：

```js
module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
```

#### 集群模式

你可以使用`NITRO_PRESET=node_cluster`来利用Node.js的cluster模块来提高多进程性能。

默认情况下，工作负载会使用轮询策略分发给工作进程。

### 静态托管

有两种方式可以将Nuxt应用部署到任何静态托管服务上：
+ 使用`ssr:true`进行静态站点生成（SSG）,在构建时预渲染应用程序的路由（这是运行`nuxi generate`时的默认行为）。它还会生成`/200.html`和`/400.html`单页面应用回退页面，这些页面可以在客户端上渲染动态路由或404错误（尽管您可能需要在静态主机上进行配置）
+ 或者，你可以使用`ssr:false`进行预渲染（静态单页面应用）。这将产生带有空的`<div id="__nuxt"></div>`的HTML页面，通常用于渲染Vue应用的位置。你会失去许多预渲染站点的SEO优势，因此建议使用`<ClientOnly>`来包装无法在服务器端渲染的站点部分（如果有的话）。

#### 基于爬虫的预渲染
使用`nuxi generate`命令使用Nitro爬虫构建和预渲染应用程序。这个命令类似于将`nuxt build`运行时的`nitro.static`选项设置为`true`，或者运行`nuxt build --prerender`。

```shell
npx nuxi generate
```

现在可以将`.output/public`目录部署到任何静态托管服务上，或者使用`npx serve .output/public`在本地预览。

Nitro爬虫的工作原理：
1. 加载应用程序的根路由（`/`）的HTML、`~/pages`目录中的任何非动态页面以及`nitro.prerender.routes`数组中的其他路由。
2. 将HTML和`payload.json`保存到`~/.output/public/`目录，以进行静态服务。
3. 查找HTML中的所有锚点标签（`<a href=""`）以导航到其他路由。
4. 对每个找到的锚点标签重复步骤1-3，直到没有更多的锚点标签可以爬取。

这一点很重要，因为没有连接到可发现页面的页面无法自动预渲染。

#### 选择性预渲染
你可以手动指定Nitro将在构建期间获取和预渲染的路由，或者忽略不想预渲染的路由，比如在`nuxt.config`文件中的`/dynamic`路由：

```ts
defineNuxtConfig({
  nitro: {
    prerender: {
      routes: ['/user/1', 'user/2'],
      ignore: ['/dynamic']
    }
  }
})
```

你可以将此与`crawLinks`选项结合使用，以预渲染一组爬虫无法发现的路由，比如你的`/sitemap.xml`或`/robots.txt`：

```ts
defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt']
    }
  }
})
```

将`nitro.prerender`设置为true类似于将`nitro.prerender.crawlLinks`设置为true。

#### 仅客户端渲染
如果你不想预渲染你的路由，另一种使用静态托管的方式是在`nuxt.config`文件中将ssr属性设置为false。`nuxi generate`命令将输出一个`.output/public/index.html`入口点和类似经典客户端端Vue.js应用程序的JavaScript捆绑包。

```ts
defineNuxtConfig({
  ssr: false
})
```

### 预设
除了Node.js服务器和静态托管服务之外，Nuxt3 项目还可以使用几个经过充分测试的预设进行部署，并进行最少的配置。

你可以在`nuxt.config`文件中明确设置所需的预设：
```ts
export default {
  nitro: {
    preset: 'node-server'
  }
}
```

或者在运行`nuxt build`时使用`NITRO_PRESET`环境变量：
```shell
NITRO_PRESET=node-server nuxt build
```

### CDN代理
在大多数情况下，Nuxt可以与不由Nuxt自身生成或创建的第三方内容一起工作，但有时这样的内容可能会引起问题，尤其是Cloudflare 的“Minification and Security Options”。

因此，你应该确保在 Cloudflare 中取消选中 / 禁用以下选项。否则，不必要的重新渲染或水合错误可能会影响你的生产应用程序。
1. 速度 > 优化 > 自动缩小：取消选中 JavaScript、CSS 和 HTML
2. 速度 > 优化 > 禁用 "Rocket Loader™"
3. 速度 > 优化 > 禁用 "Mirage"
4. Scrape Shield > 禁用 "Email Address Obfuscation"
5. Scrape Shield > 禁用 "Server-side Excludes"

通过这些设置，你可以确保 Cloudflare 不会向你的 Nuxt 应用程序注入可能引起不必要副作用的脚本。

## 测试
在Nuxt3中，我们有一个重写版本的`@nuxt/test-utils`。我们支持Vitest和Jest作为测试运行器。

### 安装
```shell
pnpm add --dev @nuxt/test-utils vitest
```

### 设置
在每个使用`@nuxt/test-utils`辅助方法的`describe`块中，你需要在开始之前设置测试上下文。

```ts
import {describe, test} from 'vitest';
import {setup, $fetch} from '@nuxt/test-utils';

describe('我的测试', async () => {
  await setup({
    // 测试上下文选项
  })
  
  test('我的测试', () => {
    // ...
  })
})
```

在幕后，`setup`在`beforeAll`、`beforeEach`、`afterEach`和`afterAll`中执行一系列任务，以正确设置Nuxt测试环境。

请参阅下面的选项以了解`setup`方法。

#### Nuxt配置
+ `rootDir`：Nuxt应用所在目录的路径。
  + 类型：`string`
  + 默认值：`'.'`
+ `configFile`：配置文件的名称
  + 类型：`string`
  + 默认值：`'nuxt.config'`

#### 时间设置
+ `setupTime`：允许`setupTest`完成其工作的时间（可能包括构建或生成Nuxt应用程序的文件，取决于传递的选项）。
  + 类型：`number`
  + 默认值：`60000`

#### 功能
+ `server`：是否启动一个服务器来响应测试套件中的请求。
  + 类型：`boolean`
  + 默认值: `true`
+ `port`：如果提供，将启动的测试服务器端口设置为该值。
  + 类型：`number | undefined`
  + 默认值: `undefined`
+ `build`：是否运行单独的构建步骤。
  + 类型：`boolean`
  + 默认值: `true`(如果`browser`或`server`被禁用，则为false)
+ `browser`：在幕后，Nuxt测试工具使用`playwright`进行浏览器测试。如果设置了此选项，将会启动一个浏览器，并且可以在后续的测试套件中进行控制。
  + 类型：`boolean`
  + 默认值: `false`
+ `browserOptions`：
  + 类型：具有以下属性的`object`
    + `type`：要启动的浏览器类型，可以是`chromium`、`firefox`或`webkit`
    + `launch`：在启动浏览器时将传递给`playwright`的选项对象。
+ `runner`：指定测试套件的运行期。目前推荐使用Vitest。
  + 类型：`'vitest' | 'jest'`
  + 默认值: `vitest`

### API

#### `$fetch(url)`

获取服务器渲染页面的HTML。

```js
import {$fetch} from '@nuxt/test-utils';
const html = await $fetch('/');
```

#### `fetch(url)`

获取服务器渲染页面的响应。

```js
import {fetch} from '@nuxt/test-utils';
const res = await fetch('/');
const {body, headers} = res;
```

#### `url(path)`

获取给定页面的完整URL(包括测试服务器运行的端口)。

```js
import {url} from '@nuxt/test-utils';
const pageUrl = url('/page');
```
