/**
 * js实现transition阶段
 */
const onRaf = false

export default {
  /**
   * transition动画
   * @param {*} from - 从
   * @param {*} end - 到
   * @param {*} step - 步长
   * @param {*} callBack - 回调函数
   */
  transition(from, end, step = 1, callBack) {
    let now = from

    const fn = () => {
      if ((now > end && step > 0) || (now < end && step < 0)) {
        return
      }
      now += step
      // 回调函数
      callBack(now)
      // 继续调用fn
      window.requestAnimationFrame(fn)
    }
    // 利用raf实现
    window.requestAnimationFrame(fn)
  },
}