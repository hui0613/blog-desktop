'use strict';

var tsyringe = require('tsyringe');
var Database = require('../base/Database.js');

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
exports.BlogArticleService = class BlogArticleService {
  constructor(database) {
    this.database = database;
    this.tableName = "article";
  }
  async add(tableName, data) {
    await this.database.table(tableName).insert(data);
  }
  async getByDomain(domain) {
    return await this.database.table("cookies").select("*").where("domain", "=", domain).first();
  }
};
exports.BlogArticleService = __decorateClass([
  tsyringe.injectable(),
  __decorateParam(0, tsyringe.inject(Database.Database))
], exports.BlogArticleService);
