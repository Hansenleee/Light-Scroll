var baseConfig = require('./webpack.base.conf')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// 修改输出output配置
baseConfig.output.filename = '[name].[chunkhash:7].js'
baseConfig.output.chunkFilename = '[id].[chunkhash:7].js'

module.exports = merge(baseConfig, {
  // 正式环境不开启
  devtool: false,
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'postcss-loader'],
        fallback: 'vue-style-loader',
      }),
    },]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"production"',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        autoprefixer: false,
      },
    }),
    // 抽离公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
    }),
  ]
})