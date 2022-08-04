/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] },
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js', '.vue'],
  },
}
