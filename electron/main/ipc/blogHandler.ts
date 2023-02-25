import { BlogHelper } from '@main/main/blog'
import type { IpcMainInvokeEvent } from 'electron'

export const blogHandler = (() => {
  const blogHelper = new BlogHelper()

  const createArticle = (event: IpcMainInvokeEvent, args: any) => {
    blogHelper.createArticle('')
  }

  const updateArticle = (event: IpcMainInvokeEvent, args: any) => {
    console.log('更新文章')
  }

  const publishArticle = (event: IpcMainInvokeEvent, args: any) => {
    console.log("发布文章")
  }

  const restartProcess = (event: IpcMainInvokeEvent, args: any) => {
    console.log('ddddddd')
  }

  return {
    createArticle,
    updateArticle,
    publishArticle,
    restartProcess
  }
})()
