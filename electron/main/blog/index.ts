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
    const pluginRoot = path.resolve(__dirname, '../../extensions')

    const configs = loadBlogConfig(pluginRoot)

    configs.forEach(config => {
      const { activate } = require(config.entry as string)
      if (activate instanceof Function) {
        activate()
      }
    })
  }

  public createArticle(article: any) {
    this.hooks.create.callAsync(article, (...rest: any[]) => {
      console.log("插件执行结果")
      console.log(...rest)
    }, () => { })
  }

  public update(article: any) {
    this.hooks.update.callAsync(article, (...rest: any[]) => {
      console.log("文章跟新结果")
      console.log(...rest)
    }, () => {

    })
  }
}
