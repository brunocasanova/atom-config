(function() {
  var Os, Path, StatusView, diffFilePath, fs, git, gitDiff, prepFile, showFile;

  Os = require('os');

  Path = require('path');

  fs = require('fs-plus');

  git = require('../git');

  StatusView = require('../views/status-view');

  diffFilePath = Path.join(Os.tmpDir(), "atom_git_plus.diff");

  gitDiff = function(_arg) {
    var args, diffStat, file, _ref, _ref1;
    _ref = _arg != null ? _arg : {}, diffStat = _ref.diffStat, file = _ref.file;
    if (file == null) {
      file = git.relativize((_ref1 = atom.workspace.getActiveEditor()) != null ? _ref1.getPath() : void 0);
    }
    if (diffStat == null) {
      diffStat = '';
    }
    args = ['diff'];
    if (atom.config.get('git-plus.includeStagedDiff')) {
      args.push('HEAD');
    }
    if (atom.config.get('git-plus.wordDiff')) {
      args.push('--word-diff');
    }
    if (diffStat === '') {
      args.push(file);
    }
    return git.cmd({
      args: args,
      stdout: function(data) {
        return diffStat += data;
      },
      exit: function(code) {
        if (code === 0) {
          return prepFile(diffStat);
        }
      }
    });
  };

  prepFile = function(text) {
    if ((text != null ? text.length : void 0) > 0) {
      fs.writeFileSync(diffFilePath, text, {
        flag: 'w+'
      });
      return showFile();
    } else {
      return new StatusView({
        type: 'error',
        message: 'Nothing to show.'
      });
    }
  };

  showFile = function() {
    var split;
    split = atom.config.get('git-plus.openInPane') ? atom.config.get('git-plus.splitPane') : void 0;
    return atom.workspace.open(diffFilePath, {
      split: split,
      activatePane: true
    });
  };

  module.exports = gitDiff;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdFQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FGTCxDQUFBOztBQUFBLEVBSUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBSk4sQ0FBQTs7QUFBQSxFQUtBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FMYixDQUFBOztBQUFBLEVBTUEsWUFBQSxHQUFlLElBQUksQ0FBQyxJQUFMLENBQVUsRUFBRSxDQUFDLE1BQUgsQ0FBQSxDQUFWLEVBQXVCLG9CQUF2QixDQU5mLENBQUE7O0FBQUEsRUFRQSxPQUFBLEdBQVUsU0FBQyxJQUFELEdBQUE7QUFDUixRQUFBLGlDQUFBO0FBQUEsMEJBRFMsT0FBaUIsSUFBaEIsZ0JBQUEsVUFBVSxZQUFBLElBQ3BCLENBQUE7O01BQUEsT0FBUSxHQUFHLENBQUMsVUFBSiwyREFBK0MsQ0FBRSxPQUFsQyxDQUFBLFVBQWY7S0FBUjs7TUFDQSxXQUFZO0tBRFo7QUFBQSxJQUVBLElBQUEsR0FBTyxDQUFDLE1BQUQsQ0FGUCxDQUFBO0FBR0EsSUFBQSxJQUFvQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IsNEJBQWhCLENBQXBCO0FBQUEsTUFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLE1BQVYsQ0FBQSxDQUFBO0tBSEE7QUFJQSxJQUFBLElBQTJCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixtQkFBaEIsQ0FBM0I7QUFBQSxNQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsYUFBVixDQUFBLENBQUE7S0FKQTtBQUtBLElBQUEsSUFBa0IsUUFBQSxLQUFZLEVBQTlCO0FBQUEsTUFBQSxJQUFJLENBQUMsSUFBTCxDQUFVLElBQVYsQ0FBQSxDQUFBO0tBTEE7V0FNQSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sSUFBTjtBQUFBLE1BQ0EsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO2VBQVUsUUFBQSxJQUFZLEtBQXRCO01BQUEsQ0FEUjtBQUFBLE1BRUEsSUFBQSxFQUFNLFNBQUMsSUFBRCxHQUFBO0FBQVUsUUFBQSxJQUFxQixJQUFBLEtBQVEsQ0FBN0I7aUJBQUEsUUFBQSxDQUFTLFFBQVQsRUFBQTtTQUFWO01BQUEsQ0FGTjtLQURGLEVBUFE7RUFBQSxDQVJWLENBQUE7O0FBQUEsRUFvQkEsUUFBQSxHQUFXLFNBQUMsSUFBRCxHQUFBO0FBQ1QsSUFBQSxvQkFBRyxJQUFJLENBQUUsZ0JBQU4sR0FBZSxDQUFsQjtBQUNFLE1BQUEsRUFBRSxDQUFDLGFBQUgsQ0FBaUIsWUFBakIsRUFBK0IsSUFBL0IsRUFBcUM7QUFBQSxRQUFBLElBQUEsRUFBTSxJQUFOO09BQXJDLENBQUEsQ0FBQTthQUNBLFFBQUEsQ0FBQSxFQUZGO0tBQUEsTUFBQTthQUlNLElBQUEsVUFBQSxDQUFXO0FBQUEsUUFBQSxJQUFBLEVBQU0sT0FBTjtBQUFBLFFBQWUsT0FBQSxFQUFTLGtCQUF4QjtPQUFYLEVBSk47S0FEUztFQUFBLENBcEJYLENBQUE7O0FBQUEsRUEyQkEsUUFBQSxHQUFXLFNBQUEsR0FBQTtBQUNULFFBQUEsS0FBQTtBQUFBLElBQUEsS0FBQSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixxQkFBaEIsQ0FBSCxHQUErQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0JBQWhCLENBQS9DLEdBQUEsTUFBUixDQUFBO1dBQ0EsSUFBSSxDQUFDLFNBQ0gsQ0FBQyxJQURILENBQ1EsWUFEUixFQUNzQjtBQUFBLE1BQUEsS0FBQSxFQUFPLEtBQVA7QUFBQSxNQUFjLFlBQUEsRUFBYyxJQUE1QjtLQUR0QixFQUZTO0VBQUEsQ0EzQlgsQ0FBQTs7QUFBQSxFQWdDQSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQWhDakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-diff.coffee