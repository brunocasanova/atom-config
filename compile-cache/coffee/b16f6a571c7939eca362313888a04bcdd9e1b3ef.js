(function() {
  var $, CompositeDisposable, Minimap, MinimapQuickSettingsView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  CompositeDisposable = require('event-kit').CompositeDisposable;

  $ = View.__super__.constructor;

  Minimap = require('./minimap');

  module.exports = MinimapQuickSettingsView = (function(_super) {
    __extends(MinimapQuickSettingsView, _super);

    function MinimapQuickSettingsView() {
      this.selectPreviousItem = __bind(this.selectPreviousItem, this);
      this.selectNextItem = __bind(this.selectNextItem, this);
      this.toggleSelectedItem = __bind(this.toggleSelectedItem, this);
      this.destroy = __bind(this.destroy, this);
      return MinimapQuickSettingsView.__super__.constructor.apply(this, arguments);
    }

    MinimapQuickSettingsView.content = function() {
      return this.div({
        "class": 'select-list popover-list minimap-quick-settings'
      }, (function(_this) {
        return function() {
          _this.input({
            type: 'text',
            "class": 'hidden-input',
            outlet: 'hiddenInput'
          });
          return _this.ol({
            "class": 'list-group mark-active',
            outlet: 'list'
          }, function() {
            _this.li({
              "class": 'separator',
              outlet: 'separator'
            });
            return _this.li({
              "class": (atom.config.get('minimap.displayCodeHighlights') ? 'active' : ''),
              outlet: 'codeHighlights'
            }, 'code-highlights');
          });
        };
      })(this));
    };

    MinimapQuickSettingsView.prototype.selectedItem = null;

    MinimapQuickSettingsView.prototype.initialize = function(minimapView) {
      this.minimapView = minimapView;
      this.subscriptions = new CompositeDisposable;
      this.plugins = {};
      this.subscriptions.add(Minimap.onDidAddPlugin((function(_this) {
        return function(_arg) {
          var name, plugin;
          name = _arg.name, plugin = _arg.plugin;
          return _this.addItemFor(name, plugin);
        };
      })(this)));
      this.subscriptions.add(Minimap.onDidRemovePlugin((function(_this) {
        return function(_arg) {
          var name, plugin;
          name = _arg.name, plugin = _arg.plugin;
          return _this.removeItemFor(name, plugin);
        };
      })(this)));
      this.subscriptions.add(Minimap.onDidActivatePlugin((function(_this) {
        return function(_arg) {
          var name, plugin;
          name = _arg.name, plugin = _arg.plugin;
          return _this.activateItem(name, plugin);
        };
      })(this)));
      this.subscriptions.add(Minimap.onDidDeactivatePlugin((function(_this) {
        return function(_arg) {
          var name, plugin;
          name = _arg.name, plugin = _arg.plugin;
          return _this.deactivateItem(name, plugin);
        };
      })(this)));
      this.on('core:move-up', this.selectPreviousItem);
      this.on('core:move-down', this.selectNextItem);
      this.on('core:cancel', this.destroy);
      this.on('core:validate', this.toggleSelectedItem);
      this.codeHighlights.on('mousedown', (function(_this) {
        return function(e) {
          e.preventDefault();
          _this.minimapView.setDisplayCodeHighlights(!_this.minimapView.displayCodeHighlights);
          return _this.codeHighlights.toggleClass('active', _this.minimapView.displayCodeHighlights);
        };
      })(this));
      this.hiddenInput.on('focusout', this.destroy);
      return this.initList();
    };

    MinimapQuickSettingsView.prototype.attach = function() {
      atom.workspaceView.append(this);
      return this.hiddenInput.focus();
    };

    MinimapQuickSettingsView.prototype.destroy = function() {
      this.trigger('minimap:quick-settings-destroyed');
      this.off();
      this.hiddenInput.off();
      this.codeHighlights.off();
      this.subscriptions.dispose();
      return this.detach();
    };

    MinimapQuickSettingsView.prototype.initList = function() {
      var name, plugin, _ref, _results;
      _ref = Minimap.plugins;
      _results = [];
      for (name in _ref) {
        plugin = _ref[name];
        _results.push(this.addItemFor(name, plugin));
      }
      return _results;
    };

    MinimapQuickSettingsView.prototype.toggleSelectedItem = function() {
      return this.selectedItem.mousedown();
    };

    MinimapQuickSettingsView.prototype.selectNextItem = function() {
      this.selectedItem.removeClass('selected');
      if (this.selectedItem.index() !== this.list.children().length - 1) {
        this.selectedItem = this.selectedItem.next();
        if (this.selectedItem.is('.separator')) {
          this.selectedItem = this.selectedItem.next();
        }
      } else {
        this.selectedItem = this.list.children().first();
      }
      return this.selectedItem.addClass('selected');
    };

    MinimapQuickSettingsView.prototype.selectPreviousItem = function() {
      this.selectedItem.removeClass('selected');
      if (this.selectedItem.index() !== 0) {
        this.selectedItem = this.selectedItem.prev();
        if (this.selectedItem.is('.separator')) {
          this.selectedItem = this.selectedItem.prev();
        }
      } else {
        this.selectedItem = this.list.children().last();
      }
      return this.selectedItem.addClass('selected');
    };

    MinimapQuickSettingsView.prototype.addItemFor = function(name, plugin) {
      var cls, item;
      cls = plugin.isActive() ? 'active' : '';
      item = $("<li class='" + cls + "'>" + name + "</li>");
      item.on('mousedown', (function(_this) {
        return function(e) {
          e.preventDefault();
          return _this.trigger("minimap:toggle-" + name);
        };
      })(this));
      this.plugins[name] = item;
      this.separator.before(item);
      if (this.selectedItem == null) {
        this.selectedItem = item;
        return this.selectedItem.addClass('selected');
      }
    };

    MinimapQuickSettingsView.prototype.removeItemFor = function(name, plugin) {
      this.list.remove(this.plugins[name]);
      return delete this.plugins[name];
    };

    MinimapQuickSettingsView.prototype.activateItem = function(name, plugin) {
      return this.plugins[name].addClass('active');
    };

    MinimapQuickSettingsView.prototype.deactivateItem = function(name, plugin) {
      return this.plugins[name].removeClass('active');
    };

    return MinimapQuickSettingsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtEQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUNDLHNCQUF1QixPQUFBLENBQVEsV0FBUixFQUF2QixtQkFERCxDQUFBOztBQUFBLEVBRUEsQ0FBQSxHQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FGbkIsQ0FBQTs7QUFBQSxFQUlBLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUixDQUpWLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osK0NBQUEsQ0FBQTs7Ozs7Ozs7S0FBQTs7QUFBQSxJQUFBLHdCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxpREFBUDtPQUFMLEVBQStELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDN0QsVUFBQSxLQUFDLENBQUEsS0FBRCxDQUFPO0FBQUEsWUFBQSxJQUFBLEVBQU0sTUFBTjtBQUFBLFlBQWMsT0FBQSxFQUFPLGNBQXJCO0FBQUEsWUFBcUMsTUFBQSxFQUFRLGFBQTdDO1dBQVAsQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxZQUFBLE9BQUEsRUFBTyx3QkFBUDtBQUFBLFlBQWlDLE1BQUEsRUFBUSxNQUF6QztXQUFKLEVBQXFELFNBQUEsR0FBQTtBQUNuRCxZQUFBLEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxjQUFBLE9BQUEsRUFBTyxXQUFQO0FBQUEsY0FBb0IsTUFBQSxFQUFRLFdBQTVCO2FBQUosQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxjQUFBLE9BQUEsRUFB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
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/minimap-quick-settings-view.coffee