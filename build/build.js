var webpackConfig = require('./webpack/webpack.prod.conf')
var ora = require('ora')
var rimraf = require('rimraf')
var webpack = require('webpack')
var path = require('path')
var chalk = require('chalk')

// loading
var spinner = ora('buildinging ...')
spinner.start()

rimraf(path.join(process.cwd(), 'dist'), (err) => {
  if (err) {
    console.log('error', JSON.stringify(err))
    return
  }
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
