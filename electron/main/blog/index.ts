import { DewParallelHook } from './../tapable/index';
import * as path from 'path'
import * as fs from 'fs'
import type { BlogHook } from '@main/types/Context'
import { loadBlogConfig } from '@main/main/utils/plugin'

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

    const configs = loadBlogConfig(pluginRoot)

    configs.forEach(config => {
      const { activate } = require(config.entry as string)
      activate({
        hooks: this.hooks
      })
    })
  }

  public createArticle(article: any) {
    this.hooks.create.callAsync(article, (...rest: any[]) => {
      console.log(...rest)
    }, () => { })
  }
}