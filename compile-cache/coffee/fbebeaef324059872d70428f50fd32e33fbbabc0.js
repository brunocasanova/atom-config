(function() {
  var $, $$, CherryPickSelectCommits, EditorView, OutputView, SelectListMultipleView, StatusView, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$, EditorView = _ref.EditorView;

  git = require('../git');

  OutputView = require('./output-view');

  StatusView = require('./status-view');

  SelectListMultipleView = require('./select-list-multiple-view');

  module.exports = CherryPickSelectCommits = (function(_super) {
    __extends(CherryPickSelectCommits, _super);

    function CherryPickSelectCommits() {
      return CherryPickSelectCommits.__super__.constructor.apply(this, arguments);
    }

    CherryPickSelectCommits.prototype.initialize = function(data) {
      var item;
      CherryPickSelectCommits.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      this.setItems((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          item = data[_i];
          item = item.split('\n');
          _results.push({
            hash: item[0],
            author: item[1],
            time: item[2],
            subject: item[3]
          });
        }
        return _results;
      })());
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    CherryPickSelectCommits.prototype.getFilterKey = function() {
      return 'hash';
    };

    CherryPickSelectCommits.prototype.addButtons = function() {
      var viewButton;
      viewButton = $$(function() {
        return this.div({
          "class": 'buttons'
        }, (function(_this) {
          return function() {
            _this.span({
              "class": 'pull-left'
            }, function() {
              return _this.button({
                "class": 'btn btn-error inline-block-tight btn-cancel-button'
              }, 'Cancel');
            });
            return _this.span({
              "class": 'pull-right'
            }, function() {
              return _this.button({
                "class": 'btn btn-success inline-block-tight btn-pick-button'
              }, 'Cherry-Pick!');
            });
          };
        })(this));
      });
      viewButton.appendTo(this);
      return this.on('click', 'button', (function(_this) {
        return function(_arg) {
          var target;
          target = _arg.target;
          if ($(target).hasClass('btn-pick-button')) {
            _this.complete();
          }
          if ($(target).hasClass('btn-cancel-button')) {
            return _this.cancel();
          }
        };
      })(this));
    };

    CherryPickSelectCommits.prototype.viewForItem = function(item, matchedStr) {
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'text-highlight inline-block pull-right',
              style: 'font-family: monospace'
            }, function() {
              if (matchedStr != null) {
                return _this.raw(matchedStr);
              } else {
                return _this.span(item.hash);
              }
            });
            _this.div({
              "class": 'text-info'
            }, "" + item.author + ", " + item.time);
            return _this.div({
              "class": 'text-warning'
            }, item.subject);
          };
        })(this));
      });
    };

    CherryPickSelectCommits.prototype.completed = function(items) {
      var commits, item;
      this.cancel();
      commits = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          _results.push(item.hash);
        }
        return _results;
      })();
      return git.cmd({
        args: ['cherry-pick'].concat(commits),
        stdout: function(data) {
          return new StatusView({
            type: 'success',
            message: data
          });
        }
      });
    };

    return CherryPickSelectCommits;

  })(SelectListMultipleView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFHQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFzQixPQUFBLENBQVEsTUFBUixDQUF0QixFQUFDLFNBQUEsQ0FBRCxFQUFJLFVBQUEsRUFBSixFQUFRLGtCQUFBLFVBQVIsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FIYixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBSmIsQ0FBQTs7QUFBQSxFQUtBLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSw2QkFBUixDQUx6QixDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLDhDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxzQ0FBQSxVQUFBLEdBQVksU0FBQyxJQUFELEdBQUE7QUFDVixVQUFBLElBQUE7QUFBQSxNQUFBLHlEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLFFBQUQ7O0FBQ0U7YUFBQSwyQ0FBQTswQkFBQTtBQUNFLFVBQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBWCxDQUFQLENBQUE7QUFBQSx3QkFDQTtBQUFBLFlBQUMsSUFBQSxFQUFNLElBQUssQ0FBQSxDQUFBLENBQVo7QUFBQSxZQUFnQixNQUFBLEVBQVEsSUFBSyxDQUFBLENBQUEsQ0FBN0I7QUFBQSxZQUFpQyxJQUFBLEVBQU0sSUFBSyxDQUFBLENBQUEsQ0FBNUM7QUFBQSxZQUFnRCxPQUFBLEVBQVMsSUFBSyxDQUFBLENBQUEsQ0FBOUQ7WUFEQSxDQURGO0FBQUE7O1VB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/cherry-pick-select-commits-view.coffee