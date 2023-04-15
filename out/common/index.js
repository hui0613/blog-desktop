'use strict';

var extHost_api_impl = require('./extHost.api.impl.js');
var RequireInterceptor = require('./RequireInterceptor.js');



exports.create = extHost_api_impl.create;
exports.createApiFactoryAndRegisterActors = extHost_api_impl.createApiFactoryAndRegisterActors;
exports.update = extHost_api_impl.update;
exports.RequireInterceptor = RequireInterceptor.RequireInterceptor;
