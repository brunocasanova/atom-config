(function() {
  var $, GitTabStatus, fs,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $ = require("atom").$;

  fs = require("fs");

  GitTabStatus = (function() {
    function GitTabStatus() {
      this._updateTabStylesForPath = __bind(this._updateTabStylesForPath, this);
      this._updateTabs = __bind(this._updateTabs, this);
    }

    GitTabStatus.prototype.activate = function() {
      return this._setupWatchConditions();
    };

    GitTabStatus.prototype._setupWatchConditions = function() {
      var _ref, _ref1;
      if ((_ref = atom.project.getRepo()) != null) {
        _ref.onDidChangeStatus(this._updateTabs);
      }
      if ((_ref1 = atom.project.getRepo()) != null) {
        _ref1.onDidChangeStatuses(this._updateTabs);
      }
      atom.workspace.onDidOpen(this._updateTabs);
      return atom.workspace.observeTextEditors((function(_this) {
        return function(editor) {
          editor.getBuffer().onDidSave(_this._updateTabs);
          return editor.onDidChangePath(_this._updateTabs);
        };
      })(this));
    };

    GitTabStatus.prototype._updateTabs = function() {
      var editor, _i, _len, _ref, _results;
      _ref = this._getEditors();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        editor = _ref[_i];
        _results.push(this._updateTabStylesForPath(editor.getPath()));
      }
      return _results;
    };

    GitTabStatus.prototype._getEditors = function() {
      return atom.workspace.getTextEditors();
    };

    GitTabStatus.prototype._getRepo = function() {
      return atom.project.getRepo();
    };

    GitTabStatus.prototype._updateTabStylesForPath = function(path) {
      var isIgnored, isModified, isNew, repo, tab;
      if (this._pathExists(path)) {
        repo = this._getRepo();
        isModified = repo != null ? repo.isPathModified(path) : void 0;
        isNew = repo != null ? repo.isPathNew(path) : void 0;
        isIgnored = repo != null ? repo.isPathIgnored(path) : void 0;
        tab = this._findTabForPath(path);
        if (isModified) {
          return tab != null ? tab.addClass("status-modified") : void 0;
        } else if (isNew) {
          return tab != null ? tab.addClass("status-added") : void 0;
        } else if (isIgnored) {
          return tab != null ? tab.addClass("status-ignored") : void 0;
        } else {
          return tab != null ? tab.removeClass("status-added status-modified status-ignored") : void 0;
        }
      }
    };

    GitTabStatus.prototype._pathExists = function(path) {
      return fs.existsSync(path);
    };

    GitTabStatus.prototype._findTabForPath = function(path) {
      path = path.replace(/\\/g, '\\\\');
      return $(".tab [data-path='" + path + "']");
    };

    return GitTabStatus;

  })();

  module.exports = new GitTabStatus();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG1CQUFBO0lBQUEsa0ZBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBQ0EsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBREwsQ0FBQTs7QUFBQSxFQUdNOzs7O0tBQ0Y7O0FBQUEsMkJBQUEsUUFBQSxHQUFVLFNBQUEsR0FBQTthQUNOLElBQUMsQ0FBQSxxQkFBRCxDQUFBLEVBRE07SUFBQSxDQUFWLENBQUE7O0FBQUEsMkJBR0EscUJBQUEsR0FBdUIsU0FBQSxHQUFBO0FBQ25CLFVBQUEsV0FBQTs7WUFBc0IsQ0FBRSxpQkFBeEIsQ0FBMEMsSUFBQyxDQUFBLFdBQTNDO09BQUE7O2FBQ3NCLENBQUUsbUJBQXhCLENBQTRDLElBQUMsQ0FBQSxXQUE3QztPQURBO0FBQUEsTUFFQSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQWYsQ0FBeUIsSUFBQyxDQUFBLFdBQTFCLENBRkEsQ0FBQTthQUdBLElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWYsQ0FBa0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsTUFBRCxHQUFBO0FBQzlCLFVBQUEsTUFBTSxDQUFDLFNBQVAsQ0FBQSxDQUFrQixDQUFDLFNBQW5CLENBQTZCLEtBQUMsQ0FBQSxXQUE5QixDQUFBLENBQUE7aUJBQ0EsTUFBTSxDQUFDLGVBQVAsQ0FBdUIsS0FBQyxDQUFBLFdBQXhCLEVBRjhCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbEMsRUFKbUI7SUFBQSxDQUh2QixDQUFBOztBQUFBLDJCQVdBLFdBQUEsR0FBYSxTQUFBLEdBQUE7QUFDVCxVQUFBLGdDQUFBO0FBQUE7QUFBQTtXQUFBLDJDQUFBOzBCQUFBO0FBQUEsc0JBQUEsSUFBQyxDQUFBLHVCQUFELENBQXlCLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBekIsRUFBQSxDQUFBO0FBQUE7c0JBRFM7SUFBQSxDQVhiLENBQUE7O0FBQUEsMkJBY0EsV0FBQSxHQUFhLFNBQUEsR0FBQTthQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBZixDQUFBLEVBQUg7SUFBQSxDQWRiLENBQUE7O0FBQUEsMkJBZ0JBLFFBQUEsR0FBVSxTQUFBLEdBQUE7YUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQWIsQ0FBQSxFQUFIO0lBQUEsQ0FoQlYsQ0FBQTs7QUFBQSwyQkFrQkEsdUJBQUEsR0FBeUIsU0FBQyxJQUFELEdBQUE7QUFDckIsVUFBQSx1Q0FBQTtBQUFBLE1BQUEsSUFBRyxJQUFDLENBQUEsV0FBRCxDQUFhLElBQWIsQ0FBSDtBQUNJLFFBQUEsSUFBQSxHQUFPLElBQUMsQ0FBQSxRQUFELENBQUEsQ0FBUCxDQUFBO0FBQUEsUUFDQSxVQUFBLGtCQUFhLElBQUksQ0FBRSxjQUFOLENBQXFCLElBQXJCLFVBRGIsQ0FBQTtBQUFBLFFBRUEsS0FBQSxrQkFBUSxJQUFJLENBQUUsU0FBTixDQUFnQixJQUFoQixVQUZSLENBQUE7QUFBQSxRQUdBLFNBQUEsa0JBQVksSUFBSSxDQUFFLGFBQU4sQ0FBb0IsSUFBcEIsVUFIWixDQUFBO0FBQUEsUUFJQSxHQUFBLEdBQU0sSUFBQyxDQUFBLGVBQUQsQ0FBaUIsSUFBakIsQ0FKTixDQUFBO0FBS0EsUUFBQSxJQUFHLFVBQUg7K0JBQ0ksR0FBRyxDQUFFLFFBQUwsQ0FBYyxpQkFBZCxXQURKO1NBQUEsTUFFSyxJQUFHLEtBQUg7K0JBQ0QsR0FBRyxDQUFFLFFBQUwsQ0FBYyxjQUFkLFdBREM7U0FBQSxNQUVBLElBQUcsU0FBSDsrQkFDRCxHQUFHLENBQUUsUUFBTCxDQUFjLGdCQUFkLFdBREM7U0FBQSxNQUFBOytCQUdELEdBQUcsQ0FBRSxXQUFMLENBQWlCLDZDQUFqQixXQUhDO1NBVlQ7T0FEcUI7SUFBQSxDQWxCekIsQ0FBQTs7QUFBQSwyQkFrQ0EsV0FBQSxHQUFhLFNBQUMsSUFBRCxHQUFBO2FBQVUsRUFBRSxDQUFDLFVBQUgsQ0FBYyxJQUFkLEVBQVY7SUFBQSxDQWxDYixDQUFBOztBQUFBLDJCQW9DQSxlQUFBLEdBQWlCLFNBQUMsSUFBRCxHQUFBO0FBQ2IsTUFBQSxJQUFBLEdBQU8sSUFBSSxDQUFDLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLE1BQXBCLENBQVAsQ0FBQTthQUNBLENBQUEsQ0FBRyxtQkFBQSxHQUFrQixJQUFsQixHQUF3QixJQUEzQixFQUZhO0lBQUEsQ0FwQ2pCLENBQUE7O3dCQUFBOztNQUpKLENBQUE7O0FBQUEsRUE0Q0EsTUFBTSxDQUFDLE9BQVAsR0FBcUIsSUFBQSxZQUFBLENBQUEsQ0E1Q3JCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-tab-status/lib/git-tab-status.coffee