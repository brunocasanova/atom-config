(function() {
  var GitCommit, Model, StatusView, fs, git, os, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs-plus');

  path = require('path');

  os = require('os');

  Model = require('theorist').Model;

  git = require('../git');

  StatusView = require('../views/status-view');

  module.exports = GitCommit = (function(_super) {
    __extends(GitCommit, _super);

    GitCommit.prototype.setCommentChar = function(char) {
      if (char === '') {
        char = '#';
      }
      return this.commentchar = char;
    };

    GitCommit.prototype.file = function() {
      if (this.submodule != null ? this.submodule : this.submodule = git.getSubmodule()) {
        return 'COMMIT_EDITMSG';
      } else {
        return '.git/COMMIT_EDITMSG';
      }
    };

    GitCommit.prototype.dir = function() {
      var _ref, _ref1;
      if (this.submodule != null ? this.submodule : this.submodule = git.getSubmodule()) {
        return this.submodule.getPath();
      } else {
        return (_ref = (_ref1 = atom.project.getRepo()) != null ? _ref1.getWorkingDirectory() : void 0) != null ? _ref : atom.project.getPath();
      }
    };

    GitCommit.prototype.filePath = function() {
      return path.join(this.dir(), this.file());
    };

    GitCommit.prototype.currentPane = atom.workspace.getActivePane();

    function GitCommit(amend) {
      this.amend = amend != null ? amend : '';
      GitCommit.__super__.constructor.apply(this, arguments);
      if (this.assignId() !== 1) {
        return;
      }
      this.isAmending = this.amend.length > 0;
      git.cmd({
        args: ['config', '--get', 'core.commentchar'],
        stdout: (function(_this) {
          return function(data) {
            return _this.setCommentChar(data.trim());
          };
        })(this),
        stderr: (function(_this) {
          return function() {
            return _this.setCommentChar('#');
          };
        })(this)
      });
      git.stagedFiles((function(_this) {
        return function(files) {
          if (_this.amend !== '' || files.length >= 1) {
            return git.cmd({
              args: ['status'],
              stdout: function(data) {
                return _this.prepFile(data);
              }
            });
          } else {
            _this.cleanup();
            return new StatusView({
              type: 'error',
              message: 'Nothing to commit.'
            });
          }
        };
      })(this));
    }

    GitCommit.prototype.prepFile = function(status) {
      status = status.replace(/\s*\(.*\)\n/g, '');
      status = status.trim().replace(/\n/g, "\n" + this.commentchar + " ");
      fs.writeFileSync(this.filePath(), "" + this.amend + "\n" + this.commentchar + " Please enter the commit message for your changes. Lines starting\n" + this.commentchar + " with '" + this.commentchar + "' will be ignored, and an empty message aborts the commit.\n" + this.commentchar + "\n" + this.commentchar + " " + status);
      return this.showFile();
    };

    GitCommit.prototype.showFile = function() {
      var split;
      split = atom.config.get('git-plus.openInPane') ? atom.config.get('git-plus.splitPane') : void 0;
      return atom.workspace.open(this.filePath(), {
        split: split,
        activatePane: true,
        searchAllPanes: true
      }).done((function(_this) {
        return function(_arg) {
          var buffer;
          buffer = _arg.buffer;
          _this.subscribe(buffer, 'saved', function() {
            return _this.commit();
          });
          return _this.subscribe(buffer, 'destroyed', function() {
            if (_this.isAmending) {
              return _this.undoAmend();
            } else {
              return _this.cleanup();
            }
          });
        };
      })(this));
    };

    GitCommit.prototype.commit = function() {
      var args;
      args = ['commit', '--cleanup=strip', "--file=" + (this.filePath())];
      return git.cmd({
        args: args,
        options: {
          cwd: this.dir()
        },
        stdout: (function(_this) {
          return function(data) {
            var _ref;
            new StatusView({
              type: 'success',
              message: data
            });
            _this.isAmending = false;
            _this.destroyActiveEditorView();
            if ((_ref = atom.project.getRepo()) != null) {
              _ref.refreshStatus();
            }
            _this.currentPane.activate();
            return git.refresh();
          };
        })(this),
        stderr: (function(_this) {
          return function(err) {
            return _this.destroyActiveEditorView();
          };
        })(this)
      });
    };

    GitCommit.prototype.destroyActiveEditorView = function() {
      if (atom.workspace.getActivePane().getItems().length > 1) {
        return atom.workspace.destroyActivePaneItem();
      } else {
        return atom.workspace.destroyActivePane();
      }
    };

    GitCommit.prototype.undoAmend = function(err) {
      if (err == null) {
        err = '';
      }
      return git.cmd({
        args: ['reset', 'ORIG_HEAD'],
        stdout: function() {
          return new StatusView({
            type: 'error',
            message: "" + (err + ': ') + "Commit amend aborted!"
          });
        },
        stderr: function() {
          return new StatusView({
            type: 'error',
            message: 'ERROR! Undoing the amend failed! Please fix your repository manually!'
          });
        },
        exit: (function(_this) {
          return function() {
            _this.isAmending = false;
            return _this.destroyActiveEditorView();
          };
        })(this)
      });
    };

    GitCommit.prototype.cleanup = function() {
      Model.resetNextInstanceId();
      this.destroy();
      this.currentPane.activate();
      try {
        return fs.unlinkSync(this.filePath());
      } catch (_error) {}
    };

    return GitCommit;

  })(Model);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtDQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQUZMLENBQUE7O0FBQUEsRUFHQyxRQUFTLE9BQUEsQ0FBUSxVQUFSLEVBQVQsS0FIRCxDQUFBOztBQUFBLEVBS0EsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBTE4sQ0FBQTs7QUFBQSxFQU1BLFVBQUEsR0FBYSxPQUFBLENBQVEsc0JBQVIsQ0FOYixDQUFBOztBQUFBLEVBUUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUdKLGdDQUFBLENBQUE7O0FBQUEsd0JBQUEsY0FBQSxHQUFnQixTQUFDLElBQUQsR0FBQTtBQUNkLE1BQUEsSUFBRyxJQUFBLEtBQVEsRUFBWDtBQUNFLFFBQUEsSUFBQSxHQUFPLEdBQVAsQ0FERjtPQUFBO2FBRUEsSUFBQyxDQUFBLFdBQUQsR0FBZSxLQUhEO0lBQUEsQ0FBaEIsQ0FBQTs7QUFBQSx3QkFTQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBRUosTUFBQSw2QkFBRyxJQUFDLENBQUEsWUFBRCxJQUFDLENBQUEsWUFBYSxHQUFHLENBQUMsWUFBSixDQUFBLENBQWpCO2VBQ0UsaUJBREY7T0FBQSxNQUFBO2VBR0Usc0JBSEY7T0FGSTtJQUFBLENBVE4sQ0FBQTs7QUFBQSx3QkFtQkEsR0FBQSxHQUFLLFNBQUEsR0FBQTtBQUVILFVBQUEsV0FBQTtBQUFBLE1BQUEsNkJBQUcsSUFBQyxDQUFBLFlBQUQsSUFBQyxDQUFBLFlBQWEsR0FBRyxDQUFDLFlBQUosQ0FBQSxDQUFqQjtlQUNFLElBQUMs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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-commit.coffee