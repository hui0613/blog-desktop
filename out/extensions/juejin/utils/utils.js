'use strict';

var dewBlog = require('dew-blog');

const getCookies = (() => {
  return () => new Promise((resolve, reject) => {
    dewBlog.getCookie("https://juejin.cn/").then((cookies2) => {
      for (let cookie of cookies2) {
        cookies2 += cookie.name + "=" + cookie.value + ";";
      }
      resolve(cookies2);
    }).catch((err) => {
      reject(err);
    });
  });
})();

exports.getCookies = getCookies;
