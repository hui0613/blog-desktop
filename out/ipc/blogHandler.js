'use strict';

var extensionHostConnection = require('../services/extensionHostConnection.js');
var tsyringe = require('tsyringe');

const blogHandler = (() => {
  const extensionConnection = tsyringe.container.resolve(extensionHostConnection.ExtensionConnection);
  const createArticle = (event, args) => {
    extensionConnection.execSvc("blog:create", args);
  };
  const updateArticle = (event, args) => {
    extensionConnection.execSvc("blog:update", args);
  };
  const publishArticle = (event, args) => {
    extensionConnection.execSvc("blog:publish", args);
  };
  const restartProcess = (event, args) => {
    extensionConnection.execSvc("plugin:restart", args);
  };
  return {
    createArticle,
    updateArticle,
    publishArticle,
    restartProcess
  };
})();

exports.blogHandler = blogHandler;
