---
lang: zh-CN
title: 【07】项目最佳实践
description: 【07】项目最佳实践
---
 
# 目标
+ 项目配置
+ 权限管理
+ 导航菜单
+ 数据mock
+ 测试
 
# 知识点
   
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