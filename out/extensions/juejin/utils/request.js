'use strict';

var https = require('https');

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

var https__namespace = /*#__PURE__*/_interopNamespaceDefault(https);

function request(options, params) {
  return new Promise((resolve, reject) => {
    const _r = https__namespace.request(options, (res) => {
      let str = "";
      res.on("data", (buffer) => {
        str += buffer;
      });
      res.on("end", () => {
        const result = JSON.parse(str);
        resolve(result);
      });
    });
    _r.on("error", (e) => {
      reject(e);
    });
    _r.write(JSON.stringify(params));
    _r.end();
  });
}

exports.request = request;
