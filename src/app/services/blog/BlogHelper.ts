import * as path from 'path'
import { loadBlogConfig } from '../../utils/plugin'
import { create, update } from '../../api/common'
import { singleton } from 'tsyringe'

@singleton()
export class BlogHelper {
  constructor() {}

  public startPlugin() {
    this.startInnerPlugin()
  }

  private startInnerPlugin() {
    console.log('aaaaaa')
    console.log(__dirname)
    const pluginRoot = path.resolve(__dirname, '../../extensions/')

    const configs = loadBlogConfig(pluginRoot)

    configs.forEach((config) => {
      const { activate } = require(config.entry as string)
      if (activate instanceof Function) {
        activate()
      }
    })
  }

  public createArticle(article: any) {
    create.fire(
      article,
      (res) => {
        console.log(res)
      },
      () => {
        console.log('done')
      }
    )
  }

  public update(article: any) {
    update.fire(
      article,
      (res) => {
        console.log(res)
      },
      () => {
        console.log('done')
      }
    )
  }
}
