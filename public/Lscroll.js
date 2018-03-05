(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Lscroll = factory());
}(this, (function () { 'use strict';

/**
 * 兼容requestAnimationFrame和cancelAnimationFrame
 * 部分安卓机型下的浏览器不支持，用setTimeout代替
 */
let lastTime = 0;
const vendors = ['webkit', 'moz'];
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
  window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`] ||    // Webkit中此取消方法的名字变了
                                  window[`${vendors[x]}CancelRequestAnimationFrame`];
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id
  };
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
}

/**
 * js工具
 */

/**
 * 事件绑定
 */
function bind(el, name, handler, capture = false) {
  if (document.addEventListener) {
    el.addEventListener(name, handler, capture);
  } else if (document.attachEvent) {
    el.attachEvent('on' + name, handler);
  } else {
    el['on' + name] = handler;
  }
}

/**
 * 事件解除绑定
 */
function remove(el, name, handler, capture = false) {
  if (document.removeEventListener) {
    el.removeEventListener(name, handler, capture);
  } else if (document.detachEvent) {
    el.detachEvent('on' + name, handler);
  } else {
    el['on' + name] = null;
  }
}

/**
 * 判断一个变量哪种类型
 * @param {*} obj - 待判断变量
 * @returns {string} 类型名称
 */


/**
 * 判断一个变量是否是非null对象
 * @param {*} obj - 待判断变量
 * @returns {boolean} 是与否
 */

/**
 * 整合事件队列
 */

let queue = [];

var queue$1 = {
  // 是否在执行
  active: false,
  /**
   * 触发事件，塞入队列
   */
  setEvent(event, ...args) {
    // 如果event是函数数组
    if (Array.isArray(event)) {
      event.forEach((fn) => {
        queue.push(fn.bind(null, ...args));
      });
    } else {
      queue.push(event.bind(null, ...args));
    }
    
    if (!this.active) {
      this.active = true;
      this.start();
    }
  },
  /**
   * 启动队列
   */
  start(index = 0) {
    const event = queue[index];

    if (event) {
      const res = event();
      if ((res || {}).then) {
        res.then(() => {
          // q.splice(index, 1)
          this.start(++index);
        });
      } else {
        // q.splice(index, 1)
        this.start(++index);
      }
    } else {
      queue = [];
      this.active = false;
    }
  },
}

/**
 * 初始化
 */
var init = (LScroll) => {
  // 下拉刷新的最大距离
  LScroll.PULLDOWN_TOP = 180;
  // 下拉刷新的触发距离
  LScroll.PULLDOWN_FRESH = 120;
  // 下拉刷新结束延时时间
  LScroll.PULLDOWN_BACK_TIME = 500;
  // 默认的触发上拉加载更多的阈值
  LScroll.PULLDONG_LOAD_THRESHOLD = 100;

  // 添加方法到原型上
  LScroll.prototype._init = function(options = {}) {
    /**
     * 初始化配置参数，以_开头
     */
    this.options = options;
    // 浏览定位
    this._session = options.session || false;
    // 上拉加载更多,默认关闭
    this._pullUpLoad = options.pullUpLoad || false;
    // 下拉刷新功能，默认关闭
    const freshConfig = options.pullDownRefresh;

    this._pullDownRefresh = !!freshConfig || false;
    /**
     * 初始化自定义变量
     */
    // 下拉刷新前
    this.beforePullingDown = true;
    // 下拉刷新中
    this.isPullingDown = false;
    // 上拉加载更多中
    this.onPullUpLoading = false;
    // 是否显示底部加载中等问题
    this.showFooter = false;
    // 滑动距离
    this.touchDistanceY = 0;
    // 是否在触摸滚动中
    this.onTouch = false;
    // 触摸点的Y轴坐标
    this.startY = 0;
    // 对外监听事件
    this.events = {};
    // 是否销毁掉
    this.isDestory = false;

    /**
     * 初始化事件绑定
     */
    const eventHandler = queue$1.setEvent;

    if (this._pullUpLoad) {
      // 只有在开启了上拉加载更多时才会去监听
      const scrollHandle = eventHandler.bind(queue$1, this._onScroll.bind(this));
      bind(this.wrapper, 'scroll', scrollHandle);
    }
    
    if (this._pullDownRefresh) {
      // 只有开启下拉刷新时才绑定触摸事件
      const container = this.container;

      bind(container, 'touchstart', eventHandler.bind(queue$1, this._touchStart.bind(this)));
      bind(container, 'touchmove', eventHandler.bind(queue$1, this._touchMove.bind(this)));
      bind(container, 'touchend', eventHandler.bind(queue$1, this._touchEnd.bind(this)));
      bind(container, 'touchcancel', eventHandler.bind(queue$1, this._touchEnd.bind(this)));
    }
    
  };
}

/**
 * 添加监听和触发等对外事件
 * 对外接口事件统一放置在此
 */
var eventHandler = (LScroll) => {
  /**
   * 对外接口监听事件
   */
  LScroll.prototype.on = function(name, handler) {
    if (this.events[name]) {
      this.events[name].push(handler);
    } else {
      this.events[name] = [handler];
    }
  };

  /**
   * 触发事件
   */
  LScroll.prototype.emit = function(name, params) {
    const events = this.events;

    if (!events[name]) {
      // 如果用户没有手动监听事件
      return
    }

    // 触发事件
    queue$1.setEvent(events[name], params);
  };

  /**
   * 加载（加载更多，下拉刷新）结束事件
   */
  LScroll.prototype.finishLoad = function() {
    if (this.isPullingDown) {
      // 如果是下拉刷新
      this._finishPullDown();
    } else if (this.onPullUpLoading) {
      // 如果是加载更多
      this._finishPullUp();
    }
  };

  /**
   * 刷新事件
   */
  LScroll.prototype.refresh = function() {
    // 重新初始化
    this._init();
  };

  /**
   * 销毁事件
   */
  LScroll.prototype.destory = function() {
    this.destory = true;

    // 解绑事件
    const eventHandler = queue$1.setEvent;
    const container = this.container;
  
    remove(this.wrapper, 'scroll', eventHandler.bind(this.wrapper, this._onScroll));
    remove(container, 'touchstart', eventHandler.bind(container, this._touchStart));
    remove(container, 'touchmove', eventHandler.bind(container, this._touchMove));
    remove(container, 'touchend', eventHandler.bind(container, this._touchEnd));
    remove(container, 'touchcancel', eventHandler.bind(container, this._touchEnd));


    this.wrapper = null;
    this.container = null;
  };
}

/**
 * js实现transition阶段
 */
var transition = {
  transition(from, end, step = 1, callBack) {
    let now = from;

    const fn = () => {
      if ((now > end && step > 0) || (now < end && step < 0)) {
        return
      }
      now += step;
      // 回调函数
      callBack(now);
      // 继续调用fn
      window.requestAnimationFrame(fn);
    };
    // 利用raf实现
    window.requestAnimationFrame(fn);
  },
}

/**
 * 上拉加载更多
 * 下拉刷新
 */
var pulling = (LScroll) => {
  /**
   * 上拉加载更多
   */
  LScroll.prototype._pullingUpLoad = function() {
    // 标记正在加载更多
    this.onPullUpLoading = true;
    // 触发加载更多事件
    this.emit('loadMore');
  };

  /**
   * 加载更多结束
   */
  LScroll.prototype._finishPullUp = function() {
    this.onPullUpLoading = false;
  };

  /**
   * 下拉刷新
   */
  LScroll.prototype._pullingFresh = function() {
    // 标识
    this.isPullingDown = true;
    this.beforePulldingDown = false;
    this.onTouch = false;
  
    // 刷新DOM回弹到特定位置
    transition.transition(
      this.touchDistanceY,
      this.constructor.PULLDOWN_FRESH,
      -10,
      this._touchMoveY.bind(this)
    );
    
    // this.touchDistanceY = this.constructor.PULLDOWN_FRESH
    // this.emit('touchMove', this.touchDistanceY)
  
    // 触发刷新
    this.emit('refresh');
  };

  /**
   * 下拉刷新结束
   */
  LScroll.prototype._finishPullDown = function() {
    this.isPullingDown = false;

    // 延时处理，保证动画顺利完成
    setTimeout(() => {
      this.beforePulldingDown = true;
    }, this.constructor.PULLDOWN_BACK_TIME);
    
    // 刷新结束，回弹动画
    this._resetTouch();
  };

}

/**
 * 滚动触摸相关事件
 */
var scroll = (LScroll) => {
  /**
   * 滚动事件
   */
  LScroll.prototype._onScroll = function() {
    const wrapper = this.wrapper;
    // 加载更多触发的阈值
    const threshold = this._pullUpLoad.threshold || this.constructor.PULLDONG_LOAD_THRESHOLD;

    if (wrapper.scrollTop + wrapper.offsetHeight + threshold
      >= wrapper.scrollHeight && !this.onPullUpLoading) {
      // 触发下拉刷新
      this._pullingUpLoad();
    }
  };

  /**
   * 触摸开始事件
   */
  LScroll.prototype._touchStart = function(e) {
    const touch = e.touches[0];
    this.startY = touch.clientY;
    this.onTouch = true;
    this._touchMoveY(0);
  };

  /**
   * 触摸移动事件
   * touchmove事件目前仅针对下拉刷新，下拉刷新的触发点如下
   * 1.scrollTop为0
   * 2.向下滑动
   */
  LScroll.prototype._touchMove = function(e) {
    if (!this.onTouch) return false
    const scrollTop = this.wrapper.scrollTop;
    const touch = e.touches[0];
    const y = touch.clientY;
    // 每次滑动的距离
    const disY = y - this.startY;
    this.startY = y;
    // 判断方向是否符合下拉刷新
    if (scrollTop !== 0 || (disY < 0 && this.touchDistanceY === 0)) {
      return this._touchEndHandler()
    }

    e.preventDefault();

    // 滑动记录
    this._touchMoveY(this.touchDistanceY + disY);

    // 判断是否可以达到下拉最大位置，如果达到直接出发刷新
    if (this.touchDistanceY >= this.constructor.PULLDOWN_TOP) {
      return this._pullingFresh()
    }
    // 调整下拉刷新bar样式
    // return this._setRefreshBar()
  };

  /**
   * 触摸结束事件
   */
  LScroll.prototype._touchEnd = function() {
    // 触摸结束判断是否达到刷新位置
    if (this.touchDistanceY >= this.constructor.PULLDOWN_FRESH && this.onTouch) {
      this._pullingFresh();
    } else {
      this._touchEndHandler();
    }
    return this._session && this._storeScroll()
  };

  /**
   * 处理滑动结束
   */
  LScroll.prototype._touchEndHandler = function() {
    // 下拉刷新中
    if (this.isPullingDown) return
    // 标识
    this.onTouch = false;
    // 下拉DOM归位
    if (this.touchDistanceY > 0) {
      this._resetTouch();
    }
  };

  /**
   * 下拉样式等设置回归到原始状态
   */
  LScroll.prototype._resetTouch = function() {
    // transtion实现从this.touchDistanceY到0的阶段
    transition.transition(
      this.touchDistanceY,
      0,
      -10,
      this._touchMoveY.bind(this)
    );
    /**
     * 这里设置为0.01，因为如果为0的话，可能DOM上判断会直接隐藏掉
     * 就没有回弹动画
     */
    // this._touchMoveY(0)
    // 设置回弹样式
    // this._setRefreshBar(0.4).then(() => {
    //   // 最终设置为0
    //   this.touchDistanceY = 0
    // })
  };

  /**
   * 滑动操作
   */
  LScroll.prototype._touchMoveY = function(y) {
    this.touchDistanceY = y;
    // 提供接口共外部监听变化
    this.emit('touchMove', y);
  };

  /**
   * 缓存住当前的scrollTop值
   */
  LScroll.prototype._storeScroll = function() {};
}

/**
 * LScroll-类
 */
function LScroll(el, options) {
  // 外部滚动
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
  this.container = this.wrapper.children[0];
  // 初始化
  this._init(options);
}

init(LScroll);
eventHandler(LScroll);
pulling(LScroll);
scroll(LScroll);

return LScroll;

})));
