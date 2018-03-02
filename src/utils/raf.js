/**
 * 兼容requestAnimationFrame和cancelAnimationFrame
 * 部分安卓机型下的浏览器不支持，用setTimeout代替
 */
let lastTime = 0
const vendors = ['webkit', 'moz']
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
  window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`]
  window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`] ||    // Webkit中此取消方法的名字变了
                                  window[`${vendors[x]}CancelRequestAnimationFrame`]
}

if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
    const id = window.setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}
if (!window.cancelAnimationFrame) {
  window.cancelAnimationFrame = function (id) {
    clearTimeout(id)
  }
}
