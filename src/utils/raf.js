/**
 * 兼容requestAnimationFrame和cancelAnimationFrame
 * 部分安卓机型下的浏览器不支持，用setTimeout代替
 */
let lastTime = 0
const vendors = ['webkit', 'moz']
for (let x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
  global.requestAnimationFrame = global[`${vendors[x]}RequestAnimationFrame`]
  global.cancelAnimationFrame = global[`${vendors[x]}CancelAnimationFrame`] ||    // Webkit中此取消方法的名字变了
                                  global[`${vendors[x]}CancelRequestAnimationFrame`]
}

if (!global.requestAnimationFrame) {
  global.requestAnimationFrame = function (callback) {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16.7 - (currTime - lastTime))
    const id = global.setTimeout(() => {
      callback(currTime + timeToCall)
    }, timeToCall)
    lastTime = currTime + timeToCall
    return id
  }
}
if (!global.cancelAnimationFrame) {
  global.cancelAnimationFrame = function (id) {
    clearTimeout(id)
  }
}
