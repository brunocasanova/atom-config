(function() {
  var Path, StatusView, git, gitCheckoutCurrentFile;

  git = require('../git');

  StatusView = require('../views/status-view');

  Path = require('path');

  gitCheckoutCurrentFile = function() {
    var currentFile, _ref;
    currentFile = atom.project.relativize((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0);
    return git.cmd({
      args: ['checkout', '--', currentFile],
      stdout: function(data) {
        var _ref1;
        new StatusView({
          type: 'success',
          message: data.toString()
        });
        return (_ref1 = atom.project.getRepo()) != null ? _ref1.refreshStatus() : void 0;
      }
    });
  };

  module.exports = gitCheckoutCurrentFile;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLHNCQUFBLEdBQXlCLFNBQUEsR0FBQTtBQUN2QixRQUFBLGlCQUFBO0FBQUEsSUFBQSxXQUFBLEdBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFiLHlEQUF3RCxDQUFFLE9BQWxDLENBQUEsVUFBeEIsQ0FBZCxDQUFBO1dBQ0EsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUMsVUFBRCxFQUFhLElBQWIsRUFBbUIsV0FBbkIsQ0FBTjtBQUFBLE1BQ0EsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO0FBQ04sWUFBQSxLQUFBO0FBQUEsUUFBSSxJQUFBLFVBQUEsQ0FBVztBQUFBLFVBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxVQUFpQixPQUFBLEVBQVMsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUExQjtTQUFYLENBQUosQ0FBQTsrREFDc0IsQ0FBRSxhQUF4QixDQUFBLFdBRk07TUFBQSxDQURSO0tBREYsRUFGdUI7RUFBQSxDQUp6QixDQUFBOztBQUFBLEVBWUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsc0JBWmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-checkout-current-file.coffee