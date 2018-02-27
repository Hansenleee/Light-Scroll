/**
 * 整合事件队列
 */

const onRaf = false
const queue = []

export default {
  // 是否在执行
  active: false,
  /**
   * 触发事件，塞入队列
   */
  setEvent(event) {
    queue.push(event)

    if (!this.active) {
      this.start()
      this.active = true
    }
  },
  /**
   * 启动队列
   */
  start(index = 0, q = queue) {
    const event = queue[index]

    if (event) {
      const res = event()
      if (res.then) {
        res.then(() => {
          this.start(++index)
        })
      } else {
        this.start(++index)
      }
    }
  },
}
 