/**
 * 添加监听和触发等对外事件
 */
import queue from '../utils/event-queue'
import { remove } from '../utils/'

export default (LScroll) => {
  /**
   * 对外接口监听事件
   */
  LScroll.prototype.on = (name, handler) => {
    if (this.events[name]) {
      this.events[name].push(handler)
    } else {
      this.events[name] = []
    }
  }

  /**
   * 触发事件
   */
  LScroll.prototype.emit = (name) => {
    const events = this.events

    if (!events[name]) {
      // 如果用户没有手动监听事件
      return
    }

    // 触发事件
    queue.start(0, events[name])
  }

  /**
   * 刷新事件
   */
  LScroll.prototype.refresh = () => {}

  /**
   * 销毁事件
   */
  LScroll.prototype.destory = () => {
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
