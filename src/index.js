/**
 * LScroll-类
 */
import './utils/raf'
import init from './scroll/init'
import eventHandler from './scroll/event'
import pulling from './scroll/pulling'
import scroll from './scroll/scroll'

function LScroll(el, options) {
  // 外部滚动
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
  this.container = this.wrapper.children[0]
  // 初始化
  this._init(options)
}

init(LScroll)
eventHandler(LScroll)
pulling(LScroll)
scroll(LScroll)

export default LScroll
