/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  target: 'electron-main',
  entry: {
    main: path.resolve(__dirname, '../../src/main/main.ts'),
    preload: path.resolve(__dirname, '../../src/main/preload.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts'],
  },
}
