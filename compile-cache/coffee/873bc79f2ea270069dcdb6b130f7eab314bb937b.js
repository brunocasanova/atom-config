(function() {
  var GitCommit, git, gitAddAllAndCommit;

  git = require('../git');

  GitCommit = require('./git-commit');

  gitAddAllAndCommit = function() {
    return git.add({
      exit: function() {
        return new GitCommit;
      }
    });
  };

  module.exports = gitAddAllAndCommit;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQURaLENBQUE7O0FBQUEsRUFHQSxrQkFBQSxHQUFxQixTQUFBLEdBQUE7V0FDbkIsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLFNBQUEsR0FBQTtlQUFHLEdBQUEsQ0FBQSxVQUFIO01BQUEsQ0FBTjtLQURGLEVBRG1CO0VBQUEsQ0FIckIsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLGtCQVBqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-add-all-and-commit.coffee