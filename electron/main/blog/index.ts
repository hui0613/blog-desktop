import { DewParallelHook } from './../tapable/index';
import * as path from 'path'
import * as fs from 'fs'
import type { BlogHook } from '@main/types/Context'

export class BlogHelper {
  private hooks: BlogHook

  constructor() {
    this.hooks = {
      create: new DewParallelHook(),
      update: new DewParallelHook()
    }
  }

  public startPlugin() {
    this.startInnerPlugin()
  }

  private startInnerPlugin() {
    const pluginRoot = path.resolve(__dirname)
    const dirs = fs.readdirSync(pluginRoot)

    dirs.forEach(item => {
      const absolutePath = path.resolve(pluginRoot, item)
      const stats = fs.statSync(absolutePath)
      if (!stats.isDirectory()) {
        return
      }

      const pluginConfig = this.loadPluginConfig(absolutePath)

      if (!pluginConfig) {
        return
      }

      const mainPath = path.resolve(absolutePath, pluginConfig.main)

      const { activate } = require(mainPath)
      activate({
        hooks: this.hooks
      })
    })
  }

  private loadPluginConfig(pluginPath: string) {
    const configPath = path.resolve(pluginPath, 'config.json')

    if (!fs.existsSync(configPath)) {
      console.error("Not found plugin config")
      return null
    }

    const config = require(path.resolve(pluginPath, 'config.json'))

    return config
  }

  public createArticle(article: any) {
    this.hooks.create.callAsync(article, (...rest: any[]) => {
      console.log(...rest)
    }, () => { })
  }
}