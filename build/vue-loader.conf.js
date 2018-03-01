/**
 * vue-loader配置
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var postcss = require('../config/postcss.conf')

module.exports = function () {
  const config = {
    loader: 'vue-loader',
    options: {
      // 去除模板中的空格
      preserveWhitespace: false,
      // postcss配置,把vue文件中的样式部分,做后续处理
      postcss,
      // 不使用默认的autoprefixer
      autoprefixer: false,
    }
  }
  if (process.env.NODE_ENV === 'production') {
    config.options.loaders = {
      css: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader'],
        fallback: 'vue-style-loader',
      }),
      stylus: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader', 'stylus-loader'],
        fallback: 'vue-style-loader',
      }),
    }
  } else {
    config.options.loaders = {
      css: ['vue-style-loader', 'css-loader', 'postcss-loader'],
      // 加上'postcss-loader'会报错
      stylus: ['vue-style-loader', 'css-loader', 'stylus-loader'],
    }
  }
  return config
}
