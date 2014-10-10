(function() {
  var GitPlusCommands, StatusView, git, gitInit;

  git = require('../git');

  StatusView = require('../views/status-view');

  GitPlusCommands = require('../git-plus-commands');

  gitInit = function() {
    return git.cmd({
      args: ['init'],
      stdout: function(data) {
        new StatusView({
          type: 'success',
          message: data
        });
        return atom.project.setPath(atom.project.getPath());
      }
    });
  };

  module.exports = gitInit;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBRUEsZUFBQSxHQUFrQixPQUFBLENBQVEsc0JBQVIsQ0FGbEIsQ0FBQTs7QUFBQSxFQUlBLE9BQUEsR0FBVSxTQUFBLEdBQUE7V0FDUixHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBQyxNQUFELENBQU47QUFBQSxNQUNBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtBQUNOLFFBQUksSUFBQSxVQUFBLENBQVc7QUFBQSxVQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsVUFBaUIsT0FBQSxFQUFTLElBQTFCO1NBQVgsQ0FBSixDQUFBO2VBQ0EsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQXFCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBYixDQUFBLENBQXJCLEVBRk07TUFBQSxDQURSO0tBREYsRUFEUTtFQUFBLENBSlYsQ0FBQTs7QUFBQSxFQVdBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BWGpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-init.coffee