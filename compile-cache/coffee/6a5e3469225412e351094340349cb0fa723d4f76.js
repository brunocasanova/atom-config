(function() {
  var Mixin, PluginManagement,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Mixin = require('mixto');

  module.exports = PluginManagement = (function(_super) {
    __extends(PluginManagement, _super);

    function PluginManagement() {
      return PluginManagement.__super__.constructor.apply(this, arguments);
    }

    PluginManagement.prototype.plugins = {};

    PluginManagement.prototype.registerPlugin = function(name, plugin) {
      var event;
      this.plugins[name] = plugin;
      event = {
        name: name,
        plugin: plugin
      };
      this.emit('plugin:added', event);
      this.emitter.emit('did-add-plugin', event);
      if (atom.config.get('minimap.displayPluginsControls')) {
        this.registerPluginControls(name, plugin);
      }
      return this.updatesPluginActivationState(name);
    };

    PluginManagement.prototype.unregisterPlugin = function(name) {
      var event, plugin;
      plugin = this.plugins[name];
      if (atom.config.get('minimap.displayPluginsControls')) {
        this.unregisterPluginControls(name);
      }
      delete this.plugins[name];
      event = {
        name: name,
        plugin: plugin
      };
      this.emit('plugin:removed', event);
      return this.emitter.emit('did-remove-plugin', event);
    };

    PluginManagement.prototype.updatesPluginActivationState = function(name) {
      var event, plugin, pluginActive, settingActive;
      plugin = this.plugins[name];
      pluginActive = plugin.isActive();
      settingActive = atom.config.get("minimap.plugins." + name);
      event = {
        name: name,
        plugin: plugin
      };
      if (settingActive && !pluginActive) {
        plugin.activatePlugin();
        this.emit('plugin:activated', event);
        return this.emitter.emit('did-activate-plugin', event);
      } else if (pluginActive && !settingActive) {
        plugin.deactivatePlugin();
        this.emit('plugin:deactivated', event);
        return this.emitter.emit('did-deactivate-plugin', event);
      }
    };

    PluginManagement.prototype.registerPluginControls = function(name, plugin) {
      var settingsKey;
      settingsKey = "minimap.plugins." + name;
      this.config.plugins.properties[name] = {
        type: 'boolean',
        "default": true
      };
      if (atom.config.get(settingsKey) == null) {
        atom.config.set(settingsKey, true);
      }
      atom.config.observe(settingsKey, (function(_this) {
        return function() {
          return _this.updatesPluginActivationState(name);
        };
      })(this));
      return atom.workspaceView.command("minimap:toggle-" + name, (function(_this) {
        return function() {
          atom.config.set(settingsKey, !atom.config.get(settingsKey));
          return _this.updatesPluginActivationState(name);
        };
      })(this));
    };

    PluginManagement.prototype.unregisterPluginControls = function(name) {
      atom.config.unobserve("minimap.plugins." + name);
      atom.workspaceView.off("minimap:toggle-" + name);
      return delete this.config.plugins.properties[name];
    };

    return PluginManagement;

  })(Mixin);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FBUixDQUFBOztBQUFBLEVBYUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLHVDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSwrQkFBQSxPQUFBLEdBQVMsRUFBVCxDQUFBOztBQUFBLCtCQVFBLGNBQUEsR0FBZ0IsU0FBQyxJQUFELEVBQU8sTUFBUCxHQUFBO0FBQ2QsVUFBQSxLQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBUSxDQUFBLElBQUEsQ0FBVCxHQUFpQixNQUFqQixDQUFBO0FBQUEsTUFFQSxLQUFBLEdBQVE7QUFBQSxRQUFDLE1BQUEsSUFBRDtBQUFBLFFBQU8sUUFBQSxNQUFQO09BRlIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxjQUFOLEVBQXNCLEtBQXRCLENBSEEsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsZ0JBQWQsRUFBZ0MsS0FBaEMsQ0FKQSxDQUFBO0FBTUEsTUFBQSxJQUF5QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsZ0NBQWhCLENBQXpDO0FBQUEsUUFBQSxJQUFDLENBQUEsc0JBQUQsQ0FBd0IsSUFBeEIsRUFBOEIsTUFBOUIsQ0FBQSxDQUFBO09BTkE7YUFRQSxJQUFDLENBQUEsNEJBQUQsQ0FBOEIsSUFBOUIsRUFUYztJQUFBLENBUmhCLENBQUE7O0FBQUEsK0JBc0JBLGdCQUFBLEdBQWtCLFNBQUMsSUFBRCxHQUFBO0FBQ2hCLFVBQUEsYUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUMsQ0FBQSxPQUFRLENBQUEsSUFBQSxDQUFsQixDQUFBO0FBQ0EsTUFBQSxJQUFtQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsZ0NBQWhCLENBQW5DO0FBQUEsUUFBQSxJQUFDLENBQUEsd0JBQUQsQ0FBMEIsSUFBMUIsQ0FBQSxDQUFBO09BREE7QUFBQSxNQUVBLE1BQUEsQ0FBQSxJQUFRLENBQUEsT0FBUSxDQUFBLElBQUEsQ0FGaEIsQ0FBQTtBQUFBLE1BSUEsS0FBQSxHQUFRO0FBQUEsUUFBQyxNQUFBLElBQUQ7QUFBQSxRQUFPLFFBQUEsTUFBUDtPQUpSLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxJQUFELENBQU0sZ0JBQU4sRUFBd0IsS0FBeEIsQ0FMQSxDQUFBO2FBTUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsbUJBQWQsRUFBbUMsS0FBbkMsRUFQZ0I7SUFBQSxDQXRCbEIsQ0FBQTs7QUFBQSwrQkFvQ0EsNEJBQUEsR0FBOEIsU0FBQyxJQUFELEdBQUE7QUFDNUIsVUFBQSwwQ0FBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLElBQUMsQ0FBQSxPQUFRLENBQUEsSUFBQSxDQUFsQixDQUFBO0FBQUEsTUFFQSxZQUFBLEdBQWUsTUFBTSxDQUFDLFFBQVAsQ0FBQSxDQUZmLENBQUE7QUFBQSxNQUdBLGFBQUEsR0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWlCLGtCQUFBLEdBQWlCLElBQWxDLENBSGhCLENBQUE7QUFBQSxNQUtBLEtBQUEsR0FBUTtBQUFBLFFBQUMsTUFBQSxJQUFEO0FBQUEsUUFBTyxRQUFBLE1BQVA7T0FMUixDQUFBO0FBT0EsTUFBQSxJQUFHLGFBQUEsSUFBa0IsQ0FBQSxZQUFyQjtBQUNFLFFBQUEsTUFBTSxDQUFDLGNBQVAsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sa0JBQU4sRUFBMEIsS0FBMUIsQ0FEQSxDQUFBO2VBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMscUJBQWQsRUFBcUMsS0FBckMsRUFIRjtPQUFBLE1BSUssSUFBRyxZQUFBLElBQWlCLENBQUEsYUFBcEI7QUFDSCxRQUFBLE1BQU0sQ0FBQyxnQkFBUCxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBTSxvQkFBTixFQUE0QixLQUE1QixDQURBLENBQUE7ZUFFQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyx1QkFBZCxFQUF1QyxLQUF2QyxFQUhHO09BWnVCO0lBQUEsQ0FwQzlCLENBQUE7O0FBQUEsK0JBMkRBLHNCQUFBLEdBQXdCLFNBQUMsSUFBRCxFQUFPLE1BQVAsR0FBQTtBQUN0QixVQUFBLFdBQUE7QUFBQSxNQUFBLFdBQUEsR0FBZSxrQkFBQSxHQUFpQixJQUFoQyxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFXLENBQUEsSUFBQSxDQUEzQixHQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLElBRFQ7T0FGRixDQUFBO0FBS0EsTUFBQSxJQUEwQyxvQ0FBMUM7QUFBQSxRQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixXQUFoQixFQUE2QixJQUE3QixDQUFBLENBQUE7T0FMQTtBQUFBLE1BT0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLFdBQXBCLEVBQWlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQy9CLEtBQUMsQ0FBQSw0QkFBRCxDQUE4QixJQUE5QixFQUQrQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpDLENBUEEsQ0FBQTthQVVBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBNEIsaUJBQUEsR0FBZ0IsSUFBNUMsRUFBcUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNuRCxVQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixXQUFoQixFQUE2QixDQUFBLElBQVEsQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixXQUFoQixDQUFqQyxDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLDRCQUFELENBQThCLElBQTlCLEVBRm1EO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckQsRUFYc0I7SUFBQSxDQTNEeEIsQ0FBQTs7QUFBQSwrQkErRUEsd0JBQUEsR0FBMEIsU0FBQyxJQUFELEdBQUE7QUFDeEIsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVosQ0FBdUIsa0JBQUEsR0FBaUIsSUFBeEMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQW5CLENBQXdCLGlCQUFBLEdBQWdCLElBQXhDLENBREEsQ0FBQTthQUVBLE1BQUEsQ0FBQSxJQUFRLENBQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFXLENBQUEsSUFBQSxFQUhWO0lBQUEsQ0EvRTFCLENBQUE7OzRCQUFBOztLQUY2QixNQWQvQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/mixins/plugin-management.coffee