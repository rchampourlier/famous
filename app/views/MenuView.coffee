define (require, exports, module) ->

  View          = require 'famous/core/View'
  Surface       = require 'famous/core/Surface'
  Transform     = require 'famous/core/Transform'
  StateModifier = require 'famous/modifiers/StateModifier'
  StripView     = require 'views/StripView'

  MenuView = ->
    View.apply @, arguments
    _createStripViews.call @
    false

  MenuView.prototype = Object.create View.prototype
  MenuView.prototype.constructor = MenuView

  MenuView.DEFAULT_OPTIONS =
    stripData: {}
    topOffset: 37
    stripOffset: 58

  _createStripViews = ->
    stripModifiers = []
    yOffset = @options.topOffset

    for stripItemData in @options.stripData
      console.log 'createStripView'
      
      stripView = new StripView
        iconUrl: stripItemData.iconUrl
        title: stripItemData.title

      stripModifier = new StateModifier
        transform: Transform.translate(0, yOffset, 0)

      stripModifiers.push stripModifier
      @.add(stripModifier).add(stripView)

      yOffset += @options.stripOffset

  module.exports = MenuView