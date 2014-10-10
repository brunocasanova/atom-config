(function() {
  var exec;

  exec = require("child_process").exec;

  module.exports = {
    activate: function(state) {
      return atom.workspaceView.command("open-in-github-app:open", (function(_this) {
        return function() {
          return _this.openApp();
        };
      })(this));
    },
    openApp: function() {
      var path, _ref;
      path = (_ref = atom.project) != null ? _ref.getPath() : void 0;
      if (path != null) {
        return exec("open -a GitHub.app " + path);
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLGVBQVIsQ0FBd0IsQ0FBQyxJQUFoQyxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQix5QkFBM0IsRUFBc0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsT0FBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF0RCxFQURRO0lBQUEsQ0FBVjtBQUFBLElBR0EsT0FBQSxFQUFTLFNBQUEsR0FBQTtBQUNQLFVBQUEsVUFBQTtBQUFBLE1BQUEsSUFBQSx1Q0FBbUIsQ0FBRSxPQUFkLENBQUEsVUFBUCxDQUFBO0FBQ0EsTUFBQSxJQUFxQyxZQUFyQztlQUFBLElBQUEsQ0FBTSxxQkFBQSxHQUFvQixJQUExQixFQUFBO09BRk87SUFBQSxDQUhUO0dBSEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/open-in-github-app/lib/open-in-github-app.coffee