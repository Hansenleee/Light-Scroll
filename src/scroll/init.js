/**
 * 初始化
 */
import { bind } from '../utils/'
import queue from '../utils/event-queue'

export default (LScroll) => {
  // 添加方法到原型上
  LScroll.prototype._init = (options = {}) => {
    /**
     * 初始化配置参数，以_开头
     */
    this.options = options
    // 浏览定位
    this._session = options.session || false
    // 上拉加载更多,默认关闭
    this._pullUpLoad = options.pullUpLoad || false
    // 下拉刷新功能，默认关闭
    this._pullDownRefresh = options.pullDownRefresh || false
    /**
     * 初始化自定义变量
     */
    // 滑动距离
    this.touchDistanceY = 0
    // 下拉刷新前
    this.beforePullingDown = true
    // 下拉刷新中
    this.isPullingDown = false
    // 上拉加载更多中
    this.onPullUpLoading = false
    // 是否显示底部加载中等问题
    this.showFooter = false
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
      const scrollHandle = eventHandler.bind(this.wrapper, this._onScroll)
      bind(this.wrapper, 'scroll', scrollHandle)
    }
  
    // 绑定触摸事件
    const container = this.container

    bind(container, 'touchstart', eventHandler.bind(container, this._touchStart))
    bind(container, 'touchmove', eventHandler.bind(container, this._touchMove))
    bind(container, 'touchend', eventHandler.bind(container, this._touchEnd))
    bind(container, 'touchcancel', eventHandler.bind(container, this._touchEnd))
  }
}