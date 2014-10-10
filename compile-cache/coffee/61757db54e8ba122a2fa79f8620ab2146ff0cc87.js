(function() {
  var $$, GitDiff, SelectListView, StatusListView, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $$ = _ref.$$, SelectListView = _ref.SelectListView;

  git = require('../git');

  GitDiff = require('../models/git-diff');

  module.exports = StatusListView = (function(_super) {
    __extends(StatusListView, _super);

    function StatusListView() {
      return StatusListView.__super__.constructor.apply(this, arguments);
    }

    StatusListView.prototype.initialize = function(data, onlyCurrentFile) {
      this.data = data;
      this.onlyCurrentFile = onlyCurrentFile;
      StatusListView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      this.branch = this.data[0];
      this.setItems(this.parseData(this.data.slice(0, -1)));
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    StatusListView.prototype.parseData = function(files) {
      var line, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        line = files[_i];
        if (!(/^([ MADRCU?!]{2})\s{1}(.*)/.test(line))) {
          continue;
        }
        line = line.match(/^([ MADRCU?!]{2})\s{1}(.*)/);
        _results.push({
          type: line[1],
          path: line[2]
        });
      }
      return _results;
    };

    StatusListView.prototype.getFilterKey = function() {
      return 'path';
    };

    StatusListView.prototype.viewForItem = function(_arg) {
      var getIcon, path, type;
      type = _arg.type, path = _arg.path;
      getIcon = function(s) {
        if (s[0] === 'A') {
          return 'status-added icon icon-diff-added';
        }
        if (s[0] === 'D') {
          return 'status-removed icon icon-diff-removed';
        }
        if (s[0] === 'R') {
          return 'status-renamed icon icon-diff-renamed';
        }
        if (s[0] === 'M' || s[1] === 'M') {
          return 'status-modified icon icon-diff-modified';
        }
        return '';
      };
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'pull-right highlight',
              style: 'white-space: pre-wrap; font-family: monospace'
            }, type);
            _this.span({
              "class": getIcon(type)
            });
            return _this.span(path);
          };
        })(this));
      });
    };

    StatusListView.prototype.confirmed = function(_arg) {
      var openFile, path, type;
      type = _arg.type, path = _arg.path;
      this.cancel();
      if (type === '??') {
        return git.add({
          file: path
        });
      } else {
        openFile = confirm("Open " + path + "?");
        if (openFile) {
          return atom.workspace.open(path);
        } else {
          return GitDiff({
            file: path
          });
        }
      }
    };

    return StatusListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF1QixPQUFBLENBQVEsTUFBUixDQUF2QixFQUFDLFVBQUEsRUFBRCxFQUFLLHNCQUFBLGNBQUwsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSLENBSFYsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixxQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsNkJBQUEsVUFBQSxHQUFZLFNBQUUsSUFBRixFQUFTLGVBQVQsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLE9BQUEsSUFDWixDQUFBO0FBQUEsTUFEa0IsSUFBQyxDQUFBLGtCQUFBLGVBQ25CLENBQUE7QUFBQSxNQUFBLGdEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsSUFBSyxDQUFBLENBQUEsQ0FGaEIsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsU0FBRCxDQUFXLElBQUMsQ0FBQSxJQUFLLGFBQWpCLENBQVYsQ0FIQSxDQUFBO0FBQUEsTUFLQSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQW5CLENBQTBCLElBQTFCLENBTEEsQ0FBQTthQU1BLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBUFU7SUFBQSxDQUFaLENBQUE7O0FBQUEsNkJBU0EsU0FBQSxHQUFXLFNBQUMsS0FBRCxHQUFBO0FBQ1QsVUFBQSx3QkFBQTtBQUFBO1dBQUEsNENBQUE7eUJBQUE7Y0FBdUIsNEJB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/status-list-view.coffee