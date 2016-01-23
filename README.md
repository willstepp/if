#IF

##TODO

-) Persist story in localStorage, using save and load functions
-) Display story section in edit area
-) Render story tree
-) Create links to existing and new sections
-) Export story as JSON
-) Export story as HTML
-) Export story as PDF
-) Export story as ePub
-) Export story as Kindle


What if duplicates are special sections:

{
  id:'32222222'
  ref:'232323232323',
  parent:'343434343434'
}

Doing this, you don't duplicate content and allow the node to be aware of its 
location in the tree.

Text is Markdown, where the links in the format of [text](<section id>).

Use Vue.js for both tree and markdown editor