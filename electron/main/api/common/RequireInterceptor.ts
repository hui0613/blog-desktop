import { createApiFactoryAndRegisterActors } from "./extHost.api.impl"

export abstract class RequireInterceptor {
  protected _factories: Map<string, any>
  protected _alternatives: ((_moduleName: string) => any)[]

  constructor() {
    this._factories = new Map<string, any>()
    this._alternatives = []
  }

  // 安装 require 拦截器
  protected abstract _installInterceptor();

  public install() {
    this.register('dew-blog', new DEWNodeModule(createApiFactoryAndRegisterActors))
    this._installInterceptor()
  }

  public register(moduleName: string, interceptor: any) {
    if (!this._factories.has(moduleName)) {
      this._factories.set(moduleName, interceptor)
    }
  }
}

class DEWNodeModule {
  private readonly _extApiImpl: Map<string, any>

  constructor(private readonly _apiFactory: any) {
    this._extApiImpl = new Map<string, any>()
  }

  public load(request: string) {
    let apiImpl = this._extApiImpl.get(request)
    if (!apiImpl) {
      // 没有缓存，则重新生成一个
      apiImpl = this._apiFactory()
      // 进行缓存
      this._extApiImpl.set(request, apiImpl)
    }
    return apiImpl
  }
}
