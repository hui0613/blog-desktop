/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.config.base')

module.exports = merge(baseConfig, {
  mode: 'development',
})
