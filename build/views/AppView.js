define(function(require, exports, module) {
  var AppView, PageView, StateModifier, Surface, Transform, View, _createPageView, _setListeners;
  View = require('famous/core/View');
  Surface = require('famous/core/Surface');
  Transform = require('famous/core/Transform');
  StateModifier = require('famous/modifiers/StateModifier');
  PageView = require('views/PageView');
  AppView = function() {
    View.apply(this, arguments);
    this.menuToggle = false;
    _createPageView.call(this);
    _setListeners.call(this);
    return false;
  };
  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;
  AppView.prototype.toggleMenu = function() {
    if (this.menuToggle) {
      this.slideLeft();
    } else {
      this.slideRight();
    }
    return this.menuToggle = !this.menuToggle;
  };
  AppView.prototype.slideLeft = function() {
    return this.pageModifier.setTransform(Transform.translate(0, 0, 0), this.options.transition);
  };
  AppView.prototype.slideRight = function() {
    return this.pageModifier.setTransform(Transform.translate(this.options.openPosition, 0, 0), this.options.transition);
  };
  AppView.DEFAULT_OPTIONS = {
    openPosition: 276,
    transition: {
      duration: 300,
      curve: 'easeOut'
    }
  };
  _createPageView = function() {
    this.pageView = new PageView();
    this.pageModifier = new StateModifier();
    return this.add(this.pageModifier).add(this.pageView);
  };
  _setListeners = function() {
    return this.pageView.on('menuToggle', this.toggleMenu.bind(this));
  };
  return module.exports = AppView;
});
