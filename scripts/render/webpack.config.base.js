const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }= require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')

module.exports = {
    entry: path.resolve(__dirname, '../../src/render/index.ts'),
    target: 'web',
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, '../../dist/render'),
      publicPath: 'auto'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /.vue$/,
          use: ['vue-loader']
        },
        {
          test: /.tsx?$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },

    resolve:{
      extensions: ['.ts', '.js', '.vue']
    },
    plugins: [
      // 打包前先清除 dist 目录
      new CleanWebpackPlugin,
      new VueLoaderPlugin,
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../../src/render/index.html')
      }),
    ]
}