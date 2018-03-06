/**
 * 初始化
 */
import { bind, isObject } from '../utils/index'
import queue from '../utils/event-queue'

export default (LScroll) => {
  // 下拉刷新的最大距离
  LScroll.PULLDOWN_TOP = 180
  // 下拉刷新的触发距离
  LScroll.PULLDOWN_FRESH = 120
  // 下拉刷新结束延时时间
  LScroll.PULLDOWN_BACK_TIME = 500
  // 默认的触发上拉加载更多的阈值
  LScroll.PULLDONG_LOAD_THRESHOLD = 100
  // 记录在session缓存里的key前缀
  LScroll.SESSION_KEY_PREFIX = 'LSCROLL_'

  // 添加方法到原型上
  LScroll.prototype._init = function(options = {}) {
    /**
     * 初始化配置参数，以_开头
     */
    this.options = options
    // 浏览定位
    this._session = options.session || false
    // 上拉加载更多,默认关闭
    this._pullUpLoad = options.pullUpLoad || false
    // 下拉刷新功能，默认关闭
    const freshConfig = options.pullDownRefresh

    this._pullDownRefresh = !!freshConfig || false
    /**
     * 初始化自定义变量
     */
    // 下拉刷新前
    this.beforePullingDown = true
    // 下拉刷新中
    this.isPullingDown = false
    // 上拉加载更多中
    this.onPullUpLoading = false
    // 是否显示底部加载中等问题
    this.showFooter = false
    // 滑动距离
    this.touchDistanceY = 0
    // 是否在触摸滚动中
    this.onTouch = false
    // 触摸点的Y轴坐标
    this.startY = 0
    // 对外监听事件
    this.events = {}
    // 是否销毁掉
    this.isDestory = false

    /**
     * 初始化事件绑定
     */
    const eventHandler = queue.setEvent

    if (this._pullUpLoad) {
      // 只有在开启了上拉加载更多时才会去监听
      const scrollHandle = eventHandler.bind(queue, this._onScroll.bind(this))
      bind(this.wrapper, 'scroll', scrollHandle)
    }
    
    if (this._pullDownRefresh) {
      // 只有开启下拉刷新时才绑定触摸事件
      const container = this.container

      bind(container, 'touchstart', eventHandler.bind(queue, this._touchStart.bind(this)))
      bind(container, 'touchmove', eventHandler.bind(queue, this._touchMove.bind(this)))
      bind(container, 'touchend', eventHandler.bind(queue, this._touchEnd.bind(this)))
      bind(container, 'touchcancel', eventHandler.bind(queue, this._touchEnd.bind(this)))
    }
    
  }
}