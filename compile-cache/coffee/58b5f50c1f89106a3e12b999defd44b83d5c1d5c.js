(function() {
  var $, $$, EditorView, OutputView, SelectListMultipleView, SelectStageFilesView, StatusView, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$, EditorView = _ref.EditorView;

  git = require('../git');

  OutputView = require('./output-view');

  StatusView = require('./status-view');

  SelectListMultipleView = require('./select-list-multiple-view');

  module.exports = SelectStageFilesView = (function(_super) {
    __extends(SelectStageFilesView, _super);

    function SelectStageFilesView() {
      return SelectStageFilesView.__super__.constructor.apply(this, arguments);
    }

    SelectStageFilesView.prototype.initialize = function(items) {
      SelectStageFilesView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      this.setItems(items);
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    SelectStageFilesView.prototype.getFilterKey = function() {
      return 'path';
    };

    SelectStageFilesView.prototype.addButtons = function() {
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
                "class": 'btn btn-success inline-block-tight btn-stage-button'
              }, 'Stage');
            });
          };
        })(this));
      });
      viewButton.appendTo(this);
      return this.on('click', 'button', (function(_this) {
        return function(_arg) {
          var target;
          target = _arg.target;
          if ($(target).hasClass('btn-stage-button')) {
            _this.complete();
          }
          if ($(target).hasClass('btn-cancel-button')) {
            return _this.cancel();
          }
        };
      })(this));
    };

    SelectStageFilesView.prototype.viewForItem = function(item, matchedStr) {
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'pull-right'
            }, function() {
              return _this.span({
                "class": 'inline-block highlight'
              }, item.mode);
            });
            if (matchedStr != null) {
              return _this.raw(matchedStr);
            } else {
              return _this.span(item.path);
            }
          };
        })(this));
      });
    };

    SelectStageFilesView.prototype.completed = function(items) {
      var files, item;
      files = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          _results.push(item.path);
        }
        return _results;
      })();
      this.cancel();
      return git.cmd({
        args: ['add', '-f'].concat(files),
        stdout: function(data) {
          return new StatusView({
            type: 'success',
            message: data
          });
        }
      });
    };

    return SelectStageFilesView;

  })(SelectListMultipleView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtHQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFzQixPQUFBLENBQVEsTUFBUixDQUF0QixFQUFDLFNBQUEsQ0FBRCxFQUFJLFVBQUEsRUFBSixFQUFRLGtCQUFBLFVBQVIsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxVQUFBLEdBQWEsT0FBQSxDQUFRLGVBQVIsQ0FIYixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBSmIsQ0FBQTs7QUFBQSxFQUtBLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSw2QkFBUixDQUx6QixDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLDJDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxtQ0FBQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDVixNQUFBLHNEQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBSEEsQ0FBQTtBQUFBLE1BSUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixDQUpBLENBQUE7YUFLQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxFQU5VO0lBQUEsQ0FBWixDQUFBOztBQUFBLG1DQVFBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFDWixPQURZO0lBQUEsQ0FSZCxDQUFBOztBQUFBLG1DQVdBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixVQUFBLFVBQUE7QUFBQSxNQUFBLFVBQUEsR0FBYSxFQUFBLENBQUcsU0FBQSxHQUFBO2VBQ2QsSUFBQyxDQUFBLEdBQUQs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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/select-stage-files-view.coffee