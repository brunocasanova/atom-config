(function() {
  var $$, GitShow, RemoteListView, SelectListView, StatusView, TagView, git, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $$ = _ref.$$, SelectListView = _ref.SelectListView;

  git = require('../git');

  GitShow = require('../models/git-show');

  StatusView = require('./status-view');

  RemoteListView = require('../views/remote-list-view');

  module.exports = TagView = (function(_super) {
    __extends(TagView, _super);

    function TagView() {
      return TagView.__super__.constructor.apply(this, arguments);
    }

    TagView.prototype.initialize = function(tag) {
      this.tag = tag;
      TagView.__super__.initialize.apply(this, arguments);
      this.addClass('overlay from-top');
      return this.parseData();
    };

    TagView.prototype.parseData = function() {
      var items;
      items = [];
      items.push({
        tag: this.tag,
        cmd: 'Show',
        description: 'git show'
      });
      items.push({
        tag: this.tag,
        cmd: 'Push',
        description: 'git push [remote]'
      });
      items.push({
        tag: this.tag,
        cmd: 'Checkout',
        description: 'git checkout'
      });
      items.push({
        tag: this.tag,
        cmd: 'Verify',
        description: 'git tag --verify'
      });
      items.push({
        tag: this.tag,
        cmd: 'Delete',
        description: 'git tag --delete'
      });
      this.setItems(items);
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    TagView.prototype.viewForItem = function(_arg) {
      var cmd, description, tag;
      tag = _arg.tag, cmd = _arg.cmd, description = _arg.description;
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            _this.div({
              "class": 'text-highlight'
            }, cmd);
            return _this.div({
              "class": 'text-warning'
            }, "" + description + " " + tag);
          };
        })(this));
      });
    };

    TagView.prototype.getFilterKey = function() {
      return 'cmd';
    };

    TagView.prototype.confirmed = function(_arg) {
      var args, cmd, tag;
      tag = _arg.tag, cmd = _arg.cmd;
      this.cancel();
      switch (cmd) {
        case 'Show':
          GitShow(tag);
          return;
        case 'Push':
          git.cmd({
            args: ['remote'],
            stdout: (function(_this) {
              return function(data) {
                return new RemoteListView(data, 'push', false, _this.tag);
              };
            })(this)
          });
          return;
        case 'Checkout':
          args = ['checkout', tag];
          break;
        case 'Verify':
          args = ['tag', '--verify', tag];
          break;
        case 'Delete':
          args = ['tag', '--delete', tag];
      }
      return git.cmd({
        args: args,
        stdout: function(data) {
          return new StatusView({
            type: 'success',
            message: data.toString()
          });
        }
      });
    };

    return TagView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxPQUF1QixPQUFBLENBQVEsTUFBUixDQUF2QixFQUFDLFVBQUEsRUFBRCxFQUFLLHNCQUFBLGNBQUwsQ0FBQTs7QUFBQSxFQUVBLEdBQUEsR0FBTSxPQUFBLENBQVEsUUFBUixDQUZOLENBQUE7O0FBQUEsRUFHQSxPQUFBLEdBQVUsT0FBQSxDQUFRLG9CQUFSLENBSFYsQ0FBQTs7QUFBQSxFQUlBLFVBQUEsR0FBYSxPQUFBLENBQVEsZUFBUixDQUpiLENBQUE7O0FBQUEsRUFLQSxjQUFBLEdBQWlCLE9BQUEsQ0FBUSwyQkFBUixDQUxqQixDQUFBOztBQUFBLEVBT0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUVKLDhCQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxzQkFBQSxVQUFBLEdBQVksU0FBRSxHQUFGLEdBQUE7QUFDVixNQURXLElBQUMsQ0FBQSxNQUFBLEdBQ1osQ0FBQTtBQUFBLE1BQUEseUNBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQVYsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFNBQUQsQ0FBQSxFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLHNCQUtBLFNBQUEsR0FBVyxTQUFBLEdBQUE7QUFDVCxVQUFBLEtBQUE7QUFBQSxNQUFBLEtBQUEsR0FBUSxFQUFSLENBQUE7QUFBQSxNQUNBLEtBQUssQ0FBQyxJQUFOLENBQVc7QUFBQSxRQUFDLEdBQUEsRUFBSyxJQUFDLENBQUEsR0FBUDtBQUFBLFFBQVksR0FBQSxFQUFLLE1BQWpCO0FBQUEsUUFBeUIsV0FBQSxFQUFhLFVBQXRDO09BQVgsQ0FEQSxDQUFBO0FBQUEsTUFFQSxLQUFLLENBQUMsSUFBTixDQUFXO0FBQUEsUUFB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/tag-view.coffee