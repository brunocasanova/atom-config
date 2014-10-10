(function() {
  var $, $$, EditorView, OutputView, SelectListMultipleView, SelectStageHunks, StatusView, fs, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs-plus');

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$, EditorView = _ref.EditorView;

  git = require('../git');

  OutputView = require('./output-view');

  StatusView = require('./status-view');

  SelectListMultipleView = require('./select-list-multiple-view');

  module.exports = SelectStageHunks = (function(_super) {
    __extends(SelectStageHunks, _super);

    function SelectStageHunks() {
      return SelectStageHunks.__super__.constructor.apply(this, arguments);
    }

    SelectStageHunks.prototype.initialize = function(data) {
      SelectStageHunks.__super__.initialize.apply(this, arguments);
      this.patch_header = data[0];
      if (data.length === 2) {
        return this.completed(this._generateObjects(data.slice(1)));
      }
      this.addClass('overlay from-top');
      this.setItems(this._generateObjects(data.slice(1)));
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    SelectStageHunks.prototype.getFilterKey = function() {
      return 'pos';
    };

    SelectStageHunks.prototype.addButtons = function() {
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

    SelectStageHunks.prototype.viewForItem = function(item, matchedStr) {
      var viewItem;
      return viewItem = $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'inline-block highlight'
            }, function() {
              if (matchedStr != null) {
                return _this.raw(matchedStr);
              } else {
                return _this.span(item.pos);
              }
            });
            return _this.div({
              "class": 'text-warning gp-item-diff',
              style: 'white-space: pre-wrap; font-family: monospace'
            }, item.diff);
          };
        })(this));
      });
    };

    SelectStageHunks.prototype.completed = function(items) {
      var patch, patchPath, patch_full, _i, _len;
      this.cancel();
      if (items.length < 1) {
        return;
      }
      patch_full = this.patch_header;
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        patch = items[_i].patch;
        patch_full += patch;
      }
      patchPath = atom.project.getRepo().getWorkingDirectory() + '/.git/GITPLUS_PATCH';
      fs.writeFileSync(patchPath, patch_full, {
        flag: 'w+'
      });
      return git.cmd({
        args: ['apply', '--cached', '--', patchPath],
        stdout: function(data) {
          data = (data != null) && data !== '' ? data : 'Hunk has been staged!';
          new StatusView({
            type: 'success',
            message: data
          });
          try {
            return fs.unlink(patchPath);
          } catch (_error) {}
        }
      });
    };

    SelectStageHunks.prototype._generateObjects = function(data) {
      var hunk, hunkSplit, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = data.length; _i < _len; _i++) {
        hunk = data[_i];
        if (!(hunk !== '')) {
          continue;
        }
        hunkSplit = hunk.match(/(@@[ \-\+\,0-9]*@@.*)\n([\s\S]*)/);
        _results.push({
          pos: hunkSplit[1],
          diff: hunkSplit[2],
          patch: hunk
        });
      }
      return _results;
    };

    return SelectStageHunks;

  })(SelectListMultipleView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtHQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsT0FBc0IsT0FBQSxDQUFRLE1BQVIsQ0FBdEIsRUFBQyxTQUFBLENBQUQsRUFBSSxVQUFBLEVBQUosRUFBUSxrQkFBQSxVQURSLENBQUE7O0FBQUEsRUFHQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FITixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBSmIsQ0FBQTs7QUFBQSxFQUtBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUxiLENBQUE7O0FBQUEsRUFNQSxzQkFBQSxHQUF5QixPQUFBLENBQVEsNkJBQVIsQ0FOekIsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSix1Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsK0JBQUEsVUFBQSxHQUFZLFNBQUMsSUFBRCxHQUFBO0FBQ1YsTUFBQSxrREFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFlBQUQsR0FBZ0IsSUFBSyxDQUFBLENBQUEsQ0FEckIsQ0FBQTtBQUVBLE1BQUEsSUFBa0QsSUFBSSxDQUFDLE1BQUwsS0FBZSxDQUFqRTtBQUFBLGVBQU8sSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsSUFBSyxTQUF2QixDQUFYLENBQVAsQ0FBQTtPQUZBO0FBQUEsTUFJQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsSUFBSyxTQUF2QixDQUFWLENBTEEsQ0FBQTtBQUFBLE1B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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/select-stage-hunks-view.coffee