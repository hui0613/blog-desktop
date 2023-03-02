import * as path from 'path'
import { loadBlogConfig } from '@main/main/utils/plugin'
import { create, update } from '@main/main/api/common'

export class BlogHelper {

  constructor() { }

  public startPlugin() {
    this.startInnerPlugin()
  }

  private startInnerPlugin() {
    const pluginRoot = path.resolve(__dirname, '../../../extensions')

    const configs = loadBlogConfig(pluginRoot)

    configs.forEach(config => {
      const { activate } = require(config.entry as string)
      if (activate instanceof Function) {
        activate()
      }
    })
  }

  public createArticle(article: any) {
    create.fire(article, (res) => {
      console.log(res)
    }, () => {
      console.log('done')
    })
  }

  public update(article: any) {
    update.fire(article, (res) => {
      console.log(res)
    }, () => {
      console.log('done')
    })
  }
}
