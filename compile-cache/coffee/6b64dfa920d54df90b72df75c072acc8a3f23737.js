(function() {
  var GitNotFoundError, GitNotFoundErrorView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  GitNotFoundError = require('./git-bridge').GitNotFoundError;

  GitNotFoundErrorView = (function(_super) {
    __extends(GitNotFoundErrorView, _super);

    function GitNotFoundErrorView() {
      return GitNotFoundErrorView.__super__.constructor.apply(this, arguments);
    }

    GitNotFoundErrorView.content = function(err) {
      return this.div({
        "class": 'overlay from-top padded merge-conflict-error merge-conflicts-message'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'panel'
          }, function() {
            _this.div({
              "class": "panel-heading"
            }, function() {
              _this.code('git');
              _this.text("can't be found at ");
              _this.code(atom.config.get('merge-conflicts.gitPath'));
              return _this.text('!');
            });
            return _this.div({
              "class": 'panel-body'
            }, function() {
              _this.div({
                "class": 'block'
              }, 'Please fix the path in your settings.');
              return _this.div({
                "class": 'block'
              }, function() {
                _this.button({
                  "class": 'btn btn-error inline-block-tight',
                  click: 'openSettings'
                }, 'Open Settings');
                return _this.button({
                  "class": 'btn inline-block-tight',
                  click: 'notRightNow'
                }, 'Not Right Now');
              });
            });
          });
        };
      })(this));
    };

    GitNotFoundErrorView.prototype.openSettings = function() {
      atom.workspace.open('atom://config');
      return this.remove();
    };

    GitNotFoundErrorView.prototype.notRightNow = function() {
      return this.remove();
    };

    return GitNotFoundErrorView;

  })(View);

  module.exports = function(err) {
    if (err == null) {
      return false;
    }
    if (err instanceof GitNotFoundError) {
      atom.workspaceView.appendToTop(new GitNotFoundErrorView(err));
    }
    console.error(err);
    return true;
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0MsbUJBQW9CLE9BQUEsQ0FBUSxjQUFSLEVBQXBCLGdCQURELENBQUE7O0FBQUEsRUFHTTtBQUVKLDJDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLG9CQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsR0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHNFQUFQO09BQUwsRUFBb0YsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDbEYsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLE9BQVA7V0FBTCxFQUFxQixTQUFBLEdBQUE7QUFDbkIsWUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sZUFBUDthQUFMLEVBQTZCLFNBQUEsR0FBQTtBQUMzQixjQUFBLEtBQUMsQ0FBQSxJQUFELENBQU0sS0FBTixDQUFBLENBQUE7QUFBQSxjQUNBLEtBQUMsQ0FBQSxJQUFELENBQU0sb0JBQU4sQ0FEQSxDQUFBO0FBQUEsY0FFQSxLQUFDLENBQUEsSUFBRCxDQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix5QkFBaEIsQ0FBTixDQUZBLENBQUE7cUJBR0EsS0FBQyxDQUFBLElBQUQsQ0FBTSxHQUFOLEVBSjJCO1lBQUEsQ0FBN0IsQ0FBQSxDQUFBO21CQUtBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxZQUFQO2FBQUwsRUFBMEIsU0FBQSxHQUFBO0FBQ3hCLGNBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGdCQUFBLE9BQUEsRUFBTyxPQUFQO2VBQUwsRUFDRSx1Q0FERixDQUFBLENBQUE7cUJBRUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGdCQUFBLE9BQUEsRUFBTyxPQUFQO2VBQUwsRUFBcUIsU0FBQSxHQUFBO0FBQ25CLGdCQUFBLEtBQUMsQ0FBQSxNQUFELENBQVE7QUFBQSxrQkFBQSxPQUFBLEVBQU8sa0NBQVA7QUFBQSxrQkFBMkMsS0FBQSxFQUFPLGNBQWxEO2lCQUFSLEVBQTBFLGVBQTFFLENBQUEsQ0FBQTt1QkFDQSxLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsa0JBQUEsT0FBQSxFQUFPLHdCQUFQO0FBQUEsa0JBQWlDLEtBQUEsRUFBTyxhQUF4QztpQkFBUixFQUErRCxlQUEvRCxFQUZtQjtjQUFBLENBQXJCLEVBSHdCO1lBQUEsQ0FBMUIsRUFObUI7VUFBQSxDQUFyQixFQURrRjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBGLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsbUNBZUEsWUFBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFmLENBQW9CLGVBQXBCLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFGWTtJQUFBLENBZmQsQ0FBQTs7QUFBQSxtQ0FtQkEsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUNYLElBQUMsQ0FBQSxNQUFELENBQUEsRUFEVztJQUFBLENBbkJiLENBQUE7O2dDQUFBOztLQUZpQyxLQUhuQyxDQUFBOztBQUFBLEVBMkJBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsR0FBRCxHQUFBO0FBQ2YsSUFBQSxJQUFvQixXQUFwQjtBQUFBLGFBQU8sS0FBUCxDQUFBO0tBQUE7QUFFQSxJQUFBLElBQUcsR0FBQSxZQUFlLGdCQUFsQjtBQUNFLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFuQixDQUFtQyxJQUFBLG9CQUFBLENBQXFCLEdBQXJCLENBQW5DLENBQUEsQ0FERjtLQUZBO0FBQUEsSUFLQSxPQUFPLENBQUMsS0FBUixDQUFjLEdBQWQsQ0FMQSxDQUFBO1dBTUEsS0FQZTtFQUFBLENBM0JqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/error-view.coffee