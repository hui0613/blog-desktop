import { FSWatcher, watch } from 'chokidar'
import { existsSync } from 'fs-extra'
import { buildFile } from './build'
import { DewWatchOptions } from './config'
import * as path from 'path'
import { debounce } from 'lodash'
import { dewElectron } from './startElectron'

export function dewWatch(options: DewWatchOptions): FSWatcher {
  if (!existsSync(options.include)) {
    throw new Error('')
  }
  const startup = debounce(() => dewElectron.start(path.resolve(options.outDir ?? 'out', 'main.js')), 500)

  dewElectron.stop()

  const { include, moduleRoot } = options

  const _watcher = watch(options.include)

  _watcher.on('all', async (event: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir', filepath: string) => {
    if (event === 'change' || event === 'add') {
      if (filepath.endsWith('.ts') || filepath.endsWith('.js')) {
        await buildFile({
          filepath,
          moduleRoot: moduleRoot || include,
        })
      }
    }

    startup()
  })

  return _watcher
}
