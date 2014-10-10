(function() {
  var SelectUnstageFiles, git, gitUnstageFiles;

  git = require('../git');

  SelectUnstageFiles = require('../views/select-unstage-files-view');

  gitUnstageFiles = function() {
    return git.stagedFiles(function(data) {
      return new SelectUnstageFiles(data);
    });
  };

  module.exports = gitUnstageFiles;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSxvQ0FBUixDQURyQixDQUFBOztBQUFBLEVBR0EsZUFBQSxHQUFrQixTQUFBLEdBQUE7V0FDaEIsR0FBRyxDQUFDLFdBQUosQ0FBZ0IsU0FBQyxJQUFELEdBQUE7YUFBYyxJQUFBLGtCQUFBLENBQW1CLElBQW5CLEVBQWQ7SUFBQSxDQUFoQixFQURnQjtFQUFBLENBSGxCLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUFpQixlQU5qQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-unstage-files.coffee