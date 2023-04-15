'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var log = require('electron-log');
var chalk = require('chalk');

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

var log__namespace = /*#__PURE__*/_interopNamespaceDefault(log);

class InnerLog {
  static info(logStr) {
    console.log(log__namespace);
  }
  static warn(logStr) {
    console.log(chalk.yellow(logStr));
  }
  static error(logStr) {
    console.log(chalk.red(logStr));
  }
}
const _Logger = class {
  static info(logStr) {
    _Logger.logger.info(logStr);
  }
  static warn(logStr) {
    _Logger.logger.warn(logStr);
  }
  static error(logStr) {
    _Logger.logger.error(logStr);
  }
};
let Logger = _Logger;
Logger.logger = process.env.NODE_ENV === "development" ? InnerLog : log__namespace;

exports.default = Logger;
