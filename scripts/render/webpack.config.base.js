/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require.resolve('sass'),
            },
          },
        ],
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
    alias: {
      '@': path.resolve(__dirname, '../../src/'),
    },
    extensions: ['.ts', '.js', '.vue'],
  },
}
