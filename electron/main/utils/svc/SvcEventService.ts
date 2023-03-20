import { singleton } from 'tsyringe'

export enum SvcType {
  REQUEST = 0x01,
  RESPONSE = 0x02
}

@singleton()
export class SvcEventService {
  private _sveServiceList: Map<string, Function> = new Map<string, Function>()

  public constructor() { }

  public register(name: string, callback: (args: any) => Promise<any>) {
    if (this._sveServiceList.has(name)) {
      throw new Error(`Exist ${name} service`)
    }
    this._sveServiceList.set(name, callback)
  }

  public execSve(data: any) {
    const { name, params } = data
    const _callback = this._sveServiceList.get(name)

    if (!_callback) {
      throw new Error(`Not found ${name} service`)
    }

    try {
      return _callback(params)
    } catch (err) {
      console.log(err)
    }
  }
}
