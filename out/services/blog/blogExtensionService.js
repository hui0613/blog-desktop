'use strict';

var BlogHelper = require('./BlogHelper.js');
var svc = require('../../utils/svc/svc.js');
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
exports.BlogExtensionService = class BlogExtensionService {
  constructor(_blogHelper, _svcService) {
    this._blogHelper = _blogHelper;
    this._svcService = _svcService;
    this._init();
  }
  _init() {
    this._registerSvc();
    process.on("message", (message) => {
      this._svcService.enterData(message);
    });
    this._svcService.writer = (params) => {
      process.send(params);
    };
  }
  _registerSvc() {
    this._svcService.register("svc_plugin_start", (params) => {
      return new Promise((resolve2, reject) => {
        this._blogHelper.startPlugin();
        resolve2(true);
      });
    });
    this._svcService.register("blog:create", (params) => {
      return new Promise((resolve2, reject) => {
        console.log("\u521B\u5EFA\u6587\u7AE0");
        this._blogHelper.createArticle(params);
        resolve2("true");
      });
    });
    this._svcService.register("blog:update", (params) => {
      return new Promise((resolve2, reject) => {
        console.log("\u66F4\u65B0\u6587\u7AE0");
        resolve2(true);
      });
    });
    this._svcService.register("blog:publish", (params) => {
      return new Promise((resolve2, reject) => {
        console.log("\u53D1\u5E03\u6587\u7AE0");
        resolve2(true);
      });
    });
  }
};
exports.BlogExtensionService = __decorateClass([
  tsyringe.singleton(),
  __decorateParam(0, tsyringe.inject(BlogHelper.BlogHelper)),
  __decorateParam(1, tsyringe.inject(svc.SvcService))
], exports.BlogExtensionService);
