define(function(require, exports, module) {
  var HeaderFooter, ImageSurface, PageView, StateModifier, Surface, Transform, View, _createBody, _createHeader, _createLayout, _setListeners;
  View = require('famous/core/View');
  Surface = require('famous/core/Surface');
  Transform = require('famous/core/Transform');
  StateModifier = require('famous/modifiers/StateModifier');
  HeaderFooter = require('famous/views/HeaderFooterLayout');
  ImageSurface = require('famous/surfaces/ImageSurface');
  PageView = function() {
    View.apply(this, arguments);
    _createLayout.call(this);
    _createHeader.call(this);
    _createBody.call(this);
    _setListeners.call(this);
    return false;
  };
  PageView.prototype = Object.create(View.prototype);
  PageView.prototype.constructor = PageView;
  PageView.DEFAULT_OPTIONS = {
    headerSize: 44
  };
  _createLayout = function() {
    var layoutModifier;
    this.layout = new HeaderFooter({
      headerSize: this.options.headerSize
    });
    layoutModifier = new StateModifier({
      transform: Transform.translate(0, 0, 0.1)
    });
    return this.add(layoutModifier).add(this.layout);
  };
  _createHeader = function() {
    var backgroundModifier, backgroundSurface, hamburgerModifier, iconModifier, iconSurface, searchModifier, searchSurface;
    backgroundSurface = new Surface({
      properties: {
        backgroundColor: 'black'
      }
    });
    backgroundModifier = new StateModifier({
      transform: Transform.behind
    });
    this.hamburgerSurface = new ImageSurface({
      size: [44, 44],
      content: 'img/hamburger.png'
    });
    searchSurface = new ImageSurface({
      size: [234, 44],
      content: 'img/search.png'
    });
    iconSurface = new ImageSurface({
      size: [44, 44],
      content: 'img/icon.png'
    });
    hamburgerModifier = new StateModifier({
      origin: [0, 0.5],
      align: [0, 0.5]
    });
    searchModifier = new StateModifier({
      origin: [0.5, 0.5],
      align: [0.5, 0.5]
    });
    iconModifier = new StateModifier({
      origin: [1, 0.5],
      align: [1, 0.5]
    });
    this.layout.header.add(backgroundModifier).add(backgroundSurface);
    this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
    this.layout.header.add(searchModifier).add(searchSurface);
    return this.layout.header.add(iconModifier).add(iconSurface);
  };
  _createBody = function() {
    var bodySurface;
    bodySurface = new ImageSurface({
      size: [void 0, true],
      content: 'img/body.png'
    });
    return this.layout.content.add(bodySurface);
  };
  _setListeners = function() {
    return this.hamburgerSurface.on('click', (function(_this) {
      return function() {
        return _this._eventOutput.emit('menuToggle');
      };
    })(this));
  };
  return module.exports = PageView;
});
