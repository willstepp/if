var ifw = ifw || {};
ifw.init = function () {
  
  'use strict';

  //setup module message passing
  for (var mod in ifw) {
    if(ifw[mod].init) ifw[mod].init(ifw.messenger, ifw.logger, ifw.utils);
  }

  ifw.messenger.send({
    type:'ifw-msg-diagnostic',
    body:{
      id:'4343433434',
      text:'Just a test'
    }
  });

};
