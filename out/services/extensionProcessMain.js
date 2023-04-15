'use strict';

require('reflect-metadata');
var NodeRequireInterceptor = require('../api/node/NodeRequireInterceptor.js');
var blogExtensionService = require('./blog/blogExtensionService.js');
var tsyringe = require('tsyringe');

process.on("uncaughtException", (err) => {
  console.log(err);
});
new NodeRequireInterceptor.NodeRequireInterceptor().install();
tsyringe.container.resolve(blogExtensionService.BlogExtensionService);
