export interface ElectronAPI {
  sendMessage: (message: any)=> Promise<void>
}

declare global{
  interface Window{
    electronAPI: ElectronAPI
  }
}