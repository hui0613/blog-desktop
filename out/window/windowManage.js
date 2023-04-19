'use strict';

var electron = require('electron');
var path = require('path');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

const preload = path__namespace.resolve(__dirname, "../preload/index.js");
async function createWindow(options) {
  let win = null;
  let displays = electron.screen.getAllDisplays();
  let externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });
  win = new electron.BrowserWindow({
    title: "",
    icon: path__namespace.join(process.env.PUBLIC, "favicon.ico"),
    height: 1e3,
    width: 800,
    x: externalDisplay.bounds.x + 100,
    y: externalDisplay.bounds.y + 100,
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: true
    }
  });
  if (options.menu) {
    electron.Menu.setApplicationMenu(options.menu);
  } else {
    win.setMenu(null);
  }
  if (process.env.NODE_ENV === "development") {
    console.log("aaaaaaa");
    win.loadURL(options.loadUrl);
    win.webContents.openDevTools();
  } else {
    if (options.loadUrl) {
      win.loadURL(options.loadUrl);
    } else {
      win.loadFile(options.loadFile);
    }
  }
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:"))
      electron.shell.openExternal(url);
    return { action: "deny" };
  });
}

exports.createWindow = createWindow;
