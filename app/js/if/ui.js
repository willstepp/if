var ifw = ifw || {};
ifw.ui = (function () {

  'use strict';

  var messenger = null;
  var utils = null;
  var logger = null;

  var currentState = null;

  function hideAllViews () {
    var views = els('ui-view');
    for (var v = 0; v < views.length; v += 1) {
      views[v].classList.add('hide');
    }
  }

  function showView (id) {
    el(id).classList.remove('hide');
  }

  var templates = (function () {

    function projectList (projects) {
      var html = '';
      html += '<ul>';

      //projects
      for (var i = 0; i < projects.length; i += 1) {
        var project = projects[i];
        html += '<li><p>';
        html += '<button class="ui-project-button" id="' + project.id + '">' + project.title + '</button>';
        html += '</p></li>';
      }

      html += '</ul>';

      return html;
    }

    function projectView (project) {
      var html = '';

      html += '<h3>' + project.title + '</h3>';
      html += '<h5>' + project.author + '</h5>';
      html += '<p><em>Created on ' + moment.unix(project.created).format() + '</em></p>';

      return html;
    }

    return {
      projectList:projectList,
      projectView:projectView
    };

  })();

  function showProjectList (projects) {
    logger.add('ui: showProjectList');
    logger.add(projects);

    hideAllViews();
    el('ui-project-list').innerHTML = templates.projectList(projects);
    showView('ui-view-project-list');
  }

  function showProjectView (project) {
    logger.add('ui: showProjectView');
    logger.add(project);

    hideAllViews();
    el('ui-project-view').innerHTML = templates.projectView(project);
    showView('ui-view-project-view');
  }

  function changeState (options) {

    switch (options.state) {
      case 'project-list':
        showProjectList(options.data);
        break;
      case 'project-view':
        showProjectView(options.data);
        break;
      default:
        break;
    }

    currentState = options.state;

  }

  function showNotification (notification) {
    alert(notification.message);
  }

  var responders = {
    'ifw-msg-change-ui-state':changeState,
    'ifw-msg-notification':showNotification
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
    sendMessage('ifw-msg-create-project', project);
  }

  function loadProject (id) {
    sendMessage('ifw-msg-load-project', id);
  }

  function el (id) {
    return document.getElementById(id);
  }

  function els (className) {
    return document.getElementsByClassName(className);
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

  function hasClass (evt, cls) {
    return evt.target.classList.contains(cls);
  }

  function setupClickEventHandlers () {

    document.body.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (hasClass(evt, 'ui-project-button')) {
        var id = evt.target.getAttribute('id');
        loadProject(id);
      }

    });

  }

  function setupEventHandlers () {
    setupCreateProjectEvent();
    setupClickEventHandlers();
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