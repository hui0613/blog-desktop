const openLoginPage = (options: { platformName: string; [key: string]: any }) => {
  return window.electronAPI.openPlatformLogin(options)
}

export { openLoginPage }
