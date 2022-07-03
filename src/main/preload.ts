/* eslint-disable import/no-extraneous-dependencies */
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (args: any) => ipcRenderer.invoke('messageTest', args),
})
