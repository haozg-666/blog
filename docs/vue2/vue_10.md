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

### 新项目

**先决条件**
+ Node.js - `v16.10.0`或更高版本
+ 文本编辑器
+ 终端 - 用于运行Nuxt命令

打开一个终端，并使用以下命令创建一个新的起步项目：
```bash
pnpm dlx nuxi@latest init <project-name>
```

打开项目文件夹：
```bash
code <project-name>
```

安装依赖：
```bash
# 在运行 pnpm install 之前，请确保在 `.npmrc` 中设置了 `shamefully-hoist=true`
pnpm install
```

### 开发服务器
现在你可以以开发模式启动你的Nuxt应用程序了。
```bash
pnpm dev -o
```

### 下一步
现在你可以创建了你的Nuxt3项目，你可以开始构建你的应用程序了。

## 配置

默认情况下，Nuxt已经配置了大多数使用情况。`nuxt.config.ts`文件可以覆盖和扩展此默认配置。

### Nuxt配置
`nuxt.config.ts`文件位于Nuxt项目的根目录，可以覆盖或扩展应用程序的行为。

一个最简配置文件导出了`defineNuxtConfig`函数，函数中包含了一个配置对象。`defuneNuxtConfig`助手函数在全局范围内无需导入即可使用。
```ts
export default defineNuxtConfig({
  // 我的nuxt配置
})
```

通常在文件中会提到此文件，例如添加自定义脚本、注册模块或更改渲染模式。

#### 环境覆盖
你可以在`nuxt.config`中配置完全类型化的环境覆盖。
```ts
export default defineNuxtConfig({
  $production: {
    routeRules: {
      '/**': {isr: true}
    },
    $development: {
      //
    }
  }
})
```

#### 环境变量和私有令牌
`runtimeConfig`API将像环节变量这样的值暴露给应用程序的其余部分。默认情况下，这些键只在服务器端可用。`runtimeConfig.public`中的键也可以在客户端使用。

这些值应该在`nuxt.config`中定义，并可以使用环节变量进行覆盖。

::: code-tabs

@tab nuxt.config.ts

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    // 只在服务器端可用的私有键
    apiSecret: '123',
    // public中的键也可以在客户端使用
    public: {
      apiBase: '/api'
    }
  }
})
```

@tab .env

```bash
# 这将覆盖apiSecret的值
NUXT_API_SECRET=api_secret_token
```

:::

这些变量通过`useRuntimeConfig()`组合函数暴露给应用程序的其余部分。

```vue
<script setup lang="ts">
  const runtimeConfig = useRuntimeConfig();
</script>
```

### 应用程序配置
`app.config.ts`文件位于原目录中（默认为项目的根目录），用于公开在构建时确定的公共变量。与`runtimeConfig`选项不同，这些变量不能使用环节变量进行覆盖。

一个最简配置文件导出了`defineAppConfig`函数，函数中包含了一个配置对象。`defineAppConfig`助手函数在全局范围内无需导入即可使用。

```ts
export default defineAppConfig({
  title: 'Hello Nuxt',
  theme: {
    dark: true,
    colors: {
      primary: '#ff0000'
    }
  }
})
```

这些变量通过`useAppConfig`组合函数暴露给应用程序的其余部分。

```vue
<script setup lang="ts">
  const appConfig = useAppConfig();
</script>
```

### runtimeConfig与appConfig
如上所述，`runtimeConfig`和`app.config`都用于向应用程序的其余部分公开变量。为了确定应该使用其中之一，以下是一些指导原则：
+ `runtimeConfig`：需要在构建后使用环节变量指定的私有或公共令牌。
+ `app.config`：在构建时确定的公共令牌，网站配置（如主题变体、标题）以及不敏感的项目配置等。


|功能           | `runtimeConfig` | `app.config` |
|--------------|-----------------|--------------|
|客户端         | 已注入             | 已打包      |
|环境变量       | ✅ 是             | ❌ 否     |
|响应式         | ✅ 是             | ✅ 是     |
|类型支持       | ✅ 部分            | ✅ 是     |
|每个请求的配置  | ❌ 否             | ✅ 是     |
|热模块替换     | ❌ 否             | ✅ 是     |
|非原始JS类型   | ❌ 否             | ✅ 是     |


### 外部配置文件
Nuxt使用`nuxt.config.ts`文件作为配置的唯一来源，并跳过读取外部配置文件。在构建项目的过程中，你可能需要配置这些文件。下表列出了常见的配置以及如何在Nuxt中配置它们。

| 名称      | 配置文件                  | 如何配置                        |
|---------|-----------------------|-----------------------------|
| Nitro   | ~~`nitro.config.ts`~~ | 在`nuxt.config`中使用`nitro`键   |
| postCss | ~~`postcss.config.ts`~~  | 在`nuxt.config`中使用`postcss`键 |
| Vite    | ~~`vite.config.ts`~~     | 在`nuxt.config`中使用`vite`键    |
| webpack | ~~`webpack.config.ts`~~   | 在`nuxt.config`中使用`webpack`键 |

以下是其他常见配置文件的列表：

| 名称          | 配置文件                 |
|-------------|----------------------|
| TypeScript  | `tsconfig.json`      |
| ESLint      | `.eslintrc.js`       |
| Prettier    | `prettierrc.json`    |
| Stylelint   | `.stylelintrc.json`  |
| TailwindCss | `tailwind.config.js` |
| Vitest      | `vitest.config.ts`   |

### Vue配置

#### 使用Vite
如果你需要传递选项给`@vitejs/plugin-vue`或`@vitejs/plugin-vue-jsx`，你可以在你的`nuxt.config`文件中进行配置。

+ `vite.vue`用于`@vitejs/plugin-vue`。
+ `vite.vueJSx`用于`@vitejs/plugin-vue-jsx`。

```ts
export default deinfeNuxtConfig({
  vite: {
    vue: {
      customElement: true,
    },
    vueJsx: {
      mergeProps: true,
    }
  }
})
```

#### 使用webpack
如果你使用webpack并且需要配置`vue-loader`，你可以在`nuxt.config`文件中使用`webpack.loaders.vue`键进行配置。

```ts
export default defineNuxtConfig({
  webpack: {
    loaders: {
      vue: {
        hotReload: true,
      }
    }
  }
})
```

#### 启用实验性Vue功能
你可能需要在Vue中启用实验性功能，例如`defineModel`或`propsDestructure`。无论你使用哪个构建工具，Nuxt都提供了一种简单的方法在`nuxt.config.ts`中进行配置：

```ts
export default defineNuxtConfig({
  vue: {
    defineModel: true,
    propsDestructure: true,
  }
})
```

## 视图

### `app.vue`
![](https://nuxt.com.cn/assets/docs/getting-started/views/app.svg)

默认情况下，Nuxt将把这个文件视为入口点，并为应用程序的每个路由渲染其内容。

```vue
<template>
  <div>
    <h1>欢迎来到首页</h1>
  </div>
</template>
```

### 组件
![](https://nuxt.com.cn/assets/docs/getting-started/views/components.svg)

大多数组件是可重用的用户界面组件，如按钮和菜单。在Nuxt中，你可以在`components/`目录中创建这些组件，它们将整个应用程序中可用无需显式地导入。

::: code-tabs

@tab app.vue

```vue
<template>
  <div>
    <h1>欢迎来到首页</h1>
    <AppAlert>
      这是一个自动导入的组件。
    </AppAlert>
  </div>
</template>
```

@tab components/AppAlert.vue

```vue
<template>
  <span>
    <slot />
  </span>
</template>
```

:::

### 页面
![](https://nuxt.com.cn/assets/docs/getting-started/views/pages.svg)

页面代表了每个特定路由模式的视图。`pages/`目录中的每个文件都表示一个不同的路由，显示其内容。

要使用页面，创建`pages/index.vue`文件并将`<NuxtPage />`组件添加到`app.vue`（或者删除`app.vue`以使用默认入口）。现在，你可以通过在`pages/`目录中添加新文件来创建更多页面及其对应的路由。

::: code-tabs

@tab pages/index.vue

```vue
<template>
  <div>
    <h1>欢迎来到首页</h1>
    <AppAlert>
      这是一个自动导入的组件。
    </AppAlert>
  </div>
</template>
```

@tab pages/about.vue

```vue
<template>
  <section>
    <p>此页面将显示在 /about 路由。</p>
  </section>
</template>
```

:::

### 布局
![](https://nuxt.com.cn/assets/docs/getting-started/views/layouts.svg)

页面是布局的包装器，包含了多个页面的共同用户界面，如页眉和页脚。布局是使用`<slot />`组件来显示**页面**内容的Vue文件。`layouts/default.vue`文件将被默认使用。自定义布局可以作为页面元数据的一部分进行设置。

::: info 
如果你的应用程序只有一个布局，我们建议使用`app.vue`和`<NuxtPage/>`。
:::

::: code-tabs

@tab layouts/default.vue

```vue
<template>
  <div>
    <AppHeader />
    <slot />
    <AppFooter />
  </div>
</template>
```

@tab pages/index.vue

```vue
<template>
  <h1>欢迎来到首页</h1>
  <AppAlert>
    这是一个自动导入的组件。
  </AppAlert>
</template>
```

@tab pages/about.vue

```vue
<template>
  <section>
    <p>此页面将显示在 /about 路由。</p>
  </section>
</template>
```

:::

### 高级：扩展HTML模板
你可以通过添加一个Nitro插件来完全控制HTML模板，该插件注册一个钩子函数。`render:html`钩子函数的回调函数允许你在将HTML发送到客户端之前对其进行修改。

```ts
import {response} from "express";

export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:html', (html, {event}) => {
    // 这将是HTML模版的对象表示形式。
    console.log(html);
    html.head.push(`<meta name="description" content="My custom description" />`);
  })
  // 你也可以在这里拦截响应
  nitroApp.hooks.hook('render:response', (response, {event}) => {
    console.log(response);
  })
})
```

## 资源

Nuxt使用两个目录来处理样式表、字体或图片资源。

+ `public/`目录中的内容会按原样作为服务器根目录下的公共资源提供。
+ `assets/`目录按约定包含了你希望构建工具（Vite或webpack）处理的所有资源。

### 公共目录
`public/`目录作应用程序的公共服务器，用于存放在应用程序的指定URL下公开访问的静态资源。

你可以通过应用程序的代码或浏览器的根URL`/`获取`public/`目录中的文件。

#### 示例
例如，在`public/img/`目录中引用一个图像文件，该文件可通过静态URL`/img/nuxt.png`访问：

```vue
<template>
  <img src="/img/nuxt.png" alt="">
</template>
```

### 资源目录
Nuxt使用Vite(默认)或webpack来构建和打包你的应用程序。这些构建工具的主要功能是处理JavaScript文件，但它们可以通过插件（对于Vite）或加载器（对于webpack）来处理其他类型的资源，如样式表、字体或SVG。此步骤主要是为了提高性能或缓存目的而对原始文件进行转换（例如样式表的缩小或浏览器缓存失效）。

按照约定，Nuxt使用`assets/`目录来存储这些文件，但该目录没有自动扫描功能，你可以使用任何其他名称。

在应用程序的代码中，你可以通过使用`~/assets/`路径来引用位于`assets/`目录中的文件。

#### 示例
例如，引用一个图像文件，如果构建工具配置为处理该文件扩展名：

```vue
<template>
  <img src="~/assets/img/nuxt.png" alt="">
</template>
```

::: info
Nuxt不会将`assets/`目录中的文件作为静态URL(如`/assets/my-file.png`)提供。如果你需要一个静态URL,请使用`public/`目录。
:::

### 全局样式导入
要在你的Nuxt组件样式中全局插入语句，你可以在`nuxt.config`文件中使用`Vite`选项。

#### 示例
在这个示例中，有一个sass部分文件，其中包含颜色变量，供你的Nuxt页面和组件使用。

::: code-tabs
@tab assets/_colors.scss
```scss
$primary: #49240F;
$secondary: #E4A79D;
```

@tab assets/_colors.sass
```sass
$primary: #49240F
$secondary: #E4A79D
```
:::

在你的`nuxt.config`中

::: code-tabs
@tab SCSS
```ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;'
        }
      }
    }
  }
})
```

@tab SASS
```ts
export default defineNuxtConfig({
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/_colors.sass" as *\n'
        }
      }
    }
  }
})
```
:::

## 样式化

在样式化方面，Nuxt非常灵活。你可以编写自己的样式，或者引用本地和外部样式表。你可以使用CSS预处理器、CSS框架、UI库和Nuxt模块来为你的应用程序添加样式。

### 本地样式表

如果你正在编写本地样式表，讲它们放在`assets/`目录是最自然的位置。

#### 在组件中引入

你可以在页面、布局和组件中直接引入样式表。你可以使用JavaScript的import，或者使用css的`@import`语句。

```vue
<script>
// 使用静态导入以实现服务器端兼容性
import '~/assets/css/first.css'

// 注意：动态导入不兼容服务器端
import('~/assets/css/first.css')
</script>

<style>
@import url("~/assets/css/second.css");
</style>
```

样式表将被内联到Nuxt渲染的HTML中。

#### CSS属性

你还可以使用Nuxt配置中的CSS属性。将你的样式表放在`assets/`目录是最自然的位置。然后你可以引用它的路径，Nuxt将会将它包含在应用程序的所有页面中。

```ts
export default defineNuxtConfig({
  css: ['~/assets/css/main.css']
})
```

样式表将被内嵌到Nuxt渲染的HTML中，全局注入并存在于所有页面中。

#### 使用字体

将本地字体文件放在`~/public/`目录中，例如`~/public/fonts`。然后可以在样式表中使用`url()`引用它们。

```css
@font-face {
  font-family: 'FarAwayGalaxy';
  src: url('/fonts/FarAwayGalaxy.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

然后再样式表、页面或组件中按名称引用你的字体：
```vue
<style>
h1 {
  font-family: 'FarAwayGalaxy', sans-serif;
}
</style>
```

#### 通过NPM分发样式表

你还可以引用通过npm分发的样式表。让我们以流行的`animate.css`库为例。

```bash
npm install animate.css
```

然后你可以直接在页面、布局和组件中引用它：

```vue
<script>
import 'animate.css'
</script>

<style>
@import url("animate.css");
</style>
```

你还可以将该包作为字符串引用到Nuxt配置的css属性中。

```ts
export default defineNuxtConfig({
  css: ['animate.css']
})
```
  
### 外部样式表

你可以通过在nuxt.config文件的head部分添加一个link元素来在应用程序中应用外部样式表。你可以使用不同的方法来实现这个目标。注意，本地样式表也可以以这种方式包含。

你可以通过Nuxt配置的`app.head`属性来修改head:

```ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'
        }
      ]
    }
  }
})
```
 
#### 动态添加样式表

你可以使用`usehead`组合式函数在代码中动态设置head中的值。

```ts
useHead({
  link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }]
})
```

Nuxt在内部使用`unhead`。

#### 使用Nitro插件修改渲染的head

如果你需要更高级的控制，你可以使用hook拦截渲染的html，并以编程方式修改head/

创建一个插件，放在`~/server/plugins/my-plugin.ts`中，像这样：

```ts
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:html', (html) => {
    html.head.push('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css">')
  })
})
```

外部样式表是渲染阻塞资源：它们必须在浏览器渲染页面之前加载和处理。包含过大样式的网页渲染时间更长。

### 使用预处理器

要使用Scss/Sass/less或stylus等预处理器，首先要安装它。

编写样式表的自然位置是`assets`目录。然后，你可以使用你的预处理器的语法在你的`app.vue`（或布局文件）中导入你的源文件。

```vue
<style lang="scss">
  @use "~/assets/scss/main.scss";
</style>
```

或者，你可以使用Nuxt配置的css属性。

```ts
export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss']
})
```

如果你需要再预处理文件中注入代码，比如包含颜色变量的sass部分，你可以使用Vite的preprocessors选项来实现。上文中有示例。

### 单文件组件（SFC）样式化

Vue和SFC的最大优点之一就是在处理样式方面非常好用。你可以直接在组件文件的央视快中编写CSS或预处理器代码，因此你可以拥有出色的开发体验，而无需使用CSS-in-JS等工具。不过，如果你想使用CSS-in-JS，你可以找到支持它的第三方库和模块，比如pinceau。

#### 类和样式绑定

你可以利用Vue SFC的特性，使用`class`和`style`属性为组件添加样式。

::: code-tabs
@tab Ref和Reactive

```vue
<script setup lang="ts">
const isActive = ref(true);
const hasError = ref(false);
const classObject = reactive({
  active: true,
  'text-danger': false
})
</script>

<template>
  <div class="static" :class="{active: isActive, 'text-danger': hasError}"></div>
  <dov :class="classObject"></dov>
</template>
```

@tab Computed

```vue
<script setup lang="ts">
const isActive = ref(true)
const error = ref(null)

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))
</script>

<template>
  <div :class="classObject"></div>
</template>
```

@tab Array

```vue
<script setup lang="ts"> 
const isActive = ref(true)
const errorClass = ref('text-danger')
</script>

<template>
  <div :class="[{ active: isActive }, errorClass]"></div>
</template>
```

@tab Style

```vue
<script setup lang="ts">
const activeColor = ref('red')
const fontSize = ref(30)
const styleObject = reactive({ color: 'red', fontSize: '13px' })
</script>

<template>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  <div :style="[baseStyles, overridingStyles]"></div>
  <div :style="styleObject"></div>
</template>
```
:::

#### 使用v-bind动态样式

你可以在样式块中使用v-bind函数引用JavaScript变量和表达式。绑定将是动态的，这意味着如果变量值发生变化，样式将会更新。

```vue
<script setup lang="ts">
const color = ref("red")
</script>

<template>
  <div class="text">hello</div>
</template>

<style>
.text {
  color: v-bind(color);
}
</style>
```

#### 作用域样式

scoped属性允许你将样式应用于组件内部。使用此属性声明的样式将只适用于该组件。

```vue
<template>
  <div class="example">hi</div>
</template>

<style scoped>
.example {
  color: red;
}
</style>
```

#### CSS模块

你可以使用module属性和CSS Modules。可以使用注入的$style变量访问它。

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

#### 预处理器支持

SFC样式块支持预处理器语法。Vite内置支持`.scss`、`.sass`、`.less`、`.styl`和`.stylus`文件，无需配置，你只需要安装它们，然后在SFC中使用lang属性直接引用它们。


### 使用PostCSS

Nuxt内置了Postcss。你可以在`nuxt.config`文件中配置它。

```ts
export default defineNuxtConfig({
  postcss: {
    plugins: {
      'postcss-nested': {},
      'postcss-custom-media': {}
    }
  }
})
```

为了在SFC中实现正确的语法高亮，你可以使用postcss lang属性。

```vue
<style lang="postcss">
  /* 在这里编写 stylus */
</style>
```

默认情况下，Nuxt已经预配置了以下插件：
+ postcss-import: 改进了`@import`规则
+ postcss-url: 转换`url()`语句
+ autoprefixer: 自动添加产商前缀
+ cssnano: 压缩和清除无用的css

### 利用布局实现多样式

如果你需要完全不同的样式来样式化应用程序的不同部分，你可以使用布局。为不同的布局使用不同的样式。

```vue
<template>
  <div class="default-layout">
    <h1>默认布局</h1>
    <slot />
  </div>
</template>

<style>
.default-layout {
  color: red;
}
</style>
```

### 第三方库和模块

Nuxt在样式化方面没有固定的意见，提供了各种各样的选择。你可以使用任何你想要的样式工具，比如流行的库UnoCSS或Tailwind CSS。

社区和Nuxt团队开发了许多Nuxt模块，以便更轻松的集成，你可以在网站的modules部分发现它们。以下是一些帮助你入门的模块：

+ UnoCSS: 即时按需的原子CSS引擎
+ Tailwind CSS: 实用优先的CSS框架
+ Fontaine: 字体度量回退
+ Pinceau: 使用性样式框架
+ Nuxt UI: 现代Web应用程序的UI库

Nuxt模块为你提供了良好的开发体验，但请记住，如果你喜欢的工具没有一个模块，这并不意味着你不能再Nuxt中使用它！你可以为自己的项目自行配置它。根据工具的不同，你可能需要使用Nuxt插件和/或制作自己的模块。如果你这样做了，请与社区分享！

#### 轻松加载Web字体

你可以使用Nuxt Google Fonts模块来加载Google字体。

如果你正在使用UnoCSS，请注意它附带了一个Web字体预设，方便地从常见提供商加载字体。

### 进阶

#### 过渡效果

Nuxt拥有与Vue相同的`<transition>`元素，并且还支持实验性的View Transitions API。

#### 字体高级优化

我们建议使用Fontaine来减少你的CLS。如果你需要更高级的功能，可以考虑创建一个Nuxt模块来扩展构建过程或Nuxt运行时。

::: info 始终记得利用web生态系统中可用的各种工具和技术，使你的应用程序的样式更加简单高效。无论你是使用原生CSS、预处理器、PostCSS、UI库还是模块，Nuxt都能满足你的需求。祝你样式编写愉快！
:::

#### LCP高级优化

你可以采取以下措施来加快全局CSS文件的下载速度：
+ 使用CDN，让文件物理上更接近你的用户
+ 压缩你的资源，最好使用Brotli
+ 使用HTTP2/HTTP3进行传递
+ 将你的资源托管在同一个域名下（不要使用不同的子域名）

如果你正在使用Cloudflare、Netlify或Vercel等现代平台，大多数情况下这些事情应该会自动完成。 你可以在web.dev上找到一个LCP优化指南。

如果你的所有CSS都由Nuxt内联，你可以（实验性地）完全停止在渲染的HTML中引用外部CSS文件。 你可以通过一个钩子来实现，你可以将它放在一个模块中或者你的Nuxt配置文件中。

```ts
export default defineNuxtConfig({
  hooks: {
    'build:manifest': (manifest) => {
      // 找到应用程序入口的CSS列表
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css
      if (css) {
        // 从数组的末尾开始，向前遍历
        for (let i = css.length - 1; i >= 0; i--) {
          // 如果以'entry'开头，从列表中删除它
          if (css[i].startsWith('entry')) css.splice(i, 1)
        }
      }
    }
  }
})
```

## 路由

Nuxt的核心功能之一是文件系统路由。`pages/`目录中的每个Vue文件都会创建一个相应的URL(或路由)，用于显示文件的内容。通过为每个页面使用动态导入，Nuxt利用代码分割来仅加载所需路由的最小量JavaScript。

### 页面

Nuxt的路由基于`vue-router`，根据`pages/`目录中创建的每个组件的文件名生成路由。

文件系统路由使用命名约定来创建动态和嵌套路由。

::: code-tabs
@tab 目录结构

```bash
| pages/
---| about.vue
---| index.vue
---| posts/
-----| [id].vue
```

@tab 生成的路由文件

```json
{
  "routes": [
    {
      "path": "/about",
      "component": "pages/about.vue"
    },
    {
      "path": "/",
      "component": "pages/index.vue"
    },
    {
      "path": "/posts/:id",
      "component": "pages/posts/[id].vue"
    }
  ]
}
```
:::

### 导航

`<NuxtLink>`组件用于在页面直接创建连接。它会将`<a>`标签渲染为具有`href`属性设置为页面的路由。一旦应用程序被渲染，页面的切换将在JavaScript中进行，通过更新浏览器URL来实现。这样可以避免整页刷新，同时允许实现动画过渡效果。

当`<NuxtLink>`在客户端视口中可见时，Nuxt会自动预取链接页面的组件和负载（生成的页面），从而加快导航速度。

```vue
<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/about">关于</NuxtLink></li>
        <li><NuxtLink to="/posts/1">文章1</NuxtLink></li>
        <li><NuxtLink to="/posts/2">文章2</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>
```

### 路由参数

`useRoute()`组合式函数可在Vue组件的`<script setup>`块或`setup()`方法中使用，以访问当前路由的详细信息。

```vue
<script setup lang="ts">
const route = useRoute()

// 当访问/posts/1时，route.params.id将为1
console.log(route.params.id)
</script>
```

### 路由中间件

Nuxt提供了一个可自定义的路由中间件框架，您可以在应用程序中使用，非常适合提取在导航到特定路由之前要运行的代码。

::: info 路由中间件在Nuxt应用程序的Vue部分中运行。尽管名称相似，但它们与在应用程序的Nitro服务器部分中运行的服务器中间件完全不同。
:::


有三种类型的路由中间件：
1. 匿名（或内联）路由中间件，直接在使用它们的页面中定义。
2. 命名路由中间件，放置在`middleware/`目录中，当在页面中使用时，会通过异步导入自动加载。（注意：路由中间件名称会转换为短横线分隔命名，因此`someMiddleware`会变成`some-middleware`）
3. 全局路由中间件，放置在`middleware/`目录中（使用`.global`后缀），将在每次路由更改时自动运行。

以下是保护`/dashboard`页面的`auth`中间件的示例：

::: code-tabs
@tab middleware/auth.ts
```ts
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated()是一个验证用户是否已经认证的示例方法
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
```
@tab pages/dashboard.vue
```vue
<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <h1>欢迎来到您的仪表盘</h1>
</template>
```
:::

### 路由验证

Nuxt通过每个要验证的页面中的`definePageMeta()`的`validate`属性提供路由验证。

`validate`属性接受route作为参数。您可以返回一个布尔值来确定是否将此路由视为有效路由以渲染此页面。如果返回`false`，并且找不到其他匹配项，这将导致404错误。您还可以直接返回一个带有`statusCode`/`statusMessage`的对象以立即响应错误（其他匹配项将不会被检查）。

如果你有更复杂的用例，可以使用匿名路由中间件代替。

```vue
<script setup lang="ts">
definePageMeta({
  validate: async (route) => {
    // 检查id是否由数字组成
    return /^\d+$/.test(route.params.id)
  }
})
</script>
```

## SEO和Meta

使用强大的头部配置、组合函数和组件来提升你的Nuxt应用的SEO。

### 默认值

Nuxt提供了合理的默认值，如果需要的话，你可以进行覆盖。

```ts
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1'
    }
  }
})
```

在你的`nuxt.config.ts`文件中提供`app.head`属性，可以自定义整个应用的头部。

::: info 该方法不允许你提供响应式数据。我们建议在`app.vue`中使用`useHead()`。
:::

为了使配置更简单，可以使用快捷方式：`charset`和`viewport`。你还可以在类型中提供下面列出的任何键。

### `useHead`

`useHead`组合函数允许你以编程和响应式的方式管理头部标签，它由`Unhead`提供支持。

和所有组合函数一样，它只能在组件的`setup`和生命周期钩子中使用。

```vue
<script setup lang="ts">
useHead({
  title: '我的应用',
  meta: [
    { name: 'description', content: '我的神奇网站。' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})
</script>
```
我们建议查看`useHead`和`useHeadSafe`组合函数。

### `useSeoMeta`

`useSeoMeta`组合函数允许你将站点的SEO元标签定义为一个扁平的对象，并提供完整的TypeScript支持。

这有助于避免拼写错误和常见错误，比如使用`name`而不是`property`。

```vue
<script setup lang="ts">
useSeoMeta({
  title: '我的神奇网站',
  ogTitle: '我的神奇网站',
  description: '这是我的神奇网站，让我来告诉你关于它的一切。',
  ogDescription: '这是我的神奇网站，让我来告诉你关于它的一切。',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

### 组件

Nuxt提供了`<Title>`、`<Base>`、`<NoScript>`、`<Style>`、`<Meta>`、`<Link>`、`<Body>`、`<Html>`和`<Head>`组件，让你可以直接在组件的模板中与元数据进行交互。

由于这些组件名称与原生HTML元素相匹配，在模板中将它们大写非常重要。

`<Head>`和`<Body>`可以接受嵌套的元标签（出于美观的原因），但这对最终HTML中嵌套的元标签的渲染位置没有影响。

```vue
<script setup lang="ts">
  const title = ref('你好，世界')
</script>

<template>
  <div>
    <Head>
      <Title>{{title}}</Title>
      <Meta name="description" :content="title" />
      <Style type="text/css" children="body {background: green;}" />
    </Head>
    <h1>{{title}}</h1>
  </div>
</template>
```

### 类型

下面是用于`useHead`、`app.head`和组件的非响应式类型。

```ts
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  templateParams?: Record<string, string | Record<string, string>>
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[];
  htmlAttrs?: HtmlAttributes;
  bodyAttrs?: BodyAttributes;
}
```

更详细的类型信息请参考 @unhead/schema。

### 功能

#### 响应式

所有属性都支持响应式，包括计算属性、getter和响应式。

建议使用`getter(() => value)`而不是计算属性`computed(() => value)`。

::: code-tabs
@tab useHead
```vue
<script setup lang="ts">
const description = ref('我的神奇网站。')

useHead({
  meta: [
    { name: 'description', content: description }
  ],
})
</script>
```

@tab useSeoMeta
```vue
<script setup lang="ts">
const description = ref('我的神奇网站。')

useSeoMeta({
  description
})
</script>
```

@tab Components
```vue
<script setup lang="ts">
const description = ref('我的神奇网站。')
</script>

<template>
  <div>
    <Meta name="description" :content="description" />
  </div>
</template>
```
:::

#### 标题模板

你可以使用`titleTemplate`选项来提供一个动态模板，以自定义站点的标题，例如在每个页面的标题中添加站点名称。

`titleTemplate`可以是一个字符串，其中`%s`会被标题替换，也可以是一个函数。

如果你想使用一个函数（以获得更多的控制），那么它不能在`nuxt.config`中设置，而是建议在`app.vue`文件中设置，这样它将适用于你站点上的所有页面：

```vue
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 网站名称` : '网站名称';
  }
})
</script>
```

现在，如果你在你站点的另一个页面上使用`useHead`将标题设置为`我的页面`，在浏览器标签中，标题将显示为`我的页面 - 网站名称`。你还可以传递`null`来使用默认的站点标题。

#### Body标签

你可以在适用的标签上使用`tagPosition: 'bodyClose'`选项将它们附件到`<body>`标签的末尾。

例如：

```vue
<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://third-party-script.com',
      // 有效选项为：'head' | 'bodyClose' | 'bodyOpen'
      tagPosition: 'bodyClose'
    }
  ]
})
</script>
```

### 示例

#### 使用`definePageMeta`

在你的`pages/`目录下，你可以使用`definePageMeta`和`useHead`来根据当前路由设置元数据。

例如，你可以先设置当前页面的标题（这是在构建时通过宏提取的，因此不能动态设置）：

```vue
<script setup lang="ts">
definePageMeta({
  title: '某个页面'
})
</script>
```

然后在你的布局文件中，你可以使用之前设置的路由元数据：

```vue
<script setup lang="ts">
const route = useRoute()

useHead({
  meta: [{ property: 'og:title', content: `应用名称 - ${route.meta.title}` }]
})
</script>
```

#### 动态标题

在下面的示例中，`titleTemplate`可以被设置为带有`%s`占位符的字符串，也可以被设置为一个函数，这样可以更灵活地为你的Nuxt应用的每个路由动态设置页面标题：

```vue
<script setup lang="ts">
useHead({
  // 作为字符串，
  // 其中`%s`会被标题替换
  titleTemplate: '%s - 网站标题',
  // ... 或者作为一个函数
  titleTemplate: (productCategory) => {
    return productCategory
      ? `${productCategory} - 网站标题`
      : '网站标题'
  }
})
</script>
```

`nuxt.config`也可以用作设置页面标题的替代方法。然而，`nuxt.config`不允许页面标题是动态的。因此，建议在`app.vue`文件中使用`titleTemplate`来添加动态标题，然后应用于你的Nuxt应用的所有路由。

#### 外部CSS

下面的示例展示了如何使用`useHead`组合式函数的`link`属性或使用`<Link>`组件来启用Google Fonts：

::: code-tabs
@tab useHead
```vue
<script setup lang="ts">
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ]
})
</script>
```

@tab Components
```vue
<template>
  <div>
    <Link rel="preconnect" href="https://fonts.googleapis.com" />
    <Link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" crossorigin="" />
  </div>
</template>
```
:::

## 过渡效果

使用Vue或本地浏览器的视图过渡在页面和布局之间应用过渡效果。

::: info Nuxt利用Vue的Transition组件在页面和布局之间应用过渡效果。
:::

### 页面过渡

你可以启用页面过渡来为所有的页面应用自动过渡效果。

```ts
export default defineNuxtConfig({
  app: {
    pageTansition: {name: 'page', mode: 'out-in'}
  }
})
```

::: info 如果你同时更改布局和页面，这里设置的页面过渡效果将不会运行。相反，你应该设置布局过渡效果。
:::

要开始在页面之间添加过渡效果，请在你的`app.vue`文件中添加以下CSS:

::: code-tabs
@tab app.vue
```vue
<template>
  <NuxtPage />
</template>
<style>
  .page-enter-active,
  .page-leave-active {
    transition: all .4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
</style>
```
@tab pages/index.vue
```vue
<template>
  <div>
    <h1>首页</h1>
    <NuxtLink to="/about">关于页面</NuxtLink>
  </div>
</template>
```
@tab pages/about.vue
```vue
<tempalte>
  <div>
    <h1>关于也， </h1>
    <NuxtLink to="/">首页</NuxtLink>
  </div>
</tempalte>
```
:::

在页面之间导航时，将产生如下结果：

<video controls class="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665061349/nuxt3/nuxt3-page-transitions_umwvmh.jpg">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1665061349/nuxt3/nuxt3-page-transitions_umwvmh.mp4" type="video/mp4">
</video>

要为页面设置不同的过渡效果，请在页面的`definePageMeta`中设置`pageTransition`键：

::: code-tabs
@tab pages/about.vue
```vue
<script setup lang="ts">
  definePageMeta({
    pageTransition: {
      name: 'rotate'
    }
  })
</script>
```
@tab app.vue
```vue
<template>
  <NuxtPage />
</template>

<style>
/* ... */
.rotate-enter-active,
.rotate-leave-active {
  transition: all 0.4s;
}
.rotate-enter-from,
.rotate-leave-to {
  opacity: 0;
  transform: rotate3d(1, 1, 1, 15deg);
}
</style>
```
:::

切换到关于页面时，将添加3D旋转效果：

<video controls class="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665063233/nuxt3/nuxt3-page-transitions-cutom.jpg">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1665063233/nuxt3/nuxt3-page-transitions-cutom.mp4" type="video/mp4">
</video>

### 布局过渡

你可以启用布局过渡来为所有的布局应用自动过渡效果。

```ts
export default defineNuxtConfig({
  app: {
    layoutTramsition: {name: 'layout', mode: 'out-in'}
  }
})
```

要开始在页面和布局之间添加过渡效果，请在你的`app.vue`文件中添加以下CSS:

::: code-tabs
@tab app.vue
```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
```
@tab layouts/default.vue
```vue
<template>
  <div>
    <pre>默认布局</pre>
    <slot />
  </div>
</template>

<style scoped>
div {
  background-color: lightgreen;
}
</style>
```
@tab layouts/orange.vue
```vue
<template>
  <div>
    <pre>橙色布局</pre>
    <slot />
  </div>
</template>

<style scoped>
div {
  background-color: #eebb90;
  padding: 20px;
  height: 100vh;
}
</style>
```
@tab pages/index.vue
```vue
**<template>
  <div>
    <h1>首页</h1>
    <NuxtLink to="/about">关于页面</NuxtLink>
  </div>
</template>
```
@tab pages/about.vue
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'orange'
})
</script>

<template>
  <div>
    <h1>关于页面</h1>
    <NuxtLink to="/">首页</NuxtLink>
  </div>
</template>
```
:::

在页面之间导航时，将产生如下结果：

<video controls class="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665065289/nuxt3/nuxt3-layouts-transitions_c9hwlx.jpg">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1665065289/nuxt3/nuxt3-layouts-transitions_c9hwlx.mp4" type="video/mp4">
</video>

与`pageTransition`类似，你可以使用`definePageMeta`将自定义的`layoutTransition`应用到页面组件：

```vue
<script setup lang="ts">
  definePageMeta({
    layout: 'orange',
    layoutTransition: {
      name: 'slide-in'
    }
  })
</script>
```

### 全局设置

你可以使用`nuxt.config`全局自定义这些默认的过渡效果名称。

`pageTransition`和`layoutTransition`键都接受`transitionProps`作为JSON可序列化的值，你可以通过它传递自定义CSS过渡的`name`、`mode`和其他有效的过渡属性。

```ts
export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in' // 默认值
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in' // 默认值
    }
  }
})
```

::: info 如果你更改了name属性，你还必须响应的重新命名CSS类。
:::

要覆盖全局过渡效果，使用`definePageMeta`为单个Nuxt页面定义页面或布局过渡，并覆盖在`nuxt.config`文件中全局定义的任何页面或布局过渡。

```vue
<script setup lang="ts">
  definePageMeta({
    pageTransition: {
      name: 'bounce',
      mode: 'out-in'
    }
  })
</script>
```

### 禁用过渡效果

可以为特定的路由禁用`pageTransition`和`layoutTransition`：

```vue
<script setup lang="ts">
  definePageMeta({
    pageTransition: false,
    layoutTransition: false
  })
</script>
```

或在`nuxt.config`中全局禁用：

```ts
defineNuxtConfig({
  app: {
    pageTransition: false,
    layoutTransition: false
  }
})
```

### JavaScript钩子

对于高级用例，你可以使用JavaScript钩子为Nuxt页面创建高度动态和自定义的过渡效果。

这种方式非常适合使用FSAP等JavaScript动画库。

```vue
<script setup lang="ts">
  definePageMeta({
    pageTransition: {
      name: 'custom-flip',
      mode: 'out-in',
      onBeforeEnter: (el) => {
        console.log('进入之前...')
      },
      onEnter: (el, done) => {},
      onAfterEnter: (el) => {}
    }
  })
</script>
```

### 动画过渡效果

要使用条件逻辑应用动态过渡效果，你可以利用内联`middleware`将不同的过渡名称分配给`to.meta.pageTransition`。

::: code-tabs
@tab pages/[id].vue
```vue
<script setup lang="ts">
definePageMeta({
  pageTransition: {
    name: 'slide-right',
    mode: 'out-in'
  },
  middleware (to, from) {
    to.meta.pageTransition.name = +to.params.id > +from.params.id ? 'slide-left' : 'slide-right'
  }
})
</script>

<template>
  <h1>#{{ $route.params.id }}</h1>
</template>

<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
```

@tab layouts/default.vue
```vue
<script setup lang="ts">
const route = useRoute()
const id = computed(() => Number(route.params.id || 1))
const prev = computed(() => '/' + (id.value - 1))
const next = computed(() => '/' + (id.value + 1))
</script>

<template>
  <div>
    <slot />
    <div v-if="$route.params.id">
      <NuxtLink :to="prev">⬅️</NuxtLink> |
      <NuxtLink :to="next">➡️</NuxtLink>
    </div>
  </div>
</template>
```

:::

页面现在前往下一个id时应用`slide-left`过渡效果，在前一个id时应用`slide-right`过渡效果：

<video controls class="rounded" poster="https://res.cloudinary.com/nuxt/video/upload/v1665069410/nuxt3/nuxt-dynamic-page-transitions.jpg">
  <source src="https://res.cloudinary.com/nuxt/video/upload/v1665069410/nuxt3/nuxt-dynamic-page-transitions.mp4" type="video/mp4">
</video>

### 使用NuxtPage的过渡效果

当在`app.vue`中使用`<NuxtPage />`时，可以直接将过渡属性作为组件属性传递以激活全局过渡效果。

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'bounce',
        mode: 'out-in'
      }" />
    </NuxtLayout>
  </div>
</template>
```

::: info 请记住，此页面过渡效果无法通过在单个页面上使用definePageMeta来覆盖。
:::

### 视图过渡API(实验性)

nuxt附带了一个实验性的视图过渡API。这是一种令人兴奋的新方法，用于实现本地浏览器过渡效果，它具有在不同页面的相关元素之间进行过渡的能力，以及其他功能。

Nuxt的集成正在积极开发中，但可以通过配置文件中的`experimental.viewTransition`选项启用：

```ts
export default defineNuxtConfig({
  experimental: {
    viewTransition: true
  }
})
```

如果你还使用了类似于`pageTransition`和`layoutTransition`（参见上文）的Vue过渡效果来实现与新的视图过渡API相同的结果，那么你可能希望在用户的浏览器支持较新的本地Web API时_禁用_Vue过渡效果。你可以通过创建`~/middleware/disable-vue-transitions.global.ts`文件并包含以下内容来实现：

```ts
export default defineNuxtRouteMiddleware(to => {
  if (!document.startViewTransition) { return }

  // 禁用内置的Vue过渡效果
  to.meta.pageTransition = false
  to.meta.layoutTransition = false
})
```

#### 已知问题

+ 由于上游Vue的一个[bug](https://github.com/vuejs/core/issues/5513)，视图过渡可能无法按预期工作，特别是在嵌套页面/布局/异步组件中。如果你使用这种模式，你可能需要延迟采用这个实验性功能或自己实现它。非常欢迎您的反馈。
+ 如果在页面设置函数中执行数据获取操作，您可能需要重新考虑暂时不使用此功能。（按设计，视图过渡在进行时完全冻结DOM更新。）我们正在考虑将视图过渡限制在`<Suspense>`解析之前的最后时刻，但在此期间，如果您符合上述情况，您可能需要仔细考虑是否采用此功能。

## 数据获取

## 状态管理
Nuxt提供了强大的状态管理库和useState组合函数，用于创建响应式且适用于SSR的共享状态。

Nuxt提供了`useState`组合函数，用于在组件之间创建响应式且适用于SSR的共享状态。

`useState`是一个适用于SSR的`ref`替代品。它的值将在服务器端渲染后保留（在客户端渲染期间进行hydration`），并通过唯一的键在所有组件之间共享。

::: info 由于useState内部的数据将被序列化为JSON，因此重要的是它不包含无法序列化的内容，比如类、函数或符号。
:::

### 最佳实践
::: warning 
不要在`script setup>`或`setup()`函数之外定义`const state = ref()`。
这样的状态将在所有访问你网站的用户之间共享，并可能导致内存泄漏！
:::

### 示例

#### 基本用法
在这个示例中，我们使用一个组件本地的计数器状态。任何使用`useState('counter')`的其他组件都共享同一个响应式状态。

```vue
<script setup lang="ts">
const counter = useState('counter', () => Math.round(Math.random() * 1000))
</script>

<template>
  <div>
    计数器：{{ counter }}
    <button @click="counter++">
      +
    </button>
    <button @click="counter--">
      -
    </button>
  </div>
</template>
```

要全局失效缓存的状态，请参考`clearNuxtState`工具。

#### 高级用法
在这个示例中，我们使用一个组合函数从HTTP请求头中检测用户的默认语言环境，并将其保存在一个`locale`状态中。

::: code-tabs
@tab composables/locale.ts

```ts
import type { Ref } from 'vue'

export const useLocale = () => {
  return useState<string>('locale', () => useDefaultLocale().value)
}

export const useDefaultLocale = (fallback = 'en-US') => {
  const locale = ref(fallback)
  if (process.server) {    
    const reqLocale = useRequestHeaders()['accept-language']?.split(',')[0]
    if (reqLocale) {
      locale.value = reqLocale
    }
  } else if (process.client) {
    const navLang = navigator.language
    if (navLang) {
      locale.value = navLang
    }
  }
  return locale
}

export const useLocales = () => {
  const locale = useLocale()
  const locales = ref([
    'en-US',
    'en-GB',
    ...
    'ja-JP-u-ca-japanese'
  ])
  if (!locales.value.includes(locale.value)) {
    locales.value.unshift(locale.value)
  }
  return locales
}

export const useLocaleDate = (date: Ref<Date> | Date, locale = useLocale()) => {
  return computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'full' }).format(unref(date)))
}
```

@tab app.vue

```vue
<script setup lang="ts">
const locales = useLocales()
const locale = useLocale()
const date = useLocaleDate(new Date('2016-10-26'))
</script>

<template>
  <div>
    <h1>Nuxt生日</h1>
    <p>{{ date }}</p>    
    <label for="locale-chooser">预览不同的语言环境</label>
    <select id="locale-chooser" v-model="locale">
      <option v-for="locale of locales" :key="locale" :value="locale">
        {{ locale }}
      </option>
    </select>
  </div>
</template>
```
:::

### 共享状态
通过使用自动导入的组合函数，我们可以定义全局类型安全的状态并在整个应用程序中导入它们。

```ts
export const useCounter = () => useState<number>('counter', () => 0)
export const useColor = () => useState<string>('color', () => 'pink')
```

```vue
<script setup lang="ts">
const color = useColor() // 与useState('color')相同
</script>

<template>
  <p>当前颜色：{{ color }}</p>
</template>
```

### 使用第三方库
Nuxt曾经依赖于Vuex库来提供全局状态管理。如果你正在从Nuxt 2迁移，请参阅迁移指南。

Nuxt对状态管理不持有特定观点，所有请根据你的需求选择合适的解决方案。Nuxt与最流行的状态管理库有多种集成方式，包括：
+ pinia - 官方推荐的Vue状态管理库
+ Harlem - 不可变的全局状态管理库
+ XState - 基于状态机的方法，具有可视化和测试状态逻辑的工具

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

::: warning 
当Nuxt遇到致命错误（服务器上的任何未处理的错误，或客户端上使用`fatal: true`创建的错误），它将要么渲染一个JSON响应（如果使用`Accept: application/json`头部请求），要么触发一个全屏错误页面。
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
```bash
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

```bash
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
```bash
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
```bash
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
