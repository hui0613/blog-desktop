'use strict';

var electron = require('electron');
var blogHandler = require('./blogHandler.js');

function registerIpcInvoke() {
  electron.ipcMain.handle("blog:create", blogHandler.blogHandler.createArticle);
  electron.ipcMain.handle("blog:update", blogHandler.blogHandler.updateArticle);
  electron.ipcMain.handle("blog:publish", blogHandler.blogHandler.publishArticle);
  electron.ipcMain.handle("blog:restart", blogHandler.blogHandler.restartProcess);
}

exports.registerIpcInvoke = registerIpcInvoke;
