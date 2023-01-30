const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  createArticle: (arg) => ipcRenderer.invoke('blog:create', arg),
  updateArticle: (arg) => ipcRenderer.invoke('blog:update', arg)
})