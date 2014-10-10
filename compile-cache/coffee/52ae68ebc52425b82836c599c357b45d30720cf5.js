
/* IMPORTS */

(function() {
  var StatusView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;


  /* EXPORTS */

  module.exports = StatusView = (function(_super) {
    __extends(StatusView, _super);

    function StatusView() {
      return StatusView.__super__.constructor.apply(this, arguments);
    }


    /* CONSTRUCTOR */


    /* CONTENT */

    StatusView.content = function() {
      return this.div({
        "class": 'timekeeper inline-block'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": "timer"
          }, function() {
            return _this.span({
              outlet: "status",
              id: "status"
            });
          });
        };
      })(this));
    };


    /* ATTACH */

    StatusView.prototype.attach = function() {
      if (atom.workspaceView.statusBar) {
        return atom.workspaceView.statusBar.prependRight(this);
      } else {
        return atom.workspaceView.appendToTop(this);
      }
    };


    /* DESTROY */

    StatusView.prototype.destroy = function() {
      return this.detach();
    };


    /* UPDATE */

    StatusView.prototype.update = function(value) {
      return this.status.text(value);
    };


    /* CLEAR */

    StatusView.prototype.clear = function() {
      return this.status.text("");
    };

    return StatusView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsZ0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUNDLE9BQVEsT0FBQSxDQUFRLE1BQVIsRUFBUixJQURELENBQUE7O0FBR0E7QUFBQSxlQUhBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDVTtBQUNGLGlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQTtBQUFBLHFCQUFBOztBQUVBO0FBQUEsaUJBRkE7O0FBQUEsSUFHQSxVQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUVOLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyx5QkFBUDtPQUFMLEVBQXVDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBRW5DLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxPQUFQO1dBQUwsRUFBcUIsU0FBQSxHQUFBO21CQUVqQixLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsY0FBQSxNQUFBLEVBQVEsUUFBUjtBQUFBLGNBQWtCLEVBQUEsRUFBSSxRQUF0QjthQUFOLEVBRmlCO1VBQUEsQ0FBckIsRUFGbUM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QyxFQUZNO0lBQUEsQ0FIVixDQUFBOztBQVdBO0FBQUEsZ0JBWEE7O0FBQUEseUJBWUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUVKLE1BQUEsSUFBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQXRCO2VBRUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsWUFBN0IsQ0FBMkMsSUFBM0MsRUFGSjtPQUFBLE1BQUE7ZUFNSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQW5CLENBQWdDLElBQWhDLEVBTko7T0FGSTtJQUFBLENBWlIsQ0FBQTs7QUFzQkE7QUFBQSxpQkF0QkE7O0FBQUEseUJBdUJBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFFTCxJQUFDLENBQUEsTUFBRCxDQUFBLEVBRks7SUFBQSxDQXZCVCxDQUFBOztBQTJCQTtBQUFBLGdCQTNCQTs7QUFBQSx5QkE0QkEsTUFBQSxHQUFRLFNBQUUsS0FBRixHQUFBO2FBRUosSUFBQyxDQUFBLE1BQU0sQ0FBQyxJQUFSLENBQWMsS0FBZCxFQUZJO0lBQUEsQ0E1QlIsQ0FBQTs7QUFnQ0E7QUFBQSxlQWhDQTs7QUFBQSx5QkFpQ0EsS0FBQSxHQUFPLFNBQUEsR0FBQTthQUVILElBQUMsQ0FBQSxNQUFNLENBQUMsSUFBUixDQUFjLEVBQWQsRUFGRztJQUFBLENBakNQLENBQUE7O3NCQUFBOztLQURxQixLQUw3QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/timekeeper/lib/views/status.coffee