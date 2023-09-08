---
lang: zh-CN
title: 【07】项目最佳实践
description: 【07】项目最佳实践
---
 
# 目标
+ 项目配置
+ 权限管理
+ 数据mock
+ 测试
 
# 知识点

## 项目配置
### 基础配置：指定应用上下文，端口，vue.config.js

```js
const port = 7070;
module.exports = {
 publicPath: '/best-practice', // 部署应⽤包时的基本 URL
 devServer: {
  port,
 }
};
```

配置webpack：`configureWebpack`

范例设置一个组件存放路径的别名：vue.config.js

```js
const path=require('path')
module.exports = {
 configureWebpack: {
   resolve: {
     alias: {
      comps: path.join(__dirname, 'src/components'),
     }
   }
 }
}
```

范例：设置一个webpack配置项用于页面title，vue.config.js

```js
module.exports = {
 configureWebpack: {
  name: "vue项⽬最佳实践"
 }
};
```

在宿主页面使用loadsh插值语法使用它，`./public/index.html`
```html
<title><%= webpackConfig.name %></title>
```

范例：基于环境有条件地配置，vue.config.js
```js
// 传递⼀个函数给configureWebpack
// 可以直接修改，或返回⼀个⽤于合并的配置对象
configureWebpack: config => {
  config.resolve.alias.comps = path.join(__dirname, 'src/components')
  if (process.env.NODE_ENV === 'development') {
    config.name = 'vue项⽬最佳实践'
  } else {
    config.name = 'Vue Best Practice'
  }
}
```

配置webpack: `chainWebpack`

webpack-chain称为链式操作，可以更细粒度控制webpack内部配置。

范例：svg-icon引入
+ 下载图标，存入src/icons/svg中
+ 安装依赖：svg-sprite-loader, `npm i svg-sprite-loader -D`
+ 修改规则和新增规则，vue.config.js
```js
// resolve定义⼀个绝对路径获取函数
const path = require('path')
function resolve(dir) {
 return path.join(__dirname, dir)
}
//...
chainWebpack(config) {
 // 配置svg规则排除icons⽬录中svg⽂件处理
 // ⽬标给svg规则增加⼀个排除选项exclude:['path/to/icon']
 config.module.rule("svg")
 .exclude.add(resolve("src/icons"))
 
 // 新增icons规则，设置svg-sprite-loader处理icons⽬录中的svg
 config.module.rule('icons')
 .test(/\.svg$/)
 .include.add(resolve('./src/icons')).end()
 .use('svg-sprite-loader')
 .loader('svg-sprite-loader')
 .options({symbolId: 'icon-[name]'})
}
```

+ 使用图标，App.vue
```vue
<template>
 <svg>
 <use xlink:href="#icon-wx" />
 </svg>
</template>
<script>
 import '@/icons/svg/wx.svg'
</script>
```

+ 自动导入

创建icons.index.js
```js
  const req = require.context('./svg', false, /\.svg$/)
  req.keys().map(req);
```
  
创建SvgIcon组件，components/SvgIcon.vue
```vue
<template>
 <svg :class="svgClass" v-on="$listeners">
  <use :xlink:href="iconName" />
 </svg>
</template>
<script>
export default {
 name: 'SvgIcon',
 props: {
   iconClass: {
     type: String,
     required: true
   },
   className: {
     type: String,
     default: ''
   }
 },
 computed: {
   iconName() {
      return `#icon-${this.iconClass}`
   },
   svgClass() {
     if (this.className) {
      return 'svg-icon ' + this.className
     } else {
      return 'svg-icon'
     }
   }
 }
}
</script>
<style scoped>
.svg-icon {
 width: 1em;
 height: 1em;
 vertical-align: -0.15em;
 fill: currentColor;
 overflow: hidden;
}
</style>
```

### 环境变量和模式
如果想给多种环境做不同配置，可以利⽤vue-cli提供的模式。默认`development`、`production`、`test` 三种模式，对应的，它们的配置⽂件形式是 .env.development 。

范例：定义⼀个开发时可⽤的配置项，创建.env.dev

```env
# 只能⽤于服务端
foo=bar
# 可⽤于客户端
VUE_APP_DONG=dong
```

修改mode选项覆盖模式名称，package.json
```json
{
  "serve": "vue-cli-service serve --mode dev"
}
```

## 权限控制

### 路由定义
路由分为两种：
+ constantRoutes ：通⽤路由可直接访问
+ asyncRoutes ：权限路由，需要先登录，获取⻆⾊后才能判断是否可以访问

### 路由守卫
默认路由守卫规则：
+ 已登录访问登录⻚：跳转⾸⻚
+ 已登录访问其他⻚：
  + 已获取⻆⾊：放⾏
  + 未获取⻆⾊：请求⻆⾊ =》过滤可访问路由 =》动态增加到router
+ 未登录访问⽩名单⻚⾯：放⾏
+ 未登录访问其他⻚：跳转⾄登录⻚




## 数据mock
数据模拟两种常见方式，本地mock和线上mock

### 本地mock
在vue.config.js中定义模拟接口
```js
module.exports = {
   devServer: {
     before(app) {
      // 定义接⼝
     }
   }
}
```

### 线上mock
诸如`easy-mock`这类线上mock⼯具优点是使⽤简单，mock⼯具强⼤，还能整合swagger。

#### 环节搭建
+ 线上使用：登录[easy-mock](https://easy-mock.com/)
+ 搭建本地服务（基于docker)
  + 安装[docker-desktop](https://docs.docker.com/desktop/install/mac-install/)
  + 创建docker-compose.yml
  + 启动 `docker-compose up`

#### 使用介绍
+ 创建一个项目
+ 创建需要的接口
登录接口`user/login`

```js
{
 "code": function({_req}) {
   const {username} = _req.body;
   if (username === "admin" || username === "jerry") {
    return 1
   } else {
    return 10008
  }
 }
 "data": function({_req}) {
   const {username} = _req.body;
   if (username === "admin" || username === "jerry") {
     return username
   } else {
    return ''
   }
 }
}
```

用户角色接口 `user/info`

```js
 code: 1,
 "data": function({_req}) {
  return _req.headers['authorization'].split(' ')[1] === 'admin' ? ['admin'] : ['editor']
 }
}
```

+ 调用：修改base_url, .env.development
```js
VUE_APP_BASE_API = 'http://localhost:7300/mock/5f6301c446875b001d8a2961'
```

#### 解决跨越
如果请求的接口在另外一台服务器，开发时则需要设置代理避免跨域问题

代理配置，vue.config.js
```js
{
  devServer: {
    port: port,
      proxy: {
      [process.env.VUE_BASE_API]: {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        pathRewrite: {
          ['^': process.env.VUE_BASE_API]: ''
        }
      }
    }
  }
}
```

### 测试

#### 测试分类
常⻅的开发流程⾥，都有测试⼈员，他们不管内部实现机制，只看最外层的输⼊输出，这种我们称为⿊盒测试。⽐如你写⼀个加法的⻚⾯，会设计N个⽤例，测试加法的正确性，这种测试我们称之为E2E测试。

还有⼀种测试叫做⽩盒测试，我们针对⼀些内部核⼼实现逻辑编写测试代码，称之为单元测试。

更负责⼀些的我们称之为集成测试，就是集合多个测试过的单元⼀起测试。

#### 测试的好处
+ 提供描述组件行为的文档
+ 节省手动测试的时间
+ 减少研发新特性时产生的bug
+ 改进设计
+ 促进重构

#### 准备工作
在vue-cli中，预置了Mocha+Chai和Jest两套单测⽅案，我们的演示代码使⽤Jest，它们语法基本⼀致

1. 新建vue项目时
   1. 选择特性`Unit Testing`和`E2E Testing`
   2. 单元测试解决方案选择`Jest`
2. 在已存在的项目中集成
   1. 集成`Jest`: `vue add @vue/unit-jest`
   2. 集成`cypress`: `vue add @vue/e2e-cypress`

#### 编写单元测试
单元测试（unit testing）,是指软件中的最小可测试单元进行检查和验证

新建`test/unit/aaa.spec.js`，`*.spec.js`是命名规范
```js
function add(num1, num2) {
 return num1 + num2
}
// 测试套件 test suite
describe('add⽅法', () => {
 // 测试⽤例 test case
 it('应该能正确计算加法', () => {
 // 断⾔ assert
 expect(add(1, 3)).toBe(4)
 })
})
```
> 更多[断言API](https://jestjs.io/zh-Hans/docs/expect)

#### 执行单元测试
执行：`npm run test:unit`

#### 测试Vue组件
官方提供了用于单元测试的实用工具库`@vue/test-utils`

检查mounted之后预期效果

使用`mount`或`shallowMount`挂载组件，example.spec.js
```js
import { mount } from '@vue/test-utils'
it('renders props.msg when passed', () => {
 const msg = 'new message'
 // 给组件传递属性 
 const wrapper = shallowMount(HelloWorld, {
  propsData: { msg }
 })
 // expect(wrapper.text()).toMatch(msg)
 // 查找元素
 const h1 = wrapper.find('h1')
 expect(h1.text()).toBe('new message')
})
```

更多操作通常是异步的，dom更新结果放在`await`语句后面测试
```vue
<p class="p1" @click="foo = 'baz'">{{foo}}</p>
```

```js
test('点击p之后验证更新结果 ', async () => {
 const wrapper = shallowMount(HelloWorld)
 // 模拟点击⾏为
 const p1 = wrapper.find('.p1')
 // 把变更状态操作放在await后⾯
 await p1.trigger('click')
 expect(p1.text()).toBe('baz')
})
```

获取自定义组件
```vue
<comp v-if="foo === 'baz'"></comp>
```

```js
components: {
 comp: {
   name: 'comp',
   render(h) {
     return h('div', 'comp')
   }
 },
}
const comp = wrapper.findComponent({name: 'comp'})
expect(comp.exists()).toBe(true)
```

> [vue组件单元测试cookbook](https://v2.cn.vuejs.org/v2/cookbook/unit-testing-vue-components.html)
> 
> [vueTestUtils使用指南](https://v1.test-utils.vuejs.org/zh/)

#### E2E测试
借⽤浏览器的能⼒，站在⽤户测试⼈员的⻆度，输⼊框，点击按钮等，完全模拟⽤户，这个和具体的框架关系不⼤，完全模拟浏览器⾏为。

运行E2E测试：`npm run test:e2e`


