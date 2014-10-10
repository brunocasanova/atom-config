
/* IMPORTS */

(function() {
  var $, TimekeeperView, Timer, createTimekeeperView, url;

  url = require("url");

  $ = require("atom").$;

  Timer = require("./timer.coffee");

  TimekeeperView = null;


  /* VIEW HANDLING */

  createTimekeeperView = function(state) {

    /* REQUIRES */
    if (TimekeeperView == null) {
      TimekeeperView = require("./views/index.coffee");
    }
    return new TimekeeperView(state);
  };


  /* EXPORTS */

  module.exports = {

    /* CONFIGURATION */
    configDefaults: {
      autoEnableTimeTrackingOnLoad: false
    },

    /* ATTRIBUTES */
    timer: null,
    timekeeperView: null,

    /* DEACTIVATE */
    activate: function(state) {
      var timerError;
      try {
        this.timer = new Timer(state);
        return this.initialize(state);
      } catch (_error) {
        timerError = _error;
        throw timerError;
      }
    },

    /* INITIALIZE */
    initialize: function(state) {
      atom.workspaceView.command("timekeeper:start", (function(_this) {
        return function() {
          return _this.timer.start();
        };
      })(this));
      atom.workspaceView.command("timekeeper:pause", (function(_this) {
        return function() {
          return _this.timer.pause();
        };
      })(this));
      atom.workspaceView.command("timekeeper:finish", (function(_this) {
        return function() {
          return _this.timer.finish();
        };
      })(this));
      atom.workspaceView.command("timekeeper:reset", (function(_this) {
        return function() {
          return _this.timer.reset();
        };
      })(this));
      atom.workspaceView.command("timekeeper:abort", (function(_this) {
        return function() {
          return _this.timer.abort();
        };
      })(this));
      atom.workspaceView.command("timekeeper:dashboard", (function(_this) {
        return function() {
          return _this.dashboard();
        };
      })(this));
      if (atom.mode !== "spec") {
        $(window).on("ready", (function(_this) {
          return function() {
            _this.timer.renderStatusBarViews();
            return _this.timer.autostart();
          };
        })(this));
        $(window).on("blur", (function(_this) {
          return function() {
            return _this.timer.autopause();
          };
        })(this));
        $(window).on("focus", (function(_this) {
          return function() {
            return _this.timer.autopause();
          };
        })(this));
      }
      atom.themes.on("reloaded", (function(_this) {
        return function() {
          return _this.timekeeperView = null;
        };
      })(this));
      return atom.workspace.registerOpener((function(_this) {
        return function(uriToOpen) {
          var error, host, pathname, protocol, _ref;
          try {
            _ref = url.parse(uriToOpen), protocol = _ref.protocol, host = _ref.host, pathname = _ref.pathname;
          } catch (_error) {
            error = _error;
            return;
          }
          if (protocol !== 'timekeeper:') {
            return;
          }
          try {
            if (pathname) {
              pathname = decodeURI(pathname);
            }
          } catch (_error) {
            error = _error;
            return;
          }
          if (pathname !== "/dashboard") {
            return;
          }
          if (_this.timekeeperView === null) {
            _this.timekeeperView = createTimekeeperView({
              page: pathname
            });
          }
          return _this.timekeeperView;
        };
      })(this));
    },

    /* DEACTIVATE */
    deactivate: function() {
      this.timer = null;
      if (this.timekeeperView != null) {
        this.timekeeperView.detach();
        return this.timekeeperView = null;
      }
    },

    /* SERIALIZE */
    serialize: function() {
      if (this.timer.startTimestamp) {
        return {
          "timerObject": {
            "project": this.timer.currentProject,
            "start": this.timer.startTimestamp,
            "end": this.timer.endTimestamp,
            "duration": this.timer.clock,
            "pauses": this.timer.pauses,
            "autoPauses": this.timer.autoPauses
          }
        };
      } else {
        return {
          "timerObject": null
        };
      }
    },

    /* DASHBOARD */
    dashboard: function() {
      return atom.workspace.open("timekeeper://ui/dashboard", {
        split: 'right',
        searchAllPanes: true
      });
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsbURBQUE7O0FBQUEsRUFFQSxHQUFBLEdBQU0sT0FBQSxDQUFRLEtBQVIsQ0FGTixDQUFBOztBQUFBLEVBS0MsSUFBSyxPQUFBLENBQVEsTUFBUixFQUFMLENBTEQsQ0FBQTs7QUFBQSxFQVFBLEtBQUEsR0FBUSxPQUFBLENBQVEsZ0JBQVIsQ0FSUixDQUFBOztBQUFBLEVBU0EsY0FBQSxHQUFpQixJQVRqQixDQUFBOztBQVdBO0FBQUEscUJBWEE7O0FBQUEsRUFZQSxvQkFBQSxHQUF1QixTQUFFLEtBQUYsR0FBQTtBQUNuQjtBQUFBLGtCQUFBOztNQUNBLGlCQUFrQixPQUFBLENBQVEsc0JBQVI7S0FEbEI7QUFJQSxXQUFXLElBQUEsY0FBQSxDQUFnQixLQUFoQixDQUFYLENBTG1CO0VBQUEsQ0FadkIsQ0FBQTs7QUFtQkE7QUFBQSxlQW5CQTs7QUFBQSxFQW9CQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUE7QUFBQSx1QkFBQTtBQUFBLElBQ0EsY0FBQSxFQUVJO0FBQUEsTUFBQSw0QkFBQSxFQUE4QixLQUE5QjtLQUhKO0FBS0E7QUFBQSxvQkFMQTtBQUFBLElBTUEsS0FBQSxFQUFPLElBTlA7QUFBQSxJQU9BLGNBQUEsRUFBZ0IsSUFQaEI7QUFTQTtBQUFBLG9CQVRBO0FBQUEsSUFVQSxRQUFBLEVBQVUsU0FBRSxLQUFGLEdBQUE7QUFNTixVQUFBLFVBQUE7QUFBQTtBQUVJLFFBQUEsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLEtBQUEsQ0FBTyxLQUFQLENBQWIsQ0FBQTtlQUdBLElBQUMsQ0FBQSxVQUFELENBQWEsS0FBYixFQUxKO09BQUEsY0FBQTtBQVFJLFFBRkUsbUJBRUYsQ0FBQTtBQUFBLGNBQU0sVUFBTixDQVJKO09BTk07SUFB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
//# sourceURL=/Users/josemoreira/.atom/packages/timekeeper/lib/timekeeper.coffee