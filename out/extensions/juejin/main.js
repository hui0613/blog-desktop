'use strict';

var dewBlog = require('dew-blog');

var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
function activate() {
  console.log("\u63D2\u4EF6\u542F\u52A8");
  dewBlog.onCreate.tapPromise(() => __async(this, null, function* () {
    return "juejin";
  }));
}

exports.activate = activate;
