export class DewParallelHook {
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

  public callAsync(...args) {
    let finalCallback = args.pop()
    let result = args.pop()
    let index = 0

    const done = () => {
      index++

      if (index === (this.tasks.length + this.promiseTask.length)) {
        finalCallback()
      }
    }

    this.tasks.forEach(task => {
      task.handler(...args, (res) => {
        result(res)
        done()
      })
    })

    this.promiseTask.forEach(task => {
      task.handler(...args).then(res => {
        result(res)
        done()
      })
    })
  }
}