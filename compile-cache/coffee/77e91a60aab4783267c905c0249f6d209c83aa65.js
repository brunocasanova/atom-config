(function() {
  var Emitter, EmitterMixin, Minimap, MinimapPluginGeneratorView, PluginManagement, ViewManagement, deprecate, semver;

  deprecate = require('grim').deprecate;

  EmitterMixin = require('emissary').Emitter;

  Emitter = require('event-kit').Emitter;

  semver = require('semver');

  ViewManagement = require('./mixins/view-management');

  PluginManagement = require('./mixins/plugin-management');

  MinimapPluginGeneratorView = require('./minimap-plugin-generator-view');

  require('../vendor/resizeend');

  Minimap = (function() {
    EmitterMixin.includeInto(Minimap);

    ViewManagement.includeInto(Minimap);

    PluginManagement.includeInto(Minimap);


    /* Public */

    Minimap.prototype.version = require('../package.json').version;

    Minimap.prototype.config = {
      plugins: {
        type: 'object',
        properties: {}
      },
      autoToggle: {
        type: 'boolean',
        "default": true
      },
      displayMinimapOnLeft: {
        type: 'boolean',
        "default": false
      },
      displayCodeHighlights: {
        type: 'boolean',
        "default": true,
        description: 'Toggles the render of the buffer tokens in the minimap.'
      },
      displayPluginsControls: {
        type: 'boolean',
        "default": true,
        description: 'You need to restart Atom for this setting to be effective.'
      },
      minimapScrollIndicator: {
        type: 'boolean',
        "default": true,
        description: 'Toggles the display of a side line showing which part of the buffer is currently displayed by the minimap. This side line will only appear if the minimap is taller than the editor view height.'
      },
      useHardwareAcceleration: {
        type: 'boolean',
        "default": true
      },
      adjustMinimapWidthToSoftWrap: {
        type: 'boolean',
        "default": true,
        description: 'If this option is enabled and Soft Wrap is checked then the Minimap max width is set to the Preferred Line Length value.'
      },
      charWidth: {
        type: 'integer',
        "default": 1,
        minimum: 1
      },
      charHeight: {
        type: 'integer',
        "default": 2,
        minimum: 1
      },
      interline: {
        type: 'integer',
        "default": 1,
        minimum: 1,
        description: 'The space between lines in the minimap in pixels.'
      },
      textOpacity: {
        type: 'number',
        "default": 0.6,
        minimum: 0,
        maximum: 1,
        description: "The opacity used to render the line's text in the minimap."
      }
    };

    Minimap.prototype.active = false;

    function Minimap() {
      this.emitter = new Emitter;
    }

    Minimap.prototype.activate = function() {
      atom.workspaceView.command('minimap:toggle', (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
      atom.workspaceView.command("minimap:generate-plugin", (function(_this) {
        return function() {
          return _this.generatePlugin();
        };
      })(this));
      if (atom.config.get('minimap.displayPluginsControls')) {
        atom.workspaceView.command('minimap:open-quick-settings', function() {
          return atom.workspaceView.getActivePaneView().find('.minimap .open-minimap-quick-settings').mousedown();
        });
      }
      atom.workspaceView.toggleClass('minimap-on-left', atom.config.get('minimap.displayMinimapOnLeft'));
      atom.config.observe('minimap.displayMinimapOnLeft', function() {
        return atom.workspaceView.toggleClass('minimap-on-left', atom.config.get('minimap.displayMinimapOnLeft'));
      });
      if (atom.config.get('minimap.autoToggle')) {
        return this.toggle();
      }
    };

    Minimap.prototype.deactivate = function() {
      this.destroyViews();
      this.emit('deactivated');
      return this.emitter.emit('did-deactivate');
    };

    Minimap.prototype.versionMatch = function(expectedVersion) {
      return semver.satisfies(this.version, expectedVersion);
    };

    Minimap.prototype.toggle = function() {
      if (this.active) {
        this.active = false;
        return this.deactivate();
      } else {
        this.createViews();
        this.active = true;
        this.emit('activated');
        return this.emitter.emit('did-activate');
      }
    };

    Minimap.prototype.generatePlugin = function() {
      var view;
      return view = new MinimapPluginGeneratorView();
    };

    Minimap.prototype.onDidActivate = function(callback) {
      return this.emitter.on('did-activate', callback);
    };

    Minimap.prototype.onDidDeactivate = function(callback) {
      return this.emitter.on('did-deactivate', callback);
    };

    Minimap.prototype.onDidCreateMinimap = function(callback) {
      return this.emitter.on('did-create-minimap', callback);
    };

    Minimap.prototype.onWillDestroyMinimap = function(callback) {
      return this.emitter.on('will-destroy-minimap', callback);
    };

    Minimap.prototype.onDidDestroyMinimap = function(callback) {
      return this.emitter.on('did-destroy-minimap', callback);
    };

    Minimap.prototype.onDidAddPlugin = function(callback) {
      return this.emitter.on('did-add-plugin', callback);
    };

    Minimap.prototype.onDidRemovePlugin = function(callback) {
      return this.emitter.on('did-remove-plugin', callback);
    };

    Minimap.prototype.onDidActivatePlugin = function(callback) {
      return this.emitter.on('did-activate-plugin', callback);
    };

    Minimap.prototype.onDidDeactivatePlugin = function(callback) {
      return this.emitter.on('did-deactivate-plugin', callback);
    };

    Minimap.prototype.on = function(eventName) {
      switch (eventName) {
        case 'activated':
          deprecate("Use Minimap::onDidActivate instead.");
          break;
        case 'deactivated':
          deprecate("Use Minimap::onDidDeactivate instead.");
          break;
        case 'minimap-view:created':
          deprecate("Use Minimap::onDidCreateMinimap instead.");
          break;
        case 'minimap-view:destroyed':
          deprecate("Use Minimap::onDidDestroyMinimap instead.");
          break;
        case 'minimap-view:will-be-destroyed':
          deprecate("Use Minimap::onWillDestroyMinimap instead.");
          break;
        case 'plugin:added':
          deprecate("Use Minimap::onDidAddPlugin instead.");
          break;
        case 'plugin:removed':
          deprecate("Use Minimap::onDidRemovePlugin instead.");
          break;
        case 'plugin:activated':
          deprecate("Use Minimap::onDidActivatePlugin instead.");
          break;
        case 'plugin:deactivated':
          deprecate("Use Minimap::onDidDeactivatePlugin instead.");
      }
      return EmitterMixin.prototype.on.apply(this, arguments);
    };

    return Minimap;

  })();

  module.exports = new Minimap();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtHQUFBOztBQUFBLEVBQUMsWUFBYSxPQUFBLENBQVEsTUFBUixFQUFiLFNBQUQsQ0FBQTs7QUFBQSxFQUNBLFlBQUEsR0FBZSxPQUFBLENBQVEsVUFBUixDQUFtQixDQUFDLE9BRG5DLENBQUE7O0FBQUEsRUFFQyxVQUFXLE9BQUEsQ0FBUSxXQUFSLEVBQVgsT0FGRCxDQUFBOztBQUFBLEVBR0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSFQsQ0FBQTs7QUFBQSxFQUtBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLDBCQUFSLENBTGpCLENBQUE7O0FBQUEsRUFNQSxnQkFBQSxHQUFtQixPQUFBLENBQVEsNEJBQVIsQ0FObkIsQ0FBQTs7QUFBQSxFQU9BLDBCQUFBLEdBQTZCLE9BQUEsQ0FBUSxpQ0FBUixDQVA3QixDQUFBOztBQUFBLEVBU0EsT0FBQSxDQUFRLHFCQUFSLENBVEEsQ0FBQTs7QUFBQSxFQTBCTTtBQUNKLElBQUEsWUFBWSxDQUFDLFdBQWIsQ0FBeUIsT0FBekIsQ0FBQSxDQUFBOztBQUFBLElBQ0EsY0FBYyxDQUFDLFdBQWYsQ0FBMkIsT0FBM0IsQ0FEQSxDQUFBOztBQUFBLElBRUEsZ0JBQWdCLENBQUMsV0FBakIsQ0FBNkIsT0FBN0IsQ0FGQSxDQUFBOztBQUlBO0FBQUEsZ0JBSkE7O0FBQUEsc0JBT0EsT0FBQSxHQUFTLE9BQUEsQ0FBUSxpQkFBUixDQUEwQixDQUFDLE9BUHBDLENBQUE7O0FBQUEsc0JBVUEsTUFBQSxHQUNFO0FBQUEsTUFBQSxPQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxRQUFOO0FBQUEsUUFDQSxVQUFBLEVBQVksRUFEWjtPQURGO0FBQUEsTUFHQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQUpGO0FBQUEsTUFNQSxvQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FQRjtBQUFBLE1BU0EscUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEseURBRmI7T0FWRjtBQUFBLE1BYUEsc0JBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsNERBRmI7T0FkRjtBQUFBLE1BaUJBLHNCQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtBQUFBLFFBRUEsV0FBQSxFQUFhLGtNQUZiO09BbEJGO0FBQUEsTUFxQkEsdUJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO09BdEJGO0FBQUEsTUF3QkEsNEJBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxJQURUO0FBQUEsUUFFQSxXQUFBLEVBQWEsMEhBRmI7T0F6QkY7QUFBQSxNQTRCQSxTQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsQ0FEVDtBQUFBLFFBRUEsT0FBQSxFQUFTLENBRlQ7T0E3QkY7QUFBQSxNQWdDQSxVQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsQ0FEVDtBQUFBLFFBRUEsT0FBQSxFQUFTLENBRlQ7T0FqQ0Y7QUFBQSxNQW9DQSxTQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsQ0FEVDtBQUFBLFFBRUEsT0FBQSxFQUFTLENBRlQ7QUFBQSxRQUdBLFdBQUEsRUFBYSxtREFIYjtPQXJDRjtBQUFBLE1BeUNBLFdBQUEsRUFDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLFFBQU47QUFBQSxRQUNBLFNBQUEsRUFBUyxHQURUO0FBQUEsUUFFQSxPQUFBLEVBQVMsQ0FGVDtBQUFBLFFBR0EsT0FBQSxFQUFTLENBSFQ7QUFBQSxRQUlBLFdBQUEsRUFBYSw0REFKYjtPQTFDRjtLQVhGLENBQUE7O0FBQUEsc0JBNERBLE1BQUEsR0FBUSxLQTVEUixDQUFBOztBQStEYSxJQUFBLGlCQUFBLEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsR0FBQSxDQUFBLE9BQVgsQ0FEVztJQUFBLENBL0RiOztBQUFBLHNCQW1FQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGdCQUEzQixFQUE2QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTdDLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQix5QkFBM0IsRUFBc0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsY0FBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0RCxDQURBLENBQUE7QUFFQSxNQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGdDQUFoQixDQUFIO0FBQ0UsUUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLDZCQUEzQixFQUEwRCxTQUFBLEdBQUE7aUJBQ3hELElBQUksQ0FBQyxhQUFhLENBQUMsaUJBQW5CLENBQUEsQ0FBc0MsQ0FBQyxJQUF2QyxDQUE0Qyx1Q0FBNUMsQ0FBb0YsQ0FBQyxTQUFyRixDQUFBLEVBRHdEO1FBQUEsQ0FBMUQsQ0FBQSxDQURGO09BRkE7QUFBQSxNQU1BLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBbkIsQ0FBK0IsaUJBQS9CLEVBQWtELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw4QkFBaEIsQ0FBbEQsQ0FOQSxDQUFBO0FBQUEsTUFPQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsOEJBQXBCLEVBQW9ELFNBQUEsR0FBQTtlQUNsRCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQW5CLENBQStCLGlCQUEvQixFQUFrRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsOEJBQWhCLENBQWxELEVBRGtEO01BQUEsQ0FBcEQsQ0FQQSxDQUFBO0FBVUEsTUFBQSxJQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixvQkFBaEIsQ0FBYjtlQUFBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFBQTtPQVhRO0lBQUEsQ0FuRVYsQ0FBQTs7QUFBQSxzQkFpRkEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxJQUFELENBQU0sYUFBTixDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxnQkFBZCxFQUhVO0lBQUEsQ0FqRlosQ0FBQTs7QUFBQSxzQkE4RkEsWUFBQSxHQUFjLFNBQUMsZUFBRCxHQUFBO2FBQXFCLE1BQU0sQ0FBQyxTQUFQLENBQWlCLElBQUMsQ0FBQSxPQUFsQixFQUEyQixlQUEzQixFQUFyQjtJQUFBLENBOUZkLENBQUE7O0FBQUEsc0JBaUdBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUcsSUFBQyxDQUFBLE1BQUo7QUFDRSxRQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBVixDQUFBO2VBQ0EsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQUZGO09BQUEsTUFBQTtBQUlFLFFBQUEsSUFBQyxDQUFBLFdBQUQsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFEVixDQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsSUFBRCxDQUFNLFdBQU4sQ0FGQSxDQUFBO2VBR0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxJQUFULENBQWMsY0FBZCxFQVBGO09BRE07SUFBQSxDQWpHUixDQUFBOztBQUFBLHNCQTRHQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtBQUNkLFVBQUEsSUFBQTthQUFBLElBQUEsR0FBVyxJQUFBLDBCQUFBLENBQUEsRUFERztJQUFBLENBNUdoQixDQUFBOztBQUFBLHNCQW9IQSxhQUFBLEdBQWUsU0FBQyxRQUFELEdBQUE7YUFDYixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSxjQUFaLEVBQTRCLFFBQTVCLEVBRGE7SUFBQSxDQXBIZixDQUFBOztBQUFBLHNCQTRIQSxlQUFBLEdBQWlCLFNBQUMsUUFBRCxHQUFBO2FBQ2YsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksZ0JBQVosRUFBOEIsUUFBOUIsRUFEZTtJQUFBLENBNUhqQixDQUFBOztBQUFBLHNCQXNJQSxrQkFBQSxHQUFvQixTQUFDLFFBQUQsR0FBQTthQUNsQixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSxvQkFBWixFQUFrQyxRQUFsQyxFQURrQjtJQUFBLENBdElwQixDQUFBOztBQUFBLHNCQWdKQSxvQkFBQSxHQUFzQixTQUFDLFFBQUQsR0FBQTthQUNwQixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSxzQkFBWixFQUFvQyxRQUFwQyxFQURvQjtJQUFBLENBaEp0QixDQUFBOztBQUFBLHNCQTBKQSxtQkFBQSxHQUFxQixTQUFDLFFBQUQsR0FBQTthQUNuQixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSxxQkFBWixFQUFtQyxRQUFuQyxFQURtQjtJQUFBLENBMUpyQixDQUFBOztBQUFBLHNCQXFLQSxjQUFBLEdBQWdCLFNBQUMsUUFBRCxHQUFBO2FBQ2QsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksZ0JBQVosRUFBOEIsUUFBOUIsRUFEYztJQUFBLENBcktoQixDQUFBOztBQUFBLHNCQWdMQSxpQkFBQSxHQUFtQixTQUFDLFFBQUQsR0FBQTthQUNqQixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSxtQkFBWixFQUFpQyxRQUFqQyxFQURpQjtJQUFBLENBaExuQixDQUFBOztBQUFBLHNCQTJMQSxtQkFBQSxHQUFxQixTQUFDLFFBQUQsR0FBQTthQUNuQixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSxxQkFBWixFQUFtQyxRQUFuQyxFQURtQjtJQUFBLENBM0xyQixDQUFBOztBQUFBLHNCQXNNQSxxQkFBQSxHQUF1QixTQUFDLFFBQUQsR0FBQTthQUNyQixJQUFDLENBQUEsT0FBTyxDQUFDLEVBQVQsQ0FBWSx1QkFBWixFQUFxQyxRQUFyQyxFQURxQjtJQUFBLENBdE12QixDQUFBOztBQUFBLHNCQTBNQSxFQUFBLEdBQUksU0FBQyxTQUFELEdBQUE7QUFDRixjQUFPLFNBQVA7QUFBQSxhQUNPLFdBRFA7QUFFSSxVQUFBLFNBQUEsQ0FBVSxxQ0FBVixDQUFBLENBRko7QUFDTztBQURQLGFBR08sYUFIUDtBQUlJLFVBQUEsU0FBQSxDQUFVLHVDQUFWLENBQUEsQ0FKSjtBQUdPO0FBSFAsYUFLTyxzQkFMUDtBQU1JLFVBQUEsU0FBQSxDQUFVLDBDQUFWLENBQUEsQ0FOSjtBQUtPO0FBTFAsYUFPTyx3QkFQUDtBQVFJLFVBQUEsU0FBQSxDQUFVLDJDQUFWLENBQUEsQ0FSSjtBQU9PO0FBUFAsYUFTTyxnQ0FUUDtBQVVJLFVBQUEsU0FBQSxDQUFVLDRDQUFWLENBQUEsQ0FWSjtBQVNPO0FBVFAsYUFXTyxjQVhQO0FBWUksVUFBQSxTQUFBLENBQVUsc0NBQVYsQ0FBQSxDQVpKO0FBV087QUFYUCxhQWFPLGdCQWJQO0FBY0ksVUFBQSxTQUFBLENBQVUseUNBQVYsQ0FBQSxDQWRKO0FBYU87QUFiUCxhQWVPLGtCQWZQO0FBZ0JJLFVBQUEsU0FBQSxDQUFVLDJDQUFWLENBQUEsQ0FoQko7QUFlTztBQWZQLGFBaUJPLG9CQWpCUDtBQWtCSSxVQUFBLFNBQUEsQ0FBVSw2Q0FBVixDQUFBLENBbEJKO0FBQUEsT0FBQTthQW9CQSxZQUFZLENBQUEsU0FBRSxDQUFBLEVBQUUsQ0FBQyxLQUFqQixDQUF1QixJQUF2QixFQUE2QixTQUE3QixFQXJCRTtJQUFBLENBMU1KLENBQUE7O21CQUFBOztNQTNCRixDQUFBOztBQUFBLEVBNlBBLE1BQU0sQ0FBQyxPQUFQLEdBQXFCLElBQUEsT0FBQSxDQUFBLENBN1ByQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/minimap.coffee