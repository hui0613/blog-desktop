'use strict';

require('reflect-metadata');
var Controller = require('./blog/controller/Controller.js');
var Service = require('./blog/service/Service.js');
var Database = require('./blog/base/Database.js');



Object.defineProperty(exports, 'BlogArticleController', {
	enumerable: true,
	get: function () { return Controller.BlogArticleController; }
});
Object.defineProperty(exports, 'BlogArticleService', {
	enumerable: true,
	get: function () { return Service.BlogArticleService; }
});
Object.defineProperty(exports, 'Database', {
	enumerable: true,
	get: function () { return Database.Database; }
});
