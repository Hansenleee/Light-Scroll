# Light-Scroll

一款轻量级的h5滚动插件，将自己平时项目里写的代码整合而来的，后续会逐渐支持更多功能。

## 开发进度以及功能

* 完成LScroll基础的架构以及事件模型
* 支持上拉加载更多
* 支持下拉刷新（提供了一种默认的动画效果--配合svg和canvas）

## 使用方式

```linux

npm install light-scroll

```

js里引用

```javascript

import LScroll from 'light-scroll'

/**
 * 实例化
 * @param {String|DOM} el - 容器的DOM或者是样式‘.xxx’
 * @param {Object} options - 配置项
 */
var scroll = new LScroll(el, { ... })
```

## 配置项说明

### 配置参数

```session``` - 表示是否开启浏览定位缓存功能   

```pullUpLoad``` default: ```false``` - 表示是否开启上拉加载更多   

```pullDownRefresh``` default: ```false``` - 表示是否开启下拉刷新   

### 对外事件监听

```javascript

// 触发加载更多事件监听
scroll.on('loadMore', function() {})

// 触发刷新事件监听
scroll.on('refresh', function() {})

// 拖拽出现下拉刷新时的touch事件
scroll.on('touchMove', function() {}))

```

## 在线实例DEMO

![扫一扫看示例](https://s18.postimg.cc/6jim6nell/1524213318.png)

http://lscroll.libin.site/example/list
