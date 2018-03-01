var path = require('path')
var webpack = require('webpack')
var vueLoader = require('../vue-loader.conf')()
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var postcss = require('../../config/postcss.conf')

module.exports = {
  // 入口配置
  entry: {
    app: path.join(process.cwd(), 'example/index.js'),
  },
  // 出口配置
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    // 生成的文件名, [name] 即为entry配置中的key
    filename: '[name].js',
    // 异步模块文件名
    chunkFilename: '[id].js',
    publicPath: '/',
  },
  // 配置解析
  resolve: {
    // 缺省的文件名
    extensions: ['.js', '.vue', '.json'],
    // 别名配置
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'views': path.join(process.cwd(), 'example/views'),
      'src': path.join(process.cwd(), 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [vueLoader, {
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }],
      },
      {
        test: /\.jsx?$/,
        // node_modules目录下的js模块,不使用eslint-loader, babel-loader加载
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.(gif|jpg|jpeg|png|bmp|svg|woff|woff2|eot|ttf)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 小于8912字节的文件,返回dataurl
            limit: 8912,
            // 生成的文件名,[name]为原始文件名,[hash:8]为根据文件内容生成8位md5值,[ext]为原始文件扩展名
            name: 'resources/[path][name].[hash:8].[ext]',
          },
        }],
      },
    ]
  },
  plugins: [
    // options共享
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        // 非vue文件中的纯样式部分的postcss配置
        postcss,
      },
    }),
    // 不区分大小写
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'index.html'),
      filename: 'index.html',
      inject: true,
    })
  ]
}
