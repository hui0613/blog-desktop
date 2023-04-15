import type { Plugin, ResolvedConfig, ViteDevServer } from 'vite'
import type { AddressInfo } from 'net'
import { dewWatch } from './watch'
import { DewTsOptions } from './config'

export function dewTs(config: DewTsOptions): Plugin {
  let resolveConfig: ResolvedConfig

  const getConfig = (
    _config: {
      vite?: any
    } & DewTsOptions = config
  ) => {
    _config.vite ??= {}

    _config.vite.resolveConfig = resolveConfig

    return _config
  }

  const options: Partial<Plugin> = {
    configResolved(config: ResolvedConfig) {
      resolveConfig = config
    },
  }
  return {
    name: 'dew-ts',
    apply: 'serve',
    ...options,
    configureServer(server: ViteDevServer) {
      server.httpServer?.once('listening', () => {
        const addressInfo = server.httpServer!.address() as AddressInfo
        Object.assign(process.env, {
          VITE_DEV_SERVER_URL: `http://localhost:${addressInfo.port}`,
        })
        process._plugin_watcher?.close()

        process._plugin_watcher = dewWatch(getConfig())
        process._electronProcess?.kill()
      })
    },
  }
}
