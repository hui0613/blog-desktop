'use strict';

var fs = require('fs');
var path = require('path');

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

var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);
var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

function loadBlogConfig(pluginRoot) {
  console.log("dddddd");
  console.log(pluginRoot);
  const dirs = fs__namespace.readdirSync(pluginRoot);
  let configs = [];
  dirs.forEach((item) => {
    const absolutePath = path__namespace.resolve(pluginRoot, item);
    const stats = fs__namespace.statSync(absolutePath);
    if (!stats.isDirectory()) {
      return;
    }
    const pluginConfig = loadPluginConfig(absolutePath);
    pluginConfig.entry = path__namespace.resolve(absolutePath, pluginConfig.main);
    pluginConfig && configs.push(pluginConfig);
  });
  return configs;
}
function loadPluginConfig(pluginPath) {
  const configPath = path__namespace.resolve(pluginPath, "package.json");
  if (!fs__namespace.existsSync(configPath)) {
    console.error("Not found plugin config");
    return null;
  }
  const config = require(path__namespace.resolve(pluginPath, "package.json"));
  return config;
}

exports.loadBlogConfig = loadBlogConfig;
