#IF

##TODO

* ~~Persist story in localStorage, using save and load functions~~
* ~~Create UI state machine to transition views~~
* Display story section in edit area
* Render story tree
* Add ability to add passage to story
* Create links to existing and new sections
* Export story as JSON
* Export story as HTML
* Export story as PDF
* Export story as ePub
* Export story as Kindle


Doing this, you don't duplicate content and allow the node to be aware of its 
location in the tree.

Text is Markdown, where the links in the format of `[text](<section id>)`.

Use Vue.js for both tree and markdown editor

1) Generate a nav for each new section, then either a new section or an existing 
   one from the list of existing sections. You can choose whether to show a back 
   button and the text to display on the nav (parent). You can edit the section itself.
   The benefit of this is that you can easily generate multiple entry points to the same 
   section, with an easy reference in the data model to go back if required.

```
{
  "title":"Fetus",
  "author":"Daniel Stepp",
  "created":234324323342,
  "updated":434343434334,
  "start":"if-nav-1453520588",
  "navs":{
    "if-nav-1453520588":{
      "section":"if-sec-1453520588",
      "parent": {
        "id":"if-nav-342342423",
        "text":"Go back now!",
        "show":true
      }
    },
    "if-nav-342342423":{
      "section":"if-sec-3434343434",
      "parent": {
        "id":"if-nav-1453520588",
        "text":null,
        "show":false
      }
    }
  },
  "sections": {
    "if-sec-1453520588": {
      "text":"The man walked [through the woods](if-nav-1453524434), or a place that gave him the impression of woods, though there were no trees, no grass, nor even any dry leaves on the ground. There were shapes and structures (organic?) that arranged themselves into things familiar from the corner of his eye but whenever he focused on them they scurried immediately out of his periphery. The man could not remember how he had begun the journey that had brought him here. He could not remember the place he left from. He could not remember his name. Yet there were clues that connected him back to his former self and he set his mind to not forget them too. For example he knew there was such a thing as woods and that this place was not one, though it seemed to want him to think it was. He also knew it was a bit insane to think a landscape as having intentions, good or bad. Yet this was the place he found himself."
    },
    "if-sec-234343434": {
      "text":"The woods were dark and there was a frightening stillness in the wind."
    }
  ]
}
```


Anytime the text changes, update nav/passage link model. There are a few scenarios:

1) The link in the current passage has no corresponding nav. So scan the existing 
   passage names for a match and if you find one create a nav with a 
   reference to the existing passage. If the passage itself does not exist, create 
   that too.

2) The link in the current passage matches a nav. Do nothing.

3) A nav in the current passage has no corresponding link. Delete the nav and 
   scan all remaining navs for references to the passage it references. If 1) there 
   is no content in the passage AND 2) you cannot find another nav which references it,
   then remove the passage also.

4) Update the nav links below the edit view for the current passage. Show 'new' passages 
   in a different color (green?), so it will be obvious what needs edited.


To do the above, you are going to need both the passage text (converted back to markdown?), 
as well as a parsed list of all navs->passages for the current passage. This way before you 
display the passage text for editing, you can replace all references to (ifw-nav-343434343) with 
the friendly name of the passage, as well as have the data you need to do steps 1-3 above at each 
edit.

When the application starts up, generate a friendly-name lookup table from passage names -> passages. 
The data does not need this, only UI.


var orig = CodeMirror.hint.javascript;
CodeMirror.hint.javascript = function(cm) {
  var inner = orig(cm) || {from: cm.getCursor(), to: cm.getCursor(), list: []};
  inner.list.push("bozo");
  return inner.
};
