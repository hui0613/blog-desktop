import json from 'rollup-plugin-json';
import { version } from './package.json';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/main/main.ts',
  output: {
    file: 'lib/main.js',
    format: 'cjs'
  },
  plugins: [
    json(),
    typescript()
  ]
}