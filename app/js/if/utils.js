/* global: moment */

var ifw = ifw || {};
ifw.utils = (function () {

  'use strict';

  var idPrefix = 'ifw';

  function genId (type) {
    return [idPrefix, type, moment().unix()].join('-');
  }

  function projectTemplate () {
    return {
      created:null,
      updated:null,
      author:null,
      title:null,
      navs:{},
      passages:{},
      groups:[]
    };
  }

  return {
    genId:genId,
    projectTemplate:projectTemplate
  };

})();
