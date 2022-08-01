export interface ElectronAPI {
  openPlatformLogin: (message: any) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
