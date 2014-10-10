(function() {
  var $, TabView, View, path, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  _ = require('underscore-plus');

  path = require('path');

  module.exports = TabView = (function(_super) {
    __extends(TabView, _super);

    function TabView() {
      return TabView.__super__.constructor.apply(this, arguments);
    }

    TabView.content = function() {
      return this.li({
        "class": 'tab sortable'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'title',
            outlet: 'title'
          });
          return _this.div({
            "class": 'close-icon'
          });
        };
      })(this));
    };

    TabView.prototype.initialize = function(item, pane) {
      var _base, _base1, _base2;
      this.item = item;
      this.pane = pane;
      if (typeof (_base = this.item).on === "function") {
        _base.on('title-changed', (function(_this) {
          return function() {
            _this.updateTitle();
            return _this.updateTooltip();
          };
        })(this));
      }
      if (typeof (_base1 = this.item).on === "function") {
        _base1.on('icon-changed', (function(_this) {
          return function() {
            return _this.updateIcon();
          };
        })(this));
      }
      if (typeof (_base2 = this.item).on === "function") {
        _base2.on('modified-status-changed', (function(_this) {
          return function() {
            return _this.updateModifiedStatus();
          };
        })(this));
      }
      this.subscribe(atom.config.observe('tabs.showIcons', (function(_this) {
        return function() {
          return _this.updateIconVisibility();
        };
      })(this)));
      this.updateTitle();
      this.updateIcon();
      this.updateModifiedStatus();
      return this.updateTooltip();
    };

    TabView.prototype.updateTooltip = function() {
      var itemPath, _base;
      this.destroyTooltip();
      if (itemPath = typeof (_base = this.item).getPath === "function" ? _base.getPath() : void 0) {
        return this.setTooltip({
          title: _.escape(itemPath),
          delay: {
            show: 2000,
            hide: 100
          },
          placement: 'bottom'
        });
      }
    };

    TabView.prototype.beforeRemove = function() {
      return this.destroyTooltip();
    };

    TabView.prototype.updateTitle = function() {
      var tab, title, useLongTitle, _base, _i, _len, _ref1, _ref2;
      if (this.updatingTitle) {
        return;
      }
      this.updatingTitle = true;
      title = this.item.getTitle();
      useLongTitle = false;
      _ref1 = this.getSiblingTabs();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        tab = _ref1[_i];
        if (tab.item.getTitle() === title) {
          tab.updateTitle();
          useLongTitle = true;
        }
      }
      if (useLongTitle) {
        title = (_ref2 = typeof (_base = this.item).getLongTitle === "function" ? _base.getLongTitle() : void 0) != null ? _ref2 : title;
      }
      this.title.text(title);
      return this.updatingTitle = false;
    };

    TabView.prototype.updateIcon = function() {
      var _base;
      if (this.iconName) {
        this.title.removeClass("icon icon-" + this.iconName);
      }
      if (this.iconName = typeof (_base = this.item).getIconName === "function" ? _base.getIconName() : void 0) {
        return this.title.addClass("icon icon-" + this.iconName);
      }
    };

    TabView.prototype.getSiblingTabs = function() {
      return this.siblings('.tab').views();
    };

    TabView.prototype.updateIconVisibility = function() {
      if (atom.config.get("tabs.showIcons")) {
        return this.title.removeClass("hide-icon");
      } else {
        return this.title.addClass("hide-icon");
      }
    };

    TabView.prototype.updateModifiedStatus = function() {
      var _base;
      if (typeof (_base = this.item).isModified === "function" ? _base.isModified() : void 0) {
        if (!this.isModified) {
          this.addClass('modified');
        }
        return this.isModified = true;
      } else {
        if (this.isModified) {
          this.removeClass('modified');
        }
        return this.isModified = false;
      }
    };

    return TabView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFZLE9BQUEsQ0FBUSxNQUFSLENBQVosRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FESixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiw4QkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxPQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxRQUFBLE9BQUEsRUFBTyxjQUFQO09BQUosRUFBMkIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN6QixVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxPQUFQO0FBQUEsWUFBZ0IsTUFBQSxFQUFRLE9BQXhCO1dBQUwsQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxZQUFQO1dBQUwsRUFGeUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEzQixFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHNCQUtBLFVBQUEsR0FBWSxTQUFFLElBQUYsRUFBUyxJQUFULEdBQUE7QUFDVixVQUFBLHFCQUFBO0FBQUEsTUFEVyxJQUFDLENBQUEsT0FBQSxJQUNaLENBQUE7QUFBQSxNQURrQixJQUFDLENBQUEsT0FBQSxJQUNuQixDQUFBOzthQUFLLENBQUMsR0FBSSxpQkFBaUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFB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
//# sourceURL=/Users/josemoreira/.atom/packages/sublime-tabs/lib/tabs/tab-view.coffee