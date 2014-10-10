(function() {
  var CherryPickSelectBranch, git, gitCherryPick;

  git = require('../git');

  CherryPickSelectBranch = require('../views/cherry-pick-select-branch-view');

  gitCherryPick = function() {
    var atomGit, currentHead, head, heads, i, _i, _len, _ref;
    atomGit = atom.project.getRepo((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0);
    heads = atomGit.getReferences().heads;
    currentHead = atomGit.getShortHead();
    for (i = _i = 0, _len = heads.length; _i < _len; i = ++_i) {
      head = heads[i];
      heads[i] = head.replace('refs/heads/', '');
    }
    heads = heads.filter(function(head) {
      return head !== currentHead;
    });
    return new CherryPickSelectBranch(heads, currentHead);
  };

  module.exports = gitCherryPick;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBDQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSx5Q0FBUixDQUR6QixDQUFBOztBQUFBLEVBR0EsYUFBQSxHQUFnQixTQUFBLEdBQUE7QUFDZCxRQUFBLG9EQUFBO0FBQUEsSUFBQSxPQUFBLEdBQVUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLHlEQUFxRCxDQUFFLE9BQWxDLENBQUEsVUFBckIsQ0FBVixDQUFBO0FBQUEsSUFDQSxLQUFBLEdBQVEsT0FBTyxDQUFDLGFBQVIsQ0FBQSxDQUF1QixDQUFDLEtBRGhDLENBQUE7QUFBQSxJQUVBLFdBQUEsR0FBYyxPQUFPLENBQUMsWUFBUixDQUFBLENBRmQsQ0FBQTtBQUlBLFNBQUEsb0RBQUE7c0JBQUE7QUFDRSxNQUFBLEtBQU0sQ0FBQSxDQUFBLENBQU4sR0FBVyxJQUFJLENBQUMsT0FBTCxDQUFhLGFBQWIsRUFBNEIsRUFBNUIsQ0FBWCxDQURGO0FBQUEsS0FKQTtBQUFBLElBT0EsS0FBQSxHQUFRLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBQyxJQUFELEdBQUE7YUFBVSxJQUFBLEtBQVUsWUFBcEI7SUFBQSxDQUFiLENBUFIsQ0FBQTtXQVFJLElBQUEsc0JBQUEsQ0FBdUIsS0FBdkIsRUFBOEIsV0FBOUIsRUFUVTtFQUFBLENBSGhCLENBQUE7O0FBQUEsRUFjQSxNQUFNLENBQUMsT0FBUCxHQUFpQixhQWRqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-cherry-pick.coffee