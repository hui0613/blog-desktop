


console.log("ddddddd")

process.on('message', (message: unknown, sendHandle: unknown) => {
  console.log(message)
})
