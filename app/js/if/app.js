/* global: moment */

var ifw = ifw || {};
ifw.app = (function () {

  'use strict';

  var project = null;

  function createProject (fields) {

    project = utils.projectTemplate();
    project.title = fields.title;
    project.author = fields.author;

    logger.add('creating project...');
    logger.add(project);

  }

  var messenger = null;
  var utils = null;
  var logger = null;

  var responders = {
    'ifw-app-create-project':createProject
  };

  function receiveMessage (msg) {
    if (responders[msg.type]) responders[msg.type](msg.body);
  }

  function init (msgr, lggr, utls) {
    messenger = msgr;
    messenger.add(receiveMessage);
    utils = utls;
    logger = lggr;
  }

  function start () {
    
  }
  
  return {
    init:init,
    start:start,
    receiveMessage:receiveMessage
  };

})();