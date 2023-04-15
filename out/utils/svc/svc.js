'use strict';

var SvcEventService = require('./SvcEventService.js');
var tsyringe = require('tsyringe');

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
exports.SvcService = class SvcService {
  constructor(_svcEventService) {
    this._svcEventService = _svcEventService;
    this._eventId = 0;
    this._eventMap = /* @__PURE__ */ new Map();
  }
  execSvc(name, data) {
    if (!this._sendCallback) {
      throw new Error("Not found write callback");
    }
    const _curEventId = ++this._eventId;
    const _pkg = {
      name,
      type: SvcEventService.SvcType.REQUEST,
      eventId: this._eventId++,
      params: data
    };
    let _cb = null;
    let _p = new Promise((resolve, reject) => {
      _cb = {
        resolve,
        reject
      };
    });
    this._eventMap.set(_curEventId, _cb);
    this._sendCallback(_pkg);
    return _p;
  }
  set writer(cb) {
    this._sendCallback = cb;
  }
  enterData(data) {
    const { name, eventId, params, type } = data;
    if (type === SvcEventService.SvcType.REQUEST) {
      this._svcEventService.execSve(data).then((res) => {
        const _res = {
          type: SvcEventService.SvcType.RESPONSE,
          name,
          eventId,
          params: res
        };
        this._sendCallback(_res);
      });
    } else {
      const _callback = this._eventMap.get(eventId);
      _callback && _callback.resolve(params);
      this._eventMap.delete(eventId);
    }
  }
  register(name, cb) {
    this._svcEventService.register(name, cb);
  }
};
exports.SvcService = __decorateClass([
  tsyringe.singleton(),
  __decorateParam(0, tsyringe.inject(SvcEventService.SvcEventService))
], exports.SvcService);
