var ifw = ifw || {};
ifw.init = function () {
  
  'use strict';

  for (var mod in ifw) {
    if(ifw[mod].init) ifw[mod].init(ifw.messenger, ifw.logger, ifw.utils);
  }

  ifw.app.start();

};
