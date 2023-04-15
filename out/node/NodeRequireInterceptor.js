'use strict';

require('../common/extHost.api.impl.js');
var RequireInterceptor = require('../common/RequireInterceptor.js');

const nodeRequire = require;
const _VSCODE_NODE_MODULES = new Proxy(/* @__PURE__ */ Object.create(null), { get: (_target, mod) => nodeRequire(String(mod)) });
class NodeRequireInterceptor extends RequireInterceptor.RequireInterceptor {
  _installInterceptor() {
    const that = this;
    const node_module = _VSCODE_NODE_MODULES.module;
    const originalLoad = node_module._load;
    node_module._load = function load(request, parent, isMain) {
      if (!that._factories.has(request)) {
        return originalLoad.apply(this, arguments);
      }
      return that._factories.get(request).load(request);
    };
    const originalLookup = node_module._resolveLookupPaths;
    node_module._resolveLookupPaths = (request, parent) => {
      return originalLookup.call(this, applyAlternatives(request), parent);
    };
    const applyAlternatives = (request) => {
      for (const alternativeModuleName of that._alternatives) {
        const alternative = alternativeModuleName(request);
        if (alternative) {
          request = alternative;
          break;
        }
      }
      return request;
    };
  }
}

exports.NodeRequireInterceptor = NodeRequireInterceptor;
