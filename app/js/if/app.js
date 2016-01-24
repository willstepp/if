var ifw = ifw || {};
ifw.app = (function () {

  'use strict';

  var project = null;

  function createProject (fields) {

    project = utils.genProject({
      title:fields.title,
      author:fields.author
    });
    saveProject(project, function (res) {
      nofify({
        status:res.status,
        message:res.message
      });
    });

  }

  function loadProject (id) {
    getProject(id, function (newProject) {
      if (newProject) {
        project = newProject;
        showView({state:'project-view', data:project});
      }
    });
  }

  var messenger = null;
  var utils = null;
  var logger = null;

  var responders = {
    'ifw-msg-create-project':createProject,
    'ifw-msg-load-project':loadProject
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

  function saveProject (project, callback) {
    sendMessage('ifw-msg-save-project', {project:project, callback:callback});
  }

  function getProject (id, callback) {
    sendMessage('ifw-msg-get-project', {id:id, callback:callback});
  }

  function listProjects (callback) {
    sendMessage('ifw-msg-list-projects', {callback:callback});
  }

  function notify (message) {
    sendMessage('ifw-msg-notification', message);
  }

  function showView (options) {
    sendMessage('ifw-msg-change-ui-state', options);
  }

  function init (msgr, lggr, utls) {
    messenger = msgr;
    messenger.add(receiveMessage);
    utils = utls;
    logger = lggr;
  }

  function start () {
    listProjects(function (projects) {
      showView({state:'project-list', data:projects});
    });
  }
  
  return {
    init:init,
    start:start,
    receiveMessage:receiveMessage
  };

})();