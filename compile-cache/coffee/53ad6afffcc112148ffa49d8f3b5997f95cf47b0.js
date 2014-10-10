(function() {
  var StatusView, git, gitAdd;

  git = require('../git');

  StatusView = require('../views/status-view');

  gitAdd = function(addAll) {
    var file, _ref;
    if (addAll == null) {
      addAll = false;
    }
    if (!addAll) {
      file = git.relativize((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0);
    } else {
      file = null;
    }
    return git.add({
      file: file
    });
  };

  module.exports = gitAdd;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUNBLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FEYixDQUFBOztBQUFBLEVBR0EsTUFBQSxHQUFTLFNBQUMsTUFBRCxHQUFBO0FBQ1AsUUFBQSxVQUFBOztNQURRLFNBQU87S0FDZjtBQUFBLElBQUEsSUFBRyxDQUFBLE1BQUg7QUFDRSxNQUFBLElBQUEsR0FBTyxHQUFHLENBQUMsVUFBSix5REFBK0MsQ0FBRSxPQUFsQyxDQUFBLFVBQWYsQ0FBUCxDQURGO0tBQUEsTUFBQTtBQUdFLE1BQUEsSUFBQSxHQUFPLElBQVAsQ0FIRjtLQUFBO1dBS0EsR0FBRyxDQUFDLEdBQUosQ0FBUTtBQUFBLE1BQUEsSUFBQSxFQUFNLElBQU47S0FBUixFQU5PO0VBQUEsQ0FIVCxDQUFBOztBQUFBLEVBV0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsTUFYakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-add.coffee