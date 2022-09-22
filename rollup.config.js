const json = require ('rollup-plugin-json')
const typescript = require ('rollup-plugin-typescript2')
const path = require ('path')
const { uglify } = require ("rollup-plugin-uglify");

module.exports = [
  {
    input: 'src/main/main.ts',
    output: {
      file: 'out/main/main.js',
      format: 'cjs',
    },
    plugins: [
      json(),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      uglify()
    ],
  },
  {
    input: 'src/main/preload.ts',
    output: {
      file: 'out/main/preload.js',
      format: 'cjs',
    },
    plugins: [
      json(),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
      }),
      uglify()
    ],
    
  },
]
