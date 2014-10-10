(function() {
  var $, SublimeTabView, TabView, path, _,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('underscore-plus');

  path = require('path');

  $ = require('atom').$;

  TabView = require('./tabs/tab-view');

  module.exports = SublimeTabView = (function(_super) {
    __extends(SublimeTabView, _super);

    function SublimeTabView() {
      return SublimeTabView.__super__.constructor.apply(this, arguments);
    }

    SublimeTabView.prototype.initialize = function(item, pane, openPermanent, considerTemporary) {
      var _ref, _ref1;
      this.item = item;
      this.pane = pane;
      if (openPermanent == null) {
        openPermanent = [];
      }
      SublimeTabView.__super__.initialize.call(this, this.item, this.pane);
      if (!considerTemporary) {
        return;
      }
      if ((_ref = this.item.constructor.name) === 'Editor' || _ref === 'ImageEditor' || _ref === 'TextEditor') {
        if (_ref1 = this.item.getPath(), __indexOf.call(openPermanent, _ref1) >= 0) {
          _.remove(openPermanent, this.item.getPath());
        } else {
          this.addClass('temp');
        }
      }
      return atom.workspaceView.command('sublime-tabs:keep-tab', (function(_this) {
        return function() {
          return _this.keepTab();
        };
      })(this));
    };

    SublimeTabView.prototype.updateModifiedStatus = function() {
      var _base;
      SublimeTabView.__super__.updateModifiedStatus.call(this);
      if (this.is('.temp') && (typeof (_base = this.item).isModified === "function" ? _base.isModified() : void 0)) {
        return this.removeClass('temp');
      }
    };

    SublimeTabView.prototype.keepTab = function() {
      if (this.is('.temp')) {
        return this.removeClass('temp');
      }
    };

    return SublimeTabView;

  })(TabView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1DQUFBO0lBQUE7O3lKQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFVLE9BQUEsQ0FBUSxpQkFBUixDQUFWLENBQUE7O0FBQUEsRUFDQSxJQUFBLEdBQVUsT0FBQSxDQUFRLE1BQVIsQ0FEVixDQUFBOztBQUFBLEVBRUMsSUFBUyxPQUFBLENBQVEsTUFBUixFQUFULENBRkQsQ0FBQTs7QUFBQSxFQUdBLE9BQUEsR0FBVSxPQUFBLENBQVEsaUJBQVIsQ0FIVixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSw2QkFBQSxVQUFBLEdBQVksU0FBRSxJQUFGLEVBQVMsSUFBVCxFQUFlLGFBQWYsRUFBaUMsaUJBQWpDLEdBQUE7QUFDVixVQUFBLFdBQUE7QUFBQSxNQURXLElBQUMsQ0FBQSxPQUFBLElBQ1osQ0FBQTtBQUFBLE1BRGtCLElBQUMsQ0FBQSxPQUFBLElBQ25CLENBQUE7O1FBRHlCLGdCQUFjO09BQ3ZDO0FBQUEsTUFBQSwrQ0FBTSxJQUFDLENBQUEsSUFBUCxFQUFhLElBQUMsQ0FBQSxJQUFkLENBQUEsQ0FBQTtBQUNBLE1BQUEsSUFBQSxDQUFBLGlCQUFBO0FBQUEsY0FBQSxDQUFBO09BREE7QUFHQSxNQUFBLFlBQUcsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBbEIsS0FBMkIsUUFBM0IsSUFBQSxJQUFBLEtBQXFDLGFBQXJDLElBQUEsSUFBQSxLQUFvRCxZQUF2RDtBQUNFLFFBQUEsWUFBRyxJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBQSxDQUFBLEVBQUEsZUFBbUIsYUFBbkIsRUFBQSxLQUFBLE1BQUg7QUFDRSxVQUFBLENBQUMsQ0FBQyxNQUFGLENBQVMsYUFBVCxFQUF3QixJQUFDLENBQUEsSUFBSSxDQUFDLE9BQU4sQ0FBQSxDQUF4QixDQUFBLENBREY7U0FBQSxNQUFBO0FBR0UsVUFBQSxJQUFDLENBQUEsUUFBRCxDQUFVLE1BQVYsQ0FBQSxDQUhGO1NBREY7T0FIQTthQVNBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsdUJBQTNCLEVBQW9ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEQsRUFWVTtJQUFBLENBQVosQ0FBQTs7QUFBQSw2QkFZQSxvQkFBQSxHQUFzQixTQUFBLEdBQUE7QUFDcEIsVUFBQSxLQUFBO0FBQUEsTUFBQSx1REFBQSxDQUFBLENBQUE7QUFDQSxNQUFBLElBQXdCLElBQUMsQ0FBQSxFQUFELENBQUksT0FBSixDQUFBLGlFQUFzQixDQUFDLHNCQUEvQztlQUFBLElBQUMsQ0FBQSxXQUFELENBQWEsTUFBYixFQUFBO09BRm9CO0lBQUEsQ0FadEIsQ0FBQTs7QUFBQSw2QkFnQkEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBd0IsSUFBQyxDQUFBLEVBQUQsQ0FBSSxPQUFKLENBQXhCO2VBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBYSxNQUFiLEVBQUE7T0FETztJQUFBLENBaEJULENBQUE7OzBCQUFBOztLQUYyQixRQU43QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/sublime-tabs/lib/sublime-tab-view.coffee