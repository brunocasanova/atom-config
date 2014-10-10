(function() {
  var $, $$, EditorView, OutputView, SelectListMultipleView, SelectStageFilesView, StatusView, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$, EditorView = _ref.EditorView;

  git = require('../git');

  OutputView = require('./output-view');

  StatusView = require('./status-view');

  SelectListMultipleView = require('./select-list-multiple-view');

  module.exports = SelectStageFilesView = (function(_super) {
    var prettify;

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
                "class": 'btn btn-success inline-block-tight btn-remove-button'
              }, 'Remove');
            });
          };
        })(this));
      });
      viewButton.appendTo(this);
      return this.on('click', 'button', (function(_this) {
        return function(_arg) {
          var target;
          target = _arg.target;
          if ($(target).hasClass('btn-remove-button')) {
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
            if (matchedStr != null) {
              return _this.raw(matchedStr);
            } else {
              return _this.span(item);
            }
          };
        })(this));
      });
    };

    SelectStageFilesView.prototype.completed = function(items) {
      var currentFile, files, item, _ref1;
      files = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          item = items[_i];
          if (item !== '') {
            _results.push(item);
          }
        }
        return _results;
      })();
      this.cancel();
      currentFile = git.relativize((_ref1 = atom.workspace.getActiveEditor()) != null ? _ref1.getPath() : void 0);
      if (__indexOf.call(files, currentFile) >= 0) {
        atom.workspaceView.getActiveView().remove();
      }
      return git.cmd({
        args: ['rm', '-f'].concat(files),
        stdout: function(data) {
          return new StatusView({
            type: 'success',
            message: "Removed " + (prettify(data))
          });
        }
      });
    };

    prettify = function(data) {
      var file, i, _i, _len, _results;
      data = data.match(/rm ('.*')/g);
      if ((data != null ? data.length : void 0) >= 1) {
        _results = [];
        for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
          file = data[i];
          _results.push(data[i] = ' ' + file.match(/rm '(.*)'/)[1]);
        }
        return _results;
      }
    };

    return SelectStageFilesView;

  })(SelectListMultipleView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtHQUFBO0lBQUE7O3lKQUFBOztBQUFBLEVBQUEsT0FBc0IsT0FBQSxDQUFRLE1BQVIsQ0FBdEIsRUFBQyxTQUFBLENBQUQsRUFBSSxVQUFBLEVBQUosRUFBUSxrQkFBQSxVQUFSLENBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FGTixDQUFBOztBQUFBLEVBR0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBSGIsQ0FBQTs7QUFBQSxFQUlBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUpiLENBQUE7O0FBQUEsRUFLQSxzQkFBQSxHQUF5QixPQUFBLENBQVEsNkJBQVIsQ0FMekIsQ0FBQTs7QUFBQSxFQU9BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixRQUFBLFFBQUE7O0FBQUEsMkNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLG1DQUFBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNWLE1BQUEsc0RBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQVYsQ0FEQSxDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsUUFBRCxDQUFVLEtBQVYsQ0FIQSxDQUFBO0FBQUEsTUFJQSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQW5CLENBQTBCLElBQTFCLENBSkEsQ0FBQTthQUtBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLEVBTlU7SUFBQSxDQUFaLENBQUE7O0FBQUEsbUNBUUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLFVBQUEsVUFBQTtBQUFBLE1BQUEsVUFBQSxHQUFhLEVBQUEsQ0FBRyxTQUFBLEdBQUE7ZUFDZCxJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsVUFBQSxPQUFBLEVBQU8sU0FBUDtTQUFMLEVBQXVC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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/remove-list-view.coffee