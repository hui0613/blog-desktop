'use strict';

var electron = require('electron');
var path = require('path');
var plugin = require('../utils/plugin.js');
var defaultMenu = require('./defaultMenu.js');
var windowManage = require('../window/windowManage.js');

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

function generateMenuArr() {
  const pluginRoot = path__namespace.resolve(__dirname, "../extensions");
  const configs = plugin.loadBlogConfig(pluginRoot);
  const blogMenu = {
    label: "\u5E73\u53F0",
    submenu: []
  };
  if (!configs.length) {
    return electron.Menu.buildFromTemplate(defaultMenu.commonMenu);
  }
  defaultMenu.commonMenu.push(blogMenu);
  configs.forEach((config) => {
    blogMenu.submenu.push({
      label: config.name,
      toolTip: "\u70B9\u51FB\u8DF3\u8F6C\u5230\u767B\u9646\u754C\u9762",
      click: () => {
        windowManage.createWindow({ loadUrl: config.platform_login });
      }
    });
  });
  return electron.Menu.buildFromTemplate(defaultMenu.commonMenu);
}

exports.generateMenuArr = generateMenuArr;
