/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'production',
  plugins: [
    // 打包前先清除 dist 目录
    new VueLoaderPlugin(),
  ],
})
