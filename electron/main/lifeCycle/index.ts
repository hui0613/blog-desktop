import { app, BrowserWindow } from 'electron'
import { resolve } from 'path'
import { createWindow } from '@main/main/window/windowManage'
import type { windowOptions } from '@main/main/window/windowManage'
import { generateMenuArr } from '../menu'
import { ExtensionConnection } from '@main/main/services/extensionHostConnection'

export function registerAppEvent() {
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  app.on('activate', () => {
    const allWindows = BrowserWindow.getAllWindows()

    if (allWindows.length) {
      allWindows[0].focus()
      return
    }
    // 创建新窗口
    createWindow(generateWindowOptions())
  })

  app.whenReady().then(() => {
    //  程序冷启动时，创建新窗口
    createWindow(generateWindowOptions())
    ExtensionConnection.getInstance().start()
  })
}

function generateWindowOptions(): windowOptions {
  return {
    loadFile: resolve(process.env.DIST, 'index.html'),
    loadUrl: process.env.VITE_DEV_SERVER_URL,
    // menu: generateMenuArr()
  }
}
