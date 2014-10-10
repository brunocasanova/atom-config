(function() {
  var MinimapView, Mixin, TextEditorView, ViewManagement,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TextEditorView = require('atom').TextEditorView;

  Mixin = require('mixto');

  MinimapView = null;

  module.exports = ViewManagement = (function(_super) {
    __extends(ViewManagement, _super);

    function ViewManagement() {
      return ViewManagement.__super__.constructor.apply(this, arguments);
    }

    ViewManagement.prototype.minimapViews = {};

    ViewManagement.prototype.updateAllViews = function() {
      var id, view, _ref, _results;
      _ref = this.minimapViews;
      _results = [];
      for (id in _ref) {
        view = _ref[id];
        _results.push(view.onScrollViewResized());
      }
      return _results;
    };

    ViewManagement.prototype.minimapForEditorView = function(editorView) {
      return this.minimapForEditor(editorView != null ? editorView.getEditor() : void 0);
    };

    ViewManagement.prototype.minimapForEditor = function(editor) {
      if (editor != null) {
        return this.minimapViews[editor.id];
      }
    };

    ViewManagement.prototype.getActiveMinimap = function() {
      return this.minimapForEditor(atom.workspace.getActiveEditor());
    };

    ViewManagement.prototype.eachMinimapView = function(iterator) {
      var createdCallback, disposable, id, minimapView, _ref;
      if (iterator == null) {
        return;
      }
      _ref = this.minimapViews;
      for (id in _ref) {
        minimapView = _ref[id];
        iterator({
          view: minimapView
        });
      }
      createdCallback = function(minimapView) {
        return iterator(minimapView);
      };
      disposable = this.onDidCreateMinimap(createdCallback);
      return {
        off: (function(_this) {
          return function() {
            return disposable.dispose();
          };
        })(this)
      };
    };

    ViewManagement.prototype.destroyViews = function() {
      var id, view, _ref, _ref1;
      _ref = this.minimapViews;
      for (id in _ref) {
        view = _ref[id];
        view.destroy();
      }
      if ((_ref1 = this.eachEditorViewSubscription) != null) {
        _ref1.off();
      }
      return this.minimapViews = {};
    };

    ViewManagement.prototype.createViews = function() {
      return this.eachEditorViewSubscription = atom.workspaceView.eachEditorView((function(_this) {
        return function(editorView) {
          var editorId, event, paneView, view;
          MinimapView || (MinimapView = require('../minimap-view'));
          editorId = editorView.editor.id;
          paneView = editorView.getPaneView();
          view = new MinimapView(editorView);
          _this.minimapViews[editorId] = view;
          event = {
            view: view
          };
          _this.emit('minimap-view:created', event);
          _this.emitter.emit('did-create-minimap', event);
          view.updateMinimapRenderView();
          return editorView.editor.on('destroyed', function() {
            var _ref;
            view = _this.minimapViews[editorId];
            event = {
              view: view
            };
            if (view != null) {
              _this.emit('minimap-view:will-be-destroyed', event);
              _this.emitter.emit('will-destroy-minimap', event);
              view.destroy();
              delete _this.minimapViews[editorId];
              _this.emit('minimap-view:destroyed', {
                view: view
              });
              _this.emitter.emit('did-destroy-minimap', event);
              if ((_ref = paneView.activeView) != null ? _ref.hasClass('editor') : void 0) {
                return paneView.addClass('with-minimap');
              }
            }
          });
        };
      })(this));
    };

    return ViewManagement;

  })(Mixin);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxpQkFBa0IsT0FBQSxDQUFRLE1BQVIsRUFBbEIsY0FBRCxDQUFBOztBQUFBLEVBQ0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSLENBRFIsQ0FBQTs7QUFBQSxFQUVBLFdBQUEsR0FBYyxJQUZkLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUoscUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLDZCQUFBLFlBQUEsR0FBYyxFQUFkLENBQUE7O0FBQUEsNkJBR0EsY0FBQSxHQUFnQixTQUFBLEdBQUE7QUFDZCxVQUFBLHdCQUFBO0FBQUE7QUFBQTtXQUFBLFVBQUE7d0JBQUE7QUFBQSxzQkFBQSxJQUFJLENBQUMsbUJBQUwsQ0FBQSxFQUFBLENBQUE7QUFBQTtzQkFEYztJQUFBLENBSGhCLENBQUE7O0FBQUEsNkJBWUEsb0JBQUEsR0FBc0IsU0FBQyxVQUFELEdBQUE7YUFDcEIsSUFBQyxDQUFBLGdCQUFELHNCQUFrQixVQUFVLENBQUUsU0FBWixDQUFBLFVBQWxCLEVBRG9CO0lBQUEsQ0FadEIsQ0FBQTs7QUFBQSw2QkFxQkEsZ0JBQUEsR0FBa0IsU0FBQyxNQUFELEdBQUE7QUFDaEIsTUFBQSxJQUE0QixjQUE1QjtlQUFBLElBQUMsQ0FBQSxZQUFhLENBQUEsTUFBTSxDQUFDLEVBQVAsRUFBZDtPQURnQjtJQUFBLENBckJsQixDQUFBOztBQUFBLDZCQTJCQSxnQkFBQSxHQUFrQixTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsZ0JBQUQsQ0FBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFmLENBQUEsQ0FBbEIsRUFBSDtJQUFBLENBM0JsQixDQUFBOztBQUFBLDZCQXVDQSxlQUFBLEdBQWlCLFNBQUMsUUFBRCxH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
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/mixins/view-management.coffee