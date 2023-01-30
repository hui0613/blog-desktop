import { BlogHelper } from '@main/main/blog'
import type { IpcMainInvokeEvent } from 'electron'

export const blogHandler = (() => {
  const blogHelper = new BlogHelper()
  blogHelper.startPlugin()

  const createArticle = (event: IpcMainInvokeEvent, args: any) => {
    blogHelper.createArticle('')
  }

  const updateArticle = (event: IpcMainInvokeEvent, args: any) => {
    console.log('更新文章')
  }

  return {
    createArticle,
    updateArticle
  }
})()
