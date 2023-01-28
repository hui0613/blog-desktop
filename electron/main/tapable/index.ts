import { AsyncParallelHook } from 'tapable'

export type DewAsyncHookHandlerCallback = (...args: any[]) => void
export type DewAsyncHookHandler = (arg1: any, callback: DewAsyncHookHandlerCallback) => void
export type DewAsyncHookPromiseHandler = (arg1: any) => Promise<any>

export class DewAsyncParallelHook {
  private hook: any
  constructor() {
    this.hook = new AsyncParallelHook(['arg1', 'callback'])
  }

  public tapAsync(name: string, handler: DewAsyncHookHandler) {
    this.hook.tapAsync(name, (arg1, callback, tapableCallback) => {
      setTimeout(() => {
        handler(arg1, (...rest) => {
          callback(...rest)
          tapableCallback()
        })
      }, 1000);
    })
  }

  public tapPromise(name: string, handler: DewAsyncHookPromiseHandler) {
    this.hook.tapPromise(name, (arg1, callback) => {
      return handler(arg1).then((res) => {
        callback(res)
      }).catch((err) => {
        callback(err)
      })
    })
  }

  public callAsync(handlerCallback, callback) {
    this.hook.callAsync('dddddd', handlerCallback, callback)
  }
}