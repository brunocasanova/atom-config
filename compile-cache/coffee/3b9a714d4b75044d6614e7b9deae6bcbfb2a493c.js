(function() {
  var RemoteListView, git, gitPull;

  git = require('../git');

  RemoteListView = require('../views/remote-list-view');

  gitPull = function() {
    return git.cmd({
      args: ['remote'],
      stdout: function(data) {
        return new RemoteListView(data, 'pull');
      }
    });
  };

  module.exports = gitPull;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLDJCQUFSLENBRGpCLENBQUE7O0FBQUEsRUFHQSxPQUFBLEdBQVUsU0FBQSxHQUFBO1dBQ1IsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUMsUUFBRCxDQUFOO0FBQUEsTUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFBYyxJQUFBLGNBQUEsQ0FBZSxJQUFmLEVBQXFCLE1BQXJCLEVBQWQ7TUFBQSxDQURSO0tBREYsRUFEUTtFQUFBLENBSFYsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BUmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-pull.coffee