define (require, exports, module) ->

  View          = require 'famous/core/View'
  Surface       = require 'famous/core/Surface'
  Transform     = require 'famous/core/Transform'
  StateModifier = require 'famous/modifiers/StateModifier'
  PageView      = require 'views/PageView'
  MenuView      = require 'views/MenuView'
  StripData     = require 'data/StripData'

  AppView = ->
    View.apply @, arguments
    @menuToggle = false
    _createPageView.call @
    _createMenuView.call @
    _setListeners.call @
    false

  AppView.prototype = Object.create View.prototype
  AppView.prototype.constructor = AppView;

  AppView.prototype.toggleMenu = ->
    if @menuToggle
      @.slideLeft()
    else
      @.slideRight()
    @menuToggle = !@menuToggle

  AppView.prototype.slideLeft = ->
    @pageModifier.setTransform Transform.translate(0, 0, 0), @options.transition

  AppView.prototype.slideRight = ->
    @pageModifier.setTransform Transform.translate(@options.openPosition, 0, 0), @options.transition

  AppView.DEFAULT_OPTIONS =
    openPosition: 276
    transition:
      duration: 300
      curve: 'easeOut'

  _createPageView = ->
    @pageView = new PageView()
    @pageModifier = new StateModifier()
    @.add(@pageModifier).add(@pageView)

  _createMenuView = ->
    @menuView = new MenuView
      stripData: StripData
    menuModifier = new StateModifier
      transform: Transform.behind
    @.add(menuModifier).add(@menuView)

  _setListeners = ->
    @pageView.on 'menuToggle', @toggleMenu.bind(@)

  module.exports = AppView