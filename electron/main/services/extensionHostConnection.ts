import type { ChildProcess } from "child_process";
import * as path from 'path'
import { fork } from 'child_process'

export class ExtensionConnection {
  private extensionProcess: ChildProcess
  constructor() { }

  public async start(startParams?: any) {
    this.extensionProcess = fork(path.resolve(__dirname, './blogExtensionProcessMain.js'))

    this.extensionProcess.on('message', (message: unknown) => {
      console.log('main process')
      console.log(message)
    })
  }
}
