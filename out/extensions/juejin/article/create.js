'use strict';

var constants = require('../utils/constants.js');
var dewBlog = require('dew-blog');

const createArticle = () => {
  return new Promise((resolve, reject) => {
    Object.assign({}, constants.ARTICLE_PARAMS);
    dewBlog.getCookie("https://juejin.cn/").then((cookies2) => {
      if (!cookies2) {
        reject("not found cookies");
        return;
      }
      console.log("\u6398\u91D1\u521B\u5EFA\u6587\u7AE0");
      console.log(cookies2);
    });
  });
};

exports.createArticle = createArticle;
