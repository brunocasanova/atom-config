(function() {
  var $, CommandRunner, CommandRunnerView, EditorView, RunCommandView, Utils, View, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View, EditorView = _ref.EditorView;

  CommandRunner = require('./command-runner').CommandRunner;

  CommandRunnerView = require('./command-runner-view').CommandRunnerView;

  Utils = require('./utils');

  module.exports = RunCommandView = (function(_super) {
    __extends(RunCommandView, _super);

    function RunCommandView() {
      this.destroy = __bind(this.destroy, this);
      this.attach = __bind(this.attach, this);
      this.togglePanel = __bind(this.togglePanel, this);
      this.toggle = __bind(this.toggle, this);
      this.restoreFocusedElement = __bind(this.restoreFocusedElement, this);
      this.storeFocusedElement = __bind(this.storeFocusedElement, this);
      this.cancel = __bind(this.cancel, this);
      this.killLastCommand = __bind(this.killLastCommand, this);
      this.reRunCommand = __bind(this.reRunCommand, this);
      this.runCommand = __bind(this.runCommand, this);
      return RunCommandView.__super__.constructor.apply(this, arguments);
    }

    RunCommandView.content = function() {
      return this.div({
        "class": 'run-command padded overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.subview('commandEntryView', new EditorView({
            mini: true
          }));
        };
      })(this));
    };

    RunCommandView.prototype.initialize = function(commandRunnerView) {
      this.commandRunnerView = commandRunnerView;
      atom.workspaceView.command('run-command:run', this.toggle);
      atom.workspaceView.command('run-command:re-run-last-command', this.reRunCommand);
      atom.workspaceView.command('run-command:toggle-panel', this.togglePanel);
      atom.workspaceView.command('run-command:kill-last-command', this.killLastCommand);
      this.subscribe(atom.workspaceView, 'core:confirm', this.runCommand);
      this.subscribe(atom.workspaceView, 'core:cancel', this.cancel);
      this.commandEntryView.setPlaceholderText('rake spec');
      return this.commandEntryView.hiddenInput.on('focusout', (function(_this) {
        return function() {
          return _this.cancel();
        };
      })(this));
    };

    RunCommandView.prototype.serialize = function() {};

    RunCommandView.prototype.runCommand = function() {
      var command;
      command = this.commandEntryView.getEditor().getText();
      if (!Utils.stringIsBlank(command)) {
        this.commandRunnerView.runCommand(command);
      }
      return this.cancel();
    };

    RunCommandView.prototype.reRunCommand = function(e) {
      return this.commandRunnerView.reRunCommand(e);
    };

    RunCommandView.prototype.killLastCommand = function() {
      return this.commandRunnerView.killCommand();
    };

    RunCommandView.prototype.cancel = function() {
      if (this.hasParent()) {
        this.restoreFocusedElement();
        return this.detach();
      } else {
        return this.commandRunnerView.hidePanel();
      }
    };

    RunCommandView.prototype.storeFocusedElement = function() {
      return this.previouslyFocused = $(':focus');
    };

    RunCommandView.prototype.restoreFocusedElement = function() {
      if (this.previouslyFocused != null) {
        return this.previouslyFocused.focus();
      } else {
        return atom.workspaceView.focus();
      }
    };

    RunCommandView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.cancel();
      } else {
        return this.attach();
      }
    };

    RunCommandView.prototype.togglePanel = function() {
      return this.commandRunnerView.togglePanel();
    };

    RunCommandView.prototype.attach = function() {
      atom.workspaceView.append(this);
      this.storeFocusedElement();
      return this.commandEntryView.focus();
    };

    RunCommandView.prototype.destroy = function() {
      return this.cancel();
    };

    return RunCommandView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtGQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBd0IsT0FBQSxDQUFRLE1BQVIsQ0FBeEIsRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosRUFBVSxrQkFBQSxVQUFWLENBQUE7O0FBQUEsRUFDQyxnQkFBaUIsT0FBQSxDQUFRLGtCQUFSLEVBQWpCLGFBREQsQ0FBQTs7QUFBQSxFQUVDLG9CQUFxQixPQUFBLENBQVEsdUJBQVIsRUFBckIsaUJBRkQsQ0FBQTs7QUFBQSxFQUdBLEtBQUEsR0FBUSxPQUFBLENBQVEsU0FBUixDQUhSLENBQUE7O0FBQUEsRUFLQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0oscUNBQUEsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7S0FBQTs7QUFBQSxJQUFBLGNBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLHFDQUFQO09BQUwsRUFBbUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDakQsS0FBQyxDQUFBLE9BQUQsQ0FBUyxrQkFBVCxFQUFpQyxJQUFBLFVBQUEsQ0FBVztBQUFBLFlBQUEsSUFBQSxFQUFNLElBQU47V0FBWCxDQUFqQyxFQURpRDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQW5ELEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsNkJBSUEsVUFBQSxHQUFZLFNBQUMsaUJBQUQsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLGlCQUFyQixDQUFBO0FBQUEsTUFFQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGlCQUEzQixFQUE4QyxJQUFDLENBQUEsTUFBL0MsQ0FGQSxDQUFB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
//# sourceURL=/Users/josemoreira/.atom/packages/run-command/lib/run-command-view.coffee