(function() {
  var $, CommandRunner, CommandRunnerView, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  CommandRunner = require('./command-runner').CommandRunner;

  module.exports = CommandRunnerView = (function(_super) {
    __extends(CommandRunnerView, _super);

    function CommandRunnerView() {
      this.killCommand = __bind(this.killCommand, this);
      this.reRunCommand = __bind(this.reRunCommand, this);
      this.togglePanel = __bind(this.togglePanel, this);
      this.showPanel = __bind(this.showPanel, this);
      this.hidePanel = __bind(this.hidePanel, this);
      this.render = __bind(this.render, this);
      return CommandRunnerView.__super__.constructor.apply(this, arguments);
    }

    CommandRunnerView.content = function() {
      return this.div({
        "class": 'inset-panel panel-bottom run-command'
      }, (function(_this) {
        return function() {
          _this.div({
            "class": 'panel-heading'
          }, function() {
            _this.span('Command: ');
            return _this.span({
              outlet: 'header'
            });
          });
          return _this.div({
            "class": 'panel-body padded results',
            outlet: 'resultsContainer'
          }, function() {
            return _this.pre('', {
              outlet: 'results'
            });
          });
        };
      })(this));
    };

    CommandRunnerView.prototype.destroy = function() {
      delete this.commandRunner;
      return this.detach();
    };

    CommandRunnerView.prototype.render = function(command, results) {
      var atBottom;
      atBottom = this.resultsContainer[0].scrollHeight <= this.resultsContainer[0].scrollTop + this.resultsContainer.outerHeight();
      this.header.text(command);
      this.results.text(results);
      if (atBottom && atom.config.get('run-command.snapCommandResultsToBottom')) {
        return this.resultsContainer.scrollToBottom();
      }
    };

    CommandRunnerView.prototype.hidePanel = function() {
      if (this.hasParent()) {
        return this.detach();
      }
    };

    CommandRunnerView.prototype.showPanel = function() {
      if (!this.hasParent()) {
        return atom.workspaceView.prependToBottom(this);
      }
    };

    CommandRunnerView.prototype.togglePanel = function() {
      if (this.hasParent()) {
        return this.hidePanel();
      } else {
        return this.showPanel();
      }
    };

    CommandRunnerView.prototype.runCommand = function(command) {
      if (this.commandRunner != null) {
        this.commandRunner.kill();
        delete this.commandRunner;
      }
      this.commandRunner = new CommandRunner(command, this.render);
      this.commandRunner.runCommand();
      return this.showPanel();
    };

    CommandRunnerView.prototype.reRunCommand = function(e) {
      if (this.commandRunner != null) {
        this.commandRunner.kill();
        this.commandRunner.runCommand();
        return this.showPanel();
      } else {
        return e.abortKeyBinding();
      }
    };

    CommandRunnerView.prototype.killCommand = function(e) {
      if (this.commandRunner != null) {
        return this.commandRunner.kill();
      }
    };

    return CommandRunnerView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtDQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBWSxPQUFBLENBQVEsTUFBUixDQUFaLEVBQUMsU0FBQSxDQUFELEVBQUksWUFBQSxJQUFKLENBQUE7O0FBQUEsRUFDQyxnQkFBaUIsT0FBQSxDQUFRLGtCQUFSLEVBQWpCLGFBREQsQ0FBQTs7QUFBQSxFQUdBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSix3Q0FBQSxDQUFBOzs7Ozs7Ozs7O0tBQUE7O0FBQUEsSUFBQSxpQkFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFDUixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sc0NBQVA7T0FBTCxFQUFvRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ2xELFVBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLGVBQVA7V0FBTCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsWUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNLFdBQU4sQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxjQUFBLE1BQUEsRUFBUSxRQUFSO2FBQU4sRUFGMkI7VUFBQSxDQUE3QixDQUFBLENBQUE7aUJBR0EsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLDJCQUFQO0FBQUEsWUFBb0MsTUFBQSxFQUFRLGtCQUE1QztXQUFMLEVBQXFFLFNBQUEsR0FBQTttQkFDbkUsS0FBQyxDQUFBLEdBQUQsQ0FBSyxFQUFMLEVBQVM7QUFBQSxjQUFBLE1BQUEsRUFBUSxTQUFSO2FBQVQsRUFEbUU7VUFBQSxDQUFyRSxFQUprRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXBE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
//# sourceURL=/Users/josemoreira/.atom/packages/run-command/lib/command-runner-view.coffee