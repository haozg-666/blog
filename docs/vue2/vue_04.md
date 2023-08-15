---
lang: zh-CN
title: 【04】组件化原理和手写vue2
description: 【04】组件化原理和手写vue2
---

# 目标
+ 组件化原理
+ 手写vue2

## 组件化机制

### 组件声明：Vue.component()

initAssetRegisters(Vue) `src/cord/global-api/assets.js`

组件注册使用extend方法将配置转换为构造函数并添加到components选项
+ 全局声明 Vue.component()
+ 局部声明 components:{}

### 组件实例创建和挂载
观察生成的渲染函数
```js
"with(this){return _c('div',{attrs:{"id":"demo"}},[
 _c('h1',[_v("虚拟DOM")]),_v(" "),
 _c('p',[_v(_s(foo))]),_v(" "),
 _c('comp') // 对于组件的处理并⽆特殊之处
],1)}"
```

**整体流程**

首先创建的是根实例，首次_render()时，会得到整棵树的VNode结构，其中自定义组件相关的主要有：createComponent()

组件VNode创建

**createComponent()**

创建组件实例并挂载，VNode转换为dom

整体流程：new Vue() -> $mount() -> vm_render() -> createElement() -> createComponent() -> vm._update() -> patch() -> createEle() -> createComponent()

**创建组件VNode**

_createElement实际执行VNode创建的函数，由于传入tag是非保留标签，因此判定为自定义组件通过createComponent去创建

createComponent创建VNode，保存了上一步处理得到的组件构造函数，props events等

**创建组件实例**

根组件执行更新函数时，会递归创建子元素和子组件，入口createElm

createEle首次执行_update()时，patch()会通过createEle()创建根元素，子元素创建研究从这里开始

```js
if (isDef(i = i.hook) && isDef(i = i.init)) {
 i(vnode, false /* hydrating */) }
if (isDef(vnode.componentInstance)) {
 // 元素引⽤指定vnode.elm，元素属性创建等
 initComponent(vnode, insertedVnodeQueue)
 // 插⼊到⽗元素
 insert(parentElm, vnode.elm, refElm)
 if (isTrue(isReactivated)) {
 reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
 }
 return true
}
```

## 手写Vue2

vue2.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>kvue2</title>
</head>
<body>
<div id="app">
  <h1>{{counter}}</h1>
</div>
<script src="./kvue2.js"></script>
<script>
  const app = new Kvue({
    el: '#app',
    data: {
      counter: 1
    },
    render(h) {
      // 真实dom 全量更新
      // const h1 = document.createElement('h1');
      // h1.innerText = this.counter + '';
      // return h1;

      // vnode方案
      // return h('h1', {}, this.counter + '');
      return h('h1', {}, [
        h('p', {}, this.counter + ''),
        h('p', {}, this.counter * 2 + ''),
        h('p', {}, this.counter * 3 + ''),
      ]);
    }
  })
  setInterval(() => {
    app.counter++;
  }, 1000);
</script>
</body>
</html>
```


vue2.js
```js
function defineReactive(obj, key, val) {
  observe(val);
  // 创建一个dep实例
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key);
      // 依赖收集
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(v) {
      if (v !== val) {
        val = v;
        observe(v);
        console.log('set', key, val);
        // update();
        dep.notify();
      }
    },

  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]));
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(val) {
        vm.$data[key] = val;
      }
    })
  })
}

class Kvue {
  constructor(options) {
    // 1.保存选项
    this.$options = options;
    this.$data = options.data;
    // 2.对data选项做响应式处理
    observe(this.$data);
    // 2.5代理
    proxy(this);
    // 3.挂载
    if (options.el) {
      this.$mount(options.el);
    }
  }

  // 添加$mount
  $mount(el) {
    this.$el = document.querySelector(el);
    // 1.声明updateComponent
    const updateComponent = () => {
      // 真实dom方案
      // // 渲染获取视图结构
      // const nEl = this.$options.render.call(this);
      // // 结果追加
      // const parent = this.$el.parentElement;
      // parent.insertBefore(nEl, this.$el.nextSibling);
      // parent.removeChild(this.$el);
      // this.$el = nEl;

      // vnode方案
      const vnode = this.$options.render.call(this, this.$createElement);
      this._update(vnode);
    }
    // 2.new Watcher
    new Watcher(this, updateComponent);
  }

  // 返回vnode
  $createElement(tag, props, children) {
    return {
      tag,
      props,
      children
    }
  }

  // 接受vnode,返回dom
  _update(vnode) {
    const prevNode = this._vnode;
    if (!prevNode) {
      // init
      this.__patch__(this.$el, vnode);
    } else {
      // update:diff
      this.__patch__(prevNode, vnode);
    }
    this._vnode = vnode;
  }

  __patch__(oldVnode, vnode) {
    if (oldVnode.nodeType) {
      // init
      const parent = oldVnode.parentElement;
      const refElm = oldVnode.nextSibling;
      // 递归创建dom结构
      const el = this.createEle(vnode);
      parent.insertBefore(el, refElm);
      parent.removeChild(oldVnode);
    } else {
      // update
      const el = vnode.el = oldVnode.el;
      // diff
      // sameVnode
      if (oldVnode.tag === vnode.tag) {
        // todo: props
        // children
        const oldCh = oldVnode.children;
        const newCh = vnode.children;
        if (typeof newCh === 'string') {
          if (typeof oldCh === 'string') {
            // text update
            if (newCh !== oldCh) {
              el.textContent = newCh;
            }
          } else {
            el.textContent = newCh;
          }
        } else {
          if (typeof oldCh !== 'string') {
            // updateChildren
            this.updateChildren(el, oldCh, newCh);
          } else {
            // replace text with elements
            // 先清空
            el.textContent = '';
            // 再转换children
            // 再追加
            // todo：。。。
          }
        }
      } else {
        // replace
      }
    }
  }

  // 递归创建dom树
  createEle(vnode) {
    const el = document.createElement(vnode.tag);
    // todo: props
    // children
    if (vnode.children) {
      if (typeof vnode.children === 'string') {
        // text
        el.textContent = vnode.children;
      } else {
        // array children
        vnode.children.forEach(n => {
          const child = this.createEle(n);
          el.appendChild(child);
        })
      }
    }

    // 保存真实dom用于更新
    vnode.el = el;

    return el;
  }

  // 不优化，不考虑key
  updateChildren(parentElm, oldCh, newCh) {
    // 这里暂且直接patch对应索引1的两个节点
    const len = Math.min(oldCh.length, newCh.length);
    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i]);
      // newCh若是更长的哪个，说明有新增
      if (newCh.length > oldCh.length) {
        newCh.slice(len).forEach((child) => {
          const el = this.createEle(child);
          parentElm.appendChild(el);
        });
      } else if (newCh.length < oldCh.length) {
        // oldCh若是更长的那个，说明有删减
        oldCh.slice(len).forEach((child) => {
          parentElm.removeChild(child.el);
        })
      }
    }
  }
}

// 负责具体更新任务的watcher
class Watcher {
  constructor(vm, updateFn) {
    this.$vm = vm;
    this.getter = updateFn;
    this.get();
  }

  get() {
    // 触发依赖收集
    Dep.target = this;
    this.getter.call(this.vm);
    Dep.target = null;
  }

  update() {
    this.get();
  }
}

// 和data中响应式的key之间是一一对应关系
class Dep {
  constructor() {
    this.deps = new Set();
  }

  addDep(dep) {
    this.deps.add(dep);
  }

  notify() {
    this.deps.forEach(dep => dep.update());
  }
}
```
