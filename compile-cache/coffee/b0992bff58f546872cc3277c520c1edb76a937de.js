(function() {
  var $, StatusView, Subscriber, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Subscriber = require('emissary').Subscriber;

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  module.exports = StatusView = (function(_super) {
    __extends(StatusView, _super);

    function StatusView() {
      return StatusView.__super__.constructor.apply(this, arguments);
    }

    Subscriber.includeInto(StatusView);

    StatusView.content = function(params) {
      return this.div({
        "class": 'git-plus overlay from-bottom'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": "" + params.type + " message"
          }, params.message);
        };
      })(this));
    };

    StatusView.prototype.initialize = function() {
      this.subscribe($(window), 'core:cancel', (function(_this) {
        return function() {
          return _this.detach();
        };
      })(this));
      atom.workspaceView.append(this);
      return setTimeout((function(_this) {
        return function() {
          return _this.detach();
        };
      })(this), 10000);
    };

    StatusView.prototype.detach = function() {
      StatusView.__super__.detach.apply(this, arguments);
      return this.unsubscribe();
    };

    return StatusView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxVQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBWSxPQUFBLENBQVEsTUFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQURKLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNRO0FBQ0osaUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsVUFBVSxDQUFDLFdBQVgsQ0FBdUIsVUFBdkIsQ0FBQSxDQUFBOztBQUFBLElBRUEsVUFBQyxDQUFBLE9BQUQsR0FBVyxTQUFDLE1BQUQsR0FBQTthQUNULElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyw4QkFBUDtPQUFMLEVBQTRDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQzFDLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxFQUFBLEdBQUUsTUFBTSxDQUFDLElBQVQsR0FBZSxVQUF0QjtXQUFMLEVBQXNDLE1BQU0sQ0FBQyxPQUE3QyxFQUQwQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTVDLEVBRFM7SUFBQSxDQUZYLENBQUE7O0FBQUEseUJBTUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxDQUFBLENBQUUsTUFBRixDQUFYLEVBQXNCLGFBQXRCLEVBQXFDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQW5CLENBQTBCLElBQTFCLENBREEsQ0FBQTthQUVBLFVBQUEsQ0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNULEtBQUMsQ0FBQSxNQUFELENBQUEsRUFEUztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVgsRUFFRSxLQUZGLEVBSFU7SUFBQSxDQU5aLENBQUE7O0FBQUEseUJBYUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsd0NBQUEsU0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsV0FBRCxDQUFBLEVBRk07SUFBQSxDQWJSLENBQUE7O3NCQUFBOztLQUR1QixLQUozQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/status-view.coffee