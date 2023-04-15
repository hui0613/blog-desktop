'use strict';

var path = require('path');
var child_process = require('child_process');
var tsyringe = require('tsyringe');
var svc = require('../utils/svc/svc.js');
var electron = require('electron');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

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
exports.ExtensionConnection = class ExtensionConnection {
  constructor(_svcService) {
    this._svcService = _svcService;
    this._eventId = 0;
    this._eventMap = /* @__PURE__ */ new Map();
  }
  async start(startParams) {
    this.extensionProcess = child_process.fork(path__namespace.resolve(__dirname, "./extensionProcessMain.js"));
    this.extensionProcess.on("message", (message) => {
      this._svcService.enterData(message);
    });
    this.extensionProcess.on("error", (error) => {
      console.log(error);
    });
    this.extensionProcess.on("exit", (error) => {
      console.log(error);
    });
    this._svcService.writer = (params) => {
      this.extensionProcess.send(params);
    };
    this._registerSvc();
    setTimeout(() => {
      this._svcService.execSvc("svc_plugin_start").then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      });
    }, 1e3 * 4);
  }
  execSvc(name, params) {
    return this._svcService.execSvc(name, params);
  }
  _registerSvc() {
    console.log("-------");
    const a = electron.session;
    this._svcService.register("getCookies", (params) => {
      console.log("aaaa");
      console.log(a);
      console.log(params);
      return a.defaultSession.cookies.get({ url: params });
    });
  }
  restartProcess() {
    this.extensionProcess.kill();
    setTimeout(() => {
      this.start();
    }, 1e3);
  }
};
exports.ExtensionConnection = __decorateClass([
  tsyringe.singleton(),
  __decorateParam(0, tsyringe.inject(svc.SvcService))
], exports.ExtensionConnection);
