define (require, exports, module) ->

  View          = require 'famous/core/View'
  Surface       = require 'famous/core/Surface'
  Transform     = require 'famous/core/Transform'
  StateModifier = require 'famous/modifiers/StateModifier'
  ImageSurface  = require 'famous/surfaces/ImageSurface'

  StripView = ->
    console.log 'StripView construct'
    View.apply @, arguments
    for component in ['background', 'icon', 'title']
      _createComponent[component].call @
    false

  StripView.prototype = Object.create View.prototype
  StripView.prototype.constructor = StripView

  StripView.DEFAULT_OPTIONS =
    width: 320
    height: 55
    angle: -0.2
    iconSize: 32
    fontSize: 26
    iconUrl: 'img/strip-icons/famous.png'
    title: 'Famo.us'

  _createComponent =
    
    background: ->
      backgroundSurface = new Surface
        size: [@options.width, @options.height]
        properties:
          backgroundColor: 'black'
          # on certain devices, a skewed surface can have jagged edges
          # the 1px box-shadow provides some anti-aliasing to soften this
          boxShadow: '0 0 1px rgba(0,0,0,1)'

      rotateModifier = new StateModifier
        transform: Transform.rotateZ(@options.angle)

      skewModifier = new StateModifier
        transform: Transform.skew(0, 0, @options.angle)

      # we're first skewing our surface then rotating it
      @.add(rotateModifier).add(skewModifier).add(backgroundSurface)
    
    icon: ->
      iconSurface = new ImageSurface
        size: [@options.iconSize, @options.iconSize]
        content : @options.iconUrl
        properties:
          pointerEvents: 'none'

      iconModifier = new StateModifier
        # places the icon in the proper location
        transform: Transform.translate(24, 2, 0)

      @.add(iconModifier).add(iconSurface)
    
    title: ->
      titleSurface = new Surface
        size: [true, true]
        content: @options.title
        properties:
          color: 'white'
          fontSize: @options.fontSize + 'px'
          textTransform: 'uppercase'
          pointerEvents : 'none'

      titleModifier = new StateModifier
        transform: Transform.thenMove(Transform.rotateZ(@options.angle), [75, -5, 0])

      @.add(titleModifier).add(titleSurface)

  module.exports = StripView