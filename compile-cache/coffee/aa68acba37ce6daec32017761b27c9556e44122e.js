(function() {
  var $, SublimeTabBarView, SublimeTabView, TabBarView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $ = require('atom').$;

  TabBarView = require('./tabs/tab-bar-view');

  SublimeTabView = require('./sublime-tab-view');

  module.exports = SublimeTabBarView = (function(_super) {
    __extends(SublimeTabBarView, _super);

    function SublimeTabBarView() {
      return SublimeTabBarView.__super__.constructor.apply(this, arguments);
    }

    SublimeTabBarView.prototype.initialize = function(pane) {
      this.pane = pane;
      this.considerTemp = false;
      SublimeTabBarView.__super__.initialize.call(this, this.pane);
      if (this.openPermanent == null) {
        this.openPermanent = [];
      }
      this.subscribe($(window), 'window:open-path', (function(_this) {
        return function(event, _arg) {
          var path, pathToOpen, _ref, _ref1;
          pathToOpen = _arg.pathToOpen;
          path = (_ref = (_ref1 = atom.project) != null ? _ref1.relativize(pathToOpen) : void 0) != null ? _ref : pathToOpen;
          if (__indexOf.call(_this.openPermanent, pathToOpen) < 0) {
            return _this.openPermanent.push(pathToOpen);
          }
        };
      })(this));
      this.subscribe(atom.workspaceView, 'core:save', function() {
        var tab;
        tab = atom.workspaceView.find('.tab.active');
        if (tab.is('.temp')) {
          return tab.removeClass('temp');
        }
      });
      this.considerTemp = true;
      return this.on('dblclick', '.tab', function(_arg) {
        var tab, target;
        target = _arg.target;
        tab = $(target).closest('.tab').view();
        if (tab.is('.temp')) {
          tab.removeClass('temp');
        }
        return false;
      });
    };

    SublimeTabBarView.prototype.addTabForItem = function(item, index) {
      var tab, tabView, _i, _len, _ref;
      _ref = this.getTabs();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tab = _ref[_i];
        if (tab.is('.temp')) {
          this.closeTab(tab);
        }
      }
      tabView = new SublimeTabView(item, this.pane, this.openPermanent, this.considerTemp);
      this.insertTabAtIndex(tabView, index);
      return this.updateActiveTab();
    };

    return SublimeTabBarView;

  })(TabBarView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdEQUFBO0lBQUE7O3lKQUFBOztBQUFBLEVBQUMsSUFBaUIsT0FBQSxDQUFRLE1BQVIsRUFBakIsQ0FBRCxDQUFBOztBQUFBLEVBRUEsVUFBQSxHQUFrQixPQUFBLENBQVEscUJBQVIsQ0FGbEIsQ0FBQTs7QUFBQSxFQUdBLGNBQUEsR0FBa0IsT0FBQSxDQUFRLG9CQUFSLENBSGxCLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosd0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGdDQUFBLFVBQUEsR0FBWSxTQUFFLElBQUYsR0FBQTtBQUlWLE1BSlcsSUFBQyxDQUFBLE9BQUEsSUFJWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsWUFBRCxHQUFnQixLQUFoQixDQUFBO0FBQUEsTUFFQSxrREFBTSxJQUFDLENBQUEsSUFBUCxDQUZBLENBQUE7O1FBR0EsSUFBQyxDQUFBLGdCQUFpQjtPQUhsQjtBQUFBLE1BSUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxDQUFBLENBQUUsTUFBRixDQUFYLEVBQXNCLGtCQUF0QixFQUEwQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxLQUFELEVBQVEsSUFBUixHQUFBO0FBQ3hDLGNBQUEsNkJBQUE7QUFBQSxVQURpRCxhQUFELEtBQUMsVUFDakQsQ0FBQTtBQUFBLFVBQUEsSUFBQSxvR0FBOEMsVUFBOUMsQ0FBQTtBQUNBLFVBQUEsSUFBc0MsZUFBYyxLQUFDLENBQUEsYUFBZixFQUFBLFVBQUEsS0FBdEM7bUJBQUEsS0FBQyxDQUFBLGFBQWEsQ0FBQyxJQUFmLENBQW9CLFVBQXBCLEVBQUE7V0FGd0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQyxDQUpBLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxTQUFELENBQVcsSUFBSSxDQUFDLGFBQWhCLEVBQStCLFdBQS9CLEVBQTRDLFNBQUEsR0FBQTtBQUMxQyxZQUFBLEdBQUE7QUFBQSxRQUFBLEdBQUEsR0FBTSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQW5CLENBQXdCLGFBQXhCLENBQU4sQ0FBQTtBQUNBLFFBQUEsSUFBMkIsR0FBRyxDQUFDLEVBQUosQ0FBTyxPQUFQLENBQTNCO2lCQUFBLEdBQUcsQ0FBQyxXQUFKLENBQWdCLE1BQWhCLEVBQUE7U0FGMEM7TUFBQSxDQUE1QyxDQVJBLENBQUE7QUFBQSxNQWFBLElBQUMsQ0FBQSxZQUFELEdBQWdCLElBYmhCLENBQUE7YUFlQSxJQUFDLENBQUEsRUFBRCxDQUFJLFVBQUosRUFBZ0IsTUFBaEIsRUFBd0IsU0FBQyxJQUFELEdBQUE7QUFDdEIsWUFBQSxXQUFBO0FBQUEsUUFEd0IsU0FBRCxLQUFDLE1BQ3hCLENBQUE7QUFBQSxRQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsT0FBVixDQUFrQixNQUFsQixDQUF5QixDQUFDLElBQTFCLENBQUEsQ0FBTixDQUFBO0FBQ0EsUUFBQSxJQUEyQixHQUFHLENBQUMsRUFBSixDQUFPLE9BQVAsQ0FBM0I7QUFBQSxVQUFBLEdBQUcsQ0FBQyxXQUFKLENBQWdCLE1BQWhCLENBQUEsQ0FBQTtTQURBO2VBRUEsTUFIc0I7TUFBQSxDQUF4QixFQW5CVTtJQUFBLENBQVosQ0FBQTs7QUFBQSxnQ0F3QkEsYUFBQSxHQUFlLFNBQUMsSUFBRCxFQUFPLEtBQVAsR0FBQTtBQUNiLFVBQUEsNEJBQUE7QUFBQTtBQUFBLFdBQUEsMkNBQUE7dUJBQUE7QUFDRSxRQUFBLElBQWtCLEdBQUcsQ0FBQyxFQUFKLENBQU8sT0FBUCxDQUFsQjtBQUFBLFVBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxHQUFWLENBQUEsQ0FBQTtTQURGO0FBQUEsT0FBQTtBQUFBLE1BR0EsT0FBQSxHQUFjLElBQUEsY0FBQSxDQUFlLElBQWYsRUFBcUIsSUFBQyxDQUFBLElBQXRCLEVBQTRCLElBQUMsQ0FBQSxhQUE3QixFQUE0QyxJQUFDLENBQUEsWUFBN0MsQ0FIZCxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsT0FBbEIsRUFBMkIsS0FBM0IsQ0FKQSxDQUFBO2FBS0EsSUFBQyxDQUFBLGVBQUQsQ0FBQSxFQU5hO0lBQUEsQ0F4QmYsQ0FBQTs7NkJBQUE7O0tBRjhCLFdBTmhDLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/sublime-tabs/lib/sublime-tab-bar-view.coffee