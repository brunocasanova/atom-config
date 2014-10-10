(function() {
  var $, BufferedProcess, MinimapPluginGeneratorView, TextEditorView, View, fs, path, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require('path');

  _ = require('underscore-plus');

  _ref = require('atom'), $ = _ref.$, BufferedProcess = _ref.BufferedProcess, TextEditorView = _ref.TextEditorView, View = _ref.View;

  fs = require('fs-plus');

  module.exports = MinimapPluginGeneratorView = (function(_super) {
    __extends(MinimapPluginGeneratorView, _super);

    function MinimapPluginGeneratorView() {
      return MinimapPluginGeneratorView.__super__.constructor.apply(this, arguments);
    }

    MinimapPluginGeneratorView.prototype.previouslyFocusedElement = null;

    MinimapPluginGeneratorView.prototype.mode = null;

    MinimapPluginGeneratorView.content = function() {
      return this.div({
        "class": 'minimap-plugin-generator overlay from-top'
      }, (function(_this) {
        return function() {
          _this.subview('miniEditor', new TextEditorView({
            mini: true
          }));
          _this.div({
            "class": 'error',
            outlet: 'error'
          });
          return _this.div({
            "class": 'message',
            outlet: 'message'
          });
        };
      })(this));
    };

    MinimapPluginGeneratorView.prototype.initialize = function() {
      this.miniEditor.hiddenInput.on('focusout', (function(_this) {
        return function() {
          return _this.detach();
        };
      })(this));
      this.on('core:confirm', (function(_this) {
        return function() {
          return _this.confirm();
        };
      })(this));
      this.on('core:cancel', (function(_this) {
        return function() {
          return _this.detach();
        };
      })(this));
      return this.attach('plugin');
    };

    MinimapPluginGeneratorView.prototype.attach = function(mode) {
      this.mode = mode;
      this.previouslyFocusedElement = $(':focus');
      this.message.text("Enter " + mode + " path");
      atom.workspaceView.append(this);
      this.setPathText("my-minimap-plugin");
      return this.miniEditor.focus();
    };

    MinimapPluginGeneratorView.prototype.setPathText = function(placeholderName, rangeToSelect) {
      var editor, endOfDirectoryIndex, packagesDirectory, pathLength;
      editor = this.miniEditor.editor;
      if (rangeToSelect == null) {
        rangeToSelect = [0, placeholderName.length];
      }
      packagesDirectory = this.getPackagesDirectory();
      editor.setText(path.join(packagesDirectory, placeholderName));
      pathLength = editor.getText().length;
      endOfDirectoryIndex = pathLength - placeholderName.length;
      return editor.setSelectedBufferRange([[0, endOfDirectoryIndex + rangeToSelect[0]], [0, endOfDirectoryIndex + rangeToSelect[1]]]);
    };

    MinimapPluginGeneratorView.prototype.detach = function() {
      var _ref1;
      if (!this.hasParent()) {
        return;
      }
      if ((_ref1 = this.previouslyFocusedElement) != null) {
        _ref1.focus();
      }
      return MinimapPluginGeneratorView.__super__.detach.apply(this, arguments);
    };

    MinimapPluginGeneratorView.prototype.confirm = function() {
      if (this.validPackagePath()) {
        return this.createPackageFiles((function(_this) {
          return function() {
            var packagePath;
            packagePath = _this.getPackagePath();
            atom.open({
              pathsToOpen: [packagePath]
            });
            return _this.detach();
          };
        })(this));
      }
    };

    MinimapPluginGeneratorView.prototype.getPackagePath = function() {
      var packageName, packagePath;
      packagePath = this.miniEditor.getText();
      packageName = _.dasherize(path.basename(packagePath));
      return path.join(path.dirname(packagePath), packageName);
    };

    MinimapPluginGeneratorView.prototype.getPackagesDirectory = function() {
      return atom.config.get('core.projectHome') || process.env.ATOM_REPOS_HOME || path.join(fs.getHomeDirectory(), 'github');
    };

    MinimapPluginGeneratorView.prototype.validPackagePath = function() {
      if (fs.existsSync(this.getPackagePath())) {
        this.error.text("Path already exists at '" + (this.getPackagePath()) + "'");
        this.error.show();
        return false;
      } else {
        return true;
      }
    };

    MinimapPluginGeneratorView.prototype.initPackage = function(packagePath, callback) {
      var templatePath;
      templatePath = path.resolve(__dirname, path.join('..', 'templates', 'plugin'));
      return this.runCommand(atom.packages.getApmPath(), ['init', "-p", "" + packagePath, "--template", templatePath], callback);
    };

    MinimapPluginGeneratorView.prototype.linkPackage = function(packagePath, callback) {
      var args;
      args = ['link'];
      if (atom.config.get('package-generator.createInDevMode')) {
        args.push('--dev');
      }
      args.push(packagePath.toString());
      return this.runCommand(atom.packages.getApmPath(), args, callback);
    };

    MinimapPluginGeneratorView.prototype.installPackage = function(packagePath, callback) {
      var args;
      args = ['install'];
      return this.runCommand(atom.packages.getApmPath(), args, callback, {
        cwd: packagePath
      });
    };

    MinimapPluginGeneratorView.prototype.isStoredInDotAtom = function(packagePath) {
      var devPackagesPath, packagesPath;
      packagesPath = path.join(atom.getConfigDirPath(), 'packages', path.sep);
      if (packagePath.indexOf(packagesPath) === 0) {
        return true;
      }
      devPackagesPath = path.join(atom.getConfigDirPath(), 'dev', 'packages', path.sep);
      return packagePath.indexOf(devPackagesPath) === 0;
    };

    MinimapPluginGeneratorView.prototype.createPackageFiles = function(callback) {
      var packagePath, packagesDirectory;
      packagePath = this.getPackagePath();
      packagesDirectory = this.getPackagesDirectory();
      if (this.isStoredInDotAtom(packagePath)) {
        return this.initPackage(packagePath, (function(_this) {
          return function() {
            return _this.installPackage(packagePath, callback);
          };
        })(this));
      } else {
        return this.initPackage(packagePath, (function(_this) {
          return function() {
            return _this.linkPackage(packagePath, function() {
              return _this.installPackage(packagePath, callback);
            });
          };
        })(this));
      }
    };

    MinimapPluginGeneratorView.prototype.runCommand = function(command, args, exit, options) {
      if (options == null) {
        options = {};
      }
      return new BufferedProcess({
        command: command,
        args: args,
        exit: exit,
        options: options
      });
    };

    return MinimapPluginGeneratorView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxpQkFBUixDQURKLENBQUE7O0FBQUEsRUFFQSxPQUE2QyxPQUFBLENBQVEsTUFBUixDQUE3QyxFQUFDLFNBQUEsQ0FBRCxFQUFJLHVCQUFBLGVBQUosRUFBcUIsc0JBQUEsY0FBckIsRUFBcUMsWUFBQSxJQUZyQyxDQUFBOztBQUFBLEVBR0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxTQUFSLENBSEwsQ0FBQTs7QUFBQSxFQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixpREFBQSxDQUFBOzs7O0tBQUE7O0FBQUEseUNBQUEsd0JBQUEsR0FBMEIsSUFBMUIsQ0FBQTs7QUFBQSx5Q0FDQSxJQUFBLEdBQU0sSUFETixDQUFBOztBQUFBLElBR0EsMEJBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDJDQUFQO09BQUwsRUFBeUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN2RCxVQUFBLEtBQUMsQ0FBQSxPQUFELENBQVMsWUFBVCxFQUEyQixJQUFBLGNBQUEsQ0FBZTtBQUFBLFlBQUEsSUFBQSxFQUFNLElBQU47V0FBZixDQUEzQixDQUFBLENBQUE7QUFBQSxVQUNBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxPQUFQO0FBQUEsWUFBZ0IsTUFBQSxFQUFRLE9BQXhCO1dBQUwsQ0FEQSxDQUFBO2lCQUVBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE9BQUEsRUFBTyxTQUFQ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
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/minimap-plugin-generator-view.coffee