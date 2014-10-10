(function() {
  var BranchListView, OutputView, PullBranchListView, git,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  git = require('../git');

  OutputView = require('./output-view');

  BranchListView = require('./branch-list-view');

  module.exports = PullBranchListView = (function(_super) {
    __extends(PullBranchListView, _super);

    function PullBranchListView() {
      return PullBranchListView.__super__.constructor.apply(this, arguments);
    }

    PullBranchListView.prototype.initialize = function(remote) {
      this.remote = remote;
      return git.cmd({
        args: ['branch', '-r'],
        stdout: (function(_this) {
          return function(data) {
            _this.data = data;
            if (_this.data.split("\n").length === 1) {
              return _this.pull();
            } else {
              return PullBranchListView.__super__.initialize.apply(_this, arguments);
            }
          };
        })(this)
      });
    };

    PullBranchListView.prototype.confirmed = function(_arg) {
      var name;
      name = _arg.name;
      this.pull(name.split('/')[1]);
      return this.cancel();
    };

    PullBranchListView.prototype.pull = function(remoteBranch) {
      var view;
      if (remoteBranch == null) {
        remoteBranch = '';
      }
      view = new OutputView();
      return git.cmd({
        args: ['pull', this.remote, remoteBranch],
        stdout: function(data) {
          return view.addLine(data.toString());
        },
        stderr: function(data) {
          return view.addLine(data.toString());
        },
        exit: (function(_this) {
          return function(code) {
            return view.finish();
          };
        })(this)
      });
    };

    return PullBranchListView;

  })(BranchListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FBTixDQUFBOztBQUFBLEVBQ0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBRGIsQ0FBQTs7QUFBQSxFQUVBLGNBQUEsR0FBaUIsT0FBQSxDQUFRLG9CQUFSLENBRmpCLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUdRO0FBQ0oseUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLGlDQUFBLFVBQUEsR0FBWSxTQUFFLE1BQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLFNBQUEsTUFDWixDQUFBO2FBQUEsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLFFBQUEsSUFBQSxFQUFNLENBQUMsUUFBRCxFQUFXLElBQVgsQ0FBTjtBQUFBLFFBQ0EsTUFBQSxFQUFRLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBRSxJQUFGLEdBQUE7QUFDTixZQURPLEtBQUMsQ0FBQSxPQUFBLElBQ1IsQ0FBQTtBQUFBLFlBQUEsSUFBRyxLQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sQ0FBWSxJQUFaLENBQWlCLENBQUMsTUFBbEIsS0FBNEIsQ0FBL0I7cUJBQ0UsS0FBQyxDQUFBLElBQUQsQ0FBQSxFQURGO2FBQUEsTUFBQTtxQkFHRSxxREFBQSxTQUFBLEVBSEY7YUFETTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRFI7T0FERixFQURVO0lBQUEsQ0FBWixDQUFBOztBQUFBLGlDQVNBLFNBQUEsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNULFVBQUEsSUFBQTtBQUFBLE1BRFcsT0FBRCxLQUFDLElBQ1gsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxJQUFJLENBQUMsS0FBTCxDQUFXLEdBQVgsQ0FBZ0IsQ0FBQSxDQUFBLENBQXRCLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFGUztJQUFBLENBVFgsQ0FBQTs7QUFBQSxpQ0FhQSxJQUFBLEdBQU0sU0FBQyxZQUFELEdBQUE7QUFDSixVQUFBLElBQUE7O1FBREssZUFBYTtPQUNsQjtBQUFBLE1BQUEsSUFBQSxHQUFXLElBQUEsVUFBQSxDQUFBLENBQVgsQ0FBQTthQUNBLEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxDQUFDLE1BQUQsRUFBUyxJQUFDLENBQUEsTUFBVixFQUFrQixZQUFsQixDQUFOO0FBQUEsUUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7aUJBQVUsSUFBSSxDQUFDLE9BQUwsQ0FBYSxJQUFJLENBQUMsUUFBTCxDQUFBLENBQWIsRUFBVjtRQUFBLENBRFI7QUFBQSxRQUVBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtpQkFBVSxJQUFJLENBQUMsT0FBTCxDQUFhLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBYixFQUFWO1FBQUEsQ0FGUjtBQUFBLFFBR0EsSUFBQSxFQUFNLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQyxJQUFELEdBQUE7bUJBQ0osSUFBSSxDQUFDLE1BQUwsQ0FBQSxFQURJO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FITjtPQURGLEVBRkk7SUFBQSxDQWJOLENBQUE7OzhCQUFBOztLQUQrQixlQVBuQyxDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/pull-branch-list-view.coffee