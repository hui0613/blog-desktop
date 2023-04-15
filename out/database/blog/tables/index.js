'use strict';

var article = require('./article.js');
var cookies = require('./cookies.js');

const tableName = ["article"];

exports.articleTableName = article.articleTableName;
exports.createArticleTable = article.createArticleTable;
exports.cookieTableName = cookies.cookieTableName;
exports.createCookiesTable = cookies.createCookiesTable;
exports.tableName = tableName;
