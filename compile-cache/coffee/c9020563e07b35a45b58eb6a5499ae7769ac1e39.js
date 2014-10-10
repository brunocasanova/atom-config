(function() {
  var LogListView, amountOfCommitsToShow, currentFile, git, gitLog;

  git = require('../git');

  LogListView = require('../views/log-list-view');

  currentFile = function() {
    var _ref;
    return atom.project.relativize((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0);
  };

  amountOfCommitsToShow = function() {
    var _ref;
    return (_ref = atom.config.getPositiveInt('git-plus.amountOfCommitsToShow')) != null ? _ref : atom.config.getDefault('git-plus.amountOfCommitsToShow');
  };

  gitLog = function(onlyCurrentFile) {
    var args;
    if (onlyCurrentFile == null) {
      onlyCurrentFile = false;
    }
    args = ['log', '--pretty=%h;|%aN <%aE>;|%s;|%ar (%aD)', '-s', "-n" + (amountOfCommitsToShow())];
    if (onlyCurrentFile && (currentFile() != null)) {
      args.push(currentFile());
    }
    return git.cmd({
      args: args,
      stdout: function(data) {
        return new LogListView(data, onlyCurrentFile);
      }
    });
  };

  module.exports = gitLog;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDREQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVIsQ0FEZCxDQUFBOztBQUFBLEVBR0EsV0FBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLFFBQUEsSUFBQTtXQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBYix5REFBd0QsQ0FBRSxPQUFsQyxDQUFBLFVBQXhCLEVBRFk7RUFBQSxDQUhkLENBQUE7O0FBQUEsRUFNQSxxQkFBQSxHQUF3QixTQUFBLEdBQUE7QUFDdEIsUUFBQSxJQUFBO2tHQUFnRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVosQ0FBdUIsZ0NBQXZCLEVBRDFDO0VBQUEsQ0FOeEIsQ0FBQTs7QUFBQSxFQVNBLE1BQUEsR0FBUyxTQUFDLGVBQUQsR0FBQTtBQUNQLFFBQUEsSUFBQTs7TUFEUSxrQkFBZ0I7S0FDeEI7QUFBQSxJQUFBLElBQUEsR0FBTyxDQUFDLEtBQUQsRUFBUSx1Q0FBUixFQUFpRCxJQUFqRCxFQUF3RCxJQUFBLEdBQUcsQ0FBQSxxQkFBQSxDQUFBLENBQUEsQ0FBM0QsQ0FBUCxDQUFBO0FBQ0EsSUFBQSxJQUEyQixlQUFBLElBQW9CLHVCQUEvQztBQUFBLE1BQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxXQUFBLENBQUEsQ0FBVixDQUFBLENBQUE7S0FEQTtXQUVBLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsTUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFBYyxJQUFBLFdBQUEsQ0FBWSxJQUFaLEVBQWtCLGVBQWxCLEVBQWQ7TUFBQSxDQURSO0tBREYsRUFITztFQUFBLENBVFQsQ0FBQTs7QUFBQSxFQWdCQSxNQUFNLENBQUMsT0FBUCxHQUFpQixNQWhCakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-log.coffee