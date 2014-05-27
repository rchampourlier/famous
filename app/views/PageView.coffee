define (require, exports, module) ->

  View          = require 'famous/core/View'
  Surface       = require 'famous/core/Surface'
  Transform     = require 'famous/core/Transform'
  StateModifier = require 'famous/modifiers/StateModifier'
  HeaderFooter  = require 'famous/views/HeaderFooterLayout'
  ImageSurface  = require 'famous/surfaces/ImageSurface'

  PageView = ->
    View.apply @, arguments
    _createLayout.call @
    _createHeader.call @
    _createBody.call @
    _setListeners.call @
    false

  PageView.prototype = Object.create View.prototype
  PageView.prototype.constructor = PageView

  PageView.DEFAULT_OPTIONS =
    headerSize: 44

  _createLayout = ->
    @layout = new HeaderFooter
      headerSize: @options.headerSize

    layoutModifier = new StateModifier
      transform: Transform.translate(0, 0, 0.1)

    @.add(layoutModifier).add(@layout)

  _createHeader = ->
    backgroundSurface = new Surface
      properties:
        backgroundColor: 'black'

    backgroundModifier = new StateModifier
      transform: Transform.behind

    @hamburgerSurface = new ImageSurface
      size: [44, 44]
      content: 'img/hamburger.png'

    searchSurface = new ImageSurface
      size: [234, 44]
      content: 'img/search.png'

    iconSurface = new ImageSurface
      size: [44, 44]
      content: 'img/icon.png'

    hamburgerModifier = new StateModifier
      origin: [0, 0.5]
      align: [0, 0.5]

    searchModifier = new StateModifier
      origin: [0.5, 0.5]
      align: [0.5, 0.5]

    iconModifier = new StateModifier
      origin: [1, 0.5]
      align: [1, 0.5]

    @layout.header.add(backgroundModifier).add(backgroundSurface)
    @layout.header.add(hamburgerModifier).add(@hamburgerSurface)
    @layout.header.add(searchModifier).add(searchSurface)
    @layout.header.add(iconModifier).add(iconSurface)

  _createBody = ->
    bodySurface = new ImageSurface
      size: [undefined, true]
      content: 'img/body.png'

    @layout.content.add(bodySurface)

  _setListeners = ->
    @hamburgerSurface.on 'click', =>
      @_eventOutput.emit 'menuToggle'

  module.exports = PageView