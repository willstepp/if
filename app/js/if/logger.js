var ifw = ifw || {};
ifw.logger = (function () {

  'use strict';

  var utils = null;
  var logs = [];

  function add (log) {
    logs.push(log);
  }

  function init (msgr, lggr, utls) {
    utils = utls;
  }

  function dump (clear) {
    for (var l = 0; l < logs.length; l += 1) {
      console.log(logs[l]);
    }
    if (clear) logs = [];
  }
  
  return {
    init:init,
    add:add,
    dump:dump
  };

})();
