async function openLogin(event: Electron.IpcMainInvokeEvent, ...args: any[]) {
  console.log(args)
  return 'return@value'
}

export default openLogin
