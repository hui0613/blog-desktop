import { ipcMain } from 'electron'
import { DewParallelHook } from '../tapable'
import { blogHandler } from './blogHandler'

export function registerIpcInvoke() {

  ipcMain.handle('blog:create', blogHandler.createArticle)
}
