(function() {
  var SublimeTabBarView, path, _;

  _ = require('underscore-plus');

  path = require('path');

  SublimeTabBarView = require('./sublime-tab-bar-view');

  module.exports = {
    configDefaults: {
      showIcons: true,
      hideVcsIgnoredFiles: false,
      hideIgnoredNames: false,
      showOnRightSide: false
    },
    treeView: null,
    activate: function(state) {
      var _base;
      this.state = state;
      this.forceSettings();
      this.disableStockPackages();
      this.paneSubscription = atom.workspaceView.eachPaneView((function(_this) {
        return function(paneView) {
          var onPaneViewRemoved, tabBarView;
          tabBarView = new SublimeTabBarView(paneView);
          if (_this.tabBarViews == null) {
            _this.tabBarViews = [];
          }
          _this.tabBarViews.push(tabBarView);
          onPaneViewRemoved = function(event, removedPaneView) {
            if (paneView !== removedPaneView) {
              return;
            }
            _.remove(_this.tabBarViews, tabBarView);
            return atom.workspaceView.off('pane:removed', onPaneViewRemoved);
          };
          atom.workspaceView.on('pane:removed', onPaneViewRemoved);
          return tabBarView;
        };
      })(this));
      if (this.shouldAttach()) {
        if ((_base = this.state).attached == null) {
          _base.attached = true;
        }
      }
      if (this.state.attached) {
        this.createView();
      }
      atom.workspaceView.command('tree-view:show', (function(_this) {
        return function() {
          return _this.createView().show();
        };
      })(this));
      atom.workspaceView.command('tree-view:toggle', (function(_this) {
        return function() {
          return _this.createView().toggle();
        };
      })(this));
      atom.workspaceView.command('tree-view:toggle-focus', (function(_this) {
        return function() {
          return _this.createView().toggleFocus();
        };
      })(this));
      atom.workspaceView.command('tree-view:reveal-active-file', (function(_this) {
        return function() {
          return _this.createView().revealActiveFile();
        };
      })(this));
      atom.workspaceView.command('tree-view:toggle-side', (function(_this) {
        return function() {
          return _this.createView().toggleSide();
        };
      })(this));
      atom.workspaceView.command('tree-view:add-file', (function(_this) {
        return function() {
          return _this.createView().add(true);
        };
      })(this));
      atom.workspaceView.command('tree-view:add-folder', (function(_this) {
        return function() {
          return _this.createView().add(false);
        };
      })(this));
      atom.workspaceView.command('tree-view:duplicate', (function(_this) {
        return function() {
          return _this.createView().copySelectedEntry();
        };
      })(this));
      return atom.workspaceView.command('tree-view:remove', (function(_this) {
        return function() {
          return _this.createView().removeSelectedEntries();
        };
      })(this));
    },
    serialize: function() {
      if (this.treeView != null) {
        return this.treeView.serialize();
      } else {
        return this.state;
      }
    },
    deactivate: function() {
      var tabBarView, _i, _len, _ref, _ref1, _ref2, _ref3, _results;
      if ((_ref = this.treeView) != null) {
        _ref.deactivate();
      }
      this.treeView = null;
      if ((_ref1 = this.paneSubscription) != null) {
        _ref1.off();
      }
      _ref3 = (_ref2 = this.tabBarViews) != null ? _ref2 : [];
      _results = [];
      for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
        tabBarView = _ref3[_i];
        _results.push(tabBarView.remove());
      }
      return _results;
    },
    createView: function() {
      var SublimeTreeView;
      if (this.treeView == null) {
        SublimeTreeView = require('./sublime-tree-view');
        this.treeView = new SublimeTreeView(this.state);
      }
      return this.treeView;
    },
    shouldAttach: function() {
      if (atom.workspace.getActivePaneItem()) {
        return false;
      } else if (path.basename(atom.project.getPath()) === '.git') {
        return atom.project.getPath() === atom.getLoadSettings().pathToOpen;
      } else {
        return true;
      }
    },
    forceSettings: function() {
      this.forceSettingKey('tabs', 'showIcons');
      atom.config.observe('sublime-tabs.' + 'showIcons', (function(_this) {
        return function() {
          return _this.forceSettingKey('tabs', 'showIcons');
        };
      })(this));
      this.forceSettingKey('tree-view', 'hideVcsIgnoredFiles');
      atom.config.observe('sublime-tabs.' + 'hideVcsIgnoredFiles', (function(_this) {
        return function() {
          return _this.forceSettingKey('tree-view', 'hideVcsIgnoredFiles');
        };
      })(this));
      this.forceSettingKey('tree-view', 'hideIgnoredNames');
      atom.config.observe('sublime-tabs.' + 'hideIgnoredNames', (function(_this) {
        return function() {
          return _this.forceSettingKey('tree-view', 'hideIgnoredNames');
        };
      })(this));
      this.forceSettingKey('tree-view', 'showOnRightSide');
      return atom.config.observe('sublime-tabs.' + 'showOnRightSide', (function(_this) {
        return function() {
          return _this.forceSettingKey('tree-view', 'showOnRightSide');
        };
      })(this));
    },
    forceSettingKey: function(masterKey, key) {
      var value;
      value = atom.config.get('sublime-tabs.' + ("" + key));
      if (value == null) {
        value = atom.config.getDefault('sublime-tabs.' + ("" + key));
      }
      return atom.config.set(masterKey + '.' + key, atom.config.get('sublime-tabs.' + ("" + key)));
    },
    disableStockPackages: function() {
      if (atom.packages.isPackageLoaded('tabs')) {
        atom.packages.disablePackage('tabs');
        atom.packages.deactivatePackage('tabs');
        setTimeout(function() {
          return atom.packages.deactivatePackage('tabs');
        }, 2000);
      }
      if (atom.packages.isPackageLoaded('tree-view')) {
        atom.packages.disablePackage('tree-view');
        atom.packages.deactivatePackage('tree-view');
        return setTimeout(function() {
          return atom.packages.deactivatePackage('tree-view');
        }, 2000);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBCQUFBOztBQUFBLEVBQUEsQ0FBQSxHQUFvQixPQUFBLENBQVEsaUJBQVIsQ0FBcEIsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBb0IsT0FBQSxDQUFRLE1BQVIsQ0FEcEIsQ0FBQTs7QUFBQSxFQUVBLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSx3QkFBUixDQUZwQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUVFO0FBQUEsTUFBQSxTQUFBLEVBQVcsSUFBWDtBQUFBLE1BRUEsbUJBQUEsRUFBcUIsS0FGckI7QUFBQSxNQUdBLGdCQUFBLEVBQWtCLEtBSGxCO0FBQUEsTUFJQSxlQUFBLEVBQWlCLEtBSmpCO0tBRkY7QUFBQSxJQVFBLFFBQUEsRUFBVSxJQVJWO0FBQUEsSUFVQSxRQUFBLEVBQVUsU0FBRSxLQUFGLEdBQUE7QUFDUixVQUFBLEtBQUE7QUFBQSxNQURTLElBQUMsQ0FBQSxRQUFBLEtBQ1YsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxvQkFBRCxDQUFBLENBREEsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLGdCQUFELEdBQW9CLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBbkIsQ0FBZ0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsUUFBRCxHQUFBO0FBQ2xELGNBQUEsNkJBQUE7QUFBQSxVQUFBLFVBQUEsR0FBaUIsSUFBQSxpQkFBQSxDQUFrQixRQUFsQixDQUFqQixDQUFBOztZQUNBLEtBQUMsQ0FBQSxjQUFlO1dBRGhCO0FBQUEsVUFFQSxLQUFDLENBQUEsV0FBVyxDQUFDLElBQWIsQ0FBa0IsVUFBbEIsQ0FGQSxDQUFBO0FBQUEsVUFH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
//# sourceURL=/Users/josemoreira/.atom/packages/sublime-tabs/lib/sublime-tabs.coffee