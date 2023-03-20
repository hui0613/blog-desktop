import type { IpcMainInvokeEvent } from 'electron'
import { ExtensionConnection } from '@main/main/services/extensionHostConnection'
import { container } from 'tsyringe'

export const blogHandler = (() => {
  const extensionConnection: ExtensionConnection = container.resolve(ExtensionConnection)

  const createArticle = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.sendMsg('blog:create', args)
  }

  const updateArticle = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.sendMsg('blog:update', args)
  }

  const publishArticle = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.sendMsg('blog:publish', args)
  }

  const restartProcess = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.sendMsg('plugin:restart', args)
  }

  return {
    createArticle,
    updateArticle,
    publishArticle,
    restartProcess,
  }
})()
