define(function(require, exports, module) {
  var ImageSurface, StateModifier, StripView, Surface, Transform, View, _createComponent;
  View = require('famous/core/View');
  Surface = require('famous/core/Surface');
  Transform = require('famous/core/Transform');
  StateModifier = require('famous/modifiers/StateModifier');
  ImageSurface = require('famous/surfaces/ImageSurface');
  StripView = function() {
    var component, _i, _len, _ref;
    console.log('StripView construct');
    View.apply(this, arguments);
    _ref = ['background', 'icon', 'title'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      component = _ref[_i];
      _createComponent[component].call(this);
    }
    return false;
  };
  StripView.prototype = Object.create(View.prototype);
  StripView.prototype.constructor = StripView;
  StripView.DEFAULT_OPTIONS = {
    width: 320,
    height: 55,
    angle: -0.2,
    iconSize: 32,
    fontSize: 26,
    iconUrl: 'img/strip-icons/famous.png',
    title: 'Famo.us'
  };
  _createComponent = {
    background: function() {
      var backgroundSurface, rotateModifier, skewModifier;
      backgroundSurface = new Surface({
        size: [this.options.width, this.options.height],
        properties: {
          backgroundColor: 'black',
          boxShadow: '0 0 1px rgba(0,0,0,1)'
        }
      });
      rotateModifier = new StateModifier({
        transform: Transform.rotateZ(this.options.angle)
      });
      skewModifier = new StateModifier({
        transform: Transform.skew(0, 0, this.options.angle)
      });
      return this.add(rotateModifier).add(skewModifier).add(backgroundSurface);
    },
    icon: function() {
      var iconModifier, iconSurface;
      iconSurface = new ImageSurface({
        size: [this.options.iconSize, this.options.iconSize],
        content: this.options.iconUrl,
        properties: {
          pointerEvents: 'none'
        }
      });
      iconModifier = new StateModifier({
        transform: Transform.translate(24, 2, 0)
      });
      return this.add(iconModifier).add(iconSurface);
    },
    title: function() {
      var titleModifier, titleSurface;
      titleSurface = new Surface({
        size: [true, true],
        content: this.options.title,
        properties: {
          color: 'white',
          fontSize: this.options.fontSize + 'px',
          textTransform: 'uppercase',
          pointerEvents: 'none'
        }
      });
      titleModifier = new StateModifier({
        transform: Transform.thenMove(Transform.rotateZ(this.options.angle), [75, -5, 0])
      });
      return this.add(titleModifier).add(titleSurface);
    }
  };
  return module.exports = StripView;
});
