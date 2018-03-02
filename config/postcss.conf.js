/**
 * postcss
 * postcss-pxtorem文档：https://github.com/cuth/postcss-pxtorem
 */
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
  postcss.unshift(pxtorem({
    rootValue: 100,
    minPixelValue: 0,
    // 所有的样式都转为rem
    propList: ['*'],
  }))
}
module.exports = postcss
