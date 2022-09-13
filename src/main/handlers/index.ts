import { ipcMain } from 'electron'
import openLogin from './openLogin'

const handlerMap: Map<string, any> = new Map<string, any>().set('blog:openLogin', openLogin)

export default function registerInvokeHandler() {
  ipcMain.handle('blog:openLogin', openLogin)
}
