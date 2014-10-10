(function() {
  var $$, BufferedProcess, GitHistoryView, SelectListView, fs, path, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  path = require("path");

  fs = require("fs");

  _ref = require("atom"), SelectListView = _ref.SelectListView, BufferedProcess = _ref.BufferedProcess, $$ = _ref.$$;

  GitHistoryView = (function(_super) {
    __extends(GitHistoryView, _super);

    function GitHistoryView() {
      return GitHistoryView.__super__.constructor.apply(this, arguments);
    }

    GitHistoryView.prototype.initialize = function(file) {
      this.file = file;
      GitHistoryView.__super__.initialize.apply(this, arguments);
      if (file) {
        return this._setup();
      }
    };

    GitHistoryView.prototype._setup = function() {
      this.setLoading("Loading history for " + (path.basename(this.file)));
      this.addClass("overlay from-top");
      atom.workspaceView.append(this);
      this.focusFilterEditor();
      return this._loadLogData();
    };

    GitHistoryView.prototype._loadLogData = function() {
      var exit, logItems, stdout;
      logItems = [];
      stdout = function(output) {
        var item, _i, _len, _ref1, _results;
        output = output.replace("\n", "").trim();
        if ((output != null ? output.substring(output.length - 1) : void 0) === ",") {
          output = output.substring(0, output.length - 1);
        }
        _ref1 = JSON.parse("[" + output + "]");
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          item = _ref1[_i];
          _results.push(logItems.push(item));
        }
        return _results;
      };
      exit = (function(_this) {
        return function(code) {
          if (code === 0 && logItems.length !== 0) {
            return _this.setItems(logItems);
          } else {
            return _this.setError("No history found for " + (path.basename(_this.file)));
          }
        };
      })(this);
      return this._fetchFileHistory(stdout, exit);
    };

    GitHistoryView.prototype._fetchFileHistory = function(stdout, exit) {
      var format;
      format = "{\"hash\": \"%h\",\"author\": \"%an\",\"relativeDate\": \"%cr\",\"fullDate\": \"%ad\",\"message\": \"%s\"},";
      return new BufferedProcess({
        command: "git",
        args: ["-C", path.dirname(this.file), "log", "--max-count=" + (this._getMaxNumberOfCommits()), "--pretty=format:" + format, "--topo-order", "--date=short", this.file],
        stdout: stdout,
        exit: exit
      });
    };

    GitHistoryView.prototype._getMaxNumberOfCommits = function() {
      return atom.config.get("git-history.maxCommits");
    };

    GitHistoryView.prototype.getFilterKey = function() {
      return "message";
    };

    GitHistoryView.prototype.viewForItem = function(logItem) {
      var fileName;
      fileName = path.basename(this.file);
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": "text-highlight text-huge"
            }, logItem.message);
            _this.div("" + logItem.author + " - " + logItem.relativeDate + " (" + logItem.fullDate + ")");
            return _this.div({
              "class": "text-info"
            }, "" + logItem.hash + " - " + fileName);
          };
        })(this));
      });
    };

    GitHistoryView.prototype.confirmed = function(logItem) {
      var exit, fileContents, stdout;
      fileContents = "";
      stdout = (function(_this) {
        return function(output) {
          return fileContents += output;
        };
      })(this);
      exit = (function(_this) {
        return function(code) {
          var activateHistoryPane, outputDir, outputFilePath;
          activateHistoryPane = atom.config.get("git-history.cursorShouldBeInHistoryPane");
          if (code === 0) {
            outputDir = "" + (atom.getConfigDirPath()) + "/.git-history";
            if (!fs.existsSync(outputDir)) {
              fs.mkdir(outputDir);
            }
            outputFilePath = "" + outputDir + "/" + logItem.hash + "-" + (path.basename(_this.file));
            return fs.writeFile(outputFilePath, fileContents, function(error) {
              var options, originalPane;
              if (!error) {
                originalPane = atom.workspace.getActivePane();
                options = {
                  split: "right",
                  activatePane: activateHistoryPane
                };
                return atom.workspace.open(outputFilePath, options).done(function() {
                  if (!activateHistoryPane) {
                    return originalPane.activate();
                  }
                });
              }
            });
          } else {
            return _this.setError("Could not retrieve history for " + (path.basename(_this.file)));
          }
        };
      })(this);
      return this._loadRevision(logItem.hash, stdout, exit);
    };

    GitHistoryView.prototype._loadRevision = function(hash, stdout, exit) {
      return new BufferedProcess({
        command: "git",
        args: ["-C", path.dirname(this.file), "show", "" + hash + ":" + (atom.project.getRepo().relativize(this.file))],
        stdout: stdout,
        exit: exit
      });
    };

    return GitHistoryView;

  })(SelectListView);

  module.exports = GitHistoryView;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1FQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUVBLE9BQXdDLE9BQUEsQ0FBUSxNQUFSLENBQXhDLEVBQUMsc0JBQUEsY0FBRCxFQUFpQix1QkFBQSxlQUFqQixFQUFrQyxVQUFBLEVBRmxDLENBQUE7O0FBQUEsRUFJTTtBQUVGLHFDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSw2QkFBQSxVQUFBLEdBQVksU0FBRSxJQUFGLEdBQUE7QUFDUixNQURTLElBQUMsQ0FBQSxPQUFBLElBQ1YsQ0FBQTtBQUFBLE1BQUEsZ0RBQUEsU0FBQSxDQUFBLENBQUE7QUFDQSxNQUFBLElBQWEsSUFBYjtlQUFBLElBQUMsQ0FBQSxNQUFELENBQUEsRUFBQTtPQUZRO0lBQUEsQ0FBWixDQUFBOztBQUFBLDZCQUlBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixNQUFBLElBQUMsQ0FBQSxVQUFELENBQWEsc0JBQUEsR0FBcUIsQ0FBQSxJQUFJLENBQUMsUUFBTCxDQUFjLElBQUMsQ0FBQSxJQUFmLENBQUEsQ0FBbEMsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTtBQUFBLE1BRUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixDQUZBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxpQkFBRCxDQUFBLENBSEEsQ0FBQTthQUlBLElBQUMsQ0FBQSxZQUFELENBQUEsRUFMSTtJQUFBLENBSlIsQ0FBQTs7QUFBQSw2QkFXQSxZQUFBLEdBQWMsU0FBQSxHQUFBO0FBQ1YsVUFB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-history/lib/git-history-view.coffee