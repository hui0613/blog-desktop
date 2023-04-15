'use strict';

require('reflect-metadata');
var os = require('os');
var path = require('path');
var electron = require('electron');
var windowManage = require('./window/windowManage.js');
var extensionHostConnection = require('./services/extensionHostConnection.js');
var Logger = require('./utils/Logger.js');
var index = require('./ipc/index.js');
var index$1 = require('./menu/index.js');
var tsyringe = require('tsyringe');

process.env.DIST_ELECTRON = path.join(__dirname, "..");
process.env.DIST = path.join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = electron.app.isPackaged ? process.env.DIST : path.join(process.env.DIST_ELECTRON, "../public");
if (os.release().startsWith("6.1"))
  electron.app.disableHardwareAcceleration();
if (process.platform === "win32")
  electron.app.setAppUserModelId(electron.app.getName());
if (!electron.app.requestSingleInstanceLock()) {
  electron.app.quit();
  process.exit(0);
}
Logger.overrideConsole();
index.registerIpcInvoke();
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    electron.app.quit();
});
electron.app.on("activate", () => {
  const allWindows = electron.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
    return;
  }
  windowManage.createWindow(generateWindowOptions());
});
electron.app.whenReady().then(() => {
  windowManage.createWindow(generateWindowOptions());
  tsyringe.container.resolve(extensionHostConnection.ExtensionConnection).start();
});
function generateWindowOptions() {
  return {
    loadFile: path.resolve(process.env.DIST, "index.html"),
    loadUrl: process.env.VITE_DEV_SERVER_URL,
    menu: index$1.generateMenuArr()
  };
}
