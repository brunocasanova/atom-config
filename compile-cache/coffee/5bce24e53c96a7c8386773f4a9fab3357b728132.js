(function() {
  var GitBridge, ResolverView, View, handleErr,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  GitBridge = require('./git-bridge').GitBridge;

  handleErr = require('./error-view');

  module.exports = ResolverView = (function(_super) {
    __extends(ResolverView, _super);

    function ResolverView() {
      return ResolverView.__super__.constructor.apply(this, arguments);
    }

    ResolverView.content = function(editor) {
      return this.div({
        "class": 'overlay from-top resolver'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'block text-highlight'
          }, "We're done here");
          _this.div({
            "class": 'block'
          }, function() {
            _this.div({
              "class": 'block text-info'
            }, function() {
              return _this.text("You've dealt with all of the conflicts in this file.");
            });
            return _this.div({
              "class": 'block text-info'
            }, function() {
              _this.span({
                outlet: 'actionText'
              }, 'Save and stage');
              return _this.text(' this file for commit?');
            });
          });
          _this.div({
            "class": 'pull-left'
          }, function() {
            return _this.button({
              "class": 'btn btn-primary',
              click: 'dismiss'
            }, 'Maybe Later');
          });
          return _this.div({
            "class": 'pull-right'
          }, function() {
            return _this.button({
              "class": 'btn btn-primary',
              click: 'resolve'
            }, 'Stage');
          });
        };
      })(this));
    };

    ResolverView.prototype.initialize = function(editor) {
      this.editor = editor;
      this.refresh();
      this.editor.getBuffer().on('saved', (function(_this) {
        return function() {
          return _this.refresh();
        };
      })(this));
      return this.subscribe(atom, 'merge-conflicts:quit', (function(_this) {
        return function(event) {
          return _this.dismiss();
        };
      })(this));
    };

    ResolverView.prototype.getModel = function() {
      return null;
    };

    ResolverView.prototype.relativePath = function() {
      return atom.project.getRepo().relativize(this.editor.getUri());
    };

    ResolverView.prototype.refresh = function() {
      return GitBridge.isStaged(this.relativePath(), (function(_this) {
        return function(err, staged) {
          var modified, needsSaved, needsStaged;
          if (handleErr(err)) {
            return;
          }
          modified = _this.editor.isModified();
          needsSaved = modified;
          needsStaged = modified || !staged;
          if (!(needsSaved || needsStaged)) {
            _this.hide('fast', function() {
              return this.remove();
            });
            atom.emit('merge-conflicts:staged', {
              file: _this.editor.getUri()
            });
            return;
          }
          if (needsSaved) {
            return _this.actionText.text('Save and stage');
          } else if (needsStaged) {
            return _this.actionText.text('Stage');
          }
        };
      })(this));
    };

    ResolverView.prototype.resolve = function() {
      this.editor.save();
      return GitBridge.add(this.relativePath(), (function(_this) {
        return function(err) {
          if (handleErr(err)) {
            return;
          }
          return _this.refresh();
        };
      })(this));
    };

    ResolverView.prototype.dismiss = function() {
      return this.hide('fast', (function(_this) {
        return function() {
          return _this.remove();
        };
      })(this));
    };

    return ResolverView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0MsWUFBYSxPQUFBLENBQVEsY0FBUixFQUFiLFNBREQsQ0FBQTs7QUFBQSxFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsY0FBUixDQUZaLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosbUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsWUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLE1BQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTywyQkFBUDtPQUFMLEVBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDdkMsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sc0JBQVA7V0FBTCxFQUFvQyxpQkFBcEMsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sT0FBUDtXQUFMLEVBQXFCLFNBQUEsR0FBQTtBQUNuQixZQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxpQkFBUDthQUFMLEVBQStCLFNBQUEsR0FBQTtxQkFDN0IsS0FBQyxDQUFBLElBQUQsQ0FBTSxzREFBTixFQUQ2QjtZQUFBLENBQS9CLENBQUEsQ0FBQTttQkFFQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8saUJBQVA7YUFBTCxFQUErQixTQUFBLEdBQUE7QUFDN0IsY0FBQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsZ0JBQUEsTUFBQSxFQUFR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
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/resolver-view.coffee