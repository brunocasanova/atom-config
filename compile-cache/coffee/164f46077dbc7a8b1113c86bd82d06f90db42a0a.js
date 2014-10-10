(function() {
  var RemoveListView, StatusView, git, gitRemove, prettify;

  git = require('../git');

  StatusView = require('../views/status-view');

  RemoveListView = require('../views/remove-list-view');

  gitRemove = function(showSelector) {
    var currentFile, _ref;
    if (showSelector == null) {
      showSelector = false;
    }
    currentFile = git.relativize((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0);
    if ((currentFile != null) && !showSelector) {
      atom.workspaceView.getActiveView().remove();
      return git.cmd({
        args: ['rm', '-f', '--ignore-unmatch', currentFile],
        stdout: function(data) {
          return new StatusView({
            type: 'success',
            message: "Removed " + (prettify(data))
          });
        }
      });
    } else {
      return git.cmd({
        args: ['rm', '-r', '-n', '--ignore-unmatch', '-f', '*'],
        stdout: function(data) {
          return new RemoveListView(prettify(data));
        }
      });
    }
  };

  prettify = function(data) {
    var file, i, _i, _len, _results;
    data = data.match(/rm ('.*')/g);
    _results = [];
    for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
      file = data[i];
      _results.push(data[i] = file.match(/rm '(.*)'/)[1]);
    }
    return _results;
  };

  module.exports = gitRemove;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9EQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBRUEsY0FBQSxHQUFpQixPQUFBLENBQVEsMkJBQVIsQ0FGakIsQ0FBQTs7QUFBQSxFQUlBLFNBQUEsR0FBWSxTQUFDLFlBQUQsR0FBQTtBQUNWLFFBQUEsaUJBQUE7O01BRFcsZUFBYTtLQUN4QjtBQUFBLElBQUEsV0FBQSxHQUFjLEdBQUcsQ0FBQyxVQUFKLHlEQUErQyxDQUFFLE9BQWxDLENBQUEsVUFBZixDQUFkLENBQUE7QUFFQSxJQUFBLElBQUcscUJBQUEsSUFBaUIsQ0FBQSxZQUFwQjtBQUNFLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFuQixDQUFBLENBQWtDLENBQUMsTUFBbkMsQ0FBQSxDQUFBLENBQUE7YUFDQSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLGtCQUFiLEVBQWlDLFdBQWpDLENBQU47QUFBQSxRQUNBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtpQkFBZSxJQUFBLFVBQUEsQ0FBVztBQUFBLFlBQUEsSUFBQSxFQUFNLFNBQU47QUFBQSxZQUFpQixPQUFBLEVBQVUsVUFBQSxHQUFTLENBQUEsUUFBQSxDQUFTLElBQVQsQ0FBQSxDQUFwQztXQUFYLEVBQWY7UUFBQSxDQURSO09BREYsRUFGRjtLQUFBLE1BQUE7YUFNRSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsa0JBQW5CLEVBQXVDLElBQXZDLEVBQTZDLEdBQTdDLENBQU47QUFBQSxRQUNBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtpQkFBYyxJQUFBLGNBQUEsQ0FBZSxRQUFBLENBQVMsSUFBVCxDQUFmLEVBQWQ7UUFBQSxDQURSO09BREYsRUFORjtLQUhVO0VBQUEsQ0FKWixDQUFBOztBQUFBLEVBa0JBLFFBQUEsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNULFFBQUEsMkJBQUE7QUFBQSxJQUFBLElBQUEsR0FBTyxJQUFJLENBQUMsS0FBTCxDQUFXLFlBQVgsQ0FBUCxDQUFBO0FBQ0E7U0FBQSxtREFBQTtxQkFBQTtBQUNFLG9CQUFBLElBQUssQ0FBQSxDQUFBLENBQUwsR0FBVSxJQUFJLENBQUMsS0FBTCxDQUFXLFdBQVgsQ0FBd0IsQ0FBQSxDQUFBLEVBQWxDLENBREY7QUFBQTtvQkFGUztFQUFBLENBbEJYLENBQUE7O0FBQUEsRUF1QkEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0F2QmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-remove.coffee