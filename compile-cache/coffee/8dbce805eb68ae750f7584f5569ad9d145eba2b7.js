(function() {
  var CompositeDisposable, Disposable, MinimapGitDiff, MinimapGitDiffBinding, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  _ref = require('event-kit'), CompositeDisposable = _ref.CompositeDisposable, Disposable = _ref.Disposable;

  MinimapGitDiffBinding = require('./minimap-git-diff-binding');

  MinimapGitDiff = (function() {
    MinimapGitDiff.prototype.bindings = {};

    MinimapGitDiff.prototype.pluginActive = false;

    function MinimapGitDiff() {
      this.destroyBindings = __bind(this.destroyBindings, this);
      this.createBindings = __bind(this.createBindings, this);
      this.activateBinding = __bind(this.activateBinding, this);
      this.subscriptions = new CompositeDisposable;
    }

    MinimapGitDiff.prototype.isActive = function() {
      return this.pluginActive;
    };

    MinimapGitDiff.prototype.activate = function(state) {
      this.gitDiff = atom.packages.getLoadedPackage('git-diff');
      this.minimap = atom.packages.getLoadedPackage('minimap');
      if (!((this.gitDiff != null) && (this.minimap != null))) {
        return this.deactivate();
      }
      this.minimapModule = require(this.minimap.path);
      if (!this.minimapModule.versionMatch('3.x')) {
        return this.deactivate();
      }
      return this.minimapModule.registerPlugin('git-diff', this);
    };

    MinimapGitDiff.prototype.deactivate = function() {
      var binding, id, _ref1;
      _ref1 = this.bindings;
      for (id in _ref1) {
        binding = _ref1[id];
        binding.destroy();
      }
      this.bindings = {};
      this.gitDiff = null;
      this.minimap = null;
      return this.minimapModule = null;
    };

    MinimapGitDiff.prototype.activatePlugin = function() {
      if (this.pluginActive) {
        return;
      }
      this.activateBinding();
      this.pluginActive = true;
      this.subscriptions.add(this.minimapModule.onDidActivate(this.activateBinding));
      return this.subscriptions.add(this.minimapModule.onDidDeactivate(this.destroyBindings));
    };

    MinimapGitDiff.prototype.deactivatePlugin = function() {
      if (!this.pluginActive) {
        return;
      }
      this.pluginActive = false;
      this.subscriptions.dispose();
      return this.destroyBindings();
    };

    MinimapGitDiff.prototype.activateBinding = function() {
      if (atom.project.getRepo() != null) {
        this.createBindings();
      }
      return this.subscriptions.add(this.asDisposable(atom.project.on('path-changed', (function(_this) {
        return function() {
          if (atom.project.getRepo() != null) {
            return _this.createBindings();
          } else {
            return _this.destroyBindings();
          }
        };
      })(this))));
    };

    MinimapGitDiff.prototype.createBindings = function() {
      return this.minimapModule.eachMinimapView((function(_this) {
        return function(_arg) {
          var binding, editor, editorView, id, view;
          view = _arg.view;
          editorView = view.editorView;
          editor = view.editor;
          if (editor == null) {
            return;
          }
          id = editor.id;
          binding = new MinimapGitDiffBinding(editorView, _this.gitDiff, view);
          _this.bindings[id] = binding;
          return binding.activate();
        };
      })(this));
    };

    MinimapGitDiff.prototype.destroyBindings = function() {
      var binding, id, _ref1;
      _ref1 = this.bindings;
      for (id in _ref1) {
        binding = _ref1[id];
        binding.destroy();
      }
      return this.bindings = {};
    };

    MinimapGitDiff.prototype.asDisposable = function(subscription) {
      return new Disposable(function() {
        return subscription.off();
      });
    };

    return MinimapGitDiff;

  })();

  module.exports = new MinimapGitDiff;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRFQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQSxPQUFvQyxPQUFBLENBQVEsV0FBUixDQUFwQyxFQUFDLDJCQUFBLG1CQUFELEVBQXNCLGtCQUFBLFVBQXRCLENBQUE7O0FBQUEsRUFDQSxxQkFBQSxHQUF3QixPQUFBLENBQVEsNEJBQVIsQ0FEeEIsQ0FBQTs7QUFBQSxFQUdNO0FBRUosNkJBQUEsUUFBQSxHQUFVLEVBQVYsQ0FBQTs7QUFBQSw2QkFDQSxZQUFBLEdBQWMsS0FEZCxDQUFBOztBQUVhLElBQUEsd0JBQUEsR0FBQTtBQUNYLCtEQUFBLENBQUE7QUFBQSw2REFBQSxDQUFBO0FBQUEsK0RBQUEsQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLGFBQUQsR0FBaUIsR0FBQSxDQUFBLG1CQUFqQixDQURXO0lBQUEsQ0FGYjs7QUFBQSw2QkFLQSxRQUFBLEdBQVUsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLGFBQUo7SUFBQSxDQUxWLENBQUE7O0FBQUEsNkJBTUEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsVUFBL0IsQ0FBWCxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsU0FBL0IsQ0FEWCxDQUFBO0FBR0EsTUFBQSxJQUFBLENBQUEsQ0FBNEIsc0JBQUEsSUFBYyxzQkFBMUMsQ0FBQTtBQUFBLGVBQU8sSUFBQyxDQUFBLFVBQUQsQ0FBQSxDQUFQLENBQUE7T0FIQTtBQUFBLE1BS0EsSUFBQyxDQUFBLGFBQUQsR0FBaUIsT0FBQSxDQUFRLElBQUMsQ0FBQSxPQUFPLENBQUMsSUFBakIsQ0FM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
//# sourceURL=/Users/josemoreira/.atom/packages/minimap-git-diff/lib/minimap-git-diff.coffee