import { BrowserWindow, screen, shell } from 'electron'
import type { Menu } from 'electron'
import * as path from 'path'

export type windowOptions = {
  loadFile?: string
  loadUrl?: string
  menu?: Menu
}

const preload = path.resolve(__dirname, '../../preload/index.js')

export async function createWindow(options: windowOptions) {
  let win: BrowserWindow | null = null

  let displays = screen.getAllDisplays();
  //寻找副屏幕
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })

  win = new BrowserWindow({
    title: '',
    icon: path.join(process.env.PUBLIC, 'favicon.ico'),
    x: externalDisplay.bounds.x + 100,
    y: externalDisplay.bounds.y + 500,
    webPreferences: {
      preload,
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  if (options.menu) {
    win.setMenu(options.menu)
  } else {
    win.setMenu(null)
  }

  if (process.env.VITE_DEV_SERVER_URL) { // electron-vite-vue#298
    win.loadURL(options.loadUrl)
    // Open devTool if the app is not packaged
    win.webContents.openDevTools()
  } else {
    if (options.loadUrl) {
      win.loadURL(options.loadUrl)
    } else {
      win.loadFile(options.loadFile)
    }
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}