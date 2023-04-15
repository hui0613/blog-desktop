'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var log = require('electron-log');

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

const consoleLog = console.log;
class InnerLog {
  static info(...args) {
    consoleLog(...args);
  }
  static warn(logStr) {
    consoleLog(logStr);
  }
  static error(...args) {
    consoleLog(...args);
  }
}
const _Logger = class {
  static info(...args) {
    _Logger.logger.info(...args);
  }
  static warn(logStr) {
    _Logger.logger.warn(logStr);
  }
  static error(...args) {
    _Logger.logger.error(...args);
  }
  static log(...arg) {
    _Logger.logger.info(...arg);
  }
};
let Logger = _Logger;
Logger.logger = process.env.NODE_ENV === "development" ? InnerLog : log__namespace;
function overrideConsole() {
  console.info = Logger.info;
  console.error = Logger.error;
  console.warn = Logger.warn;
  console.log = Logger.log;
}

exports.default = Logger;
exports.overrideConsole = overrideConsole;
