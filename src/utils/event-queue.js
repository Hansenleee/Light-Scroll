/**
 * 整合事件队列
 */

let queue = []

export default {
  // 是否在执行
  active: false,
  /**
   * 触发事件，塞入队列
   */
  setEvent(event, ...args) {
    // 如果event是函数数组
    if (Array.isArray(event)) {
      event.forEach((fn) => {
        queue.push(fn.bind(null, ...args))
      })
    } else {
      queue.push(event.bind(null, ...args))
    }
    
    if (!this.active) {
      this.active = true
      this.start()
    }
  },
  /**
   * 启动队列
   */
  start(index = 0) {
    const event = queue[index]

    if (event) {
      const res = event()
      if ((res || {}).then) {
        res.then(() => {
          // q.splice(index, 1)
          this.start(++index)
        })
      } else {
        // q.splice(index, 1)
        this.start(++index)
      }
    } else {
      queue = []
      this.active = false
    }
  },
}
 