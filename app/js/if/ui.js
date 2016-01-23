var ifw = ifw || {};
ifw.ui = (function () {

  'use strict';

  var messenger = null;
  var utils = null;
  var logger = null;

  var currentState = null;

  function changeState (state) {

  }

  var responders = {
    'ifw-ui-change-state':changeState
  };

  function receiveMessage (msg) {
    if (responders[msg.type]) responders[msg.type](msg.body);
  }

  function sendMessage (type, body) {
    messenger.send({
      type:type,
      body:body
    });
  }

  function createProject (project) {
    sendMessage('ifw-app-create-project', project);
  }

  function el (id) {
    return document.getElementById(id);
  }

  function handleEvent(id, type, callback) {
    el(id).addEventListener(type, callback);
  }

  function value (id) {
    return el(id).value;
  }

  function setupCreateProjectEvent () {

    handleEvent('ui-create-project-button', 'click', function (e) {
      var title = value('ui-create-project-title');
      var author = value('ui-create-project-author');

      createProject({
        title:title,
        author:author
      });
    });

  }

  function setupEventHandlers () {
    setupCreateProjectEvent();
  }

  function init (msgr, lggr, utls) {
    messenger = msgr;
    messenger.add(receiveMessage);

    utils = utls;
    logger = lggr;

    setupEventHandlers();
  }

  return {
    init:init,
    receiveMessage:receiveMessage
  };

})();