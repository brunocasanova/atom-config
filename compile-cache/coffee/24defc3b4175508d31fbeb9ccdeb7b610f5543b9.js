(function() {
  var ListView, git, gitFetch;

  git = require('../git');

  ListView = require('../views/remote-list-view');

  gitFetch = function() {
    return git.cmd({
      args: ['remote'],
      stdout: function(data) {
        return new ListView(data.toString(), 'fetch');
      }
    });
  };

  module.exports = gitFetch;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFFBQUEsR0FBVyxPQUFBLENBQVEsMkJBQVIsQ0FEWCxDQUFBOztBQUFBLEVBR0EsUUFBQSxHQUFXLFNBQUEsR0FBQTtXQUNULEdBQUcsQ0FBQyxHQUFKLENBQ0U7QUFBQSxNQUFBLElBQUEsRUFBTSxDQUFDLFFBQUQsQ0FBTjtBQUFBLE1BQ0EsTUFBQSxFQUFRLFNBQUMsSUFBRCxHQUFBO2VBQWMsSUFBQSxRQUFBLENBQVMsSUFBSSxDQUFDLFFBQUwsQ0FBQSxDQUFULEVBQTBCLE9BQTFCLEVBQWQ7TUFBQSxDQURSO0tBREYsRUFEUztFQUFBLENBSFgsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBUmpCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-fetch.coffee