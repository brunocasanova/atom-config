(function() {
  var BufferedProcess, CommandRunner, Utils,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  BufferedProcess = require('atom').BufferedProcess;

  Utils = require('./utils');

  CommandRunner = (function() {
    CommandRunner.prototype.processor = BufferedProcess;

    CommandRunner.prototype.commandResult = '';

    function CommandRunner(command, callback) {
      this.joinCommands = __bind(this.joinCommands, this);
      this.addPrecedentCommand = __bind(this.addPrecedentCommand, this);
      this.returnCallback = __bind(this.returnCallback, this);
      this.exit = __bind(this.exit, this);
      this.collectResults = __bind(this.collectResults, this);
      this.command = command;
      this.callback = callback;
    }

    CommandRunner.prototype.collectResults = function(output) {
      this.commandResult += output.toString();
      return this.returnCallback();
    };

    CommandRunner.prototype.exit = function(code) {
      return this.returnCallback();
    };

    CommandRunner.prototype.processParams = function() {
      return {
        command: '/bin/bash',
        args: ['-c', this.addPrecedentCommand(this.command)],
        options: {
          cwd: atom.project.getPath()
        },
        stdout: this.collectResults,
        stderr: this.collectResults,
        exit: this.exit
      };
    };

    CommandRunner.prototype.returnCallback = function() {
      return this.callback(this.command, this.commandResult);
    };

    CommandRunner.prototype.runCommand = function() {
      this.commandResult = '';
      this.process = new this.processor(this.processParams());
      return this.returnCallback();
    };

    CommandRunner.prototype.kill = function() {
      if (this.process != null) {
        return this.process.kill();
      }
    };

    CommandRunner.prototype.addPrecedentCommand = function(command) {
      var precedent;
      precedent = atom.config.get('run-command.precedeCommandsWith');
      if ((precedent != null) && !Utils.stringIsBlank(precedent)) {
        return this.joinCommands([precedent, command]);
      }
    };

    CommandRunner.prototype.joinCommands = function(commands) {
      return commands.join(' && ');
    };

    return CommandRunner;

  })();

  module.exports = {
    CommandRunner: CommandRunner
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFDQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQyxrQkFBbUIsT0FBQSxDQUFRLE1BQVIsRUFBbkIsZUFBRCxDQUFBOztBQUFBLEVBQ0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxTQUFSLENBRFIsQ0FBQTs7QUFBQSxFQUdNO0FBQ0osNEJBQUEsU0FBQSxHQUFXLGVBQVgsQ0FBQTs7QUFBQSw0QkFDQSxhQUFBLEdBQWUsRUFEZixDQUFBOztBQUdhLElBQUEsdUJBQUMsT0FBRCxFQUFVLFFBQVYsR0FBQTtBQUNYLHlEQUFBLENBQUE7QUFBQSx1RUFBQSxDQUFBO0FBQUEsNkRBQUEsQ0FBQTtBQUFBLHlDQUFBLENBQUE7QUFBQSw2REFBQSxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLE9BQVgsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFFBQUQsR0FBWSxRQURaLENBRFc7SUFBQSxDQUhiOztBQUFBLDRCQU9BLGNBQUEsR0FBZ0IsU0FBQyxNQUFELEdBQUE7QUFDZCxNQUFBLElBQUMsQ0FBQSxhQUFELElBQWtCLE1BQU0sQ0FBQyxRQUFQLENBQUEsQ0FBbEIsQ0FBQTthQUNBLElBQUMsQ0FBQSxjQUFELENBQUEsRUFGYztJQUFBLENBUGhCLENBQUE7O0FBQUEsNEJBV0EsSUFBQSxHQUFNLFNBQUMsSUFBRCxHQUFBO2FBQ0osSUFBQyxDQUFBLGNBQUQsQ0FBQSxFQURJO0lBQUEsQ0FYTixDQUFBOztBQUFBLDRCQWNBLGFBQUEsR0FBZSxTQUFBLEdBQUE7YUFDYjtBQUFBLFFBQUEsT0FBQSxFQUFTLFdBQVQ7QUFBQSxRQUNBLElBQUEsRUFBTSxDQUFDLElBQUQsRUFBTyxJQUFDLENBQUEsbUJBQUQsQ0FBcUIsSUFBQyxDQUFBLE9BQXRCLENBQVAsQ0FETjtBQUFBLFFBRUEsT0FBQSxFQUNFO0FBQUEsVUFBQSxHQUFBLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FBTDtTQUhGO0FBQUEsUUFJQSxNQUFBLEVBQVEsSUFBQyxDQUFBLGNBSlQ7QUFBQSxRQUtBLE1BQUEsRUFBUSxJQUFDLENBQUEsY0FMVDtBQUFBLFFBTUEsSUFBQSxFQUFNLElBQUMsQ0FBQSxJQU5QO1FBRGE7SUFBQSxDQWRmLENBQUE7O0FBQUEsNEJBdUJBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO2FBQ2QsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFDLENBQUEsT0FBWCxFQUFvQixJQUFDLENBQUEsYUFBckIsRUFEYztJQUFBLENBdkJoQixDQUFBOztBQUFBLDRCQTBCQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixFQUFqQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFlLElBQUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsYUFBRCxDQUFBLENBQVgsQ0FEZixDQUFBO2FBRUEsSUFBQyxDQUFBLGNBQUQsQ0FBQSxFQUhVO0lBQUEsQ0ExQlosQ0FBQTs7QUFBQSw0QkErQkEsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNKLE1BQUEsSUFBRyxvQkFBSDtlQUNFLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBVCxDQUFBLEVBREY7T0FESTtJQUFBLENBL0JOLENBQUE7O0FBQUEsNEJBbUNBLG1CQUFBLEdBQXFCLFNBQUMsT0FBRCxHQUFBO0FBQ25CLFVBQUEsU0FBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixpQ0FBaEIsQ0FBWixDQUFBO0FBRUEsTUFBQSxJQUFHLG1CQUFBLElBQWUsQ0FBQSxLQUFNLENBQUMsYUFBTixDQUFvQixTQUFwQixDQUFuQjtlQUNFLElBQUMsQ0FBQSxZQUFELENBQWMsQ0FBQyxTQUFELEVBQVksT0FBWixDQUFkLEVBREY7T0FIbUI7SUFBQSxDQW5DckIsQ0FBQTs7QUFBQSw0QkF5Q0EsWUFBQSxHQUFjLFNBQUMsUUFBRCxHQUFBO2FBQ1osUUFBUSxDQUFDLElBQVQsQ0FBYyxNQUFkLEVBRFk7SUFBQSxDQXpDZCxDQUFBOzt5QkFBQTs7TUFKRixDQUFBOztBQUFBLEVBZ0RBLE1BQU0sQ0FBQyxPQUFQLEdBQ0U7QUFBQSxJQUFBLGFBQUEsRUFBZSxhQUFmO0dBakRGLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/run-command/lib/command-runner.coffee