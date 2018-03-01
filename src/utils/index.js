/**
 * js工具
 */

/**
 * 事件绑定
 */
export function bind(el, name, handler, capture = false) {
  if (document.addEventListener) {
    el.addEventListener(name, handler, capture)
  } else if (document.attachEvent) {
    el.attachEvent('on' + name, handler)
  } else {
    el['on' + name] = handler
  }
}

/**
 * 事件解除绑定
 */
export function remove(el, name, handler, capture = false) {
  if (document.removeEventListener) {
    el.removeEventListener(name, handler, capture)
  } else if (document.detachEvent) {
    el.detachEvent('on' + name, handler)
  } else {
    el['on' + name] = null
  }
}

const toString = Object.prototype.toString

/**
 * 判断一个变量哪种类型
 * @param {*} obj - 待判断变量
 * @returns {string} 类型名称
 */
export function typeOf(obj) {
  return toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * 判断一个变量是否是非null对象
 * @param {*} obj - 待判断变量
 * @returns {boolean} 是与否
 */
export function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}
