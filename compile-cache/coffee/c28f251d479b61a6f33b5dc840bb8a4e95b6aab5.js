(function() {
  var $, BufferedProcess, EditorView, Os, Path, StatusView, TagCreateView, View, fs, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Os = require('os');

  Path = require('path');

  fs = require('fs-plus');

  _ref = require('atom'), $ = _ref.$, BufferedProcess = _ref.BufferedProcess, EditorView = _ref.EditorView, View = _ref.View;

  StatusView = require('./status-view');

  git = require('../git');

  module.exports = TagCreateView = (function(_super) {
    __extends(TagCreateView, _super);

    function TagCreateView() {
      return TagCreateView.__super__.constructor.apply(this, arguments);
    }

    TagCreateView.content = function() {
      return this.div({
        "class": 'overlay from-top'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'block'
          }, function() {
            return _this.subview('tagName', new EditorView({
              mini: true,
              placeholderText: 'Tag'
            }));
          });
          _this.div({
            "class": 'block'
          }, function() {
            return _this.subview('tagMessage', new EditorView({
              mini: true,
              placeholderText: 'Annotation message'
            }));
          });
          return _this.div({
            "class": 'block'
          }, function() {
            _this.span({
              "class": 'pull-left'
            }, function() {
              return _this.button({
                "class": 'btn btn-success inline-block-tight gp-confirm-button',
                click: 'createTag'
              }, 'Create Tag');
            });
            return _this.span({
              "class": 'pull-right'
            }, function() {
              return _this.button({
                "class": 'btn btn-error inline-block-tight gp-cancel-button',
                click: 'abort'
              }, 'Cancel');
            });
          });
        };
      })(this));
    };

    TagCreateView.prototype.initialize = function() {
      atom.workspaceView.append(this);
      this.tagName.focus();
      return this.on('core:cancel', (function(_this) {
        return function() {
          return _this.abort();
        };
      })(this));
    };

    TagCreateView.prototype.createTag = function() {
      var tag;
      tag = {
        name: this.tagName.text().slice(2),
        message: this.tagMessage.text().slice(2)
      };
      new BufferedProcess({
        command: 'git',
        args: ['tag', '-a', tag.name, '-m', tag.message],
        options: {
          cwd: git.dir()
        },
        stderr: function(data) {
          return new StatusView({
            type: 'alert',
            message: data.toString()
          });
        },
        exit: function(code) {
          if (code === 0) {
            return new StatusView({
              type: 'success',
              message: "Tag '" + tag.name + "' has been created successfully!"
            });
          }
        }
      });
      return this.detach();
    };

    TagCreateView.prototype.abort = function() {
      return this.detach();
    };

    return TagCreateView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxPQUF5QyxPQUFBLENBQVEsTUFBUixDQUF6QyxFQUFDLFNBQUEsQ0FBRCxFQUFJLHVCQUFBLGVBQUosRUFBcUIsa0JBQUEsVUFBckIsRUFBaUMsWUFBQSxJQUpqQyxDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBTGIsQ0FBQTs7QUFBQSxFQU1BLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQU5OLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosb0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsYUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sa0JBQVA7T0FBTCxFQUFnQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQzlCLFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLE9BQVA7V0FBTCxFQUFxQixTQUFBLEdBQUE7bUJBQ25CLEtBQUMsQ0FBQSxPQUFELENBQVMsU0FBVCxFQUF3QixJQUFBLFVBQUEsQ0FBVztBQUFBLGNBQUEsSUFBQSxFQUFNLElBQU47QUFBQSxjQUFZLGVBQUEsRUFBaUIsS0FBN0I7YUFBWCxDQUF4QixFQURtQjtVQUFBLENBQXJCLENBQUEsQ0FBQTtBQUFBLFVB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/tag-create-view.coffee