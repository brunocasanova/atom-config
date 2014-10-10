(function() {
  var GitHistory, GitHistoryView;

  GitHistoryView = require("./git-history-view");

  GitHistory = (function() {
    function GitHistory() {}

    GitHistory.prototype.configDefaults = {
      maxCommits: 100,
      cursorShouldBeInHistoryPane: true
    };

    GitHistory.prototype.activate = function() {
      return atom.workspaceView.command("git-history:show-file-history", (function(_this) {
        return function() {
          return _this._loadGitHistoryView();
        };
      })(this));
    };

    GitHistory.prototype._loadGitHistoryView = function() {
      var _ref;
      return new GitHistoryView((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0);
    };

    return GitHistory;

  })();

  module.exports = new GitHistory();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDBCQUFBOztBQUFBLEVBQUEsY0FBQSxHQUFpQixPQUFBLENBQVEsb0JBQVIsQ0FBakIsQ0FBQTs7QUFBQSxFQUVNOzRCQUVGOztBQUFBLHlCQUFBLGNBQUEsR0FDSTtBQUFBLE1BQUEsVUFBQSxFQUFZLEdBQVo7QUFBQSxNQUNBLDJCQUFBLEVBQTZCLElBRDdCO0tBREosQ0FBQTs7QUFBQSx5QkFJQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiwrQkFBM0IsRUFBNEQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsbUJBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBNUQsRUFETTtJQUFBLENBSlYsQ0FBQTs7QUFBQSx5QkFPQSxtQkFBQSxHQUFxQixTQUFBLEdBQUE7QUFDakIsVUFBQSxJQUFBO2FBQUksSUFBQSxjQUFBLHlEQUErQyxDQUFFLE9BQWxDLENBQUEsVUFBZixFQURhO0lBQUEsQ0FQckIsQ0FBQTs7c0JBQUE7O01BSkosQ0FBQTs7QUFBQSxFQWVBLE1BQU0sQ0FBQyxPQUFQLEdBQXFCLElBQUEsVUFBQSxDQUFBLENBZnJCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-history/lib/git-history.coffee