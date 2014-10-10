(function() {
  var CommandRunnerView, RunCommandView;

  RunCommandView = require('./run-command-view');

  CommandRunnerView = require('./command-runner-view');

  module.exports = {
    configDefaults: {
      precedeCommandsWith: 'source $HOME/.bash_profile',
      snapCommandResultsToBottom: true
    },
    runCommandView: null,
    commandRunnerView: null,
    activate: function(state) {
      this.commandRunnerView = new CommandRunnerView();
      return this.runCommandView = new RunCommandView(this.commandRunnerView);
    },
    deactivate: function() {
      this.runCommandView.destroy();
      return this.commandRunnerView.destroy();
    },
    serialize: function() {
      return {
        runCommandViewState: this.runCommandView.serialize()
      };
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlDQUFBOztBQUFBLEVBQUEsY0FBQSxHQUFpQixPQUFBLENBQVEsb0JBQVIsQ0FBakIsQ0FBQTs7QUFBQSxFQUNBLGlCQUFBLEdBQW9CLE9BQUEsQ0FBUSx1QkFBUixDQURwQixDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxtQkFBQSxFQUFxQiw0QkFBckI7QUFBQSxNQUNBLDBCQUFBLEVBQTRCLElBRDVCO0tBREY7QUFBQSxJQUlBLGNBQUEsRUFBZ0IsSUFKaEI7QUFBQSxJQUtBLGlCQUFBLEVBQW1CLElBTG5CO0FBQUEsSUFPQSxRQUFBLEVBQVUsU0FBQyxLQUFELEdBQUE7QUFDUixNQUFBLElBQUMsQ0FBQSxpQkFBRCxHQUF5QixJQUFBLGlCQUFBLENBQUEsQ0FBekIsQ0FBQTthQUNBLElBQUMsQ0FBQSxjQUFELEdBQXNCLElBQUEsY0FBQSxDQUFlLElBQUMsQ0FBQSxpQkFBaEIsRUFGZDtJQUFBLENBUFY7QUFBQSxJQVdBLFVBQUEsRUFBWSxTQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxjQUFjLENBQUMsT0FBaEIsQ0FBQSxDQUFBLENBQUE7YUFDQSxJQUFDLENBQUEsaUJBQWlCLENBQUMsT0FBbkIsQ0FBQSxFQUZVO0lBQUEsQ0FYWjtBQUFBLElBZUEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSxtQkFBQSxFQUFxQixJQUFDLENBQUEsY0FBYyxDQUFDLFNBQWhCLENBQUEsQ0FBckI7UUFEUztJQUFBLENBZlg7R0FKRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/run-command/lib/run-command.coffee