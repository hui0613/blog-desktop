'use strict';

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
var SvcType = /* @__PURE__ */ ((SvcType2) => {
  SvcType2[SvcType2["REQUEST"] = 1] = "REQUEST";
  SvcType2[SvcType2["RESPONSE"] = 2] = "RESPONSE";
  return SvcType2;
})(SvcType || {});
exports.SvcEventService = class SvcEventService {
  constructor() {
    this._sveServiceList = /* @__PURE__ */ new Map();
  }
  register(name, callback) {
    if (this._sveServiceList.has(name)) {
      throw new Error(`Exist ${name} service`);
    }
    this._sveServiceList.set(name, callback);
  }
  execSve(data) {
    const { name, params } = data;
    const _callback = this._sveServiceList.get(name);
    if (!_callback) {
      throw new Error(`Not found ${name} service`);
    }
    try {
      return _callback(params);
    } catch (err) {
      console.log(err);
    }
  }
};
exports.SvcEventService = __decorateClass([
  tsyringe.singleton()
], exports.SvcEventService);

exports.SvcType = SvcType;
