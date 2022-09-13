/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, '../../src/render/index.ts'),
  target: 'web',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '../../dist/render'),
    publicPath: 'auto',
  },
  mode: 'development',
  plugins: [
    // 打包前先清除 dist 目录
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../../src/render/index.html'),
    }),
  ],
})
