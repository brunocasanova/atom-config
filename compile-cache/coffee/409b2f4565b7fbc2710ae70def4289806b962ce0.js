(function() {
  var BlameErrorView, View,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = BlameErrorView = (function(_super) {
    __extends(BlameErrorView, _super);

    function BlameErrorView() {
      this.onOk = __bind(this.onOk, this);
      return BlameErrorView.__super__.constructor.apply(this, arguments);
    }

    BlameErrorView.content = function(params) {
      return this.div({
        "class": 'overlay from-top'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'block text-highlight'
          }, 'Git Blame Error:');
          _this.div({
            "class": 'error-message block'
          }, params.message);
          return _this.div({
            "class": 'block'
          }, function() {
            return _this.button({
              "class": 'btn',
              click: 'onOk'
            }, 'Ok');
          });
        };
      })(this));
    };

    BlameErrorView.prototype.onOk = function(event, element) {
      return this.remove();
    };

    BlameErrorView.prototype.attach = function() {
      return atom.workspaceView.append(this);
    };

    return BlameErrorView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9CQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUMsT0FBUSxPQUFBLENBQVEsTUFBUixFQUFSLElBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixxQ0FBQSxDQUFBOzs7OztLQUFBOztBQUFBLElBQUEsY0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLE1BQUQsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxrQkFBUDtPQUFMLEVBQWdDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7QUFDOUIsVUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sc0JBQVA7V0FBTCxFQUFvQyxrQkFBcEMsQ0FBQSxDQUFBO0FBQUEsVUFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8scUJBQVA7V0FBTCxFQUFtQyxNQUFNLENBQUMsT0FBMUMsQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxPQUFQO1dBQUwsRUFBcUIsU0FBQSxHQUFBO21CQUNuQixLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsY0FBQSxPQUFBLEVBQU8sS0FBUDtBQUFBLGNBQWMsS0FBQSxFQUFPLE1BQXJCO2FBQVIsRUFBcUMsSUFBckMsRUFEbUI7VUFBQSxDQUFyQixFQUg4QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWhDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsNkJBT0EsSUFBQSxHQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVIsR0FBQTthQUNKLElBQUksQ0FBQyxNQUFMLENBQUEsRUFESTtJQUFBLENBUE4sQ0FBQTs7QUFBQSw2QkFVQSxNQUFBLEdBQVEsU0FBQSxHQUFBO2FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixFQURNO0lBQUEsQ0FWUixDQUFBOzswQkFBQTs7S0FGMkIsS0FIN0IsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-blame/lib/views/blame-error-view.coffee