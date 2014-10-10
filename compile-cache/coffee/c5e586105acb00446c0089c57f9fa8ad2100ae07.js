(function() {
  var $$, BufferedProcess, SelectListView, TagCreateView, TagListView, TagView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $$ = _ref.$$, BufferedProcess = _ref.BufferedProcess, SelectListView = _ref.SelectListView;

  TagView = require('./tag-view');

  TagCreateView = require('./tag-create-view');

  module.exports = TagListView = (function(_super) {
    __extends(TagListView, _super);

    function TagListView() {
      return TagListView.__super__.constructor.apply(this, arguments);
    }

    TagListView.prototype.initialize = function(data) {
      this.data = data;
      TagListView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return this.parseData();
    };

    TagListView.prototype.parseData = function() {
      var item, items, tmp;
      if (this.data.length > 0) {
        this.data = this.data.split("\n").slice(0, -1);
        items = (function() {
          var _i, _len, _ref1, _results;
          _ref1 = this.data.reverse();
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            item = _ref1[_i];
            if (!(item !== '')) {
              continue;
            }
            tmp = item.match(/([\w\d-_/.]+)\s(.*)/);
            _results.push({
              tag: tmp != null ? tmp[1] : void 0,
              annotation: tmp != null ? tmp[2] : void 0
            });
          }
          return _results;
        }).call(this);
      } else {
        items = [];
      }
      items.push({
        tag: '+ Add Tag',
        annotation: 'Add a tag referencing the current commit.'
      });
      this.setItems(items);
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    TagListView.prototype.getFilterKey = function() {
      return 'tag';
    };

    TagListView.prototype.viewForItem = function(_arg) {
      var annotation, tag;
      tag = _arg.tag, annotation = _arg.annotation;
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'text-highlight'
            }, tag);
            return _this.div({
              "class": 'text-warning'
            }, annotation);
          };
        })(this));
      });
    };

    TagListView.prototype.confirmed = function(_arg) {
      var tag;
      tag = _arg.tag;
      this.cancel();
      if (tag === '+ Add Tag') {
        return new TagCreateView();
      } else {
        return new TagView(tag);
      }
    };

    return TagListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDhFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QyxPQUFBLENBQVEsTUFBUixDQUF4QyxFQUFDLFVBQUEsRUFBRCxFQUFLLHVCQUFBLGVBQUwsRUFBc0Isc0JBQUEsY0FBdEIsQ0FBQTs7QUFBQSxFQUVBLE9BQUEsR0FBVSxPQUFBLENBQVEsWUFBUixDQUZWLENBQUE7O0FBQUEsRUFHQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxtQkFBUixDQUhoQixDQUFBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSwwQkFBQSxVQUFBLEdBQVksU0FBRSxJQUFGLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxPQUFBLElBQ1osQ0FBQTtBQUFBLE1BQUEsNkNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQVYsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFNBQUQsQ0FBQSxFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLDBCQUtBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLGdCQUFBO0FBQUEsTUFBQSxJQUFHLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTixHQUFlLENBQWxCO0FBQ0UsUUFBQSxJQUFDLENBQUEsSUFBRCxHQUFRLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixDQUFZLElBQVosQ0FBa0IsYUFBMUIsQ0FBQTtBQUFBLFFBQ0EsS0FBQTs7QUFDRTtBQUFBO2VBQUEsNENBQUE7NkJBQUE7a0JBQWlDLElBQUEsS0FBUTs7YUFDdkM7QUFBQSxZQUFBLEdBQUEsR0FBTSxJQUFJLENBQUMsS0FBTCxDQUFXLHFCQUFYLENBQU4sQ0FBQTtBQUFBLDBCQUNBO0FBQUEsY0FBQyxHQUFBLGdCQUFLLEdBQUssQ0FBQSxDQUFBLFVBQVg7QUFBQSxjQUFlLFVBQUEsZ0JBQVksR0FBSyxDQUFBLENBQUEsVUFBaEM7Y0FEQSxDQURGO0FBQUE7O3FCQUZGLENBREY7T0FBQSxNQUFBO0FBUUUsUUFBQSxLQUFBLEdBQVEsRUFBUixDQVJGO09BQUE7QUFBQSxNQVVBLEtBQUssQ0FBQyxJQUFOLENBQVc7QUFBQSxRQUFDLEdBQUEsRUFBSyxXQUFOO0FBQUEsUUFBbUIsVUFBQSxFQUFZLDJDQUEvQjtPQUFYLENBVkEsQ0FBQTtBQUFBLE1BWUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxLQUFWLENBWkEsQ0FBQTtBQUFBLE1BYUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixDQWJBLENBQUE7YUFjQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxFQWZTO0lBQUEsQ0FMWCxDQUFBOztBQUFBLDBCQXNCQSxZQUFBLEdBQWMsU0FBQSxHQUFBO2FBQUcsTUFBSDtJQUFBLENBdEJkLENBQUE7O0FBQUEsMEJBd0JBLFdBQUEsR0FBYSxTQUFDLElBQUQsR0FBQTtBQUNYLFVBQUEsZUFBQTtBQUFBLE1BRGEsV0FBQSxLQUFLLGtCQUFBLFVBQ2xCLENBQUE7YUFBQSxFQUFBLENBQUcsU0FBQSxHQUFBO2VBQ0QsSUFBQyxDQUFBLEVBQUQsQ0FBSSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNGLFlBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLGdCQUFQO2FBQUwsRUFBOEIsR0FBOUIsQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxjQUFBLE9BQUEsRUFBTyxjQUFQO2FBQUwsRUFBNEIsVUFBNUIsRUFGRTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUosRUFEQztNQUFBLENBQUgsRUFEVztJQUFBLENBeEJiLENBQUE7O0FBQUEsMEJBOEJBLFNBQUEsR0FBVyxTQUFDLElBQUQsR0FBQTtBQUNULFVBQUEsR0FBQTtBQUFBLE1BRFcsTUFBRCxLQUFDLEdBQ1gsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxDQUFBLENBQUE7QUFDQSxNQUFBLElBQUcsR0FBQSxLQUFPLFdBQVY7ZUFDTSxJQUFBLGFBQUEsQ0FBQSxFQUROO09BQUEsTUFBQTtlQUdNLElBQUEsT0FBQSxDQUFRLEdBQVIsRUFITjtPQUZTO0lBQUEsQ0E5QlgsQ0FBQTs7dUJBQUE7O0tBRndCLGVBTjFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/tag-list-view.coffee