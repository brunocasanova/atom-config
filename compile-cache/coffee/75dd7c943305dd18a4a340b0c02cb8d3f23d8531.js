(function() {
  var $, CoveringView, EditorAdapter, EditorView, View, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), EditorView = _ref.EditorView, View = _ref.View, $ = _ref.$;

  _ = require('underscore-plus');

  EditorAdapter = require('./editor-adapter').EditorAdapter;

  CoveringView = (function(_super) {
    __extends(CoveringView, _super);

    function CoveringView() {
      return CoveringView.__super__.constructor.apply(this, arguments);
    }

    CoveringView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      this.adapter = EditorAdapter.adapt(this.editorView);
      this.adapter.append(this);
      this.reposition();
      return this.cover().on("changed", (function(_this) {
        return function() {
          return _this.reposition();
        };
      })(this));
    };

    CoveringView.prototype.cover = function() {
      return null;
    };

    CoveringView.prototype.conflict = function() {
      return null;
    };

    CoveringView.prototype.isDirty = function() {
      return false;
    };

    CoveringView.prototype.detectDirty = function() {
      return null;
    };

    CoveringView.prototype.decorate = function() {
      return null;
    };

    CoveringView.prototype.getModel = function() {
      return null;
    };

    CoveringView.prototype.reposition = function() {
      var anchor, marker, ref;
      this.editorView.component.checkForVisibilityChange();
      marker = this.cover();
      anchor = this.editorView.offset();
      ref = this.offsetForMarker(marker);
      this.offset({
        top: ref.top + anchor.top
      });
      return this.height(this.editorView.lineHeight);
    };

    CoveringView.prototype.editor = function() {
      return this.editorView.getModel();
    };

    CoveringView.prototype.buffer = function() {
      return this.editor().getBuffer();
    };

    CoveringView.prototype.includesCursor = function(cursor) {
      return false;
    };

    CoveringView.prototype.offsetForMarker = function(marker) {
      var position;
      position = marker.getTailBufferPosition();
      return this.editor().pixelPositionForBufferPosition(position);
    };

    CoveringView.prototype.deleteMarker = function(marker) {
      this.buffer()["delete"](marker.getBufferRange());
      return marker.destroy();
    };

    CoveringView.prototype.scrollTo = function(positionOrNull) {
      if (positionOrNull != null) {
        return this.editor().setCursorBufferPosition(positionOrNull);
      }
    };

    CoveringView.prototype.prependKeystroke = function(eventName, element) {
      var bindings, e, original, _i, _len, _results;
      bindings = atom.keymap.findKeyBindings({
        target: this.editorView[0],
        command: eventName
      });
      _results = [];
      for (_i = 0, _len = bindings.length; _i < _len; _i++) {
        e = bindings[_i];
        original = element.text();
        _results.push(element.text(_.humanizeKeystroke(e.keystrokes) + (" " + original)));
      }
      return _results;
    };

    return CoveringView;

  })(View);

  module.exports = {
    CoveringView: CoveringView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QixPQUFBLENBQVEsTUFBUixDQUF4QixFQUFDLGtCQUFBLFVBQUQsRUFBYSxZQUFBLElBQWIsRUFBbUIsU0FBQSxDQUFuQixDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQURKLENBQUE7O0FBQUEsRUFFQyxnQkFBaUIsT0FBQSxDQUFRLGtCQUFSLEVBQWpCLGFBRkQsQ0FBQTs7QUFBQSxFQUtNO0FBRUosbUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDJCQUFBLFVBQUEsR0FBWSxTQUFFLFVBQUYsR0FBQTtBQUNWLE1BRFcsSUFBQyxDQUFBLGFBQUEsVUFDWixDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLGFBQWEsQ0FBQyxLQUFkLENBQW9CLElBQUMsQ0FBQSxVQUFyQixDQUFYLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxDQUFnQixJQUFoQixDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxVQUFELENBQUEsQ0FIQSxDQUFBO2FBS0EsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFRLENBQUMsRUFBVCxDQUFZLFNBQVosRUFBdUIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsVUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QixFQU5VO0lBQUEsQ0FBWixDQUFBOztBQUFBLDJCQVNBLEtBQUEsR0FBTyxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0FUUCxDQUFBOztBQUFBLDJCQVlBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxLQUFIO0lBQUEsQ0Fa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
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/covering-view.coffee