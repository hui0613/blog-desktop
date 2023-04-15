'use strict';

var path = require('path');
var plugin = require('../../utils/plugin.js');
var extHost_api_impl = require('../../api/common/extHost.api.impl.js');
var tsyringe = require('tsyringe');

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
exports.BlogHelper = class BlogHelper {
  constructor() {
  }
  startPlugin() {
    this.startInnerPlugin();
  }
  startInnerPlugin() {
    console.log("aaaaaa");
    console.log(__dirname);
    const pluginRoot = path__namespace.resolve(__dirname, "../../extensions/");
    const configs = plugin.loadBlogConfig(pluginRoot);
    configs.forEach((config) => {
      const { activate } = require(config.entry);
      if (activate instanceof Function) {
        activate();
      }
    });
  }
  createArticle(article) {
    extHost_api_impl.create.fire(
      article,
      (res) => {
        console.log(res);
      },
      () => {
        console.log("done");
      }
    );
  }
  update(article) {
    extHost_api_impl.update.fire(
      article,
      (res) => {
        console.log(res);
      },
      () => {
        console.log("done");
      }
    );
  }
};
exports.BlogHelper = __decorateClass([
  tsyringe.singleton()
], exports.BlogHelper);
