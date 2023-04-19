import { rollup, RollupOutput } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import esbuild from 'rollup-plugin-esbuild'
import alias from '@rollup/plugin-alias'
import { writeFileSync } from 'fs-extra'
import * as path from 'path'
import { ensureDir, generateExternal } from './utils'
import { DewBuildOptions } from './config'

export async function buildFile(options: DewBuildOptions) {
  const { filepath, moduleRoot } = options

  const bundle = await rollup({
    input: path.resolve(filepath),
    plugins: [
      nodeResolve({
        extensions: ['.ts', '.js'],
      }),
      esbuild(),
      alias({
        entries: [
          {
            find: '@main',
            replacement: path.resolve('src/app'),
          },
        ],
      }),
    ],
    treeshake: true,
    external: await generateExternal({ full: false }),
  })

  const outFilePath: string = path.resolve('out', path.relative(options.moduleRoot, options.filepath.replace(/.ts$/, '.js')))

  ensureDir(outFilePath)

  const result = await bundle.generate({
    format: 'cjs',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: moduleRoot,
  })
  writeFileSync(outFilePath, result.output[0].code)
}
