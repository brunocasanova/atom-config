(function() {
  var StatusListView, git, gitStatus;

  git = require('../git');

  StatusListView = require('../views/status-list-view');

  gitStatus = function() {
    return git.status(function(data) {
      return new StatusListView(data);
    });
  };

  module.exports = gitStatus;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLDJCQUFSLENBRGpCLENBQUE7O0FBQUEsRUFHQSxTQUFBLEdBQVksU0FBQSxHQUFBO1dBQ1YsR0FBRyxDQUFDLE1BQUosQ0FBVyxTQUFDLElBQUQsR0FBQTthQUFjLElBQUEsY0FBQSxDQUFlLElBQWYsRUFBZDtJQUFBLENBQVgsRUFEVTtFQUFBLENBSFosQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBTmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-status.coffee