(function() {
  var TagListView, git, gitTags;

  git = require('../git');

  TagListView = require('../views/tag-list-view');

  gitTags = function() {
    this.TagListView = null;
    return git.cmd({
      args: ['tag', '-ln'],
      stdout: function(data) {
        return this.TagListView = new TagListView(data);
      },
      exit: function() {
        if (this.TagListView == null) {
          return new TagListView('');
        }
      }
    });
  };

  module.exports = gitTags;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHlCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFdBQUEsR0FBYyxPQUFBLENBQVEsd0JBQVIsQ0FEZCxDQUFBOztBQUFBLEVBR0EsT0FBQSxHQUFVLFNBQUEsR0FBQTtBQUNSLElBQUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxJQUFmLENBQUE7V0FDQSxHQUFHLENBQUMsR0FBSixDQUNFO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBQyxLQUFELEVBQVEsS0FBUixDQUFOO0FBQUEsTUFDQSxNQUFBLEVBQVEsU0FBQyxJQUFELEdBQUE7ZUFBVSxJQUFDLENBQUEsV0FBRCxHQUFtQixJQUFBLFdBQUEsQ0FBWSxJQUFaLEVBQTdCO01BQUEsQ0FEUjtBQUFBLE1BRUEsSUFBQSxFQUFNLFNBQUEsR0FBQTtBQUFHLFFBQUEsSUFBMkIsd0JBQTNCO2lCQUFJLElBQUEsV0FBQSxDQUFZLEVBQVosRUFBSjtTQUFIO01BQUEsQ0FGTjtLQURGLEVBRlE7RUFBQSxDQUhWLENBQUE7O0FBQUEsRUFVQSxNQUFNLENBQUMsT0FBUCxHQUFpQixPQVZqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-tags.coffee