import type { IpcMainInvokeEvent } from 'electron'
import { ExtensionConnection } from '@main/main/services/extensionHostConnection'

export const blogHandler = (() => {
  const extensionConnection: ExtensionConnection = ExtensionConnection.getInstance()

  const createArticle = (event: IpcMainInvokeEvent, args: any) => {
    console.log(args)
    console.log('创建文章')
    extensionConnection.sendMsg('blog:create', args)
  }

  const updateArticle = (event: IpcMainInvokeEvent, args: any) => {
    console.log(args)
    console.log('更新文章')
    extensionConnection.sendMsg('blog:update', args)
  }

  const publishArticle = (event: IpcMainInvokeEvent, args: any) => {
    console.log('发布文章')
    extensionConnection.sendMsg('blog:publish', args)
  }

  const restartProcess = (event: IpcMainInvokeEvent, args: any) => {
    console.log('重启进程')
    extensionConnection.sendMsg('plugin:restart', args)
  }

  return {
    createArticle,
    updateArticle,
    publishArticle,
    restartProcess,
  }
})()
