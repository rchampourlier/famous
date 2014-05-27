define(function(require, exports, module) {
  var AppView, Engine, FastClick, appView, mainContext;
  FastClick = require('famous/inputs/FastClick');
  Engine = require('famous/core/Engine');
  AppView = require('views/AppView');
  mainContext = Engine.createContext();
  appView = new AppView();
  return mainContext.add(appView);
});
