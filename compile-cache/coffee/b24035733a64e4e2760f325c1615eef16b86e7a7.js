(function() {
  var Linter, LinterJshint, findFile, linterPath, warn, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  linterPath = atom.packages.getLoadedPackage("linter").path;

  Linter = require("" + linterPath + "/lib/linter");

  _ref = require("" + linterPath + "/lib/utils"), findFile = _ref.findFile, warn = _ref.warn;

  LinterJshint = (function(_super) {
    __extends(LinterJshint, _super);

    LinterJshint.syntax = ['source.js', 'source.js.jquery', 'text.html.basic'];

    LinterJshint.prototype.cmd = ['jshint', '--verbose', '--extract=auto'];

    LinterJshint.prototype.linterName = 'jshint';

    LinterJshint.prototype.regex = '((?<fail>ERROR: .+)|' + '.+?: line (?<line>[0-9]+), col (?<col>[0-9]+), ' + '(?<message>.+) ' + '\\(((?<error>E)|(?<warning>W))(?<code>[0-9]+)\\)' + ')';

    LinterJshint.prototype.isNodeExecutable = true;

    function LinterJshint(editor) {
      this.formatShellCmd = __bind(this.formatShellCmd, this);
      var config;
      LinterJshint.__super__.constructor.call(this, editor);
      config = findFile(this.cwd, ['.jshintrc']);
      if (config) {
        this.cmd = this.cmd.concat(['-c', config]);
      }
      atom.config.observe('linter-jshint.jshintExecutablePath', this.formatShellCmd);
    }

    LinterJshint.prototype.formatShellCmd = function() {
      var jshintExecutablePath;
      jshintExecutablePath = atom.config.get('linter-jshint.jshintExecutablePath');
      return this.executablePath = "" + jshintExecutablePath;
    };

    LinterJshint.prototype.formatMessage = function(match) {
      var type;
      type = match.error ? "E" : match.warning ? "W" : (warn("Regex does not match lint output", match), "");
      return "" + match.message + " (" + type + match.code + ")";
    };

    LinterJshint.prototype.destroy = function() {
      return atom.config.unobserve('linter-jshint.jshintExecutablePath');
    };

    return LinterJshint;

  })(Linter);

  module.exports = LinterJshint;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNEQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsVUFBQSxHQUFhLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWQsQ0FBK0IsUUFBL0IsQ0FBd0MsQ0FBQyxJQUF0RCxDQUFBOztBQUFBLEVBQ0EsTUFBQSxHQUFTLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLGFBQXRCLENBRFQsQ0FBQTs7QUFBQSxFQUVBLE9BQW1CLE9BQUEsQ0FBUSxFQUFBLEdBQUUsVUFBRixHQUFjLFlBQXRCLENBQW5CLEVBQUMsZ0JBQUEsUUFBRCxFQUFXLFlBQUEsSUFGWCxDQUFBOztBQUFBLEVBSU07QUFHSixtQ0FBQSxDQUFBOztBQUFBLElBQUEsWUFBQyxDQUFBLE1BQUQsR0FBUyxDQUFDLFdBQUQsRUFBYyxrQkFBZCxFQUFrQyxpQkFBbEMsQ0FBVCxDQUFBOztBQUFBLDJCQUlBLEdBQUEsR0FBSyxDQUFDLFFBQUQsRUFBVyxXQUFYLEVBQXdCLGdCQUF4QixDQUpMLENBQUE7O0FBQUEsMkJBTUEsVUFBQSxHQUFZLFFBTlosQ0FBQTs7QUFBQSwyQkFTQSxLQUFBLEdBQ0Usc0JBQUEsR0FDQSxpREFEQSxHQUVBLGlCQUZBLEdBSUEsa0RBSkEsR0FLQSxHQWZGLENBQUE7O0FBQUEsMkJBaUJBLGdCQUFBLEdBQWtCLElBakJsQixDQUFBOztBQW1CYSxJQUFBLHNCQUFDLE1BQUQsR0FBQTtBQUNYLDZEQUFBLENBQUE7QUFBQSxVQUFBLE1BQUE7QUFBQSxNQUFBLDhDQUFNLE1BQU4sQ0FBQSxDQUFBO0FBQUEsTUFFQSxNQUFBLEdBQVMsUUFBQSxDQUFTLElBQUMsQ0FBQSxHQUFWLEVBQWUsQ0FBQyxXQUFELENBQWYsQ0FGVCxDQUFBO0FBR0EsTUFBQSxJQUFHLE1BQUg7QUFDRSxRQUFBLElBQUMsQ0FBQSxHQUFELEdBQU8sSUFBQyxDQUFBLEdBQUcsQ0FBQyxNQUFMLENBQVksQ0FBQyxJQUFELEVBQU8sTUFBUCxDQUFaLENBQVAsQ0FERjtPQUhBO0FBQUEsTUFNQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0Isb0NBQXBCLEVBQTBELElBQUMsQ0FBQSxjQUEzRCxDQU5BLENBRFc7SUFBQSxDQW5CYjs7QUFBQSwyQkE0QkEsY0FBQSxHQUFnQixTQUFBLEdBQUE7QUFDZCxVQUFBLG9CQUFBO0FBQUEsTUFBQSxvQkFBQSxHQUF1QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQVosQ0FBZ0Isb0NBQWhCLENBQXZCLENBQUE7YUFDQSxJQUFDLENBQUEsY0FBRCxHQUFrQixFQUFBLEdBQUUscUJBRk47SUFBQSxDQTVCaEIsQ0FBQTs7QUFBQSwyQkFnQ0EsYUFBQSxHQUFlLFNBQUMsS0FBRCxHQUFBO0FBQ2IsVUFBQSxJQUFBO0FBQUEsTUFBQSxJQUFBLEdBQVUsS0FBSyxDQUFDLEtBQVQsR0FDTCxHQURLLEdBRUMsS0FBSyxDQUFDLE9BQVQsR0FDSCxHQURHLEdBR0gsQ0FBQSxJQUFBLENBQUssa0NBQUwsRUFBeUMsS0FBekMsQ0FBQSxFQUNBLEVBREEsQ0FMRixDQUFBO2FBUUEsRUFBQSxHQUFFLEtBQUssQ0FBQyxPQUFSLEdBQWlCLElBQWpCLEdBQW9CLElBQXBCLEdBQTJCLEtBQUssQ0FBQyxJQUFqQyxHQUF1QyxJQVQxQjtJQUFBLENBaENmLENBQUE7O0FBQUEsMkJBMkNBLE9BQUEsR0FBUyxTQUFBLEdBQUE7YUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVosQ0FBc0Isb0NBQXRCLEVBRE87SUFBQSxDQTNDVCxDQUFBOzt3QkFBQTs7S0FIeUIsT0FKM0IsQ0FBQTs7QUFBQSxFQXFEQSxNQUFNLENBQUMsT0FBUCxHQUFpQixZQXJEakIsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/linter-jshint/lib/linter-jshint.coffee