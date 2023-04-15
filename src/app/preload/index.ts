const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  restartProcess: (arg: any) => ipcRenderer.invoke('blog:restart', arg),
  createArticle: (arg: any) => ipcRenderer.invoke('blog:create', arg),
  updateArticle: (arg: any) => ipcRenderer.invoke('blog:update', arg),
  publishArticle: (arg: any) => ipcRenderer.invoke('blog:publish', arg),
})
