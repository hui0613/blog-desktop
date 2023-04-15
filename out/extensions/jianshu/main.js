'use strict';

var dewBlog = require('dew-blog');

function activate() {
  console.log("\u63D2\u4EF6\u542F\u52A8");
  dewBlog.onCreate.tapPromise(async () => {
    return "jianshu";
  });
}

exports.activate = activate;
