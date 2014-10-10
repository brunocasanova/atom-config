(function() {
  var $$, ListView, SelectListView, StatusView, fs, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  fs = require('fs-plus');

  _ref = require('atom'), $$ = _ref.$$, SelectListView = _ref.SelectListView;

  git = require('../git');

  StatusView = require('./status-view');

  module.exports = ListView = (function(_super) {
    __extends(ListView, _super);

    function ListView() {
      return ListView.__super__.constructor.apply(this, arguments);
    }

    ListView.prototype.initialize = function(data) {
      this.data = data;
      ListView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return this.parseData();
    };

    ListView.prototype.parseData = function() {
      var branches, item, items, _i, _len;
      items = this.data.split("\n");
      branches = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        item = item.replace(/\s/g, '');
        if (item !== '') {
          branches.push({
            name: item
          });
        }
      }
      this.setItems(branches);
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    ListView.prototype.getFilterKey = function() {
      return 'name';
    };

    ListView.prototype.viewForItem = function(_arg) {
      var current, name;
      name = _arg.name;
      current = false;
      if (name.startsWith("*")) {
        name = name.slice(1);
        current = true;
      }
      return $$(function() {
        return this.li(name, (function(_this) {
          return function() {
            return _this.div({
              "class": 'pull-right'
            }, function() {
              if (current) {
                return _this.span('Current');
              }
            });
          };
        })(this));
      });
    };

    ListView.prototype.confirmed = function(_arg) {
      var name;
      name = _arg.name;
      this.checkout(name.match(/\*?(.*)/)[1]);
      return this.cancel();
    };

    ListView.prototype.checkout = function(branch) {
      return git.cmd({
        args: ['checkout', branch],
        stdout: function(data) {
          var _ref1;
          new StatusView({
            type: 'success',
            message: data.toString()
          });
          atom.workspace.eachEditor(function(editor) {
            return fs.exists(editor.getPath(), function(exist) {
              if (!exist) {
                return editor.destroy();
              }
            });
          });
          return (_ref1 = atom.project.getRepo()) != null ? _ref1.refreshStatus() : void 0;
        }
      });
    };

    return ListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVEQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLFNBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsT0FBdUIsT0FBQSxDQUFRLE1BQVIsQ0FBdkIsRUFBQyxVQUFBLEVBQUQsRUFBSyxzQkFBQSxjQURMLENBQUE7O0FBQUEsRUFHQSxHQUFBLEdBQU0sT0FBQSxDQUFRLFFBQVIsQ0FITixDQUFBOztBQUFBLEVBSUEsVUFBQSxHQUFhLE9BQUEsQ0FBUSxlQUFSLENBSmIsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiwrQkFBQSxDQUFBOzs7O0tBQUE7O0FBQUEsdUJBQUEsVUFBQSxHQUFZLFNBQUUsSUFBRixHQUFBO0FBQ1YsTUFEVyxJQUFDLENBQUEsT0FBQSxJQUNaLENBQUE7QUFBQSxNQUFBLDBDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsUUFBRCxDQUFVLGtCQUFWLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxTQUFELENBQUEsRUFIVTtJQUFBLENBQVosQ0FBQTs7QUFBQSx1QkFLQSxTQUFBLEdBQVcsU0FBQSxHQUFBO0FBQ1QsVUFBQSwrQkFBQTtBQUFBLE1BQUEsS0FBQSxHQUFRLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBTixDQUFZLElBQVosQ0FBUixDQUFBO0FBQUEsTUFDQSxRQUFBLEdBQVcsRUFEWCxDQUFBO0FBRUEsV0FBQSw0Q0FBQTt5QkFBQTtBQUNFLFFBQUEsSUFBQSxHQUFPLElBQUksQ0FBQyxPQUFMLENBQWEsS0FBYixFQUFvQixFQUFwQixDQUFQLENBQUE7QUFDQSxRQUFBLElBQU8sSUFBQSxLQUFRLEVBQWY7QUFDRSxVQUFBLFFBQVEsQ0FBQyxJQUFULENBQWM7QUFBQSxZ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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/branch-list-view.coffee