
/* IMPORTS */

(function() {
  var ClockView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;


  /* EXPORTS */

  module.exports = ClockView = (function(_super) {
    __extends(ClockView, _super);

    function ClockView() {
      return ClockView.__super__.constructor.apply(this, arguments);
    }


    /* CONSTRUCTOR */


    /* CONTENT */

    ClockView.content = function() {
      return this.div({
        "class": 'timekeeper inline-block'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": "timer"
          }, function() {
            _this.span({
              "class": "icon icon-clock"
            });
            return _this.span({
              outlet: "clock",
              id: "clock"
            }, "00:00:00");
          });
        };
      })(this));
    };


    /* ATTACH */

    ClockView.prototype.attach = function() {
      if (atom.workspaceView.statusBar) {
        return atom.workspaceView.statusBar.prependRight(this);
      } else {
        return atom.workspaceView.appendToTop(this);
      }
    };


    /* DESTROY */

    ClockView.prototype.destroy = function() {
      return this.detach();
    };


    /* UPDATE */

    ClockView.prototype.update = function(value) {
      return this.clock.text(value);
    };

    return ClockView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsZUFBQTtJQUFBO21TQUFBOztBQUFBLEVBQ0MsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBREQsQ0FBQTs7QUFHQTtBQUFBLGVBSEE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUNVO0FBQ0YsZ0NBQUEsQ0FBQTs7OztLQUFBOztBQUFBO0FBQUEscUJBQUE7O0FBRUE7QUFBQSxpQkFGQTs7QUFBQSxJQUdBLFNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBRU4sSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHlCQUFQO09BQUwsRUFBdUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFFbkMsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLE9BQVA7V0FBTCxFQUFxQixTQUFBLEdBQUE7QUFFakIsWUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsY0FBQSxPQUFBLEVBQU8saUJBQVA7YUFBTixDQUFBLENBQUE7bUJBQ0EsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLGNBQUEsTUFBQSxFQUFRLE9BQVI7QUFBQSxjQUFpQixFQUFBLEVBQUksT0FBckI7YUFBTixFQUFvQyxVQUFwQyxFQUhpQjtVQUFBLENBQXJCLEVBRm1DO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdkMsRUFGTTtJQUFBLENBSFYsQ0FBQTs7QUFZQTtBQUFBLGdCQVpBOztBQUFBLHdCQWFBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFFSixNQUFBLElBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUF0QjtlQUVJLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFlBQTdCLENBQTJDLElBQTNDLEVBRko7T0FBQSxNQUFBO2VBTUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFuQixDQUFnQyxJQUFoQyxFQU5KO09BRkk7SUFBQSxDQWJSLENBQUE7O0FBdUJBO0FBQUEsaUJBdkJBOztBQUFBLHdCQXdCQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBRUwsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUZLO0lBQUEsQ0F4QlQsQ0FBQTs7QUE0QkE7QUFBQSxnQkE1QkE7O0FBQUEsd0JBNkJBLE1BQUEsR0FBUSxTQUFFLEtBQUYsR0FBQTthQUVKLElBQUMsQ0FBQSxLQUFLLENBQUMsSUFBUCxDQUFhLEtBQWIsRUFGSTtJQUFBLENBN0JSLENBQUE7O3FCQUFBOztLQURvQixLQUw1QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/timekeeper/lib/views/clock.coffee