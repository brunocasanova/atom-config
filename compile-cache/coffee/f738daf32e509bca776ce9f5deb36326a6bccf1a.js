(function() {
  var GH_REGEX, GitIssueView, fetchIssues, getOriginUrl, isGitHubRepo, issuesUrl, request;

  GitIssueView = require('./GitIssueView');

  request = require('request');

  request = request.defaults({
    headers: {
      'User-Agent': 'baconscript/github-issues'
    }
  });

  GH_REGEX = /^(https:\/\/|git@)github\.com(\/|:)([-\w]+)\/([-\w]+)\.git$/;

  issuesUrl = function(info) {
    return "https://api.github.com/repos/" + info.user + "/" + info.repo + "/issues";
  };

  getOriginUrl = function() {
    return atom.project.getRepo().getOriginUrl();
  };

  isGitHubRepo = function() {
    var m;
    if (!getOriginUrl()) {
      return false;
    }
    m = getOriginUrl().match(GH_REGEX);
    if (m) {
      return {
        user: m[3],
        repo: m[4]
      };
    } else {
      return false;
    }
  };

  fetchIssues = function(callback) {
    return request(issuesUrl(isGitHubRepo()), function(err, resp, body) {
      var issues;
      if (err) {
        return callback(err);
      } else {
        try {
          issues = JSON.parse(body);
          return callback(null, issues);
        } catch (_error) {
          err = _error;
          console.log('ERR', body);
          return callback(err);
        }
      }
    });
  };

  module.exports = {
    configDefaults: {
      username: ''
    },
    activate: function() {
      atom.workspaceView.command('github-issues:list', function() {
        if (isGitHubRepo()) {
          return atom.workspace.open('github-issues://list');
        } else {
          return alert('The current project does not appear to be a GitHub repo.');
        }
      });
      return fetchIssues(function(err, issues) {
        if (err) {
          console.error(err);
        }
        return atom.workspace.registerOpener(function(uri) {
          if (!uri.match(/^github-issues:/)) {
            return;
          }
          return new GitIssueView({
            issues: issues
          });
        });
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1GQUFBOztBQUFBLEVBQUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxnQkFBUixDQUFmLENBQUE7O0FBQUEsRUFDQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FEVixDQUFBOztBQUFBLEVBR0EsT0FBQSxHQUFVLE9BQU8sQ0FBQyxRQUFSLENBQ1I7QUFBQSxJQUFBLE9BQUEsRUFDRTtBQUFBLE1BQUEsWUFBQSxFQUFjLDJCQUFkO0tBREY7R0FEUSxDQUhWLENBQUE7O0FBQUEsRUFPQSxRQUFBLEdBQVcsNkRBUFgsQ0FBQTs7QUFBQSxFQVNBLFNBQUEsR0FBWSxTQUFDLElBQUQsR0FBQTtXQUNULCtCQUFBLEdBQThCLElBQUksQ0FBQyxJQUFuQyxHQUF5QyxHQUF6QyxHQUEyQyxJQUFJLENBQUMsSUFBaEQsR0FBc0QsVUFEN0M7RUFBQSxDQVRaLENBQUE7O0FBQUEsRUFZQSxZQUFBLEdBQWUsU0FBQSxHQUFBO1dBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FBc0IsQ0FBQyxZQUF2QixDQUFBLEVBQUg7RUFBQSxDQVpmLENBQUE7O0FBQUEsRUFjQSxZQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsUUFBQSxDQUFBO0FBQUEsSUFBQSxJQUFBLENBQUEsWUFBb0IsQ0FBQSxDQUFwQjtBQUFBLGFBQU8sS0FBUCxDQUFBO0tBQUE7QUFBQSxJQUNBLENBQUEsR0FBSSxZQUFBLENBQUEsQ0FBYyxDQUFDLEtBQWYsQ0FBcUIsUUFBckIsQ0FESixDQUFBO0FBRUEsSUFBQSxJQUFHLENBQUg7YUFDRTtBQUFBLFFBQ0UsSUFBQSxFQUFNLENBQUUsQ0FBQSxDQUFBLENBRFY7QUFBQSxRQUVFLElBQUEsRUFBTSxDQUFFLENBQUEsQ0FBQSxDQUZWO1FBREY7S0FBQSxNQUFBO2FBTUUsTUFORjtLQUhhO0VBQUEsQ0FkZixDQUFBOztBQUFBLEVBeUJBLFdBQUEsR0FBYyxTQUFDLFFBQUQsR0FBQTtXQUNaLE9BQUEsQ0FBUSxTQUFBLENBQVUsWUFBQSxDQUFBLENBQVYsQ0FBUixFQUFtQyxTQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixHQUFBO0FBQ2pDLFVBQUEsTUFBQTtBQUFBLE1BQUEsSUFBRyxHQUFIO2VBQ0UsUUFBQSxDQUFTLEdBQVQsRUFERjtPQUFBLE1BQUE7QUFHRTtBQUNFLFVBQUEsTUFBQSxHQUFTLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBWCxDQUFULENBQUE7aUJBQ0EsUUFBQSxDQUFTLElBQVQsRUFBZSxNQUFmLEVBRkY7U0FBQSxjQUFBO0FBSUUsVUFESSxZQUNKLENBQUE7QUFBQSxVQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksS0FBWixFQUFtQixJQUFuQixDQUFBLENBQUE7aUJBQ0EsUUFBQSxDQUFTLEdBQVQsRUFMRjtTQUhGO09BRGlDO0lBQUEsQ0FBbkMsRUFEWTtFQUFBLENBekJkLENBQUE7O0FBQUEsRUFxQ0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxRQUFBLEVBQVUsRUFBVjtLQURGO0FBQUEsSUFFQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ1IsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLG9CQUEzQixFQUFpRCxTQUFBLEdBQUE7QUFDL0MsUUFBQSxJQUFHLFlBQUEsQ0FBQSxDQUFIO2lCQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBZixDQUFvQixzQkFBcEIsRUFERjtTQUFBLE1BQUE7aUJBR0UsS0FBQSxDQUFNLDBEQUFOLEVBSEY7U0FEK0M7TUFBQSxDQUFqRCxDQUFBLENBQUE7YUFLQSxXQUFBLENBQVksU0FBQyxHQUFELEVBQU0sTUFBTixHQUFBO0FBQ1YsUUFBQSxJQUFHLEdBQUg7QUFBWSxVQUFBLE9BQU8sQ0FBQyxLQUFSLENBQWMsR0FBZCxDQUFBLENBQVo7U0FBQTtlQUNBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUE4QixTQUFDLEdBQUQsR0FBQTtBQUM1QixVQUFBLElBQUEsQ0FBQSxHQUFpQixDQUFDLEtBQUosQ0FBVSxpQkFBVixDQUFkO0FBQUEsa0JBQUEsQ0FBQTtXQUFBO2lCQUNJLElBQUEsWUFBQSxDQUNGO0FBQUEsWUFBQSxNQUFBLEVBQVEsTUFBUjtXQURFLEVBRndCO1FBQUEsQ0FBOUIsRUFGVTtNQUFBLENBQVosRUFOUTtJQUFBLENBRlY7R0F0Q0YsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/github-issues/index.coffee