import { SvcEventService, SvcType } from './SvcEventService';
import { inject, singleton } from "tsyringe";

export interface PkgType {
  name: string
  type: SvcType
  eventId: number
  params: any
}

@singleton()
export class SvcService {
  private _eventId: number = 0
  private _eventMap: Map<number, any> = new Map<number, any>()
  private _sendCallback: (args: PkgType) => void
  constructor(@inject(SvcEventService) private _svcEventService: SvcEventService) { }

  public execSvc(name: string, data?: any) {
    if (!this._sendCallback) {
      throw new Error("Not found write callback")
    }
    const _curEventId = ++this._eventId
    const _pkg: PkgType = {
      name: name,
      type: SvcType.REQUEST,
      eventId: this._eventId++,
      params: data
    }
    let _cb = null
    let _p = new Promise((resolve, reject) => {
      _cb = {
        resolve,
        reject
      }
    })

    this._eventMap.set(_curEventId, _cb)
    this._sendCallback(_pkg)

    return _p
  }


  public set writer(cb: (args: PkgType) => void) {
    this._sendCallback = cb
  }

  public enterData(data: PkgType) {
    const { name, eventId, params, type } = data

    if (type === SvcType.REQUEST) {
      this._svcEventService.execSve(data).then(res => {
        const _res: PkgType = {
          type: SvcType.RESPONSE,
          name,
          eventId,
          params: res
        }
        // 执行完成之后将结果返回
        this._sendCallback(_res)
      })
    } else {
      const _callback = this._eventMap.get(eventId)

      _callback && _callback.resolve(params)

      // 删除事件回调
      this._eventMap.delete(eventId)
    }


  }

  public register(name: string, cb: (args: any) => Promise<any>) {
    this._svcEventService.register(name, cb)
  }

}
