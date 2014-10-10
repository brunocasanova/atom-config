(function() {
  var $, CompositeDisposable, MinimapGitDiffBinding,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require('atom').$;

  CompositeDisposable = require('event-kit').CompositeDisposable;

  module.exports = MinimapGitDiffBinding = (function() {
    MinimapGitDiffBinding.prototype.active = false;

    function MinimapGitDiffBinding(editorView, gitDiffPackage, minimapView) {
      this.editorView = editorView;
      this.gitDiffPackage = gitDiffPackage;
      this.minimapView = minimapView;
      this.subscribeToBuffer = __bind(this.subscribeToBuffer, this);
      this.updateDiffs = __bind(this.updateDiffs, this);
      this.scheduleUpdate = __bind(this.scheduleUpdate, this);
      this.editor = this.editorView.editor;
      this.decorations = {};
      this.markers = null;
      this.gitDiff = require(this.gitDiffPackage.path);
      this.subscriptions = new CompositeDisposable;
    }

    MinimapGitDiffBinding.prototype.activate = function() {
      var editor;
      editor = this.editorView.getEditor();
      this.subscriptions.add(editor.onDidChangePath(this.subscribeToBuffer));
      if (editor.onDidChangeScreenLines != null) {
        this.subscriptions.add(editor.onDidChangeScreenLines(this.updateDiffs));
      } else {
        this.subscriptions.add(editor.onDidChange(this.updateDiffs));
      }
      this.subscriptions.add(this.getRepo().onDidChangeStatuses(this.scheduleUpdate));
      this.subscriptions.add(this.getRepo().onDidChangeStatus(this.scheduleUpdate));
      this.subscribeToBuffer();
      return this.updateDiffs();
    };

    MinimapGitDiffBinding.prototype.deactivate = function() {
      this.removeDecorations();
      this.subscriptions.dispose();
      return this.diffs = null;
    };

    MinimapGitDiffBinding.prototype.scheduleUpdate = function() {
      return setImmediate(this.updateDiffs);
    };

    MinimapGitDiffBinding.prototype.updateDiffs = function() {
      var path;
      this.removeDecorations();
      if (path = this.getPath()) {
        if (this.diffs = this.getDiffs()) {
          return this.addDecorations(this.diffs);
        }
      }
    };

    MinimapGitDiffBinding.prototype.addDecorations = function(diffs) {
      var endRow, newLines, newStart, oldLines, oldStart, startRow, _i, _len, _ref;
      for (_i = 0, _len = diffs.length; _i < _len; _i++) {
        _ref = diffs[_i], oldStart = _ref.oldStart, newStart = _ref.newStart, oldLines = _ref.oldLines, newLines = _ref.newLines;
        startRow = newStart - 1;
        endRow = newStart + newLines - 2;
        if (oldLines === 0 && newLines > 0) {
          this.markRange(startRow, endRow, '.minimap .git-line-added');
        } else if (newLines === 0 && oldLines > 0) {
          this.markRange(startRow, startRow, '.minimap .git-line-removed');
        } else {
          this.markRange(startRow, endRow, '.minimap .git-line-modified');
        }
      }
    };

    MinimapGitDiffBinding.prototype.removeDecorations = function() {
      var marker, _i, _len, _ref;
      if (this.markers == null) {
        return;
      }
      _ref = this.markers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        marker.destroy();
      }
      return this.markers = null;
    };

    MinimapGitDiffBinding.prototype.markRange = function(startRow, endRow, scope) {
      var marker;
      marker = this.editor.markBufferRange([[startRow, 0], [endRow, Infinity]], {
        invalidate: 'never'
      });
      this.minimapView.decorateMarker(marker, {
        type: 'line',
        scope: scope
      });
      if (this.markers == null) {
        this.markers = [];
      }
      return this.markers.push(marker);
    };

    MinimapGitDiffBinding.prototype.destroy = function() {
      this.removeDecorations();
      return this.deactivate();
    };

    MinimapGitDiffBinding.prototype.getPath = function() {
      var _ref;
      return (_ref = this.buffer) != null ? _ref.getPath() : void 0;
    };

    MinimapGitDiffBinding.prototype.getRepo = function() {
      var _ref;
      return (_ref = atom.project) != null ? _ref.getRepo() : void 0;
    };

    MinimapGitDiffBinding.prototype.getDiffs = function() {
      var _ref;
      return (_ref = this.getRepo()) != null ? _ref.getLineDiffs(this.getPath(), this.editorView.getText()) : void 0;
    };

    MinimapGitDiffBinding.prototype.unsubscribeFromBuffer = function() {
      if (this.buffer != null) {
        this.bufferSubscription.dispose();
        this.removeDecorations();
        return this.buffer = null;
      }
    };

    MinimapGitDiffBinding.prototype.subscribeToBuffer = function() {
      this.unsubscribeFromBuffer();
      if (this.buffer = this.editor.getBuffer()) {
        return this.bufferSubscription = this.buffer.onDidStopChanging(this.updateDiffs);
      }
    };

    return MinimapGitDiffBinding;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZDQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0Msc0JBQXVCLE9BQUEsQ0FBUSxXQUFSLEVBQXZCLG1CQURELENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosb0NBQUEsTUFBQSxHQUFRLEtBQVIsQ0FBQTs7QUFFYSxJQUFBLCtCQUFFLFVBQUYsRUFBZSxjQUFmLEVBQWdDLFdBQWhDLEdBQUE7QUFDWCxNQURZLElBQUMsQ0FBQSxhQUFBLFVBQ2IsQ0FBQTtBQUFBLE1BRHlCLElBQUMsQ0FBQSxpQkFBQSxjQUMxQixDQUFBO0FBQUEsTUFEMEMsSUFBQyxDQUFBLGNBQUEsV0FDM0MsQ0FBQTtBQUFBLG1FQUFBLENBQUE7QUFBQSx1REFBQSxDQUFBO0FBQUEsNkRBQUEsQ0FBQTtBQUFBLE1BQUMsSUFBQyxDQUFBLFNBQVUsSUFBQyxDQUFBLFdBQVgsTUFBRixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsV0FBRCxHQUFlLEVBRGYsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUZYLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxPQUFELEdBQVcsT0FBQSxDQUFRLElBQUMsQ0FBQSxjQUFjLENBQUMsSUFBeEIsQ0FIWCxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBSmpCLENBRFc7SUFBQSxDQUZiOztBQUFBLG9DQVNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7QUFDUixVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsVUFBVSxDQUFDLFNBQVosQ0FBQSxDQUFULENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixNQUFNLENBQUMsZUFBUCxDQUF1QixJQUFDLENBQUEsaUJBQXhCLENBQW5CLENBREEsQ0FBQTtBQUVBLE1BQUEsSUFBRyxxQ0FBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLE1BQU0sQ0FBQyxzQkFBUCxDQUE4QixJQUFDLENBQUEsV0FBL0IsQ0FBbkIsQ0FBQSxDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLE1BQU0sQ0FBQyxXQUFQLENBQW1CLElBQUMsQ0FBQSxXQUFwQixDQUFuQixDQUFBLENBSEY7T0FGQTtBQUFBLE1BT0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBVSxDQUFDLG1CQUFYLENBQStCLElBQUMsQ0FBQSxjQUFoQyxDQUFuQixDQVBBLENBQUE7QUFBQSxNQVFBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFDLENBQUEsT0FBRCxDQUFBLENBQVUsQ0FBQyxpQkFBWCxDQUE2QixJQUFDLENBQUEsY0FBOUIsQ0FBbkIsQ0FSQSxDQUFBO0FBQUEsTUFVQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxDQVZBLENBQUE7YUFZQSxJQUFDLENBQUEsV0FBRCxDQUFBLEVBYlE7SUFBQSxDQVRWLENBQUE7O0FBQUEsb0NBd0JBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxLQUhDO0lBQUEsQ0F4QlosQ0FBQTs7QUFBQSxvQ0E2QkEsY0FBQSxHQUFnQixTQUFBLEdBQUE7YUFBRyxZQUFBLENBQWEsSUFBQyxDQUFBLFdBQWQsRUFBSDtJQUFBLENBN0JoQixDQUFBOztBQUFBLG9DQStCQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxDQUFBLENBQUE7QUFDQSxNQUFBLElBQUcsSUFBQSxHQUFPLElBQUMsQ0FBQSxPQUFELENBQUEsQ0FBVjtBQUNFLFFBQUEsSUFBRyxJQUFDLENBQUEsS0FBRCxHQUFTLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBWjtpQkFDRSxJQUFDLENBQUEsY0FBRCxDQUFnQixJQUFDLENBQUEsS0FBakIsRUFERjtTQURGO09BRlc7SUFBQSxDQS9CYixDQUFBOztBQUFBLG9DQXFDQSxjQUFBLEdBQWdCLFNBQUMsS0FBRCxHQUFBO0FBQ2QsVUFBQSx3RUFBQTtBQUFBLFdBQUEsNENBQUEsR0FBQTtBQUNFLDBCQURHLGdCQUFBLFVBQVUsZ0JBQUEsVUFBVSxnQkFBQSxVQUFVLGdCQUFBLFFBQ2pDLENBQUE7QUFBQSxRQUFBLFFBQUEsR0FBVyxRQUFBLEdBQVcsQ0FBdEIsQ0FBQTtBQUFBLFFBQ0EsTUFBQSxHQUFTLFFBQUEsR0FBVyxRQUFYLEdBQXNCLENBRC9CLENBQUE7QUFFQSxRQUFBLElBQUcsUUFBQSxLQUFZLENBQVosSUFBa0IsUUFBQSxHQUFXLENBQWhDO0FBQ0UsVUFBQSxJQUFDLENBQUEsU0FBRCxDQUFXLFFBQVgsRUFBcUIsTUFBckIsRUFBNkIsMEJBQTdCLENBQUEsQ0FERjtTQUFBLE1BRUssSUFBRyxRQUFBLEtBQVksQ0FBWixJQUFrQixRQUFBLEdBQVcsQ0FBaEM7QUFDSCxVQUFBLElBQUMsQ0FBQSxTQUFELENBQVcsUUFBWCxFQUFxQixRQUFyQixFQUErQiw0QkFBL0IsQ0FBQSxDQURHO1NBQUEsTUFBQTtBQUdILFVBQUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxRQUFYLEVBQXFCLE1BQXJCLEVBQTZCLDZCQUE3QixDQUFBLENBSEc7U0FMUDtBQUFBLE9BRGM7SUFBQSxDQXJDaEIsQ0FBQTs7QUFBQSxvQ0FpREEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO0FBQ2pCLFVBQUEsc0JBQUE7QUFBQSxNQUFBLElBQWMsb0JBQWQ7QUFBQSxjQUFBLENBQUE7T0FBQTtBQUNBO0FBQUEsV0FBQSwyQ0FBQTswQkFBQTtBQUFBLFFBQUEsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFBLENBQUE7QUFBQSxPQURBO2FBRUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQUhNO0lBQUEsQ0FqRG5CLENBQUE7O0FBQUEsb0NBc0RBLFNBQUEsR0FBVyxTQUFDLFFBQUQsRUFBVyxNQUFYLEVBQW1CLEtBQW5CLEdBQUE7QUFDVCxVQUFBLE1BQUE7QUFBQSxNQUFBLE1BQUEsR0FBUyxJQUFDLENBQUEsTUFBTSxDQUFDLGVBQVIsQ0FBd0IsQ0FBQyxDQUFDLFFBQUQsRUFBVyxDQUFYLENBQUQsRUFBZ0IsQ0FBQyxNQUFELEVBQVMsUUFBVCxDQUFoQixDQUF4QixFQUE2RDtBQUFBLFFBQUEsVUFBQSxFQUFZLE9BQVo7T0FBN0QsQ0FBVCxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsV0FBVyxDQUFDLGNBQWIsQ0FBNEIsTUFBNUIsRUFBb0M7QUFBQSxRQUFBLElBQUEsRUFBTSxNQUFOO0FBQUEsUUFBYyxLQUFBLEVBQU8sS0FBckI7T0FBcEMsQ0FEQSxDQUFBOztRQUVBLElBQUMsQ0FBQSxVQUFXO09BRlo7YUFHQSxJQUFDLENBQUEsT0FBTyxDQUFDLElBQVQsQ0FBYyxNQUFkLEVBSlM7SUFBQSxDQXREWCxDQUFBOztBQUFBLG9DQTREQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBRk87SUFBQSxDQTVEVCxDQUFBOztBQUFBLG9DQWdFQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQUcsVUFBQSxJQUFBO2dEQUFPLENBQUUsT0FBVCxDQUFBLFdBQUg7SUFBQSxDQWhFVCxDQUFBOztBQUFBLG9DQWtFQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQUcsVUFBQSxJQUFBO2lEQUFZLENBQUUsT0FBZCxDQUFBLFdBQUg7SUFBQSxDQWxFVCxDQUFBOztBQUFBLG9DQW9FQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBQ1IsVUFBQSxJQUFBO21EQUFVLENBQUUsWUFBWixDQUF5QixJQUFDLENBQUEsT0FBRCxDQUFBLENBQXpCLEVBQXFDLElBQUMsQ0FBQSxVQUFVLENBQUMsT0FBWixDQUFBLENBQXJDLFdBRFE7SUFBQSxDQXBFVixDQUFBOztBQUFBLG9DQXVFQSxxQkFBQSxHQUF1QixTQUFBLEdBQUE7QUFDckIsTUFBQSxJQUFHLG1CQUFIO0FBQ0UsUUFBQSxJQUFDLENBQUEsa0JBQWtCLENBQUMsT0FBcEIsQ0FBQSxDQUFBLENBQUE7QUFBQSxRQUNBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBREEsQ0FBQTtlQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FIWjtPQURxQjtJQUFBLENBdkV2QixDQUFBOztBQUFBLG9DQTZFQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7QUFDakIsTUFBQSxJQUFDLENBQUEscUJBQUQsQ0FBQSxDQUFBLENBQUE7QUFFQSxNQUFBLElBQUcsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFDLENBQUEsTUFBTSxDQUFDLFNBQVIsQ0FBQSxDQUFiO2VBQ0UsSUFBQyxDQUFBLGtCQUFELEdBQXNCLElBQUMsQ0FBQSxNQUFNLENBQUMsaUJBQVIsQ0FBMEIsSUFBQyxDQUFBLFdBQTNCLEVBRHhCO09BSGlCO0lBQUEsQ0E3RW5CLENBQUE7O2lDQUFBOztNQU5GLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/minimap-git-diff/lib/minimap-git-diff-binding.coffee