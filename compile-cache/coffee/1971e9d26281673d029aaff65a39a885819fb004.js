(function() {
  var BlameLineView, RemoteRevision, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  RemoteRevision = require('../util/RemoteRevision');

  module.exports = BlameLineView = (function(_super) {
    __extends(BlameLineView, _super);

    function BlameLineView() {
      return BlameLineView.__super__.constructor.apply(this, arguments);
    }

    BlameLineView.content = function(params) {
      if (params.noCommit) {
        return this.div({
          "class": 'blame-line no-commit'
        }, (function(_this) {
          return function() {
            return _this.span({
              "class": 'text-subtle'
            }, '----------');
          };
        })(this));
      } else {
        return this.div({
          "class": 'blame-line ' + params.backgroundClass
        }, (function(_this) {
          return function() {
            _this.a({
              'data-hash': params.hash,
              "class": 'hash',
              click: 'hashClicked'
            }, params.hash.substring(0, 8));
            _this.span({
              "class": 'date'
            }, params.date);
            return _this.span({
              "class": 'committer text-highlight'
            }, params.committer.split(' ').slice(-1)[0]);
          };
        })(this));
      }
    };

    BlameLineView.prototype.hashClicked = function(event, element) {
      var filePath, hash, remoteUrl, _ref;
      filePath = atom.workspace.activePaneItem.getPath();
      remoteUrl = (_ref = atom.project.getRepo()) != null ? _ref.getOriginUrl(filePath) : void 0;
      hash = element.data('hash');
      return RemoteRevision.create(hash, remoteUrl).open();
    };

    return BlameLineView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1DQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBQ0EsY0FBQSxHQUFpQixPQUFBLENBQVEsd0JBQVIsQ0FEakIsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixvQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxhQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsTUFBRCxHQUFBO0FBQ1IsTUFBQSxJQUFHLE1BQU0sQ0FBQyxRQUFWO2VBQ0UsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFVBQUEsT0FBQSxFQUFPLHNCQUFQO1NBQUwsRUFBb0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFBLEdBQUE7bUJBQ2xDLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxjQUFBLE9BQUEsRUFBTyxhQUFQO2FBQU4sRUFBNEIsWUFBNUIsRUFEa0M7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwQyxFQURGO09BQUEsTUFBQTtlQUlFLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxVQUFBLE9BQUEsRUFBTyxhQUFBLEdBQWdCLE1BQU0sQ0FBQyxlQUE5QjtTQUFMLEVBQW9ELENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO0FBQ2xELFlBQUEsS0FBQyxDQUFBLENBQUQsQ0FBRztBQUFBLGNBQUEsV0FBQSxFQUFhLE1BQU0sQ0FBQyxJQUFwQjtBQUFBLGNBQTBCLE9BQUEsRUFBTyxNQUFqQztBQUFBLGNBQXlDLEtBQUEsRUFBTyxhQUFoRDthQUFILEVBQWtFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBWixDQUFzQixDQUF0QixFQUF3QixDQUF4QixDQUFsRSxDQUFBLENBQUE7QUFBQSxZQUNBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxjQUFBLE9BQUEsRUFBTyxNQUFQO2FBQU4sRUFBcUIsTUFBTSxDQUFDLElBQTVCLENBREEsQ0FBQTttQkFFQSxLQUFDLENBQUEsSUFBRCxDQUFNO0FBQUEsY0FBQSxPQUFBLEVBQU8sMEJBQVA7YUFBTixFQUF5QyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQWpCLENBQXVCLEdBQXZCLENBQTJCLENBQUMsS0FBNUIsQ0FBa0MsQ0FBQSxDQUFsQyxDQUFzQyxDQUFBLENBQUEsQ0FBL0UsRUFIa0Q7VUFBQSxFQUFBO1FBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwRCxFQUpGO09BRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsNEJBV0EsV0FBQSxHQUFhLFNBQUMsS0FBRCxFQUFRLE9BQVIsR0FBQTtBQUNYLFVBQUEsK0JBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxPQUE5QixDQUFBLENBQVgsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxpREFBa0MsQ0FBRSxZQUF4QixDQUFxQyxRQUFyQyxVQURaLENBQUE7QUFBQSxNQUVBLElBQUEsR0FBTyxPQUFPLENBQUMsSUFBUixDQUFhLE1BQWIsQ0FGUCxDQUFBO2FBS0EsY0FBYyxDQUFDLE1BQWYsQ0FBc0IsSUFBdEIsRUFBNEIsU0FBNUIsQ0FBc0MsQ0FBQyxJQUF2QyxDQUFBLEVBTlc7SUFBQSxDQVhiLENBQUE7O3lCQUFBOztLQUYwQixLQUo1QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-blame/lib/views/blame-line-view.coffee