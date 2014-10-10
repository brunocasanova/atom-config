(function() {
  var $$, BufferedProcess, GitShow, LogListView, Os, Path, SelectListView, fs, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Os = require('os');

  Path = require('path');

  fs = require('fs-plus');

  _ref = require('atom'), $$ = _ref.$$, BufferedProcess = _ref.BufferedProcess, SelectListView = _ref.SelectListView;

  GitShow = require('../models/git-show');

  module.exports = LogListView = (function(_super) {
    var currentFile, showCommitFilePath;

    __extends(LogListView, _super);

    function LogListView() {
      return LogListView.__super__.constructor.apply(this, arguments);
    }

    currentFile = function() {
      var _ref1;
      return atom.project.relativize((_ref1 = atom.workspace.getActiveEditor()) != null ? _ref1.getPath() : void 0);
    };

    showCommitFilePath = function() {
      return Path.join(Os.tmpDir(), "atom_git_plus_commit.diff");
    };

    LogListView.prototype.initialize = function(data, onlyCurrentFile) {
      this.data = data;
      this.onlyCurrentFile = onlyCurrentFile;
      LogListView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return this.parseData();
    };

    LogListView.prototype.parseData = function() {
      var item, tmp;
      this.data = this.data.split("\n").slice(0, -1);
      this.setItems((function() {
        var _i, _len, _ref1, _results;
        _ref1 = this.data;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          item = _ref1[_i];
          if (!(item !== '')) {
            continue;
          }
          tmp = item.match(/([\w\d]{7});\|(.*);\|(.*);\|(.*)/);
          _results.push({
            hash: tmp != null ? tmp[1] : void 0,
            author: tmp != null ? tmp[2] : void 0,
            title: tmp != null ? tmp[3] : void 0,
            time: tmp != null ? tmp[4] : void 0
          });
        }
        return _results;
      }).call(this));
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    LogListView.prototype.getFilterKey = function() {
      return 'title';
    };

    LogListView.prototype.viewForItem = function(commit) {
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'text-highlight text-huge'
            }, commit.title);
            _this.div({
              "class": ''
            }, "" + commit.hash + " by " + commit.author);
            return _this.div({
              "class": 'text-info'
            }, commit.time);
          };
        })(this));
      });
    };

    LogListView.prototype.confirmed = function(_arg) {
      var hash;
      hash = _arg.hash;
      return GitShow(hash, this.onlyCurrentFile ? currentFile() : void 0);
    };

    return LogListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxPQUF3QyxPQUFBLENBQVEsTUFBUixDQUF4QyxFQUFDLFVBQUEsRUFBRCxFQUFLLHVCQUFBLGVBQUwsRUFBc0Isc0JBQUEsY0FKdEIsQ0FBQTs7QUFBQSxFQU1BLE9BQUEsR0FBVSxPQUFBLENBQVEsb0JBQVIsQ0FOVixDQUFBOztBQUFBLEVBUUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLFFBQUEsK0JBQUE7O0FBQUEsa0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsV0FBQSxHQUFjLFNBQUEsR0FBQTtBQUNaLFVBQUEsS0FBQTthQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBYiwyREFBd0QsQ0FBRSxPQUFsQyxDQUFBLFVBQXhCLEVBRFk7SUFBQSxDQUFkLENBQUE7O0FBQUEsSUFHQSxrQkFBQSxHQUFxQixTQUFBLEdBQUE7YUFDbkIsSUFBSSxDQUFDLElBQUwsQ0FBVSxFQUFFLENBQUMsTUFBSCxDQUFBLENBQVYsRUFBdUIsMkJBQXZCLEVBRG1CO0lBQUEsQ0FIckIsQ0FBQTs7QUFBQSwwQkFNQSxVQUFBLEdBQVksU0FBRSxJQUFGLEVBQVMsZUFBVCxHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsT0FBQSxJQUNaLENBQUE7QUFBQSxNQURrQixJQUFDLENBQUEsa0JBQUEsZUFDbkIsQ0FBQTtBQUFBLE1BQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQVYsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFNBQUQsQ0FBQSxFQUhVO0lBQUEsQ0FOWixDQUFBOztBQUFBLDBCQVdBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLFNBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxJQUFELEdBQVEsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQVksSUFBWixDQUFrQixhQUExQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRDs7QUFDRTtBQUFBO2FBQUEsNENBQUE7MkJBQUE7Z0JBQXVCLElBQUEsS0FBUTs7V0FDN0I7QUFBQSxVQUFBLEdBQUEsR0FBTSxJQUFJLENBQUMsS0FBTCxDQUFXLGtDQUFYLENBQU4sQ0FBQTtBQUFBLHdCQUNBO0FBQUEsWUFBQyxJQUFBLGdCQUFNLEdBQUssQ0FBQSxDQUFBLFVBQVo7QUFBQSxZQUFnQixNQUFBLGdCQUFRLEdBQUssQ0FBQSxDQUFBLFVBQTdCO0FBQUEsWUFBaUMsS0FBQSxnQkFBTyxHQUFLLENBQUEsQ0FBQSxVQUE3QztBQUFBLFlBQWlELElBQUEsZ0JBQU0sR0FBSyxDQUFBLENBQUEsVUFBNUQ7WUFEQSxDQURGO0FBQUE7O21CQURGLENBREEsQ0FBQTtBQUFBLE1BTUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixDQU5BLENBQUE7YUFPQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxFQVJTO0lBQUEsQ0FYWCxDQUFBOztBQUFBLDBCQXFCQSxZQUFBLEdBQWMsU0FBQSxHQUFBO2FBQUcsUUFBSDtJQUFBLENBckJkLENBQUE7O0FBQUEsMEJBdUJBLFdBQUEsR0FBYSxTQUFDLE1BQUQsR0FBQTthQUNYLEVBQUEsQ0FBRyxTQUFBLEdBQUE7ZUFDRCxJQUFDLENBQUEsRUFBRCxDQUFJLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ0YsWUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sMEJBQVA7YUFBTCxFQUF3QyxNQUFNLENBQUMsS0FBL0MsQ0FBQSxDQUFBO0FBQUEsWUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sRUFBUDthQUFMLEVBQWdCLEVBQUEsR0FBRSxNQUFNLENBQUMsSUFBVCxHQUFlLE1BQWYsR0FBb0IsTUFBTSxDQUFDLE1BQTNDLENBREEsQ0FBQTttQkFFQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sV0FBUDthQUFMLEVBQXlCLE1BQU0sQ0FBQyxJQUFoQyxFQUhFO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBSixFQURDO01BQUEsQ0FBSCxFQURXO0lBQUEsQ0F2QmIsQ0FBQTs7QUFBQSwwQkE4QkEsU0FBQSxHQUFXLFNBQUMsSUFBRCxHQUFBO0FBQ1QsVUFBQSxJQUFBO0FBQUEsTUFEVyxPQUFELEtBQUMsSUFDWCxDQUFBO2FBQUEsT0FBQSxDQUFRLElBQVIsRUFBK0IsSUFBQyxDQUFBLGVBQWxCLEdBQUEsV0FBQSxDQUFBLENBQUEsR0FBQSxNQUFkLEVBRFM7SUFBQSxDQTlCWCxDQUFBOzt1QkFBQTs7S0FGd0IsZUFUMUIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/log-list-view.coffee