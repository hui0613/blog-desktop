import { DewHook } from '@main/types/DewHook'

export class DewParallelHook implements DewHook {
  private tasks: any[]
  private promiseTask: any[]
  constructor(...args: any[]) {
    this.tasks = []
    this.promiseTask = []
  }

  public tapAsync(name: string, handler: any) {
    this.tasks.push({
      name,
      handler
    })
  }

  public tapPromise(name: string, handler: any) {
    //
    this.promiseTask.push({
      name,
      handler
    })
  }

  public callAsync(args: any, resultCB: (...rest: any[]) => void, finalCallback: () => void) {
    let index = 0

    const done = () => {
      index++

      if (index === (this.tasks.length + this.promiseTask.length)) {
        finalCallback()
      }
    }

    this.tasks.forEach(task => {
      task.handler(...args, (res) => {
        resultCB(res)
        done()
      })
    })

    this.promiseTask.forEach(task => {
      task.handler(...args).then(res => {
        resultCB(res)
        done()
      })
    })
  }
}