(function() {
  var $$, BufferedProcess, CherryPickSelectBranch, CherryPickSelectCommits, SelectListView, StatusView, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $$ = _ref.$$, BufferedProcess = _ref.BufferedProcess, SelectListView = _ref.SelectListView;

  git = require('../git');

  StatusView = require('./status-view');

  CherryPickSelectCommits = require('./cherry-pick-select-commits-view');

  module.exports = CherryPickSelectBranch = (function(_super) {
    __extends(CherryPickSelectBranch, _super);

    function CherryPickSelectBranch() {
      return CherryPickSelectBranch.__super__.constructor.apply(this, arguments);
    }

    CherryPickSelectBranch.prototype.initialize = function(items, currentHead) {
      this.currentHead = currentHead;
      CherryPickSelectBranch.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      this.setItems(items);
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    CherryPickSelectBranch.prototype.viewForItem = function(item) {
      return $$(function() {
        return this.li(item);
      });
    };

    CherryPickSelectBranch.prototype.confirmed = function(item) {
      var args;
      this.cancel();
      args = ['log', '--cherry-pick', '-z', '--format=%H%n%an%n%ar%n%s', "" + this.currentHead + "..." + item];
      return git.cmd({
        args: args,
        stdout: function(data) {
          if (this.save == null) {
            this.save = '';
          }
          return this.save += data;
        },
        exit: function(exit) {
          if (exit === 0 && (this.save != null)) {
            new CherryPickSelectCommits(this.save.split('\0').slice(0, -1));
            return this.save = null;
          } else {
            return new StatusView({
              type: 'warning',
              message: "No commits available to cherry-pick."
            });
          }
        }
      });
    };

    return CherryPickSelectBranch;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJHQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QyxPQUFBLENBQVEsTUFBUixDQUF4QyxFQUFDLFVBQUEsRUFBRCxFQUFLLHVCQUFBLGVBQUwsRUFBc0Isc0JBQUEsY0FBdEIsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FIYixDQUFBOztBQUFBLEVBSUEsdUJBQUEsR0FBMEIsT0FBQSxDQUFRLG1DQUFSLENBSjFCLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosNkNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLHFDQUFBLFVBQUEsR0FBWSxTQUFDLEtBQUQsRUFBUyxXQUFULEdBQUE7QUFDVixNQURrQixJQUFDLENBQUEsY0FBQSxXQUNuQixDQUFBO0FBQUEsTUFBQSx3REFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxrQkFBVixDQURBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxRQUFELENBQVUsS0FBVixDQUZBLENBQUE7QUFBQSxNQUlBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBbkIsQ0FBMEIsSUFBMUIsQ0FKQSxDQUFBO2FBS0EsSUFBQyxDQUFBLGlCQUFELENBQUEsRUFOVTtJQUFBLENBQVosQ0FBQTs7QUFBQSxxQ0FRQSxXQUFBLEdBQWEsU0FBQyxJQUFELEdBQUE7YUFDWCxFQUFBLENBQUcsU0FBQSxHQUFBO2VBQ0QsSUFBQyxDQUFBLEVBQUQsQ0FBSSxJQUFKLEVBREM7TUFBQSxDQUFILEVBRFc7SUFBQSxDQVJiLENBQUE7O0FBQUEscUNBWUEsU0FBQSxHQUFXLFNBQUMsSUFBRCxHQUFBO0FBQ1QsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQSxHQUFPLENBQ0wsS0FESyxFQUVMLGVBRkssRUFHTCxJQUhLLEVBSUwsMkJBSkssRUFLTCxFQUFBLEdBQUUsSUFBQyxDQUFBLFdBQUgsR0FBZ0IsS0FBaEIsR0FBb0IsSUFMZixDQURQLENBQUE7YUFTQSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sSUFBTjtBQUFBLFFBQ0EsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBOztZQUNOLElBQUMsQ0FBQSxPQUFRO1dBQVQ7aUJBQ0EsSUFBQyxDQUFBLElBQUQsSUFBUyxLQUZIO1FBQUEsQ0FEUjtBQUFBLFFBSUEsSUFBQSxFQUFNLFNBQUMsSUFBRCxHQUFBO0FBQ0osVUFBQSxJQUFHLElBQUEsS0FBUSxDQUFSLElBQWMsbUJBQWpCO0FBQ0UsWUFBSSxJQUFBLHVCQUFBLENBQXdCLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixDQUFZLElBQVosQ0FBa0IsYUFBMUMsQ0FBSixDQUFBO21CQUNBLElBQUMsQ0FBQSxJQUFELEdBQVEsS0FGVjtXQUFBLE1BQUE7bUJBSU0sSUFBQSxVQUFBLENBQVc7QUFBQSxjQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsY0FBaUIsT0FBQSxFQUFTLHNDQUExQjthQUFYLEVBSk47V0FESTtRQUFBLENBSk47T0FERixFQVZTO0lBQUEsQ0FaWCxDQUFBOztrQ0FBQTs7S0FGbUMsZUFQckMsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/cherry-pick-select-branch-view.coffee