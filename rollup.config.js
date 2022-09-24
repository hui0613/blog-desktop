const json = require('rollup-plugin-json')
const typescript = require('rollup-plugin-typescript2')
const path = require('path')
const { uglify } = require('rollup-plugin-uglify')

module.exports = [
  {
    input: 'out/main/main.js',
    output: {
      file: 'out/build/main/main.js',
      format: 'cjs',
    },
    plugins: [json(), uglify()],
  },
  {
    input: 'out/main/preload.js',
    output: {
      file: 'out/build/main/preload.js',
      format: 'cjs',
    },
    plugins: [json(), uglify()],
  },
]
