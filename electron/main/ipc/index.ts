import { ipcMain } from 'electron'
import { DewAsyncParallelHook } from '../tapable'

export function registerIpcInvoke() {
  const hook = new DewAsyncParallelHook()

  hook.tapAsync('test', (arg1, callback) => {
    console.log('111111111111')
    setTimeout(() => {
      console.log(arg1)
      callback('第一个执行结果')
    }, 1000)
  })

  hook.tapAsync('test2', (arg1, callback) => {
    console.log('222222222222')

    setTimeout(() => {
      console.log(arg1)
      callback('第二个执行结果')
    }, 1000)
  })

  hook.tapPromise('test3', (arg1) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('第三个执行结果')
      }, 1000);
    })
  })

  ipcMain.handle("test", () => {
    hook.callAsync(
      (...rest) => {
        console.log('每一个钩子函数结束的结果')
        console.log(rest)
      },
      () => {
        console.log('所有钩子函数执行完毕')
      }
    )
    return
  })
}
