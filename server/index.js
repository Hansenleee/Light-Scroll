var Koa = require('koa')
const convert = require('koa-convert')
var webpack = require('webpack')
var webpackDevMiddleware = require('koa-webpack-dev-middleware')
var webpackHotMiddleware = require('koa-webpack-hot-middleware')
var webpackDevConfig = require('../build/webpack/webpack.dev.conf')
var config = require('../config')
var opn = require('opn')
var fs = require('fs')

var compiler = webpack(webpackDevConfig)
var devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
})
var koaWebpackDevMiddleware = convert(devMiddleware)
var koaWebpackHotMiddleware = convert(webpackHotMiddleware(compiler))

var app = new Koa()

// 解决history路由模式
app.use(require('koa2-connect-history-api-fallback')())

app.use(koaWebpackDevMiddleware)
app.use(koaWebpackHotMiddleware)

// 端口
var port = config.dev.port

// 错误日志
app.on('error', (err) => {
  console.log('Server error: ' + err.stack || '')
})

app.listen(port)

console.log('Server is open at ' + port)

// 打开浏览器
// opn('http://localhost:' + port)
