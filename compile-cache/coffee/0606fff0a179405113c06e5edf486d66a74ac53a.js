(function() {
  var Path, StatusView, git, gitCheckoutAllFiles;

  git = require('../git');

  StatusView = require('../views/status-view');

  Path = require('path');

  gitCheckoutAllFiles = function() {
    return git.cmd({
      args: ['checkout', '-f'],
      stdout: function(data) {
        var _ref;
        new StatusView({
          type: 'success',
          message: data.toString()
        });
        return (_ref = atom.project.getRepo()) != null ? _ref.refreshStatus() : void 0;
      }
    });
  };

  module.exports = gitCheckoutAllFiles;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUlBLG1CQUFBLEdBQXNCLFNBQUEsR0FBQTtXQUNwQixHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBQyxVQUFELEVBQWEsSUFBYixDQUFOO0FBQUEsTUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7QUFDTixZQUFBLElBQUE7QUFBQSxRQUFJLElBQUEsVUFBQSxDQUFXO0FBQUEsVUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFVBQWlCLE9BQUEsRUFBUyxJQUFJLENBQUMsUUFBTCxDQUFBLENBQTFCO1NBQVgsQ0FBSixDQUFBOzZEQUNzQixDQUFFLGFBQXhCLENBQUEsV0FGTTtNQUFBLENBRFI7S0FERixFQURvQjtFQUFBLENBSnRCLENBQUE7O0FBQUEsRUFXQSxNQUFNLENBQUMsT0FBUCxHQUFpQixtQkFYakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-checkout-all-files.coffee