import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
  sendMessage: (args: any)=> ipcRenderer.invoke('messageTest', args)
})