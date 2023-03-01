import type { ChildProcess } from "child_process";
import * as path from 'path'
import { fork } from 'child_process'
import { ProcessMessage } from './processMessage.impl'


export class ExtensionConnection {
  private static _instance: ExtensionConnection

  private extensionProcess: ChildProcess
  private constructor() { }

  public static getInstance() {
    if (!ExtensionConnection._instance) {
      ExtensionConnection._instance = new ExtensionConnection()
    }
    return ExtensionConnection._instance
  }

  public async start(startParams?: any) {
    this.extensionProcess = fork(path.resolve(__dirname, './blogExtensionProcessMain.js'))

    this.extensionProcess.on('message', (message: ProcessMessage) => {
      console.log('main process')
      console.log(message)
    })

    setTimeout(() => {
      this.extensionProcess.send({
        type: 'plugin:start',
        data: null
      })
    }, 1000 * 4);
  }

  public restartProcess() {
    this.extensionProcess.kill()

    setTimeout(() => {
      this.start()
    }, 1000);
  }

  public sendMsg(type: string, data: any) {
    this.extensionProcess.send({
      type,
      data
    })
  }


}
