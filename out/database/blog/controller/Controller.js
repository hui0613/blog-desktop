'use strict';

var tsyringe = require('tsyringe');
var Service = require('../service/Service.js');

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
exports.BlogArticleController = class BlogArticleController {
  constructor(blogArticleService) {
    this.blogArticleService = blogArticleService;
  }
  async create(data) {
    await this.blogArticleService.add("cookies", data);
  }
  async get(domain) {
    return await this.blogArticleService.getByDomain(domain);
  }
};
exports.BlogArticleController = __decorateClass([
  tsyringe.injectable(),
  __decorateParam(0, tsyringe.inject(Service.BlogArticleService))
], exports.BlogArticleController);
