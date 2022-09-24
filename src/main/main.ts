// Modules to control application life and create native browser window
import { app, BrowserWindow, screen } from 'electron'
import path from 'path'
import Logger from './utils/Logger'

function createWindow() {
  // Create the browser window.
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display: Electron.Display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  let mainWindow: BrowserWindow | null = null
  if (externalDisplay) {
    mainWindow = new BrowserWindow({
      fullscreen: false,
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 200,
      width: 1300,
      height: 1400,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })
  } else {
    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 800,
      height: 1900,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
      },
    })
  }
  Logger.warn('dddddds')
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:8080/ ')
  } else {
    mainWindow.loadFile('out/build/render/index.html')
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
