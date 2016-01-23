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

  function createStory (story) {
    sendMessage('ifw-app-create-story', story);
  }

  function setupCreateStoryEvent () {
    var createStoryButton = document.getElementById('ui-create-story-button');
    createStoryButton.addEventListener("click", function (e) {
      e.preventDefault();

      var title = document.getElementById('ui-create-story-title').value;
      var author = document.getElementById('ui-create-story-author').value;

      createStory({
        title:title,
        author:author
      });

    });
  }

  function setupEventHandlers () {
    setupCreateStoryEvent();
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