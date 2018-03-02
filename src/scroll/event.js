/**
 * 添加监听和触发等对外事件
 * 对外接口事件统一放置在此
 */
import queue from '../utils/event-queue'
import { remove } from '../utils/'

export default (LScroll) => {
  /**
   * 对外接口监听事件
   */
  LScroll.prototype.on = function(name, handler) {
    if (this.events[name]) {
      this.events[name].push(handler)
    } else {
      this.events[name] = [handler]
    }
  }

  /**
   * 触发事件
   */
  LScroll.prototype.emit = function(name, params) {
    const events = this.events

    if (!events[name]) {
      // 如果用户没有手动监听事件
      return
    }

    // 触发事件
    queue.setEvent(events[name], params)
  }

  /**
   * 加载（加载更多，下拉刷新）结束事件
   */
  LScroll.prototype.finishLoad = function() {
    if (this.isPullingDown) {
      // 如果是下拉刷新
      this._finishPullDown()
    } else if (this.onPullUpLoading) {
      // 如果是加载更多
      this._finishPullUp()
    }
  }

  /**
   * 刷新事件
   */
  LScroll.prototype.refresh = function() {}

  /**
   * 销毁事件
   */
  LScroll.prototype.destory = function() {
    this.destory = true

    // 解绑事件
    const eventHandler = queue.setEvent
    const container = this.container
  
    remove(this.wrapper, 'scroll', eventHandler.bind(this.wrapper, this._onScroll))
    remove(container, 'touchstart', eventHandler.bind(container, this._touchStart))
    remove(container, 'touchmove', eventHandler.bind(container, this._touchMove))
    remove(container, 'touchend', eventHandler.bind(container, this._touchEnd))
    remove(container, 'touchcancel', eventHandler.bind(container, this._touchEnd))


    this.wrapper = null
    this.container = null
  }
}
