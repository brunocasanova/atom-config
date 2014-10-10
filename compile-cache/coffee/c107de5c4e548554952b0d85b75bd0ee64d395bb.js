(function() {
  var BufferedProcess, GitBridge, GitNotFoundError, fs, path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  BufferedProcess = require('atom').BufferedProcess;

  fs = require('fs');

  path = require('path');

  GitNotFoundError = (function(_super) {
    __extends(GitNotFoundError, _super);

    function GitNotFoundError(message) {
      GitNotFoundError.__super__.constructor.call(this, message);
    }

    return GitNotFoundError;

  })(Error);

  GitBridge = (function() {
    GitBridge.process = function(args) {
      return new BufferedProcess(args);
    };

    function GitBridge() {}

    GitBridge._gitCommand = function() {
      return atom.config.get('merge-conflicts.gitPath');
    };

    GitBridge._repoWorkDir = function() {
      var _ref;
      return (_ref = atom.project.getRepo()) != null ? _ref.getWorkingDirectory() : void 0;
    };

    GitBridge._repoGitDir = function() {
      var _ref;
      return (_ref = atom.project.getRepo()) != null ? _ref.getPath() : void 0;
    };

    GitBridge._statusCodesFrom = function(chunk, handler) {
      var indexCode, line, m, p, workCode, __, _i, _len, _ref, _results;
      _ref = chunk.split("\n");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        line = _ref[_i];
        m = line.match(/^(.)(.) (.+)$/);
        if (m) {
          __ = m[0], indexCode = m[1], workCode = m[2], p = m[3];
          _results.push(handler(indexCode, workCode, p));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    GitBridge.withConflicts = function(handler) {
      var conflicts, errMessage, exitHandler, proc, stderrHandler, stdoutHandler;
      conflicts = [];
      errMessage = [];
      stdoutHandler = (function(_this) {
        return function(chunk) {
          return _this._statusCodesFrom(chunk, function(index, work, p) {
            if (index === 'U' && work === 'U') {
              conflicts.push({
                path: p,
                message: 'both modified'
              });
            }
            if (index === 'A' && work === 'A') {
              return conflicts.push({
                path: p,
                message: 'both added'
              });
            }
          });
        };
      })(this);
      stderrHandler = function(line) {
        return errMessage.push(line);
      };
      exitHandler = function(code) {
        if (code === 0) {
          return handler(null, conflicts);
        } else {
          return handler(new Error(("abnormal git exit: " + code + "\n") + errMessage.join("\n")), null);
        }
      };
      proc = this.process({
        command: this._gitCommand(),
        args: ['status', '--porcelain'],
        options: {
          cwd: this._repoWorkDir()
        },
        stdout: stdoutHandler,
        stderr: stderrHandler,
        exit: exitHandler
      });
      return proc.process.on('error', function(err) {
        return handler(new GitNotFoundError(errMessage.join("\n")), null);
      });
    };

    GitBridge.isStaged = function(filepath, handler) {
      var exitHandler, proc, staged, stderrHandler, stdoutHandler;
      staged = true;
      stdoutHandler = (function(_this) {
        return function(chunk) {
          return _this._statusCodesFrom(chunk, function(index, work, p) {
            if (p === filepath) {
              return staged = index === 'M' && work === ' ';
            }
          });
        };
      })(this);
      stderrHandler = function(chunk) {
        return console.log("git status error: " + chunk);
      };
      exitHandler = function(code) {
        if (code === 0) {
          return handler(null, staged);
        } else {
          return handler(new Error("git status exit: " + code), null);
        }
      };
      proc = this.process({
        command: this._gitCommand(),
        args: ['status', '--porcelain', filepath],
        options: {
          cwd: this._repoWorkDir()
        },
        stdout: stdoutHandler,
        stderr: stderrHandler,
        exit: exitHandler
      });
      return proc.process.on('error', function(err) {
        return handler(new GitNotFoundError, null);
      });
    };

    GitBridge.checkoutSide = function(sideName, filepath, callback) {
      var proc;
      proc = this.process({
        command: this._gitCommand(),
        args: ['checkout', "--" + sideName, filepath],
        options: {
          cwd: this._repoWorkDir()
        },
        stdout: function(line) {
          return console.log(line);
        },
        stderr: function(line) {
          return console.log(line);
        },
        exit: function(code) {
          if (code === 0) {
            return callback(null);
          } else {
            return callback(new Error("git checkout exit: " + code));
          }
        }
      });
      return proc.process.on('error', function(err) {
        return callback(new GitNotFoundError);
      });
    };

    GitBridge.add = function(filepath, callback) {
      return this.process({
        command: this._gitCommand(),
        args: ['add', filepath],
        options: {
          cwd: this._repoWorkDir()
        },
        stdout: function(line) {
          return console.log(line);
        },
        stderr: function(line) {
          return console.log(line);
        },
        exit: function(code) {
          if (code === 0) {
            return callback();
          } else {
            return callback(new Error("git add failed: exit code " + code));
          }
        }
      });
    };

    GitBridge.isRebasing = function() {
      var irebaseDir, irebaseStat, rebaseDir, rebaseStat, root;
      root = this._repoGitDir();
      if (root == null) {
        return false;
      }
      rebaseDir = path.join(root, 'rebase-apply');
      rebaseStat = fs.statSyncNoException(rebaseDir);
      if (rebaseStat && rebaseStat.isDirectory()) {
        return true;
      }
      irebaseDir = path.join(root, 'rebase-merge');
      irebaseStat = fs.statSyncNoException(irebaseDir);
      return irebaseStat && irebaseStat.isDirectory();
    };

    return GitBridge;

  })();

  module.exports = {
    GitBridge: GitBridge,
    GitNotFoundError: GitNotFoundError
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxrQkFBbUIsT0FBQSxDQUFRLE1BQVIsRUFBbkIsZUFBRCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsRUFJTTtBQUVKLHVDQUFBLENBQUE7O0FBQWEsSUFBQSwwQkFBQyxPQUFELEdBQUE7QUFDWCxNQUFBLGtEQUFNLE9BQU4sQ0FBQSxDQURXO0lBQUEsQ0FBYjs7NEJBQUE7O0tBRjZCLE1BSi9CLENBQUE7O0FBQUEsRUFTTTtBQUdKLElBQUEsU0FBQyxDQUFBLE9BQUQsR0FBVSxTQUFDLElBQUQsR0FBQTthQUFjLElBQUEsZUFBQSxDQUFnQixJQUFoQixFQUFkO0lBQUEsQ0FBVixDQUFBOztBQUVhLElBQUEsbUJBQUEsR0FBQSxDQUZiOztBQUFBLElBSUEsU0FBQyxDQUFBLFdBQUQsR0FBYyxTQUFBLEdBQUE7YUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0IseUJBQWhCLEVBQUg7SUFBQSxDQUpkLENBQUE7O0FBQUEsSUFNQSxTQUFDLENBQUEsWUFBRCxHQUFlLFNBQUEsR0FBQTtBQUFHLFVBQUEsSUFBQTsyREFBc0IsQ0FBRSxtQkFBeEIsQ0FBQSxXQUFIO0lBQUEsQ0FOZixDQUFBOztBQUFBLElBUUEsU0FBQyxDQUFBLFdBQUQsR0FBYyxTQUFBLEdBQUE7QUFBRyxVQUFBLElBQUE7MkRBQXNCLENBQUUsT0FBeEIsQ0FBQSxXQUFIO0lBQUEsQ0FSZCxDQUFBOztBQUFBLElBVUEsU0FBQyxDQUFBLGdCQUFELEdBQW1CLFNBQUMsS0FBRCxFQUFRLE9BQVIsR0FBQTtBQUNqQixV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
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/git-bridge.coffee