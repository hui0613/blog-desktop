'use strict';

var extHost_api_impl = require('./extHost.api.impl.js');

class RequireInterceptor {
  constructor() {
    this._factories = /* @__PURE__ */ new Map();
    this._alternatives = [];
  }
  install() {
    this.register("dew-blog", new DEWNodeModule(extHost_api_impl.createApiFactoryAndRegisterActors));
    this._installInterceptor();
  }
  register(moduleName, interceptor) {
    if (!this._factories.has(moduleName)) {
      this._factories.set(moduleName, interceptor);
    }
  }
}
class DEWNodeModule {
  constructor(_apiFactory) {
    this._apiFactory = _apiFactory;
    this._extApiImpl = /* @__PURE__ */ new Map();
  }
  load(request) {
    let apiImpl = this._extApiImpl.get(request);
    if (!apiImpl) {
      apiImpl = this._apiFactory();
      this._extApiImpl.set(request, apiImpl);
    }
    return apiImpl;
  }
}

exports.RequireInterceptor = RequireInterceptor;
