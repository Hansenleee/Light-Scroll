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
