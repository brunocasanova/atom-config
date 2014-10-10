(function() {
  var $, SublimeTreeView, TreeView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  $ = require('atom').$;

  TreeView = require(atom.packages.resolvePackagePath('tree-view') + '/lib/tree-view');

  module.exports = SublimeTreeView = (function(_super) {
    __extends(SublimeTreeView, _super);

    function SublimeTreeView() {
      return SublimeTreeView.__super__.constructor.apply(this, arguments);
    }

    SublimeTreeView.prototype.initialize = function(state) {
      SublimeTreeView.__super__.initialize.call(this, state);
      return this.on('dblclick', '.entry', function(e) {
        if (e.shiftKey || e.metaKey || e.altKey) {
          return;
        }
        atom.workspaceView.find('.tab-bar .tab.active').removeClass('temp');
        return false;
      });
    };

    SublimeTreeView.prototype.entryDblClicked = function(e) {
      this.selectedEntry = $(e.currentTarget).view();
      return this.openSelectedEntry(false, true);
    };

    return SublimeTreeView;

  })(TreeView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDRCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxJQUFLLE9BQUEsQ0FBUSxNQUFSLEVBQUwsQ0FBRCxDQUFBOztBQUFBLEVBRUEsUUFBQSxHQUFnQixPQUFBLENBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBZCxDQUFpQyxXQUFqQyxDQUFBLEdBQWdELGdCQUF4RCxDQUZoQixDQUFBOztBQUFBLEVBSUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHNDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSw4QkFBQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDVixNQUFBLGdEQUFNLEtBQU4sQ0FBQSxDQUFBO2FBRUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxVQUFKLEVBQWdCLFFBQWhCLEVBQTBCLFNBQUMsQ0FBRCxHQUFBO0FBQ3hCLFFBQUEsSUFBVSxDQUFDLENBQUMsUUFBRixJQUFjLENBQUMsQ0FBQyxPQUFoQixJQUEyQixDQUFDLENBQUMsTUFBdkM7QUFBQSxnQkFBQSxDQUFBO1NBQUE7QUFBQSxRQUNBLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBbkIsQ0FBd0Isc0JBQXhCLENBQStDLENBQUMsV0FBaEQsQ0FBNEQsTUFBNUQsQ0FEQSxDQUFBO2VBRUEsTUFId0I7TUFBQSxDQUExQixFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLDhCQVFBLGVBQUEsR0FBaUIsU0FBQyxDQUFELEdBQUE7QUFDZixNQUFBLElBQUMsQ0FBQSxhQUFELEdBQWlCLENBQUEsQ0FBRSxDQUFDLENBQUMsYUFBSixDQUFrQixDQUFDLElBQW5CLENBQUEsQ0FBakIsQ0FBQTthQUNBLElBQUMsQ0FBQSxpQkFBRCxDQUFtQixLQUFuQixFQUEwQixJQUExQixFQUZlO0lBQUEsQ0FSakIsQ0FBQTs7MkJBQUE7O0tBRDRCLFNBTDlCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/sublime-tabs/lib/sublime-tree-view.coffee