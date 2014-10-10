(function() {
  var StatusView, git, gitStashPop;

  git = require('../git');

  StatusView = require('../views/status-view');

  gitStashPop = function() {
    return git.cmd({
      args: ['stash', 'pop'],
      stdout: function(data) {
        return new StatusView({
          type: 'success',
          message: data
        });
      }
    });
  };

  module.exports = gitStashPop;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBR0EsV0FBQSxHQUFjLFNBQUEsR0FBQTtXQUNaLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFDLE9BQUQsRUFBVSxLQUFWLENBQU47QUFBQSxNQUNBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtlQUFjLElBQUEsVUFBQSxDQUFXO0FBQUEsVUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFVBQWlCLE9BQUEsRUFBUyxJQUExQjtTQUFYLEVBQWQ7TUFBQSxDQURSO0tBREYsRUFEWTtFQUFBLENBSGQsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFdBUmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-stash-pop.coffee