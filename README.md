#IF

##TODO

* Persist story in localStorage, using save and load functions
* Display story section in edit area
* Render story tree
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
