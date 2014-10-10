(function() {
  var SelectStageHunkFile, git, gitStageHunk;

  git = require('../git');

  SelectStageHunkFile = require('../views/select-stage-hunk-file-view');

  gitStageHunk = function() {
    return git.unstagedFiles(function(data) {
      return new SelectStageHunkFile(data);
    });
  };

  module.exports = gitStageHunk;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLG1CQUFBLEdBQXNCLE9BQUEsQ0FBUSxzQ0FBUixDQUR0QixDQUFBOztBQUFBLEVBR0EsWUFBQSxHQUFlLFNBQUEsR0FBQTtXQUNiLEdBQUcsQ0FBQyxhQUFKLENBQ0UsU0FBQyxJQUFELEdBQUE7YUFBYyxJQUFBLG1CQUFBLENBQW9CLElBQXBCLEVBQWQ7SUFBQSxDQURGLEVBRGE7RUFBQSxDQUhmLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUFpQixZQVJqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-stage-hunk.coffee