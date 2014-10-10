(function() {
  var GitCommit, git, gitAddAndCommit;

  git = require('../git');

  GitCommit = require('./git-commit');

  gitAddAndCommit = function() {
    var _ref;
    return git.add({
      file: atom.project.relativize((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0),
      exit: function() {
        return new GitCommit;
      }
    });
  };

  module.exports = gitAddAndCommit;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQURaLENBQUE7O0FBQUEsRUFHQSxlQUFBLEdBQWtCLFNBQUEsR0FBQTtBQUNoQixRQUFBLElBQUE7V0FBQSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFiLHlEQUF3RCxDQUFFLE9BQWxDLENBQUEsVUFBeEIsQ0FBTjtBQUFBLE1BQ0EsSUFBQSxFQUFNLFNBQUEsR0FBQTtlQUFHLEdBQUEsQ0FBQSxVQUFIO01BQUEsQ0FETjtLQURGLEVBRGdCO0VBQUEsQ0FIbEIsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGVBUmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-add-and-commit.coffee