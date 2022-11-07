import json from 'rollup-plugin-json';
import typescript from 'rollup-plugin-typescript2';
import * as path from 'path'
import {pkgRoot, projRoot} from '@dew/built-utils'

export default {
  input: path.resolve(pkgRoot, 'main/main.ts'),
  output: {
    file: path.resolve(pkgRoot, 'out/main/main.js'),
    format: 'es'
  },
  plugins: [
    json(),
    typescript({
      tsconfig: path.resolve(projRoot, 'tsconfig.json'),
    })
  ]
}