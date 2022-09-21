import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import * as path from 'path'

export default [{
  input: 'src/main/main.ts',
  output: {
    file: 'out/main.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    })
  ]
},
{
  input: 'src/main/preload.ts',
  output: {
    file: 'out/preload.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    })
  ]
}
]