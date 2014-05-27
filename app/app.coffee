define (require, exports, module) ->

  FastClick = require 'famous/inputs/FastClick'
  Engine    = require 'famous/core/Engine'
  AppView   = require 'views/AppView'

  mainContext = Engine.createContext()

  appView = new AppView()
  mainContext.add appView