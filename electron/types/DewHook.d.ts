export interface DewHook {
  tapAsync(name: string, handler: any)
  tapPromise(name: string, handler: any)
  callAsync(args: any, resultCB: (...rest: any[]) => void, finalCallback: () => void)
}
