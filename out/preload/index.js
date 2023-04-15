'use strict';

const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("electronAPI", {
  restartProcess: (arg) => ipcRenderer.invoke("blog:restart", arg),
  createArticle: (arg) => ipcRenderer.invoke("blog:create", arg),
  updateArticle: (arg) => ipcRenderer.invoke("blog:update", arg),
  publishArticle: (arg) => ipcRenderer.invoke("blog:publish", arg)
});
