'use strict';

var svc = require('../utils/svc/svc.js');
require('../utils/Logger.js');
require('fs');
require('path');
require('https');
var Emitter = require('../utils/event/Emitter.js');
require('../utils/constants.js');
var tsyringe = require('tsyringe');

const create = new Emitter.Emitter();
const update = new Emitter.Emitter();
const createApiFactoryAndRegisterActors = (() => {
  const getCookie = (filter) => {
    return tsyringe.container.resolve(svc.SvcService).execSvc("getCookies");
  };
  return function() {
    return {
      onCreate: create.event,
      onUpdate: update.event,
      getCookie
    };
  };
})();
tsyringe.container.register("blog:createHook", { useValue: create }).register("blog:updateHook", { useValue: update });

exports.create = create;
exports.createApiFactoryAndRegisterActors = createApiFactoryAndRegisterActors;
exports.update = update;
