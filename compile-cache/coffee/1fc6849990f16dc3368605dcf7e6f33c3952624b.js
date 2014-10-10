(function() {
  var $$, EditorView, GitIssueView, View, marked, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $$ = _ref.$$, EditorView = _ref.EditorView, View = _ref.View;

  marked = require('marked');

  _ = require('lodash');

  module.exports = GitIssueView = (function(_super) {
    __extends(GitIssueView, _super);

    GitIssueView.content = function() {
      return this.section({
        'class': 'padded pane-item'
      }, (function(_this) {
        return function() {
          _this.h1({
            'class': 'section-heading'
          }, 'GitHub Issues');
          return _this.div({
            'data-element': 'issue-list'
          });
        };
      })(this));
    };

    function GitIssueView(opt) {
      var issueList;
      if (opt == null) {
        opt = {};
      }
      GitIssueView.__super__.constructor.apply(this, arguments);
      console.log(opt);
      this.issues = opt.issues;
      issueList = this.issues.sort(function(a, b) {
        return +a.number - +b.number;
      }).map(function(issue) {
        return "<h2 class=section-heading>#" + issue.number + ": " + issue.title + "</h2><div>" + ((marked(issue.body)) || '') + "</div>";
      });
      issueList.forEach((function(_this) {
        return function(issue) {
          return _this.find('[data-element="issue-list"]').append("<div class=block>" + issue + "</div>");
        };
      })(this));
    }

    GitIssueView.prototype.getTitle = function() {
      return 'GitHub Issues';
    };

    GitIssueView.prototype.getUri = function() {
      return 'github-issues://list';
    };

    return GitIssueView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1EQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF5QixPQUFBLENBQVEsTUFBUixDQUF6QixFQUFDLFVBQUEsRUFBRCxFQUFLLGtCQUFBLFVBQUwsRUFBaUIsWUFBQSxJQUFqQixDQUFBOztBQUFBLEVBQ0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBRFQsQ0FBQTs7QUFBQSxFQUVBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQUZKLENBQUE7O0FBQUEsRUFJQSxNQUFNLENBQUMsT0FBUCxHQUVNO0FBQ0osbUNBQUEsQ0FBQTs7QUFBQSxJQUFBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLE9BQUQsQ0FBUztBQUFBLFFBQUEsT0FBQSxFQUFRLGtCQUFSO09BQVQsRUFBcUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUNuQyxVQUFBLEtBQUMsQ0FBQSxFQUFELENBQUk7QUFBQSxZQUFBLE9BQUEsRUFBUSxpQkFBUjtXQUFKLEVBQStCLGVBQS9CLENBQUEsQ0FBQTtpQkFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxjQUFBLEVBQWUsWUFBZjtXQUFMLEVBRm1DO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckMsRUFEUTtJQUFBLENBQVYsQ0FBQTs7QUFJYSxJQUFBLHNCQUFDLEdBQUQsR0FBQTtBQUNYLFVBQUEsU0FBQTs7UUFEWSxNQUFJO09BQ2hCO0FBQUEsTUFBQSwrQ0FBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxHQUFaLENBREEsQ0FBQTtBQUFBLE1BRUMsSUFBQyxDQUFBLFNBQVUsSUFBVixNQUZGLENBQUE7QUFBQSxNQUdBLFNBQUEsR0FBWSxJQUFDLENBQUEsTUFDWCxDQUFDLElBRFMsQ0FDSixTQUFDLENBQUQsRUFBRyxDQUFILEdBQUE7ZUFBUyxDQUFBLENBQUUsQ0FBQyxNQUFILEdBQVksQ0FBQSxDQUFFLENBQUMsT0FBeEI7TUFBQSxDQURJLENBRVYsQ0FBQyxHQUZTLENBRUwsU0FBQyxLQUFELEdBQUE7ZUFDRiw2QkFBQSxHQUE0QixLQUFLLENBQUMsTUFBbEMsR0FBMEMsSUFBMUMsR0FBNkMsS0FBSyxDQUFDLEtBQW5ELEdBQTBELFlBQTFELEdBQXFFLENBQUEsQ0FBQyxNQUFBLENBQU8sS0FBSyxDQUFDLElBQWIsQ0FBRCxDQUFBLElBQXVCLEVBQXZCLENBQXJFLEdBQWdHLFNBRDlGO01BQUEsQ0FGSyxDQUhaLENBQUE7QUFBQSxNQU9BLFNBQVMsQ0FBQyxPQUFWLENBQWtCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLEtBQUQsR0FBQTtpQkFDaEIsS0FBQyxDQUFBLElBQUQsQ0FBTSw2QkFBTixDQUFvQyxDQUFDLE1BQXJDLENBQTZDLG1CQUFBLEdBQWtCLEtBQWxCLEdBQXlCLFFBQXRFLEVBRGdCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEIsQ0FQQSxDQURXO0lBQUEsQ0FKYjs7QUFBQSwyQkFlQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsZ0JBQUg7SUFBQSxDQWZWLENBQUE7O0FBQUEsMkJBZ0JBLE1BQUEsR0FBUSxTQUFBLEdBQUE7YUFBRyx1QkFBSDtJQUFBLENBaEJSLENBQUE7O3dCQUFBOztLQUR5QixLQU4zQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/github-issues/GitIssueView.coffee