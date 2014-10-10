(function() {
  var Conflict, MergeConflictsView, NavigationView, SideView;

  MergeConflictsView = require('./merge-conflicts-view');

  SideView = require('./side-view');

  NavigationView = require('./navigation-view');

  Conflict = require('./conflict');

  module.exports = {
    activate: function(state) {
      return atom.workspaceView.command("merge-conflicts:detect", function() {
        return MergeConflictsView.detect();
      });
    },
    deactivate: function() {},
    configDefaults: {
      gitPath: '/usr/local/bin/git'
    },
    serialize: function() {}
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNEQUFBOztBQUFBLEVBQUEsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHdCQUFSLENBQXJCLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FEWCxDQUFBOztBQUFBLEVBRUEsY0FBQSxHQUFpQixPQUFBLENBQVEsbUJBQVIsQ0FGakIsQ0FBQTs7QUFBQSxFQUdBLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUixDQUhYLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7YUFDUixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLHdCQUEzQixFQUFxRCxTQUFBLEdBQUE7ZUFDbkQsa0JBQWtCLENBQUMsTUFBbkIsQ0FBQSxFQURtRDtNQUFBLENBQXJELEVBRFE7SUFBQSxDQUFWO0FBQUEsSUFJQSxVQUFBLEVBQVksU0FBQSxHQUFBLENBSlo7QUFBQSxJQU1BLGNBQUEsRUFDRTtBQUFBLE1BQUEsT0FBQSxFQUFTLG9CQUFUO0tBUEY7QUFBQSxJQVNBLFNBQUEsRUFBVyxTQUFBLEdBQUEsQ0FUWDtHQVBGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/merge-conflicts.coffee