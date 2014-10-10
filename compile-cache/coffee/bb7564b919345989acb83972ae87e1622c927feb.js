(function() {
  var StatusView, git, gitStashApply;

  git = require('../git');

  StatusView = require('../views/status-view');

  gitStashApply = function() {
    return git.cmd({
      args: ['stash', 'apply'],
      stdout: function(data) {
        return new StatusView({
          type: 'success',
          message: data
        });
      }
    });
  };

  module.exports = gitStashApply;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBR0EsYUFBQSxHQUFnQixTQUFBLEdBQUE7V0FDZCxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBQyxPQUFELEVBQVUsT0FBVixDQUFOO0FBQUEsTUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFBYyxJQUFBLFVBQUEsQ0FBVztBQUFBLFVBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxVQUFpQixPQUFBLEVBQVMsSUFBMUI7U0FBWCxFQUFkO01BQUEsQ0FEUjtLQURGLEVBRGM7RUFBQSxDQUhoQixDQUFBOztBQUFBLEVBUUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsYUFSakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-stash-apply.coffee