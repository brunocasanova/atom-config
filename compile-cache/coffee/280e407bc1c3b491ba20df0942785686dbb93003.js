(function() {
  var $, BranchListView, EditorView, InputView, StatusView, View, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, EditorView = _ref.EditorView, View = _ref.View;

  git = require('../git');

  StatusView = require('../views/status-view');

  BranchListView = require('../views/branch-list-view');

  module.exports.gitBranches = function() {
    return git.cmd({
      args: ['branch'],
      stdout: function(data) {
        return new BranchListView(data);
      }
    });
  };

  InputView = (function(_super) {
    __extends(InputView, _super);

    function InputView() {
      return InputView.__super__.constructor.apply(this, arguments);
    }

    InputView.content = function() {
      return this.div({
        "class": 'overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.subview('branchEditor', new EditorView({
            mini: true,
            placeholderText: 'New branch name'
          }));
        };
      })(this));
    };

    InputView.prototype.initialize = function() {
      this.currentPane = atom.workspace.getActivePane();
      atom.workspaceView.append(this);
      this.branchEditor.focus();
      this.on('core:cancel', (function(_this) {
        return function() {
          return _this.detach();
        };
      })(this));
      return this.branchEditor.on('core:confirm', (function(_this) {
        return function() {
          var name, text;
          text = $(_this).text().split(' ');
          name = text.length === 2 ? text[1] : text[0];
          _this.createBranch(name);
          return _this.detach();
        };
      })(this));
    };

    InputView.prototype.createBranch = function(name) {
      return git.cmd({
        args: ['checkout', '-b', name],
        stdout: (function(_this) {
          return function(data) {
            var _ref1;
            new StatusView({
              type: 'success',
              message: data.toString()
            });
            if ((_ref1 = atom.project.getRepo()) != null) {
              _ref1.refreshStatus();
            }
            return _this.currentPane.activate();
          };
        })(this)
      });
    };

    return InputView;

  })(View);

  module.exports.newBranch = function() {
    return new InputView();
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QixPQUFBLENBQVEsTUFBUixDQUF4QixFQUFDLFNBQUEsQ0FBRCxFQUFJLGtCQUFBLFVBQUosRUFBZ0IsWUFBQSxJQUFoQixDQUFBOztBQUFBLEVBRUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBRk4sQ0FBQTs7QUFBQSxFQUdBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FIYixDQUFBOztBQUFBLEVBSUEsY0FBQSxHQUFpQixPQUFBLENBQVEsMkJBQVIsQ0FKakIsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBZixHQUE2QixTQUFBLEdBQUE7V0FDM0IsR0FBRyxDQUFDLEdBQUosQ0FDRTtBQUFBLE1BQUEsSUFBQSxFQUFNLENBQUMsUUFBRCxDQUFOO0FBQUEsTUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFDRixJQUFBLGNBQUEsQ0FBZSxJQUFmLEVBREU7TUFBQSxDQURSO0tBREYsRUFEMkI7RUFBQSxDQU43QixDQUFBOztBQUFBLEVBWU07QUFDSixnQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxTQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxrQkFBUDtPQUFMLEVBQWdDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzlCLEtBQUMsQ0FBQSxPQUFELENBQVMsY0FBVCxFQUE2QixJQUFBLFVBQUEsQ0FBVztBQUFBLFlBQUEsSUFBQSxFQUFNLElBQU47QUFBQSxZQUFZLGVBQUEsRUFBaUIsaUJBQTdCO1dBQVgsQ0FBN0IsRUFEOEI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoQyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLHdCQUlBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxXQUFELEdBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQUEsQ0FBZixDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQW5CLENBQTBCLElBQTFCLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFlBQVksQ0FBQyxLQUFkLENBQUEsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsRUFBRCxDQUFJLGFBQUosRUFBbUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsTUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQixDQUhBLENBQUE7YUFJQSxJQUFDLENBQUEsWUFBWSxDQUFDLEVBQWQsQ0FBaUIsY0FBakIsRUFBaUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUMvQixjQUFBLFVBQUE7QUFBQSxVQUFBLElBQUEsR0FBTyxDQUFBLENBQUUsS0FBRixDQUFPLENBQUMsSUFBUixDQUFBLENBQWMsQ0FBQyxLQUFmLENBQXFCLEdBQXJCLENBQVAsQ0FBQTtBQUFBLFVBQ0EsSUFBQSxHQUFVLElBQUksQ0FBQyxNQUFMLEtBQWUsQ0FBbEIsR0FBeUIsSUFBSyxDQUFBLENBQUEsQ0FBOUIsR0FBc0MsSUFBSyxDQUFBLENBQUEsQ0FEbEQsQ0FBQTtBQUFBLFVBRUEsS0FBQyxDQUFBLFlBQUQsQ0FBYyxJQUFkLENBRkEsQ0FBQTtpQkFHQSxLQUFDLENBQUEsTUFBRCxDQUFBLEVBSitCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakMsRUFMVTtJQUFBLENBSlosQ0FBQTs7QUFBQSx3QkFlQSxZQUFBLEdBQWMsU0FBQyxJQUFELEdBQUE7YUFDWixHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sQ0FBQyxVQUFELEVBQWEsSUFBYixFQUFtQixJQUFuQixDQUFOO0FBQUEsUUFDQSxNQUFBLEVBQVEsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLElBQUQsR0FBQTtBQUNOLGdCQUFBLEtBQUE7QUFBQSxZQUFJLElBQUEsVUFBQSxDQUFXO0FBQUEsY0FBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLGNBQWlCLE9BQUEsRUFBUyxJQUFJLENBQUMsUUFBTCxDQUFBLENBQTFCO2FBQVgsQ0FBSixDQUFBOzttQkFDc0IsQ0FBRSxhQUF4QixDQUFBO2FBREE7bUJBRUEsS0FBQyxDQUFBLFdBQVcsQ0FBQyxRQUFiLENBQUEsRUFITTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRFI7T0FERixFQURZO0lBQUEsQ0FmZCxDQUFBOztxQkFBQTs7S0FEc0IsS0FaeEIsQ0FBQTs7QUFBQSxFQW9DQSxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQWYsR0FBMkIsU0FBQSxHQUFBO1dBQ3JCLElBQUEsU0FBQSxDQUFBLEVBRHFCO0VBQUEsQ0FwQzNCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-branch.coffee