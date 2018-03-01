var config = require('./index')
var autoprefixer = require('autoprefixer')
var pxtorem = require('postcss-pxtorem')

var postcss = [
  // 浏览器前缀
  autoprefixer({
    browsers: '> 0.1%',
  }),
]

if (config.enablePx2Rem) {
  // 判断开启px-》rem转换
  postcss.unshift(pxtorem(Object.assign({
    rootValue: 100,
    minPixelValue: 0,
    propList: [],
  }, config.enablePx2Rem)))
}
module.exports = postcss
