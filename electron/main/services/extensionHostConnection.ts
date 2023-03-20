import type { ChildProcess } from 'child_process'
import * as path from 'path'
import { fork } from 'child_process'
import { inject, singleton } from 'tsyringe'
import { SvcService } from './../utils/svc';

@singleton()
export class ExtensionConnection {

  private extensionProcess: ChildProcess
  private _eventId = 0;
  private _eventMap: Map<number, Function> = new Map<number, Function>()


  public constructor(
    @inject(SvcService) private readonly _svcService: SvcService) { }

  public async start(startParams?: any) {
    this.extensionProcess = fork(path.resolve(__dirname, './extensionProcessMain.js'))

    this.extensionProcess.on('message', (message: any) => {
      this._svcService.enterData(message)
    })

    this.extensionProcess.on('error', (error: any) => {
      console.log(error)
    })

    this.extensionProcess.on('exit', (error: any) => {
      console.log(error)
    })

    this._svcService.writer = (params: any) => {
      this.extensionProcess.send(params)
    }

    setTimeout(() => {
      this._svcService.execSvc('svc_plugin_start').then((res: any) => {
        // 获取到结果
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }, 1000 * 4)
  }


  public restartProcess() {
    this.extensionProcess.kill()

    setTimeout(() => {
      this.start()
    }, 1000)
  }
}
