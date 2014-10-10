(function() {
  var CoveringView, SideView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CoveringView = require('./covering-view').CoveringView;

  module.exports = SideView = (function(_super) {
    __extends(SideView, _super);

    function SideView() {
      return SideView.__super__.constructor.apply(this, arguments);
    }

    SideView.content = function(side, editorView) {
      return this.div({
        "class": "side " + (side.klass()) + " " + side.position + " ui-site-" + (side.site())
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'controls'
          }, function() {
            _this.label({
              "class": 'text-highlight'
            }, side.ref);
            _this.span({
              "class": 'text-subtle'
            }, "// " + (side.description()));
            return _this.span({
              "class": 'pull-right'
            }, function() {
              _this.button({
                "class": 'btn btn-xs inline-block-tight revert',
                click: 'revert',
                outlet: 'revertBtn'
              }, 'Revert');
              return _this.button({
                "class": 'btn btn-xs inline-block-tight',
                click: 'useMe',
                outlet: 'useMeBtn'
              }, 'Use Me');
            });
          });
        };
      })(this));
    };

    SideView.prototype.initialize = function(side, editorView) {
      this.side = side;
      SideView.__super__.initialize.call(this, editorView);
      this.detectDirty();
      this.prependKeystroke(this.side.eventName(), this.useMeBtn);
      this.prependKeystroke('merge-conflicts:revert-current', this.revertBtn);
      this.decoration = null;
      return this.side.conflict.on('conflict:resolved', (function(_this) {
        return function() {
          _this.deleteMarker(_this.side.refBannerMarker);
          if (!_this.side.wasChosen()) {
            _this.deleteMarker(_this.side.marker);
          }
          return _this.remove();
        };
      })(this));
    };

    SideView.prototype.cover = function() {
      return this.side.refBannerMarker;
    };

    SideView.prototype.decorate = function() {
      var args;
      args = {
        type: 'line',
        "class": this.side.lineClass()
      };
      if (this.decoration != null) {
        return this.decoration.update(args);
      } else {
        return this.decoration = this.editor().decorateMarker(this.side.marker, args);
      }
    };

    SideView.prototype.conflict = function() {
      return this.side.conflict;
    };

    SideView.prototype.isDirty = function() {
      return this.side.isDirty;
    };

    SideView.prototype.includesCursor = function(cursor) {
      var h, m, p, t, _ref;
      m = this.side.marker;
      _ref = [m.getHeadBufferPosition(), m.getTailBufferPosition()], h = _ref[0], t = _ref[1];
      p = cursor.getBufferPosition();
      return t.isLessThanOrEqual(p) && h.isGreaterThanOrEqual(p);
    };

    SideView.prototype.useMe = function() {
      this.side.resolve();
      return this.decorate();
    };

    SideView.prototype.revert = function() {
      this.editor().setTextInBufferRange(this.side.marker.getBufferRange(), this.side.originalText);
      return this.decorate();
    };

    SideView.prototype.detectDirty = function() {
      var currentText;
      currentText = this.editor().getTextInBufferRange(this.side.marker.getBufferRange());
      this.side.isDirty = currentText !== this.side.originalText;
      this.decorate();
      this.removeClass('dirty');
      if (this.side.isDirty) {
        return this.addClass('dirty');
      }
    };

    return SideView;

  })(CoveringView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxlQUFnQixPQUFBLENBQVEsaUJBQVIsRUFBaEIsWUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLCtCQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFFBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxJQUFELEVBQU8sVUFBUCxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFRLE9BQUEsR0FBTSxDQUFBLElBQUksQ0FBQyxLQUFMLENBQUEsQ0FBQSxDQUFOLEdBQW9CLEdBQXBCLEdBQXNCLElBQUksQ0FBQyxRQUEzQixHQUFxQyxXQUFyQyxHQUErQyxDQUFBLElBQUksQ0FBQyxJQUFMLENBQUEsQ0FBQSxDQUF2RDtPQUFMLEVBQTRFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzFFLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxVQUFQO1dBQUwsRUFBd0IsU0FBQSxHQUFBO0FBQ3RCLFlBQUEsS0FBQyxDQUFBLEtBQUQsQ0FBTztBQUFBLGNBQUEsT0FBQSxFQUFPLGdCQUFQO2FBQVAsRUFBZ0MsSUFBSSxDQUFDLEdBQXJDLENBQUEsQ0FBQTtBQUFBLFlBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLGNBQUEsT0FBQSxFQUFPLGFBQVA7YUFBTixFQUE2QixLQUFBLEdBQUksQ0FBQSxJQUFJLENBQUMsV0FBTCxDQUFBLENBQUEsQ0FBakMsQ0FEQSxDQUFBO21CQUVBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxjQUFBLE9BQUEsRUFBTyxZQUFQO2FBQU4sRUFBMkIsU0FBQSxHQUFBO0FBQ3pCLGNBQUEsS0FB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
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/side-view.coffee