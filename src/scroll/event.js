/**
 * 添加兼容事件
 */
import queue from '../utils/event-queue'

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
}
