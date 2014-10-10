(function() {
  var GitCommit, Os, Path, StatusView, fs, git, gitCommitAmend;

  Os = require('os');

  Path = require('path');

  fs = require('fs-plus');

  git = require('../git');

  StatusView = require('../views/status-view');

  GitCommit = require('./git-commit');

  gitCommitAmend = function() {
    return git.cmd({
      args: ['log', '-1', '--format=%B'],
      stdout: function(amend) {
        return git.cmd({
          args: ['reset', '--soft', 'HEAD^'],
          exit: function() {
            return new GitCommit("" + (amend != null ? amend.trim() : void 0) + "\n");
          }
        });
      }
    });
  };

  module.exports = gitCommitAmend;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdEQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FGTCxDQUFBOztBQUFBLEVBSUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBSk4sQ0FBQTs7QUFBQSxFQUtBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FMYixDQUFBOztBQUFBLEVBTUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBTlosQ0FBQTs7QUFBQSxFQVFBLGNBQUEsR0FBaUIsU0FBQSxHQUFBO1dBQ2YsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUMsS0FBRCxFQUFRLElBQVIsRUFBYyxhQUFkLENBQU47QUFBQSxNQUNBLE1BQUEsRUFBUSxTQUFDLEtBQUQsR0FBQTtlQUNOLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxVQUFBLElBQUEsRUFBTSxDQUFDLE9BQUQsRUFBVSxRQUFWLEVBQW9CLE9BQXBCLENBQU47QUFBQSxVQUNBLElBQUEsRUFBTSxTQUFBLEdBQUE7bUJBQU8sSUFBQSxTQUFBLENBQVUsRUFBQSxHQUFFLGlCQUFBLEtBQUssQ0FBRSxJQUFQLENBQUEsVUFBQSxDQUFGLEdBQWlCLElBQTNCLEVBQVA7VUFBQSxDQUROO1NBREYsRUFETTtNQUFBLENBRFI7S0FERixFQURlO0VBQUEsQ0FSakIsQ0FBQTs7QUFBQSxFQWdCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixjQWhCakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-commit-amend.coffee