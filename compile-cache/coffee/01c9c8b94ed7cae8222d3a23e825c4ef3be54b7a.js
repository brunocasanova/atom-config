(function() {
  var GitDiff, git, gitStat;

  git = require('../git');

  GitDiff = require('./git-diff');

  gitStat = function() {
    var args;
    args = ['diff', '--stat'];
    if (atom.config.get('git-plus.includeStagedDiff')) {
      args.push('HEAD');
    }
    return git.cmd({
      args: args,
      stdout: function(data) {
        return GitDiff({
          diffStat: data
        });
      }
    });
  };

  module.exports = gitStat;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLE9BQUEsR0FBVSxPQUFBLENBQVEsWUFBUixDQURWLENBQUE7O0FBQUEsRUFHQSxPQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsUUFBQSxJQUFBO0FBQUEsSUFBQSxJQUFBLEdBQU8sQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFQLENBQUE7QUFDQSxJQUFBLElBQW9CLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQiw0QkFBaEIsQ0FBcEI7QUFBQSxNQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsTUFBVixDQUFBLENBQUE7S0FEQTtXQUVBLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsTUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFBVSxPQUFBLENBQVE7QUFBQSxVQUFBLFFBQUEsRUFBVSxJQUFWO1NBQVIsRUFBVjtNQUFBLENBRFI7S0FERixFQUhRO0VBQUEsQ0FIVixDQUFBOztBQUFBLEVBVUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsT0FWakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-diff-all.coffee