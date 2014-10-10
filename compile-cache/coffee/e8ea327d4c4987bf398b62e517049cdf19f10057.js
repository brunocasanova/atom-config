(function() {
  var MinimapOpenQuickSettingsView, MinimapQuickSettingsView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  MinimapQuickSettingsView = require('./minimap-quick-settings-view');

  module.exports = MinimapOpenQuickSettingsView = (function(_super) {
    __extends(MinimapOpenQuickSettingsView, _super);

    function MinimapOpenQuickSettingsView() {
      return MinimapOpenQuickSettingsView.__super__.constructor.apply(this, arguments);
    }

    MinimapOpenQuickSettingsView.content = function() {
      return this.div({
        "class": 'open-minimap-quick-settings'
      });
    };

    MinimapOpenQuickSettingsView.prototype.dropdown = null;

    MinimapOpenQuickSettingsView.prototype.initialize = function() {
      return this.on('mousedown', (function(_this) {
        return function(e) {
          var css, minimap, offset;
          e.preventDefault();
          e.stopPropagation();
          if (_this.dropdown != null) {
            return _this.dropdown.destroy();
          } else {
            minimap = _this.parent();
            offset = minimap.offset();
            _this.dropdown = new MinimapQuickSettingsView(_this.parent().data('view'));
            css = {
              top: offset.top
            };
            if (atom.config.get('minimap.displayMinimapOnLeft')) {
              css.left = offset.left + minimap.width();
            } else {
              css.right = window.innerWidth - offset.left;
            }
            _this.dropdown.css(css).attach();
            return _this.dropdown.on('minimap:quick-settings-destroyed', function() {
              _this.dropdown.off();
              return _this.dropdown = null;
            });
          }
        };
      })(this));
    };

    return MinimapOpenQuickSettingsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDREQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0Esd0JBQUEsR0FBMkIsT0FBQSxDQUFRLCtCQUFSLENBRDNCLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osbURBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsNEJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDZCQUFQO09BQUwsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFBQSwyQ0FHQSxRQUFBLEdBQVUsSUFIVixDQUFBOztBQUFBLDJDQUtBLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsRUFBRCxDQUFJLFdBQUosRUFBaUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsQ0FBRCxHQUFBO0FBQ2YsY0FBQSxvQkFBQTtBQUFBLFVBQUEsQ0FBQyxDQUFDLGNBQUYsQ0FBQSxDQUFBLENBQUE7QUFBQSxVQUNBLENBQUMsQ0FBQyxlQUFGLENBQUEsQ0FEQSxDQUFBO0FBR0EsVUFBQSxJQUFHLHNCQUFIO21CQUNFLEtBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUFBLEVBREY7V0FBQSxNQUFBO0FBR0UsWUFBQSxPQUFBLEdBQVUsS0FBQyxDQUFBLE1BQUQsQ0FBQSxDQUFWLENBQUE7QUFBQSxZQUNBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFBLENBRFQsQ0FBQTtBQUFBLFlBRUEsS0FBQyxDQUFBLFFBQUQsR0FBZ0IsSUFBQSx3QkFBQSxDQUF5QixLQUFDLENBQUEsTUFBRCxDQUFBLENBQVMsQ0FBQyxJQUFWLENBQWUsTUFBZixDQUF6QixDQUZoQixDQUFBO0FBQUEsWUFJQSxHQUFBLEdBQU07QUFBQSxjQUFBLEdBQUEsRUFBSyxNQUFNLENBQUMsR0FBWjthQUpOLENBQUE7QUFLQSxZQUFBLElBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLDhCQUFoQixDQUFIO0FBQ0UsY0FBQSxHQUFHLENBQUMsSUFBSixHQUFXLE1BQU0sQ0FBQyxJQUFQLEdBQWMsT0FBTyxDQUFDLEtBQVIsQ0FBQSxDQUF6QixDQURGO2FBQUEsTUFBQTtBQUdFLGNBQUEsR0FBRyxDQUFDLEtBQUosR0FBYSxNQUFNLENBQUMsVUFBUCxHQUFvQixNQUFNLENBQUMsSUFBeEMsQ0FIRjthQUxBO0FBQUEsWUFVQSxLQUFDLENBQUEsUUFBUSxDQUFDLEdBQVYsQ0FBYyxHQUFkLENBQWtCLENBQUMsTUFBbkIsQ0FBQSxDQVZBLENBQUE7bUJBWUEsS0FBQyxDQUFBLFFBQVEsQ0FBQyxFQUFWLENBQWEsa0NBQWIsRUFBaUQsU0FBQSxHQUFBO0FBQy9DLGNBQUEsS0FBQyxDQUFBLFFBQVEsQ0FBQyxHQUFWLENBQUEsQ0FBQSxDQUFBO3FCQUNBLEtBQUMsQ0FBQSxRQUFELEdBQVksS0FGbUM7WUFBQSxDQUFqRCxFQWZGO1dBSmU7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFqQixFQURVO0lBQUEsQ0FMWixDQUFBOzt3Q0FBQTs7S0FEeUMsS0FKM0MsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/minimap-open-quick-settings-view.coffee