var ifw = ifw || {};
ifw.ui = (function () {

  'use strict';

  var messenger = null;
  var utils = null;
  var logger = null;

  var currentState = null;

  var textEditor = null;

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
      html += '<br><button id="ui-save-project-file-button" data-project-id="' + project.id + '">Save to file</button>';

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
    logger.add(notification.message);
  }

  function downloadProjectFile (project) {
    var file = new Blob([JSON.stringify(project, null, 2)], {type: 'text/json;charset=utf-8;'});
    var filename = utils.genProjectFilename(project);

    var url =  navigator.msSaveBlob ? navigator.msSaveBlob(file, filename) : window.URL.createObjectURL(file);

    var link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.click();
  }

  var responders = {
    'ifw-msg-change-ui-state':changeState,
    'ifw-msg-notification':showNotification,
    'ifw-msg-download-project-file':downloadProjectFile
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

  function loadProjectFromFile (project) {
    sendMessage('ifw-msg-load-project-from-file', project);
  }

  function saveProjectToFile (id) {
    sendMessage('ifw-msg-save-project-to-file', id);
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

  function hasId (evt, id) {
    return evt.target.getAttribute('id') === id;
  }

  function setupChangeEventHandlers () {
    el('ui-load-profile-file').addEventListener('change', function (evt) {

      var file = this.files[0];
      var reader = new FileReader();
      reader.onload = function (e) {
        var project = JSON.parse(reader.result);
        console.log(project);
        loadProjectFromFile(project);
      };
      reader.readAsText(file);

    });
  }

  function setupClickEventHandlers () {

    document.body.addEventListener('click', function (evt) {
      var id;

      if (hasClass(evt, 'ui-project-button')) {
        id = evt.target.getAttribute('id');
        loadProject(id);
      }

      if (hasId(evt, 'ui-save-project-file-button')) {

        var val = textEditor.getValue();
        var matches = val.match(/(\[.*\]\(.*\))/g);
        console.log(matches);
        var formatted = marked(val);

        console.log(formatted);

        return false;

        id = evt.target.getAttribute('data-project-id');
        saveProjectToFile(id);
      }

      return true;

    });

  }

  function setupEventHandlers () {
    setupCreateProjectEvent();
    setupClickEventHandlers();
    setupChangeEventHandlers();
  }

  function setupTextEditor () {

    textEditor = CodeMirror(el('ui-text-editor'), {
      value: "## This is a header...",
      mode:  "markdown",
      extraKeys: {"Ctrl-Space": "autocomplete"}
    });

    CodeMirror.registerHelper("hint", "ifw", function (editor, options) {
      var WORD = /[\w$]+/, RANGE = 500;
      var word = options && options.word || WORD;
      var range = options && options.range || RANGE;
      var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
      var end = cur.ch, start = end;

      return {list: ['bird', 'dog', 'monkey', 'daniel'], from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
    });

    textEditor.on('inputRead', function (editor, change) {
      var curr = change.text[0];
      var prev = editor.getRange({line:change.to.line, ch:change.to.ch-1}, {line:change.to.line, ch:change.to.ch});
      if (prev === ']' && curr === '(') CodeMirror.showHint(editor, CodeMirror.hint.ifw);
    });

    CodeMirror.commands.autocomplete = function (cm) {
      CodeMirror.showHint(cm, CodeMirror.hint.ifw);
    };
  }

  function init (msgr, lggr, utls) {
    messenger = msgr;
    messenger.add(receiveMessage);

    utils = utls;
    logger = lggr;

    setupEventHandlers();
    setupTextEditor();
  }

  return {
    init:init,
    receiveMessage:receiveMessage
  };

})();