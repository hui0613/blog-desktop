import { ipcMain } from 'electron'
import { blogHandler } from './blogHandler'

export function registerIpcInvoke() {

  ipcMain.handle('blog:create', blogHandler.createArticle)

  ipcMain.handle('blog:update', blogHandler.updateArticle)

}
