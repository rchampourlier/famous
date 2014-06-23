define(function(require, exports, module) {
  var MenuView, StateModifier, StripView, Surface, Transform, View, _createStripViews;
  View = require('famous/core/View');
  Surface = require('famous/core/Surface');
  Transform = require('famous/core/Transform');
  StateModifier = require('famous/modifiers/StateModifier');
  StripView = require('views/StripView');
  MenuView = function() {
    View.apply(this, arguments);
    _createStripViews.call(this);
    return false;
  };
  MenuView.prototype = Object.create(View.prototype);
  MenuView.prototype.constructor = MenuView;
  MenuView.DEFAULT_OPTIONS = {
    stripData: {},
    topOffset: 37,
    stripOffset: 58
  };
  _createStripViews = function() {
    var stripItemData, stripModifier, stripModifiers, stripView, yOffset, _i, _len, _ref, _results;
    stripModifiers = [];
    yOffset = this.options.topOffset;
    _ref = this.options.stripData;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      stripItemData = _ref[_i];
      console.log('createStripView');
      stripView = new StripView({
        iconUrl: stripItemData.iconUrl,
        title: stripItemData.title
      });
      stripModifier = new StateModifier({
        transform: Transform.translate(0, yOffset, 0)
      });
      stripModifiers.push(stripModifier);
      this.add(stripModifier).add(stripView);
      _results.push(yOffset += this.options.stripOffset);
    }
    return _results;
  };
  return module.exports = MenuView;
});
