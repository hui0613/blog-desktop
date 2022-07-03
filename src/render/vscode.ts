
const sendMessage = (options: {[key: string]: any})=>{
  window.electronAPI.sendMessage(options)
}

export  {
  sendMessage
}