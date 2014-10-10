(function() {
  var SelectStageFiles, git, gitStageFiles;

  git = require('../git');

  SelectStageFiles = require('../views/select-stage-files-view');

  gitStageFiles = function() {
    return git.unstagedFiles(function(data) {
      return new SelectStageFiles(data);
    }, true);
  };

  module.exports = gitStageFiles;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9DQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSxrQ0FBUixDQURuQixDQUFBOztBQUFBLEVBR0EsYUFBQSxHQUFnQixTQUFBLEdBQUE7V0FDZCxHQUFHLENBQUMsYUFBSixDQUNFLFNBQUMsSUFBRCxHQUFBO2FBQWMsSUFBQSxnQkFBQSxDQUFpQixJQUFqQixFQUFkO0lBQUEsQ0FERixFQUVFLElBRkYsRUFEYztFQUFBLENBSGhCLENBQUE7O0FBQUEsRUFTQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQVRqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-stage-files.coffee