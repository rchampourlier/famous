define (require, exports, module) ->

  View          = require 'famous/core/View'
  Surface       = require 'famous/core/Surface'
  Transform     = require 'famous/core/Transform'
  StateModifier = require 'famous/modifiers/StateModifier'
  PageView      = require 'views/PageView'

  AppView = ->
    View.apply @, arguments
    @menuToggle = false
    _createPageView.call @
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

  _setListeners = ->
    @pageView.on 'menuToggle', @toggleMenu.bind(@)

  module.exports = AppView