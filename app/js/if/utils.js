/* global: moment */

var ifw = ifw || {};
ifw.utils = (function () {

  'use strict';

  var idPrefix = 'ifw';

  function genId (type) {
    return [idPrefix, type, moment().unix()].join('-');
  }

  function genProject (fields) {
    var now = moment().unix();

    return {
      id:genId('prj'),
      created:now,
      updated:now,
      author:(fields && fields.author) || null,
      title:(fields && fields.title) || null,
      navs:{},
      passages:{},
      groups:[]
    };

  }

  function genProjectFilename (project) {
    return [project.title.replace(/\s+/g, '-').toLowerCase(), idPrefix].join('.');
  }

  return {
    genId:genId,
    genProject:genProject,
    genProjectFilename:genProjectFilename
  };

})();
