/* eslint-disable import/no-extraneous-dependencies */
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  openPlatformLogin: (args: any) => ipcRenderer.invoke('blog:openLogin', args),
})
