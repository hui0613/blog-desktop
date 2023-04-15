'use strict';

var electron = require('electron');
var path = require('path');

function createWindow() {
  const displays = electron.screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });
  let mainWindow = null;
  if (externalDisplay) {
    mainWindow = new electron.BrowserWindow({
      fullscreen: false,
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 200,
      width: 1300,
      height: 1400,
      webPreferences: {
        preload: path.join(__dirname, "preload.js")
      }
    });
  } else {
    mainWindow = new electron.BrowserWindow({
      width: 800,
      height: 1900,
      webPreferences: {
        preload: path.join(__dirname, "preload.js")
      }
    });
  }
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080/ ");
  } else {
    mainWindow.loadFile("out/build/render/index.html");
  }
  mainWindow.webContents.openDevTools();
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", function() {
  if (process.platform !== "darwin")
    electron.app.quit();
});
