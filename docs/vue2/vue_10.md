---
lang: zh-CN
title: 【10】Nuxt.js 实战
description: 【10】Nuxt.js 实战
---

# Nuxt.js 实战
Nuxt.js是一个基于Vue.js的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js主要关注的是应用的UI渲染。

## nuxt.js的特性
+ 代码分层
+ 服务端渲染
+ 强大的路由功能
+ 静态文件服务
+ ...

## nuxt渲染流程
一个完整的服务器请求到渲染的流程

![](https://v2.nuxt.com/_nuxt/image/de48ca.svg)

## 案例
实现如下功能点
+ 服务端渲染
+ 权限控制
+ 全局状态管理
+ 数据接口管理

## 路由

### 路由生成
pages目录中所有*.vue文件自动生成应用的路由配置，新建：
+ pages/admin.vue 商品管理页
+ pages/login.vue 登录页

### 导航
添加路由导航 layouts/default.vue

