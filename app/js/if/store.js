var ifw = ifw || {};
ifw.store = (function () {

  'use strict';

  var messenger = null;
  var utils = null;
  var logger = null;

  var responders = {

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
  
  return {
    init:init,
    receiveMessage:receiveMessage
  };

})();