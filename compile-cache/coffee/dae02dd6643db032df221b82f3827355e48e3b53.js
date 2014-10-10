(function() {
  var $, OutputView, ScrollView, Subscriber, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Subscriber = require('emissary').Subscriber;

  _ref = require('atom'), $ = _ref.$, ScrollView = _ref.ScrollView;

  module.exports = OutputView = (function(_super) {
    __extends(OutputView, _super);

    function OutputView() {
      return OutputView.__super__.constructor.apply(this, arguments);
    }

    Subscriber.includeInto(OutputView);

    OutputView.prototype.message = '';

    OutputView.content = function() {
      return this.div({
        "class": 'git-plus info-view'
      }, (function(_this) {
        return function() {
          return _this.pre({
            "class": 'output'
          });
        };
      })(this));
    };

    OutputView.prototype.initialize = function() {
      OutputView.__super__.initialize.apply(this, arguments);
      atom.workspaceView.appendToBottom(this);
      return this.subscribe($(window), 'core:cancel', (function(_this) {
        return function() {
          return _this.detach();
        };
      })(this));
    };

    OutputView.prototype.addLine = function(line) {
      return this.message += line;
    };

    OutputView.prototype.reset = function() {
      return this.message = '';
    };

    OutputView.prototype.finish = function() {
      this.find(".output").append(this.message);
      return setTimeout((function(_this) {
        return function() {
          return _this.detach();
        };
      })(this), 10000);
    };

    OutputView.prototype.detach = function() {
      OutputView.__super__.detach.apply(this, arguments);
      return this.unsubscribe();
    };

    return OutputView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxVQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsT0FBa0IsT0FBQSxDQUFRLE1BQVIsQ0FBbEIsRUFBQyxTQUFBLENBQUQsRUFBSSxrQkFBQSxVQURKLENBQUE7O0FBQUEsRUFHQSxNQUFNLENBQUMsT0FBUCxHQUNRO0FBQ0osaUNBQUEsQ0FBQTs7OztLQUFBOztBQUFBLElBQUEsVUFBVSxDQUFDLFdBQVgsQ0FBd0IsVUFBeEIsQ0FBQSxDQUFBOztBQUFBLHlCQUVBLE9BQUEsR0FBUyxFQUZULENBQUE7O0FBQUEsSUFJQSxVQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxvQkFBUDtPQUFMLEVBQWtDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2hDLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxRQUFQO1dBQUwsRUFEZ0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsQyxFQURRO0lBQUEsQ0FKVixDQUFBOztBQUFBLHlCQVFBLFVBQUEsR0FBWSxTQUFBLEdBQUE7QUFDVixNQUFBLDRDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQW5CLENBQWtDLElBQWxDLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxTQUFELENBQVcsQ0FBQSxDQUFFLE1BQUYsQ0FBWCxFQUFzQixhQUF0QixFQUFxQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXJDLEVBSFU7SUFBQSxDQVJaLENBQUE7O0FBQUEseUJBYUEsT0FBQSxHQUFTLFNBQUMsSUFBRCxHQUFBO2FBQ1AsSUFBQyxDQUFBLE9BQUQsSUFBWSxLQURMO0lBQUEsQ0FiVCxDQUFBOztBQUFBLHlCQWdCQSxLQUFBLEdBQU8sU0FBQSxHQUFBO2FBQ0wsSUFBQyxDQUFBLE9BQUQsR0FBVyxHQUROO0lBQUEsQ0FoQlAsQ0FBQTs7QUFBQSx5QkFtQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNOLE1BQUEsSUFBQyxDQUFBLElBQUQsQ0FBTSxTQUFOLENBQWdCLENBQUMsTUFBakIsQ0FBd0IsSUFBQyxDQUFBLE9BQXpCLENBQUEsQ0FBQTthQUNBLFVBQUEsQ0FBVyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUNULEtBQUMsQ0FBQSxNQUFELENBQUEsRUFEUztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQVgsRUFFRSxLQUZGLEVBRk07SUFBQSxDQW5CUixDQUFBOztBQUFBLHlCQXlCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSx3Q0FBQSxTQUFBLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxXQUFELENBQUEsRUFGTTtJQUFBLENBekJSLENBQUE7O3NCQUFBOztLQUR1QixXQUozQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/output-view.coffee