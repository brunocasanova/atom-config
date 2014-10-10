(function() {
  var BlameLineView, BlameListView, ScrollView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ScrollView = require('atom').ScrollView;

  BlameLineView = require('./blame-line-view');

  module.exports = BlameListView = (function(_super) {
    __extends(BlameListView, _super);

    function BlameListView() {
      return BlameListView.__super__.constructor.apply(this, arguments);
    }

    BlameListView.content = function(params) {
      return this.div({
        "class": 'git-blame'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'blame-lines'
          }, function() {
            var blameLine, _i, _len, _ref, _results;
            _ref = params.annotations;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              blameLine = _ref[_i];
              blameLine.backgroundClass = _this.lineClass(blameLine);
              _results.push((function(blameLine) {
                return _this.subview('blame-line-' + blameLine.line, new BlameLineView(blameLine));
              })(blameLine));
            }
            return _results;
          });
        };
      })(this));
    };

    BlameListView.lastHash = '';

    BlameListView.lastBgClass = '';

    BlameListView.lineClass = function(lineData) {
      if (lineData.noCommit) {
        return '';
      }
      if (lineData.hash !== this.lastHash) {
        this.lastHash = lineData.hash;
        this.lastBgClass = this.lastBgClass === 'line-bg-lighter' ? 'line-bg-darker' : 'line-bg-lighter';
      }
      return this.lastBgClass;
    };

    return BlameListView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHdDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxhQUFjLE9BQUEsQ0FBUSxNQUFSLEVBQWQsVUFBRCxDQUFBOztBQUFBLEVBQ0EsYUFBQSxHQUFnQixPQUFBLENBQVEsbUJBQVIsQ0FEaEIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixvQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxhQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsTUFBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLFdBQVA7T0FBTCxFQUF5QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUN2QixLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sYUFBUDtXQUFMLEVBQTJCLFNBQUEsR0FBQTtBQUN2QixnQkFBQSxtQ0FBQTtBQUFBO0FBQUE7aUJBQUEsMkNBQUE7bUNBQUE7QUFDRSxjQUFBLFNBQVMsQ0FBQyxlQUFWLEdBQTRCLEtBQUMsQ0FBQSxTQUFELENBQVcsU0FBWCxDQUE1QixDQUFBO0FBQUEsNEJBQ0csQ0FBQSxTQUFDLFNBQUQsR0FBQTt1QkFDRCxLQUFDLENBQUEsT0FBRCxDQUFTLGFBQUEsR0FBZ0IsU0FBUyxDQUFDLElBQW5DLEVBQTZDLElBQUEsYUFBQSxDQUFjLFNBQWQsQ0FBN0MsRUFEQztjQUFBLENBQUEsQ0FBSCxDQUFJLFNBQUosRUFEQSxDQURGO0FBQUE7NEJBRHVCO1VBQUEsQ0FBM0IsRUFEdUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QixFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLElBUUEsYUFBQyxDQUFBLFFBQUQsR0FBVyxFQVJYLENBQUE7O0FBQUEsSUFVQSxhQUFDLENBQUEsV0FBRCxHQUFjLEVBVmQsQ0FBQTs7QUFBQSxJQVlBLGFBQUMsQ0FBQSxTQUFELEdBQVksU0FBQyxRQUFELEdBQUE7QUFDVixNQUFBLElBQUcsUUFBUSxDQUFDLFFBQVo7QUFDRSxlQUFPLEVBQVAsQ0FERjtPQUFBO0FBR0EsTUFBQSxJQUFHLFFBQVEsQ0FBQyxJQUFULEtBQW1CLElBQUMsQ0FBQSxRQUF2QjtBQUNFLFFBQUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxRQUFRLENBQUMsSUFBckIsQ0FBQTtBQUFBLFFBQ0EsSUFBQyxDQUFBLFdBQUQsR0FBa0IsSUFBQyxDQUFBLFdBQUQsS0FBZ0IsaUJBQW5CLEdBQTBDLGdCQUExQyxHQUFnRSxpQkFEL0UsQ0FERjtPQUhBO0FBT0EsYUFBTyxJQUFDLENBQUEsV0FBUixDQVJVO0lBQUEsQ0FaWixDQUFBOzt5QkFBQTs7S0FGMEIsV0FKNUIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-blame/lib/views/blame-list-view.coffee