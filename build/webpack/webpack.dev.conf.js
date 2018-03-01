var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// 修改entry
Object.keys(baseWebpackConfig.entry).forEach((name) => {
  var ext = ['eventsource-polyfill', 'webpack-hot-middleware/client?noInfo=true&reload=true']
  baseWebpackConfig.entry[name] = ext.concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader?resolve url'],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 打包遇到错误不退出
    new webpack.NoEmitOnErrorsPlugin(),
    // webpack的友好错误提示
    new FriendlyErrorsPlugin(),
  ]
})