(function() {
  var $, ConflictMarker, GitBridge, MaybeLaterView, MergeConflictsView, MergeState, NothingToMergeView, ResolverView, Subscriber, SuccessView, View, handleErr, path, _, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  _ = require('underscore-plus');

  path = require('path');

  Subscriber = require('emissary').Subscriber;

  GitBridge = require('./git-bridge').GitBridge;

  MergeState = require('./merge-state');

  ResolverView = require('./resolver-view');

  ConflictMarker = require('./conflict-marker');

  _ref1 = require('./message-views'), SuccessView = _ref1.SuccessView, MaybeLaterView = _ref1.MaybeLaterView, NothingToMergeView = _ref1.NothingToMergeView;

  handleErr = require('./error-view');

  module.exports = MergeConflictsView = (function(_super) {
    __extends(MergeConflictsView, _super);

    function MergeConflictsView() {
      return MergeConflictsView.__super__.constructor.apply(this, arguments);
    }

    MergeConflictsView.prototype.instance = null;

    Subscriber.includeInto(MergeConflictsView);

    MergeConflictsView.content = function(state) {
      return this.div({
        "class": 'merge-conflicts tool-panel panel-bottom padded'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'panel-heading'
          }, function() {
            _this.text('Conflicts');
            _this.span({
              "class": 'pull-right icon icon-fold',
              click: 'minimize'
            }, 'Hide');
            return _this.span({
              "class": 'pull-right icon icon-unfold',
              click: 'restore'
            }, 'Show');
          });
          return _this.div({
            outlet: 'body'
          }, function() {
            _this.ul({
              "class": 'block list-group',
              outlet: 'pathList'
            }, function() {
              var message, p, _i, _len, _ref2, _ref3, _results;
              _ref2 = state.conflicts;
              _results = [];
              for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
                _ref3 = _ref2[_i], p = _ref3.path, message = _ref3.message;
                _results.push(_this.li({
                  click: 'navigate',
                  "class": 'list-item navigate'
                }, function() {
                  _this.span({
                    "class": 'inline-block icon icon-diff-modified status-modified path'
                  }, p);
                  return _this.div({
                    "class": 'pull-right'
                  }, function() {
                    _this.button({
                      click: 'stageFile',
                      "class": 'btn btn-xs btn-success inline-block-tight stage-ready',
                      style: 'display: none'
                    }, 'Stage');
                    _this.span({
                      "class": 'inline-block text-subtle'
                    }, message);
                    _this.progress({
                      "class": 'inline-block',
                      max: 100,
                      value: 0
                    });
                    return _this.span({
                      "class": 'inline-block icon icon-dash staged'
                    });
                  });
                }));
              }
              return _results;
            });
            return _this.div({
              "class": 'block pull-right'
            }, function() {
              return _this.button({
                "class": 'btn btn-sm',
                click: 'quit'
              }, 'Quit');
            });
          });
        };
      })(this));
    };

    MergeConflictsView.prototype.initialize = function(state) {
      this.state = state;
      this.markers = [];
      this.editorSub = null;
      this.subscribe(atom, 'merge-conflicts:resolved', (function(_this) {
        return function(event) {
          var p, progress;
          p = atom.project.getRepo().relativize(event.file);
          progress = _this.pathList.find("li:contains('" + p + "') progress")[0];
          if (progress != null) {
            progress.max = event.total;
            progress.value = event.resolved;
          } else {
            console.log("Unrecognized conflict path: " + p);
          }
          if (event.total === event.resolved) {
            return _this.pathList.find("li:contains('" + p + "') .stage-ready").eq(0).show();
          }
        };
      })(this));
      this.subscribe(atom, 'merge-conflicts:staged', (function(_this) {
        return function() {
          return _this.refresh();
        };
      })(this));
      this.command('merge-conflicts:entire-file-ours', this.sideResolver('ours'));
      return this.command('merge-conflicts:entire-file-theirs', this.sideResolver('theirs'));
    };

    MergeConflictsView.prototype.navigate = function(event, element) {
      var fullPath, repoPath;
      repoPath = element.find(".path").text();
      fullPath = path.join(atom.project.getRepo().getWorkingDirectory(), repoPath);
      return atom.workspace.open(fullPath);
    };

    MergeConflictsView.prototype.minimize = function() {
      this.addClass('minimized');
      return this.body.hide('fast');
    };

    MergeConflictsView.prototype.restore = function() {
      this.removeClass('minimized');
      return this.body.show('fast');
    };

    MergeConflictsView.prototype.quit = function() {
      atom.emit('merge-conflicts:quit');
      return this.finish(MaybeLaterView);
    };

    MergeConflictsView.prototype.refresh = function() {
      return this.state.reread((function(_this) {
        return function(err, state) {
          var icon, item, p, _i, _len, _ref2;
          if (handleErr(err)) {
            return;
          }
          _ref2 = _this.pathList.find('li');
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            item = _ref2[_i];
            p = $(item).find('.path').text();
            icon = $(item).find('.staged');
            icon.removeClass('icon-dash icon-check text-success');
            if (_.contains(_this.state.conflictPaths(), p)) {
              icon.addClass('icon-dash');
            } else {
              icon.addClass('icon-check text-success');
              _this.pathList.find("li:contains('" + p + "') .stage-ready").eq(0).hide();
            }
          }
          if (_this.state.isEmpty()) {
            atom.emit('merge-conflicts:done');
            return _this.finish(SuccessView);
          }
        };
      })(this));
    };

    MergeConflictsView.prototype.finish = function(viewClass) {
      var m, _i, _len, _ref2;
      this.unsubscribe();
      _ref2 = this.markers;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        m = _ref2[_i];
        m.cleanup();
      }
      this.markers = [];
      this.editorSub.off();
      this.hide('fast', (function(_this) {
        return function() {
          MergeConflictsView.instance = null;
          return _this.remove();
        };
      })(this));
      return atom.workspaceView.appendToTop(new viewClass(this.state));
    };

    MergeConflictsView.prototype.sideResolver = function(side) {
      return function(event) {
        var p;
        p = $(event.target).closest('li').find('.path').text();
        return GitBridge.checkoutSide(side, p, function(err) {
          var full;
          if (handleErr(err)) {
            return;
          }
          full = path.join(atom.project.path, p);
          atom.emit('merge-conflicts:resolved', {
            file: full,
            total: 1,
            resolved: 1
          });
          return atom.workspace.open(p);
        });
      };
    };

    MergeConflictsView.prototype.editorView = function(filePath) {
      var _editorView, _i, _len, _ref2;
      if (filePath) {
        _ref2 = atom.workspaceView.getEditorViews();
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          _editorView = _ref2[_i];
          if (_editorView.getEditor().getPath() === filePath) {
            return _editorView;
          }
        }
      }
      return null;
    };

    MergeConflictsView.prototype.editor = function(filePath) {
      var _ref2;
      return (_ref2 = this.editorView(filePath)) != null ? _ref2.getEditor() : void 0;
    };

    MergeConflictsView.prototype.stageFile = function(event, element) {
      var filePath, repoPath, _ref2;
      repoPath = element.closest('li').find('.path').text();
      filePath = path.join(atom.project.getRepo().getWorkingDirectory(), repoPath);
      if ((_ref2 = this.editor(filePath)) != null) {
        _ref2.save();
      }
      return GitBridge.add(repoPath, function(err) {
        if (handleErr(err)) {
          return;
        }
        return atom.emit('merge-conflicts:staged', {
          file: filePath
        });
      });
    };

    MergeConflictsView.detect = function() {
      if (!atom.project.getRepo()) {
        return;
      }
      if (this.instance != null) {
        return;
      }
      return MergeState.read((function(_this) {
        return function(err, state) {
          var view;
          if (handleErr(err)) {
            return;
          }
          if (!state.isEmpty()) {
            view = new MergeConflictsView(state);
            _this.instance = view;
            atom.workspaceView.appendToBottom(view);
            return _this.instance.editorSub = atom.workspaceView.eachEditorView(function(view) {
              var marker;
              if (view.attached && (view.getPane() != null)) {
                marker = _this.markConflictsIn(state, view);
                if (marker != null) {
                  return _this.instance.markers.push(marker);
                }
              }
            });
          } else {
            return atom.workspaceView.appendToTop(new NothingToMergeView(state));
          }
        };
      })(this));
    };

    MergeConflictsView.markConflictsIn = function(state, editorView) {
      var fullPath, repoPath;
      if (state.isEmpty()) {
        return;
      }
      fullPath = editorView.getEditor().getPath();
      repoPath = atom.project.getRepo().relativize(fullPath);
      if (!_.contains(state.conflictPaths(), repoPath)) {
        return;
      }
      return new ConflictMarker(state, editorView);
    };

    return MergeConflictsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhLQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUFZLE9BQUEsQ0FBUSxNQUFSLENBQVosRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FESixDQUFBOztBQUFBLEVBRUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxFQUdDLGFBQWMsT0FBQSxDQUFRLFVBQVIsRUFBZCxVQUhELENBQUE7O0FBQUEsRUFLQyxZQUFhLE9BQUEsQ0FBUSxjQUFSLEVBQWIsU0FMRCxDQUFBOztBQUFBLEVBTUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBTmIsQ0FBQTs7QUFBQSxFQU9BLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FQZixDQUFBOztBQUFBLEVBUUEsY0FBQSxHQUFpQixPQUFBLENBQVEsbUJBQVIsQ0FSakIsQ0FBQTs7QUFBQSxFQVNBLFFBQW9ELE9BQUEsQ0FBUSxpQkFBUixDQUFwRCxFQUFDLG9CQUFBLFdBQUQsRUFBYyx1QkFBQSxjQUFkLEVBQThCLDJCQUFBLGtCQVQ5QixDQUFBOztBQUFBLEVBVUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxjQUFSLENBVlosQ0FBQTs7QUFBQSxFQVlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSix5Q0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsaUNBQUEsUUFBQSxHQUFVLElBQVYsQ0FBQTs7QUFBQSxJQUNBLFVBQVUsQ0FBQyxXQUFYLENBQXVCLGtCQUF2QixDQURBLENBQUE7O0FBQUEsSUFHQSxrQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLEtBQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9B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
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/merge-conflicts-view.coffee