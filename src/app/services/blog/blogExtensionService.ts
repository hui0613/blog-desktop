import { Emitter } from './../../utils/event/Emitter'
import { resolve } from 'path'
import { BlogHelper } from './BlogHelper'
import { SvcService } from './../../utils/svc/svc'

import { container, inject, singleton } from 'tsyringe'

@singleton()
export class BlogExtensionService {
  constructor(@inject(BlogHelper) private _blogHelper: BlogHelper, @inject(SvcService) private readonly _svcService: SvcService) {
    this._init()
  }

  private _init() {
    this._registerSvc()
    process.on('message', (message: any) => {
      // 将消息数据传入 svc 中进行处理
      this._svcService.enterData(message)
    })
    this._svcService.writer = (params: any) => {
      process.send(params)
    }
  }

  private _registerSvc() {
    this._svcService.register('svc_plugin_start', (params: any) => {
      return new Promise((resolve, reject) => {
        this._blogHelper.startPlugin()
        resolve(true)
      })
    })
    this._svcService.register('blog:create', (params: any) => {
      return new Promise((resolve, reject) => {
        console.log('创建文章')
        this._blogHelper.createArticle(params)
        resolve('true')
      })
    })

    this._svcService.register('blog:update', (params: any) => {
      return new Promise((resolve, reject) => {
        console.log('更新文章')
        resolve(true)
      })
    })

    this._svcService.register('blog:publish', (params: any) => {
      return new Promise((resolve, reject) => {
        console.log('发布文章')
        resolve(true)
      })
    })
  }
}
