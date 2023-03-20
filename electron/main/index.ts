import 'reflect-metadata'
import { release } from 'os'
import { resolve, join } from 'path'
import { app, BrowserWindow } from 'electron'
import { createWindow } from '@main/main/window/windowManage'
import type { windowOptions } from '@main/main/window/windowManage'
import { ExtensionConnection } from '@main/main/services/extensionHostConnection'
import { overrideConsole } from './utils/Logger'
import { registerIpcInvoke } from './ipc'
import { generateMenuArr } from './menu'
import { container } from 'tsyringe';


process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST_ELECTRON, '../public')

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// 拓展 console 对象
overrideConsole()

// 注册 ipc 监听
registerIpcInvoke()

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
  container.resolve(ExtensionConnection).start()
})

function generateWindowOptions(): windowOptions {
  return {
    loadFile: resolve(process.env.DIST, 'index.html'),
    loadUrl: process.env.VITE_DEV_SERVER_URL,
    menu: generateMenuArr()
  }
}
