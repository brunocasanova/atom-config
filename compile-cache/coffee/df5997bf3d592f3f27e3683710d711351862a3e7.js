(function() {
  var BufferedProcess, Linter, Point, Range, XRegExp, fs, log, path, warn, _, _ref, _ref1;

  fs = require('fs');

  path = require('path');

  _ref = require('atom'), Range = _ref.Range, Point = _ref.Point, BufferedProcess = _ref.BufferedProcess;

  _ = require('lodash');

  XRegExp = require('xregexp').XRegExp;

  _ref1 = require('./utils'), log = _ref1.log, warn = _ref1.warn;

  Linter = (function() {
    Linter.syntax = '';

    Linter.prototype.cmd = '';

    Linter.prototype.regex = '';

    Linter.prototype.regexFlags = '';

    Linter.prototype.cwd = null;

    Linter.prototype.defaultLevel = 'error';

    Linter.prototype.linterName = null;

    Linter.prototype.executablePath = null;

    Linter.prototype.isNodeExecutable = false;

    Linter.prototype.errorStream = 'stdout';

    function Linter(editor) {
      this.editor = editor;
      this.cwd = path.dirname(this.editor.getUri());
    }

    Linter.prototype._cachedStatSync = _.memoize(function(path) {
      return fs.statSync(path);
    });

    Linter.prototype.getCmdAndArgs = function(filePath) {
      var cmd, cmd_list, stats;
      cmd = this.cmd;
      cmd_list = Array.isArray(cmd) ? cmd.slice() : cmd.split(' ');
      cmd_list.push(filePath);
      if (this.executablePath) {
        stats = this._cachedStatSync(this.executablePath);
        if (stats.isDirectory()) {
          cmd_list[0] = path.join(this.executablePath, cmd_list[0]);
        } else {
          cmd_list[0] = this.executablePath;
        }
      }
      if (this.isNodeExecutable) {
        cmd_list.unshift(this.getNodeExecutablePath());
      }
      cmd_list = cmd_list.map(function(cmd_item) {
        if (/@filename/i.test(cmd_item)) {
          return cmd_item.replace(/@filename/gi, filePath);
        } else {
          return cmd_item;
        }
      });
      log('command and arguments', cmd_list);
      return {
        command: cmd_list[0],
        args: cmd_list.slice(1)
      };
    };

    Linter.prototype.getNodeExecutablePath = function() {
      return path.join(atom.packages.apmPath, '..', 'node');
    };

    Linter.prototype.lintFile = function(filePath, callback) {
      var args, command, dataStderr, dataStdout, exit, options, process, stderr, stdout, timeout_s, _ref2;
      _ref2 = this.getCmdAndArgs(filePath), command = _ref2.command, args = _ref2.args;
      log('is node executable: ' + this.isNodeExecutable);
      options = {
        cwd: this.cwd
      };
      dataStdout = [];
      dataStderr = [];
      stdout = function(output) {
        log('stdout', output);
        return dataStdout += output;
      };
      stderr = function(output) {
        warn('stderr', output);
        return dataStderr += output;
      };
      exit = (function(_this) {
        return function() {
          var data;
          data = _this.errorStream === 'stdout' ? dataStdout : dataStderr;
          return _this.processMessage(data, callback);
        };
      })(this);
      process = new BufferedProcess({
        command: command,
        args: args,
        options: options,
        stdout: stdout,
        stderr: stderr,
        exit: exit
      });
      timeout_s = 5;
      return setTimeout(function() {
        process.kill();
        return warn("command `" + command + "` timed out after " + timeout_s + "s");
      }, timeout_s * 1000);
    };

    Linter.prototype.processMessage = function(message, callback) {
      var messages, regex;
      messages = [];
      regex = XRegExp(this.regex, this.regexFlags);
      XRegExp.forEach(message, regex, (function(_this) {
        return function(match, i) {
          var msg;
          msg = _this.createMessage(match);
          if (msg.range != null) {
            return messages.push(msg);
          }
        };
      })(this), this);
      return callback(messages);
    };

    Linter.prototype.createMessage = function(match) {
      var level;
      if (match.error) {
        level = 'error';
      } else if (match.warning) {
        level = 'warning';
      } else {
        level = this.defaultLevel;
      }
      return {
        line: match.line,
        col: match.col,
        level: level,
        message: this.formatMessage(match),
        linter: this.linterName,
        range: this.computeRange(match)
      };
    };

    Linter.prototype.formatMessage = function(match) {
      return match.message;
    };

    Linter.prototype.lineLengthForRow = function(row) {
      return this.editor.lineLengthForBufferRow(row);
    };

    Linter.prototype.getEditorScopesForPosition = function(position) {
      try {
        return _.clone(this.editor.displayBuffer.tokenizedBuffer.scopesForPosition(position));
      } catch (_error) {
        return [];
      }
    };

    Linter.prototype.getGetRangeForScopeAtPosition = function(innerMostScope, position) {
      return this.editor.displayBuffer.tokenizedBuffer.bufferRangeForScopeAtPosition(innerMostScope, position);
    };

    Linter.prototype.computeRange = function(match) {
      var colEnd, colStart, decrementParse, innerMostScope, position, range, rowEnd, rowStart, scopes, _ref2, _ref3, _ref4;
      if (match.line == null) {
        match.line = 0;
      }
      decrementParse = function(x) {
        return Math.max(0, parseInt(x) - 1);
      };
      rowStart = decrementParse((_ref2 = match.lineStart) != null ? _ref2 : match.line);
      rowEnd = decrementParse((_ref3 = (_ref4 = match.lineEnd) != null ? _ref4 : match.line) != null ? _ref3 : rowStart);
      if (rowEnd >= this.editor.getLineCount()) {
        log("ignoring " + match + " - it's longer than the buffer");
        return null;
      }
      if (match.col == null) {
        match.col = 0;
      }
      if (!match.colStart) {
        position = new Point(rowStart, match.col);
        scopes = this.getEditorScopesForPosition(position);
        while (innerMostScope = scopes.pop()) {
          range = this.getGetRangeForScopeAtPosition(innerMostScope, position);
          if (range != null) {
            return range;
          }
        }
      }
      if (match.colStart == null) {
        match.colStart = match.col;
      }
      colStart = decrementParse(match.colStart);
      colEnd = match.colEnd != null ? decrementParse(match.colEnd) : parseInt(this.lineLengthForRow(rowEnd));
      if (colStart === colEnd) {
        colStart = decrementParse(colStart);
      }
      return new Range([rowStart, colStart], [rowEnd, colEnd]);
    };

    return Linter;

  })();

  module.exports = Linter;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1GQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQSxPQUFrQyxPQUFBLENBQVEsTUFBUixDQUFsQyxFQUFDLGFBQUEsS0FBRCxFQUFRLGFBQUEsS0FBUixFQUFlLHVCQUFBLGVBRmYsQ0FBQTs7QUFBQSxFQUdBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQUhKLENBQUE7O0FBQUEsRUFJQyxVQUFXLE9BQUEsQ0FBUSxTQUFSLEVBQVgsT0FKRCxDQUFBOztBQUFBLEVBS0EsUUFBYyxPQUFBLENBQVEsU0FBUixDQUFkLEVBQUMsWUFBQSxHQUFELEVBQU0sYUFBQSxJQUxOLENBQUE7O0FBQUEsRUFTTTtBQUlKLElBQUEsTUFBQyxDQUFBLE1BQUQsR0FBUyxFQUFULENBQUE7O0FBQUEscUJBSUEsR0FBQSxHQUFLLEVBSkwsQ0FBQTs7QUFBQSxxQkFpQkEsS0FBQSxHQUFPLEVBakJQLENBQUE7O0FBQUEscUJBbUJBLFVBQUEsR0FBWSxFQW5CWixDQUFBOztBQUFBLHFCQXNCQSxHQUFBLEdBQUssSUF0QkwsQ0FBQTs7QUFBQSxxQkF3QkEsWUFBQSxHQUFjLE9BeEJkLENBQUE7O0FBQUEscUJBMEJBLFVBQUEsR0FBWSxJQTFCWixDQUFBOztBQUFBLHFCQTRCQSxjQUFBLEdBQWdCLElBNUJoQixDQUFBOztBQUFBLHFCQThCQSxnQkFBQSxHQUFrQixLQTlCbEIsQ0FBQTs7QUFBQSxxQkFpQ0EsV0FBQSxHQUFhLFFBakNiLENBQUE7O0FBb0NhLElBQUEsZ0JBQUUsTUFBRixHQUFBO0FBQ1gsTUFEWSxJQUFDLENBQUEsU0FBQSxNQUNiLENBQUE7QUFB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
//# sourceURL=/Users/josemoreira/.atom/packages/linter/lib/linter.coffee