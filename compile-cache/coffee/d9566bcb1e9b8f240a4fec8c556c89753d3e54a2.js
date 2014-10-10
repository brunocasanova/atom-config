(function() {
  var CoveringView, NavigationView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  CoveringView = require('./covering-view').CoveringView;

  module.exports = NavigationView = (function(_super) {
    __extends(NavigationView, _super);

    function NavigationView() {
      return NavigationView.__super__.constructor.apply(this, arguments);
    }

    NavigationView.content = function(navigator, editorView) {
      return this.div({
        "class": 'controls navigation'
      }, (function(_this) {
        return function() {
          _this.text(' ');
          return _this.span({
            "class": 'pull-right'
          }, function() {
            _this.button({
              "class": 'btn btn-xs',
              click: 'up',
              outlet: 'prevBtn'
            }, 'prev');
            return _this.button({
              "class": 'btn btn-xs',
              click: 'down',
              outlet: 'nextBtn'
            }, 'next');
          });
        };
      })(this));
    };

    NavigationView.prototype.initialize = function(navigator, editorView) {
      this.navigator = navigator;
      NavigationView.__super__.initialize.call(this, editorView);
      this.prependKeystroke('merge-conflicts:previous-unresolved', this.prevBtn);
      this.prependKeystroke('merge-conflicts:next-unresolved', this.nextBtn);
      return this.navigator.conflict.on('conflict:resolved', (function(_this) {
        return function() {
          _this.deleteMarker(_this.cover());
          return _this.hide();
        };
      })(this));
    };

    NavigationView.prototype.cover = function() {
      return this.navigator.separatorMarker;
    };

    NavigationView.prototype.up = function() {
      var _ref;
      return this.scrollTo((_ref = this.navigator.previousUnresolved()) != null ? _ref.scrollTarget() : void 0);
    };

    NavigationView.prototype.down = function() {
      var _ref;
      return this.scrollTo((_ref = this.navigator.nextUnresolved()) != null ? _ref.scrollTarget() : void 0);
    };

    NavigationView.prototype.conflict = function() {
      return this.navigator.conflict;
    };

    return NavigationView;

  })(CoveringView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxlQUFnQixPQUFBLENBQVEsaUJBQVIsRUFBaEIsWUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQyxTQUFELEVBQVksVUFBWixHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHFCQUFQO09BQUwsRUFBbUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNqQyxVQUFBLEtBQUMsQ0FBQSxJQUFELENBQU0sR0FBTixDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLFlBQUEsT0FBQSxFQUFPLFlBQVA7V0FBTixFQUEyQixTQUFBLEdBQUE7QUFDekIsWUFBQSxLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsY0FBQSxPQUFBLEVBQU8sWUFBUDtBQUFBLGNBQXFCLEtBQUEsRUFBTyxJQUE1QjtBQUFBLGNBQWtDLE1BQUEsRUFBUSxTQUExQzthQUFSLEVBQTZELE1BQTdELENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsY0FBQSxPQUFBLEVBQU8sWUFBUDtBQUFBLGNBQXFCLEtBQUEsRUFBTyxNQUE1QjtBQUFBLGNBQW9DLE1BQUEsRUFBUSxTQUE1QzthQUFSLEVBQStELE1BQS9ELEVBRnlCO1VBQUEsQ0FBM0IsRUFGaUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFuQyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDZCQU9BLFVBQUEsR0FBWSxTQUFFLFNBQUYsRUFBYSxVQUFiLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxZQUFBLFNBQ1osQ0FBQTtBQUFBLE1BQUEsK0NBQU0sVUFBTixDQUFBLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxnQkFBRCxDQUFrQixxQ0FBbEIsRUFBeUQsSUFBQyxDQUFBLE9BQTFELENBRkEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLGdCQUFELENBQWtCLGlDQUFsQixFQUFxRCxJQUFDLENBQUEsT0FBdEQsQ0FIQSxDQUFBO2FBS0EsSUFBQyxDQUFBLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBcEIsQ0FBdUIsbUJBQXZCLEVBQTRDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDMUMsVUFBQSxLQUFDLENBQUEsWUFBRCxDQUFjLEtBQUMsQ0FBQSxLQUFELENBQUEsQ0FBZCxDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBQSxFQUYwQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVDLEVBTlU7SUFBQSxDQVBaLENBQUE7O0FBQUEsNkJBaUJBLEtBQUEsR0FBTyxTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsU0FBUyxDQUFDLGdCQUFkO0lBQUEsQ0FqQlAsQ0FBQTs7QUFBQSw2QkFtQkEsRUFBQSxHQUFJLFNBQUEsR0FBQTtBQUFHLFVBQUEsSUFBQTthQUFBLElBQUMsQ0FBQSxRQUFELDREQUF5QyxDQUFFLFlBQWpDLENBQUEsVUFBVixFQUFIO0lBQUEsQ0FuQkosQ0FBQTs7QUFBQSw2QkFxQkEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUFHLFVBQUEsSUFBQTthQUFBLElBQUMsQ0FBQSxRQUFELHdEQUFxQyxDQUFFLFlBQTdCLENBQUEsVUFBVixFQUFIO0lBQUEsQ0FyQk4sQ0FBQTs7QUFBQSw2QkF1QkEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxTQUFTLENBQUMsU0FBZDtJQUFBLENBdkJWLENBQUE7OzBCQUFBOztLQUQyQixhQUg3QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/navigation-view.coffee