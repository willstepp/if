var ifw = ifw || {};
ifw.messenger = (function () {

  'use strict';

  var logger = null;
  var listeners = [];

  function add (callback) {
    listeners.push(callback);
  }

  function send (msg) {
    for (var i = 0; i < listeners.length; i += 1) {
      listeners[i](msg);
    }
    logger.add(msg);
  }

  function init (msgr, lggr, utls) {
    logger = lggr;
  }
  
  return {
    init:init,
    add:add,
    send:send
  };

})();
