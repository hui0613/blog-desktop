'use strict';

var electron = require('electron');

var _a;
const USER_DATA_DIR = (_a = electron.app) == null ? void 0 : _a.getPath("userData");

exports.USER_DATA_DIR = USER_DATA_DIR;
