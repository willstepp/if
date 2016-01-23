var ifw = ifw || {};
ifw.app = (function () {

  'use strict';

  function createStory (story) {

  }

  var messenger = null;
  var utils = null;
  var logger = null;

  var responders = {
    'ifw-app-create-story':createStory
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