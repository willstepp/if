/* global: moment */

var ifw = ifw || {};
ifw.utils = (function () {

  'use strict';

  var idPrefix = 'ifw';

  function genId (type) {
    return [idPrefix, type, moment().unix()].join('-');
  }

  return {
    genId:genId
  };

})();
