(function() {
  var $, Conflict, ConflictMarker, EditorAdapter, NavigationView, ResolverView, SideView, Subscriber, _;

  $ = require('atom').$;

  _ = require('underscore-plus');

  Subscriber = require('emissary').Subscriber;

  Conflict = require('./conflict');

  SideView = require('./side-view');

  NavigationView = require('./navigation-view');

  ResolverView = require('./resolver-view');

  EditorAdapter = require('./editor-adapter').EditorAdapter;

  module.exports = ConflictMarker = (function() {
    Subscriber.includeInto(ConflictMarker);

    function ConflictMarker(state, editorView) {
      var c, cv, _i, _j, _len, _len1, _ref, _ref1;
      this.state = state;
      this.editorView = editorView;
      this.conflicts = Conflict.all(this.state, this.editorView.getModel());
      this.adapter = EditorAdapter.adapt(this.editorView);
      if (this.conflicts) {
        this.editorView.addClass('conflicted');
      }
      this.coveringViews = [];
      _ref = this.conflicts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        this.coveringViews.push(new SideView(c.ours, this.editorView));
        this.coveringViews.push(new NavigationView(c.navigator, this.editorView));
        this.coveringViews.push(new SideView(c.theirs, this.editorView));
        c.on('conflict:resolved', (function(_this) {
          return function() {
            var resolvedCount, unresolved, v, _j, _len1;
            unresolved = (function() {
              var _j, _len1, _ref1, _results;
              _ref1 = this.coveringViews;
              _results = [];
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                v = _ref1[_j];
                if (!v.conflict().isResolved()) {
                  _results.push(v);
                }
              }
              return _results;
            }).call(_this);
            for (_j = 0, _len1 = unresolved.length; _j < _len1; _j++) {
              v = unresolved[_j];
              v.reposition();
            }
            resolvedCount = _this.conflicts.length - Math.floor(unresolved.length / 3);
            return atom.emit('merge-conflicts:resolved', {
              file: _this.editor().getPath(),
              total: _this.conflicts.length,
              resolved: resolvedCount,
              source: _this
            });
          };
        })(this));
      }
      if (this.conflicts.length > 0) {
        _ref1 = this.coveringViews;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          cv = _ref1[_j];
          cv.decorate();
        }
        this.installEvents();
        this.focusConflict(this.conflicts[0]);
      } else {
        atom.emit('merge-conflicts:resolved', {
          file: this.editor().getPath(),
          total: 1,
          resolved: 1,
          source: this
        });
        this.conflictsResolved();
      }
    }

    ConflictMarker.prototype.installEvents = function() {
      this.subscribe(this.editor(), 'contents-modified', (function(_this) {
        return function() {
          return _this.detectDirty();
        };
      })(this));
      this.subscribe(this.editorView, 'editor:will-be-removed', (function(_this) {
        return function() {
          return _this.cleanup();
        };
      })(this));
      this.editorView.command('merge-conflicts:accept-current', (function(_this) {
        return function() {
          return _this.acceptCurrent();
        };
      })(this));
      this.editorView.command('merge-conflicts:accept-ours', (function(_this) {
        return function() {
          return _this.acceptOurs();
        };
      })(this));
      this.editorView.command('merge-conflicts:accept-theirs', (function(_this) {
        return function() {
          return _this.acceptTheirs();
        };
      })(this));
      this.editorView.command('merge-conflicts:ours-then-theirs', (function(_this) {
        return function() {
          return _this.acceptOursThenTheirs();
        };
      })(this));
      this.editorView.command('merge-conflicts:theirs-then-ours', (function(_this) {
        return function() {
          return _this.acceptTheirsThenOurs();
        };
      })(this));
      this.editorView.command('merge-conflicts:next-unresolved', (function(_this) {
        return function() {
          return _this.nextUnresolved();
        };
      })(this));
      this.editorView.command('merge-conflicts:previous-unresolved', (function(_this) {
        return function() {
          return _this.previousUnresolved();
        };
      })(this));
      this.editorView.command('merge-conflicts:revert-current', (function(_this) {
        return function() {
          return _this.revertCurrent();
        };
      })(this));
      return this.subscribe(atom, 'merge-conflicts:resolved', (function(_this) {
        return function(_arg) {
          var file, resolved, total;
          total = _arg.total, resolved = _arg.resolved, file = _arg.file;
          if (file === _this.editor().getPath() && total === resolved) {
            return _this.conflictsResolved();
          }
        };
      })(this));
    };

    ConflictMarker.prototype.cleanup = function() {
      var v, _i, _len, _ref;
      this.unsubscribe();
      _ref = this.coveringViews;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        v = _ref[_i];
        v.remove();
      }
      return this.editorView.removeClass('conflicted');
    };

    ConflictMarker.prototype.conflictsResolved = function() {
      this.cleanup();
      return this.editorView.append(new ResolverView(this.editor()));
    };

    ConflictMarker.prototype.detectDirty = function() {
      var c, potentials, v, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
      potentials = [];
      _ref = this.editor().getCursors();
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        _ref1 = this.coveringViews;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          v = _ref1[_j];
          if (v.includesCursor(c)) {
            potentials.push(v);
          }
        }
      }
      _ref2 = _.uniq(potentials);
      _results = [];
      for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
        v = _ref2[_k];
        _results.push(v.detectDirty());
      }
      return _results;
    };

    ConflictMarker.prototype.acceptCurrent = function() {
      var duplicates, seen, side, sides, _i, _j, _len, _len1, _results;
      sides = this.active();
      duplicates = [];
      seen = {};
      for (_i = 0, _len = sides.length; _i < _len; _i++) {
        side = sides[_i];
        if (side.conflict in seen) {
          duplicates.push(side);
          duplicates.push(seen[side.conflict]);
        }
        seen[side.conflict] = side;
      }
      sides = _.difference(sides, duplicates);
      _results = [];
      for (_j = 0, _len1 = sides.length; _j < _len1; _j++) {
        side = sides[_j];
        _results.push(side.resolve());
      }
      return _results;
    };

    ConflictMarker.prototype.acceptOurs = function() {
      var side, _i, _len, _ref, _results;
      _ref = this.active();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        side = _ref[_i];
        _results.push(side.conflict.ours.resolve());
      }
      return _results;
    };

    ConflictMarker.prototype.acceptTheirs = function() {
      var side, _i, _len, _ref, _results;
      _ref = this.active();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        side = _ref[_i];
        _results.push(side.conflict.theirs.resolve());
      }
      return _results;
    };

    ConflictMarker.prototype.acceptOursThenTheirs = function() {
      var side, _i, _len, _ref, _results;
      _ref = this.active();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        side = _ref[_i];
        _results.push(this.combineSides(side.conflict.ours, side.conflict.theirs));
      }
      return _results;
    };

    ConflictMarker.prototype.acceptTheirsThenOurs = function() {
      var side, _i, _len, _ref, _results;
      _ref = this.active();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        side = _ref[_i];
        _results.push(this.combineSides(side.conflict.theirs, side.conflict.ours));
      }
      return _results;
    };

    ConflictMarker.prototype.nextUnresolved = function() {
      var c, final, firstAfter, lastCursor, n, orderedCursors, p, pos, target, _i, _len, _ref;
      final = _.last(this.active());
      if (final != null) {
        n = final.conflict.navigator.nextUnresolved();
        if (n != null) {
          return this.focusConflict(n);
        }
      } else {
        orderedCursors = _.sortBy(this.editor().getCursors(), function(c) {
          return c.getBufferPosition().row;
        });
        lastCursor = _.last(orderedCursors);
        if (lastCursor == null) {
          return;
        }
        pos = lastCursor.getBufferPosition();
        firstAfter = null;
        _ref = this.conflicts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          p = c.ours.marker.getBufferRange().start;
          if (p.isGreaterThanOrEqual(pos) && (firstAfter == null)) {
            firstAfter = c;
          }
        }
        if (firstAfter == null) {
          return;
        }
        if (firstAfter.isResolved()) {
          target = firstAfter.navigator.nextUnresolved();
        } else {
          target = firstAfter;
        }
        return this.focusConflict(target);
      }
    };

    ConflictMarker.prototype.previousUnresolved = function() {
      var c, firstCursor, initial, lastBefore, orderedCursors, p, pos, target, _i, _len, _ref;
      initial = _.first(this.active());
      if (initial != null) {
        p = initial.conflict.navigator.previousUnresolved();
        if (p != null) {
          return this.focusConflict(p);
        }
      } else {
        orderedCursors = _.sortBy(this.editor().getCursors(), function(c) {
          return c.getBufferPosition().row;
        });
        firstCursor = _.first(orderedCursors);
        if (firstCursor == null) {
          return;
        }
        pos = firstCursor.getBufferPosition();
        lastBefore = null;
        _ref = this.conflicts;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          p = c.ours.marker.getBufferRange().start;
          if (p.isLessThanOrEqual(pos)) {
            lastBefore = c;
          }
        }
        if (lastBefore == null) {
          return;
        }
        if (lastBefore.isResolved()) {
          target = lastBefore.navigator.previousUnresolved();
        } else {
          target = lastBefore;
        }
        return this.focusConflict(target);
      }
    };

    ConflictMarker.prototype.revertCurrent = function() {
      var side, view, _i, _len, _ref, _results;
      _ref = this.active();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        side = _ref[_i];
        _results.push((function() {
          var _j, _len1, _ref1, _results1;
          _ref1 = this.coveringViews;
          _results1 = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            view = _ref1[_j];
            if (view.conflict() === side.conflict) {
              if (view.isDirty()) {
                _results1.push(view.revert());
              } else {
                _results1.push(void 0);
              }
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    ConflictMarker.prototype.active = function() {
      var c, matching, p, positions, _i, _j, _len, _len1, _ref;
      positions = (function() {
        var _i, _len, _ref, _results;
        _ref = this.editor().getCursors();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          c = _ref[_i];
          _results.push(c.getBufferPosition());
        }
        return _results;
      }).call(this);
      matching = [];
      _ref = this.conflicts;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        for (_j = 0, _len1 = positions.length; _j < _len1; _j++) {
          p = positions[_j];
          if (c.ours.marker.getBufferRange().containsPoint(p)) {
            matching.push(c.ours);
          }
          if (c.theirs.marker.getBufferRange().containsPoint(p)) {
            matching.push(c.theirs);
          }
        }
      }
      return matching;
    };

    ConflictMarker.prototype.editor = function() {
      return this.editorView.getEditor();
    };

    ConflictMarker.prototype.linesForMarker = function(marker) {
      return this.adapter.linesForMarker(marker);
    };

    ConflictMarker.prototype.combineSides = function(first, second) {
      var e, insertPoint, text;
      text = this.editor().getTextInBufferRange(second.marker.getBufferRange());
      e = first.marker.getBufferRange().end;
      insertPoint = this.editor().setTextInBufferRange([e, e], text).end;
      first.marker.setHeadBufferPosition(insertPoint);
      first.followingMarker.setTailBufferPosition(insertPoint);
      return first.resolve();
    };

    ConflictMarker.prototype.focusConflict = function(conflict) {
      var st;
      st = conflict.ours.marker.getBufferRange().start;
      this.editorView.scrollToBufferPosition(st, {
        center: true
      });
      return this.editor().setCursorBufferPosition(st, {
        autoscroll: false
      });
    };

    return ConflictMarker;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlHQUFBOztBQUFBLEVBQUMsSUFBSyxPQUFBLENBQVEsTUFBUixFQUFMLENBQUQsQ0FBQTs7QUFBQSxFQUNBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FESixDQUFBOztBQUFBLEVBRUMsYUFBYyxPQUFBLENBQVEsVUFBUixFQUFkLFVBRkQsQ0FBQTs7QUFBQSxFQUlBLFFBQUEsR0FBVyxPQUFBLENBQVEsWUFBUixDQUpYLENBQUE7O0FBQUEsRUFLQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGFBQVIsQ0FMWCxDQUFBOztBQUFBLEVBTUEsY0FBQSxHQUFpQixPQUFBLENBQVEsbUJBQVIsQ0FOakIsQ0FBQTs7QUFBQSxFQU9BLFlBQUEsR0FBZSxPQUFBLENBQVEsaUJBQVIsQ0FQZixDQUFBOztBQUFBLEVBUUMsZ0JBQWlCLE9BQUEsQ0FBUSxrQkFBUixFQUFqQixhQVJELENBQUE7O0FBQUEsRUFVQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosSUFBQSxVQUFVLENBQUMsV0FBWCxDQUF1QixjQUF2QixDQUFBLENBQUE7O0FBRWEsSUFBQSx3QkFBRSxLQUFGLEVBQVUsVUFBVixHQUFBO0FBQ1gsVUFBQSx1Q0FBQTtBQUFBLE1BRFksSUFBQyxDQUFBLFFBQUEsS0FDYixDQUFBO0FBQUEsTUFEb0IsSUFBQyxDQUFBLGFBQUEsVUFDckIsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxRQUFRLENBQUMsR0FBVCxDQUFhLElBQUMsQ0FBQSxLQUFkLEVBQXFCLElBQUMsQ0FBQSxVQUFVLENBQUMsUUFBWixDQUFBLENBQXJCLENBQWIsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxhQUFhLENBQUMsS0FBZCxDQUFvQixJQUFDLENBQUEsVUFBckIsQ0FEWCxD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
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/conflict-marker.coffee