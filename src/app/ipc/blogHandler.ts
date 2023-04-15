import type { IpcMainInvokeEvent } from 'electron'
import { ExtensionConnection } from '../services/extensionHostConnection'
import { container } from 'tsyringe'

export const blogHandler = (() => {
  const extensionConnection: ExtensionConnection = container.resolve(ExtensionConnection)

  const createArticle = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.execSvc('blog:create', args)
  }

  const updateArticle = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.execSvc('blog:update', args)
  }

  const publishArticle = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.execSvc('blog:publish', args)
  }

  const restartProcess = (event: IpcMainInvokeEvent, args: any) => {
    extensionConnection.execSvc('plugin:restart', args)
  }

  return {
    createArticle,
    updateArticle,
    publishArticle,
    restartProcess,
  }
})()
