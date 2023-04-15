'use strict';

var path = require('path');
var knex = require('knex');
var article = require('../tables/article.js');
var cookies = require('../tables/cookies.js');
require('../../../utils/Logger.js');
require('fs');
require('https');
var constants = require('../../../utils/constants.js');
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
exports.Database = class Database {
  constructor() {
    this._init();
  }
  async _init() {
    this._database = knex.knex({
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
        filename: path__namespace.resolve(constants.USER_DATA_DIR, "dew-blog")
      }
    });
    await this.syncTable();
  }
  async syncTable() {
    await article.createArticleTable(this._database);
    await cookies.createCookiesTable(this._database);
  }
  get table() {
    return this._database.table.bind(this._database);
  }
};
exports.Database = __decorateClass([
  tsyringe.injectable()
], exports.Database);
