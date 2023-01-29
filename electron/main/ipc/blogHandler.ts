import { BlogHelper } from '@main/main/blog'
import type { IpcMainInvokeEvent } from 'electron'


export const blogHandler = (() => {
  const blogHelper = new BlogHelper()
  blogHelper.startPlugin()

  const createArticle = (event: IpcMainInvokeEvent, args: any) => {
    blogHelper.createArticle('')
  }

  return {
    createArticle
  }
})()