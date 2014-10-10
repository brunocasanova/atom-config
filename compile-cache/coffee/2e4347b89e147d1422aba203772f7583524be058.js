(function() {
  var $$, BufferedProcess, SelectListView, SelectStageHunkFile, SelectStageHunks, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $$ = _ref.$$, BufferedProcess = _ref.BufferedProcess, SelectListView = _ref.SelectListView;

  SelectStageHunks = require('./select-stage-hunks-view');

  git = require('../git');

  module.exports = SelectStageHunkFile = (function(_super) {
    __extends(SelectStageHunkFile, _super);

    function SelectStageHunkFile() {
      return SelectStageHunkFile.__super__.constructor.apply(this, arguments);
    }

    SelectStageHunkFile.prototype.initialize = function(items) {
      SelectStageHunkFile.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      this.setItems(items);
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    SelectStageHunkFile.prototype.getFilterKey = function() {
      return 'path';
    };

    SelectStageHunkFile.prototype.viewForItem = function(item) {
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'pull-right'
            }, function() {
              return _this.span({
                "class": 'inline-block highlight'
              }, item.mode);
            });
            return _this.span({
              "class": 'text-warning'
            }, item.path);
          };
        })(this));
      });
    };

    SelectStageHunkFile.prototype.confirmed = function(_arg) {
      var path;
      path = _arg.path;
      this.cancel();
      return git.diff(function(data) {
        return new SelectStageHunks(data);
      }, path);
    };

    return SelectStageHunkFile;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFGQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF3QyxPQUFBLENBQVEsTUFBUixDQUF4QyxFQUFDLFVBQUEsRUFBRCxFQUFLLHVCQUFBLGVBQUwsRUFBc0Isc0JBQUEsY0FBdEIsQ0FBQTs7QUFBQSxFQUNBLGdCQUFBLEdBQW1CLE9BQUEsQ0FBUSwyQkFBUixDQURuQixDQUFBOztBQUFBLEVBRUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBRk4sQ0FBQTs7QUFBQSxFQUlBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSiwwQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsa0NBQUEsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1YsTUFBQSxxREFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLFFBQUQsQ0FBVSxrQkFBVixDQURBLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxRQUFELENBQVUsS0FBVixDQUhBLENBQUE7QUFBQSxNQUlBLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBbkIsQ0FBMEIsSUFBMUIsQ0FKQSxDQUFBO2FBS0EsSUFBQyxDQUFBLGlCQUFELENBQUEsRUFOVTtJQUFBLENBQVosQ0FBQTs7QUFBQSxrQ0FRQSxZQUFBLEdBQWMsU0FBQSxHQUFBO2FBQUcsT0FBSDtJQUFBLENBUmQsQ0FBQTs7QUFBQSxrQ0FVQSxXQUFBLEdBQWEsU0FBQyxJQUFELEdBQUE7YUFDWCxFQUFBLENBQUcsU0FBQSxHQUFBO2VBQ0QsSUFBQyxDQUFBLEVBQUQsQ0FBSSxDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUEsR0FBQTtBQUNGLFlBQUEsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLFlBQVA7YUFBTCxFQUEwQixTQUFBLEdBQUE7cUJBQ3hCLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxnQkFBQSxPQUFBLEVBQU8sd0JBQVA7ZUFBTixFQUF1QyxJQUFJLENBQUMsSUFBNUMsRUFEd0I7WUFBQSxDQUExQixDQUFBLENBQUE7bUJBRUEsS0FBQyxDQUFBLElBQUQsQ0FBTTtBQUFBLGNBQUEsT0FBQSxFQUFPLGNBQVA7YUFBTixFQUE2QixJQUFJLENBQUMsSUFBbEMsRUFIRTtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQUosRUFEQztNQUFBLENBQUgsRUFEVztJQUFBLENBVmIsQ0FBQTs7QUFBQSxrQ0FpQkEsU0FBQSxHQUFXLFNBQUMsSUFBRCxHQUFBO0FBQ1QsVUFBQSxJQUFBO0FBQUEsTUFEVyxPQUFELEtBQUMsSUFDWCxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsTUFBRCxDQUFBLENBQUEsQ0FBQTthQUNBLEdBQUcsQ0FBQyxJQUFKLENBQ0UsU0FBQyxJQUFELEdBQUE7ZUFBYyxJQUFBLGdCQUFBLENBQWlCLElBQWpCLEVBQWQ7TUFBQSxDQURGLEVBRUUsSUFGRixFQUZTO0lBQUEsQ0FqQlgsQ0FBQTs7K0JBQUE7O0tBRmdDLGVBTGxDLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/select-stage-hunk-file-view.coffee