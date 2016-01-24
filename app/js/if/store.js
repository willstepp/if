var ifw = ifw || {};
ifw.store = (function () {

  'use strict';

  var messenger = null;
  var utils = null;
  var logger = null;

  var projectId = 'ifw-projects';

  function getItem (id) {
    return localStorage.getItem(id);
  }

  function setItem (id, item) {
    var success = null;
    try {
      localStorage.setItem(id, item);
      success = true;
    } catch (e) {
      success = false;
    }
    return success;
  }

  function saveProject (options) {

    var projects = getProjectList();
    projects[options.project.id] = options.project;
    var res = setProjectList(projects);

    var status = res ? 'success' : 'error';
    var message = res ? 'Project saved' : 'There was a problem saving the project';
    options.callback({status:status, message:message});
  }

  function getProject (options) {
    var projects = getProjectList();
    var project = projects[options.id] || null;
    options.callback(project);
  }

  function listProjects (options) {
    var projects = [];
    var allProjects = getProjectList();
    for (var p in allProjects) {
      if (allProjects.hasOwnProperty(p)) {
        projects.push(allProjects[p]);
      }
    }
    options.callback(projects);
  }

  function getProjectList () {
    var projectList = getItem(projectId);
    if (projectList) projectList = JSON.parse(projectList);

    return projectList || {};
  }

  function setProjectList (projectList) {
    return setItem(projectId, JSON.stringify(projectList));
  }

  function sendMessage (type, body) {
    messenger.send({
      type:type,
      body:body
    });
  }

  var responders = {
    'ifw-msg-save-project':saveProject,
    'ifw-msg-get-project':getProject,
    'ifw-msg-list-projects':listProjects
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