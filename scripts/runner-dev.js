/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const path = require('path')
const { spawn } = require('child_process')
const electron = require('electron')
const WebpackServer = require('webpack-dev-server')
const webpackHotMiddleware = require('webpack-hot-middleware')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const renderDevConfig = require('./render/webpack.config.dev')
const mainDevConfig = require('./main/webpack.config.dev')

let hotMiddlewareRenderer
let electronProcess

function startRenderer() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(renderDevConfig)
    hotMiddlewareRenderer = webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2500,
    })

    compiler.hooks.compilation.tap('compilation', (compilation) => {
      // console.log(Object.keys(compilation.hooks))
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddlewareRenderer.publish({ action: 'reload' })
        cb()
      })
    })

    const server = new WebpackServer(
      {
        port: 8090,
        hot: true,
        historyApiFallback: true,
        client: {
          logging: 'warn',
          overlay: true,
        },
        setupMiddlewares(middleware, devServer) {
          devServer.app.use(hotMiddlewareRenderer)
          devServer.middleware.waitUntilValid(resolve)
          return middleware
        },
      },
      compiler
    )

    server.start()
  })
}

function startElectron() {
  const entryPath = path.resolve(__dirname, '../.webpack/main/index.js')
  electronProcess = spawn(electron, [entryPath])

  electronProcess.stdout.on('data', (chunk) => {
    console.log(chunk.toString())
  })

  electronProcess.stdin.on('data', (err) => {
    console.log(err.toString())
  })
}

function startMain() {
  return new Promise((resolve, reject) => {
    const compile = webpack(mainDevConfig)

    compile.watch({}, (err, stats) => {
      console.log('compiling....')
      if (err) {
        // webpack 配置存在错误
        console.log(err)
        return
      }
      const info = stats.toJson()
      if (stats.hasErrors) {
        info.errors.forEach((item) => {
          console.log(item.message)
        })
      }
      if (electronProcess && electronProcess.kill) {
        process.kill(electronProcess.pid)
        electronProcess = null
      }
      startElectron()
    })
    resolve()
  })
}

function init() {
  startRenderer()
  startMain()
}

init()
