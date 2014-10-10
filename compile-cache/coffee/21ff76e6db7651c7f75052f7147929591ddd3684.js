(function() {
  var $$, BufferedProcess, ListView, OutputView, PullBranchListView, SelectListView, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $$ = _ref.$$, BufferedProcess = _ref.BufferedProcess, SelectListView = _ref.SelectListView;

  git = require('../git');

  OutputView = require('./output-view');

  PullBranchListView = require('./pull-branch-list-view');

  module.exports = ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      return ListView.__super__.constructor.apply(this, arguments);
    }

    ListView.prototype.initialize = function(data, mode, setUpstream, tag) {
      this.data = data;
      this.mode = mode;
      this.setUpstream = setUpstream != null ? setUpstream : false;
      this.tag = tag != null ? tag : '';
      ListView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return this.parseData();
    };

    ListView.prototype.parseData = function() {
      var item, items, remotes, _i, _len;
      items = this.data.split("\n");
      remotes = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        if (item !== '') {
          remotes.push({
            name: item
          });
        }
      }
      if (remotes.length === 1) {
        return this.confirmed(remotes[0]);
      } else {
        this.setItems(remotes);
        atom.workspaceView.append(this);
        return this.focusFilterEditor();
      }
    };

    ListView.prototype.getFilterKey = function() {
      return 'name';
    };

    ListView.prototype.viewForItem = function(_arg) {
      var name;
      name = _arg.name;
      return $$(function() {
        return this.li(name);
      });
    };

    ListView.prototype.confirmed = function(_arg) {
      var name;
      name = _arg.name;
      if (this.mode === 'pull') {
        new PullBranchListView(name);
      } else {
        this.execute(name);
      }
      return this.cancel();
    };

    ListView.prototype.execute = function(remote) {
      var view;
      view = new OutputView();
      return git.cmd({
        args: [this.mode, remote, this.tag],
        stdout: function(data) {
          return view.addLine(data.toString());
        },
        stderr: function(data) {
          return view.addLine(data.toString());
        },
        exit: (function(_this) {
          return function(code) {
            if (code === 128) {
              view.reset();
              return git.cmd({
                args: [_this.mode, '-u', remote, 'HEAD'],
                stdout: function(data) {
                  return view.addLine(data.toString());
                },
                stderr: function(data) {
                  return view.addLine(data.toString());
                },
                exit: function(code) {
                  return view.finish();
                }
              });
            } else {
              return view.finish();
            }
          };
        })(this)
      });
    };

    return ListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QyxPQUFBLENBQVEsTUFBUixDQUF4QyxFQUFDLFVBQUEsRUFBRCxFQUFLLHVCQUFBLGVBQUwsRUFBc0Isc0JBQUEsY0FBdEIsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FIYixDQUFBOztBQUFBLEVBSUEsa0JBQUEsR0FBcUIsT0FBQSxDQUFRLHlCQUFSLENBSnJCLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osK0JBQUEsQ0FBQTs7OztLQUFBOztBQUFBLHVCQUFBLFVBQUEsR0FBWSxTQUFFLElBQUYsRUFBUyxJQUFULEVBQWdCLFdBQWhCLEVBQW9DLEdBQXBDLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxPQUFBLElBQ1osQ0FBQTtBQUFBLE1BRGtCLElBQUMsQ0FBQSxPQUFBLElBQ25CLENBQUE7QUFBQSxNQUR5QixJQUFDLENBQUEsb0NBQUEsY0FBWSxLQUN0QyxDQUFBO0FBQUEsTUFENkMsSUFBQyxDQUFBLG9CQUFBLE1BQUksRUFDbEQsQ0FBQTtBQUFBLE1BQUEsMENBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQVYsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFNBQUQsQ0FBQSxFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLHVCQUtBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLDhCQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQVksSUFBWixDQUFSLENBQUE7QUFBQSxNQUNBLE9BQUEsR0FBVSxFQURWLENBQUE7QUFFQSxXQUFBLDRDQUFBO3lCQUFBO0FBQ0UsUUFBQSxJQUFpQyxJQUFBLEtBQVEsRUFBekM7QUFBQSxVQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWE7QUFBQSxZQUFDLElBQUEsRUFBTSxJQUFQO1dBQWIsQ0FBQSxDQUFBO1NBREY7QUFBQSxPQUZBO0FBSUEsTUFBQSxJQUFHLE9BQU8sQ0FBQyxNQUFSLEtBQWtCLENBQXJCO2VBQ0UsSUFBQyxDQUFBLFNBQUQsQ0FBVyxPQUFRLENBQUEsQ0FBQSxDQUFuQixFQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxPQUFWLENBQUEsQ0FBQTtBQUFBLFFBQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixDQURBLENBQUE7ZUFFQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxFQUxGO09BTFM7SUFBQSxDQUxYLENBQUE7O0FBQUEsdUJBaUJBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFBRyxPQUFIO0lBQUEsQ0FqQmQsQ0FBQTs7QUFBQSx1QkFtQkEsV0FBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO0FBQ1gsVUFBQSxJQUFBO0FBQUEsTUFEYSxPQUFELEtBQUMsSUFDYixDQUFBO2FBQUEsRUFBQSxDQUFHLFNBQUEsR0FBQTtlQUNELElBQUMsQ0FBQSxFQUFELENBQUksSUFBSixFQURDO01BQUEsQ0FBSCxFQURXO0lBQUEsQ0FuQmIsQ0FBQTs7QUFBQSx1QkF1QkEsU0FBQSxHQUFXLFNBQUMsSUFBRCxHQUFBO0FBQ1QsVUFBQSxJQUFBO0FBQUEsTUFEVyxPQUFELEtBQUMsSUFDWCxDQUFBO0FBQUEsTUFBQSxJQUFHLElBQUMsQ0FBQSxJQUFELEtBQVMsTUFBWjtBQUNFLFFBQUksSUFBQSxrQkFBQSxDQUFtQixJQUFuQixDQUFKLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxJQUFDLENBQUEsT0FBRCxDQUFTLElBQVQsQ0FBQSxDQUhGO09BQUE7YUFJQSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBTFM7SUFBQSxDQXZCWCxDQUFBOztBQUFBLHVCQThCQSxPQUFBLEdBQVMsU0FBQyxNQUFELEdBQUE7QUFDUCxVQUFBLElBQUE7QUFBQSxNQUFBLElBQUEsR0FBVyxJQUFBLFVBQUEsQ0FBQSxDQUFYLENBQUE7YUFDQSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sQ0FBQyxJQUFDLENBQUEsSUFBRixFQUFRLE1BQVIsRUFBZ0IsSUFBQyxDQUFBLEdBQWpCLENBQU47QUFBQSxRQUNBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTtpQkFBVSxJQUFJLENBQUMsT0FBTCxDQUFhLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBYixFQUFWO1FBQUEsQ0FEUjtBQUFBLFFBRUEsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO2lCQUFVLElBQUksQ0FBQyxPQUFMLENBQWEsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFiLEVBQVY7UUFBQSxDQUZSO0FBQUEsUUFHQSxJQUFBLEVBQU0sQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLElBQUQsR0FBQTtBQUNKLFlBQUEsSUFBRyxJQUFBLEtBQVEsR0FBWDtBQUNFLGNBQUEsSUFBSSxDQUFDLEtBQUwsQ0FBQSxDQUFBLENBQUE7cUJBQ0EsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLGdCQUFBLElBQUEsRUFBTSxDQUFDLEtBQUMsQ0FBQSxJQUFGLEVBQVEsSUFBUixFQUFjLE1BQWQsRUFBc0IsTUFBdEIsQ0FBTjtBQUFBLGdCQUNBLE1BQUEsRUFBUSxTQUFDLElBQUQsR0FBQTt5QkFBVSxJQUFJLENBQUMsT0FBTCxDQUFhLElBQUksQ0FBQyxRQUFMLENBQUEsQ0FBYixFQUFWO2dCQUFBLENBRFI7QUFBQSxnQkFFQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7eUJBQVUsSUFBSSxDQUFDLE9BQUwsQ0FBYSxJQUFJLENBQUMsUUFBTCxDQUFBLENBQWIsRUFBVjtnQkFBQSxDQUZSO0FBQUEsZ0JBR0EsSUFBQSxFQUFNLFNBQUMsSUFBRCxHQUFBO3lCQUFVLElBQUksQ0FBQyxNQUFMLENBQUEsRUFBVjtnQkFBQSxDQUhOO2VBREYsRUFGRjthQUFBLE1BQUE7cUJBUUUsSUFBSSxDQUFDLE1BQUwsQ0FBQSxFQVJGO2FBREk7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUhOO09BREYsRUFGTztJQUFBLENBOUJULENBQUE7O29CQUFBOztLQURxQixlQVB2QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/remote-list-view.coffee