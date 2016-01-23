story = null;

var createStoryButton = document.getElementById('ui-create-story-button');
createStoryButton.addEventListener("click", function (e) {
  e.preventDefault();

  var title = document.getElementById('ui-create-story-title').value;
  var author = document.getElementById('ui-create-story-author').value;

  initStory({
    title:title,
    author:author
  });

  setStoryTitle(story);
  setStoryTree(story.start);
  setStorySection(story.start);

  console.log(story);
  showView('edit');
});

function initStory (section) {
  var id = uuid();
  story = {
    title:section.title,
    author:section.author,
    start:id,
    sections:{}
  };
  addStorySection(id, '');
}

function addStorySection (id, text) {
  story.sections[id] = { id:id, text:text };
}

function setStoryTitle (story) {
  document.getElementById('ui-story-title').textContent = story.title + ' by ' + story.author;
}

function setStoryTree (id) {

}

function setStorySection (id) {
  
}

function uuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = crypto.getRandomValues(new Uint8Array(1))[0]%16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function showView (view) {

  switch (view) {
    case 'new':
      document.getElementById('ui-new-story-content').classList.remove('hide');
      document.getElementById('ui-edit-story-content').classList.add('hide');
      break;
    case 'edit':
      document.getElementById('ui-new-story-content').classList.add('hide');
      document.getElementById('ui-edit-story-content').classList.remove('hide');
      break;
    default:
      break;
  }

}

showView(story ? 'edit' : 'new');