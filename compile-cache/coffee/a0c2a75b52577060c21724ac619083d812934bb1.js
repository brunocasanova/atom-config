(function() {
  var $, $$, GitPaletteView, GitPlusCommands, SelectListView, fuzzy, git, _, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ = require('underscore-plus');

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$, SelectListView = _ref.SelectListView;

  git = require('../git');

  GitPlusCommands = require('../git-plus-commands');

  fuzzy = require('../models/fuzzy').filter;

  module.exports = GitPaletteView = (function(_super) {
    __extends(GitPaletteView, _super);

    function GitPaletteView() {
      return GitPaletteView.__super__.constructor.apply(this, arguments);
    }

    GitPaletteView.prototype.initialize = function() {
      GitPaletteView.__super__.initialize.apply(this, arguments);
      this.addClass('git-palette overlay from-top');
      return this.toggle();
    };

    GitPaletteView.prototype.getFilterKey = function() {
      return 'description';
    };

    GitPaletteView.prototype.toggle = function() {
      if (this.hasParent()) {
        return this.cancel();
      } else {
        return this.attach();
      }
    };

    GitPaletteView.prototype.attach = function() {
      var command, commands, _i, _len, _ref1;
      this.storeFocusedElement();
      if (this.previouslyFocusedElement[0] && this.previouslyFocusedElement[0] !== document.body) {
        this.commandElement = this.previouslyFocusedElement;
      } else {
        this.commandElement = atom.workspaceView;
      }
      this.keyBindings = atom.keymap.findKeyBindings({
        target: this.commandElement[0]
      });
      commands = [];
      _ref1 = GitPlusCommands();
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        command = _ref1[_i];
        commands.push({
          name: command[0],
          description: command[1],
          func: command[2]
        });
      }
      commands = _.sortBy(commands, 'name');
      this.setItems(commands);
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    GitPaletteView.prototype.populateList = function() {
      var filterQuery, filteredItems, i, item, itemView, options, _i, _ref1, _ref2, _ref3;
      if (this.items == null) {
        return;
      }
      filterQuery = this.getFilterQuery();
      if (filterQuery.length) {
        options = {
          pre: '<span class="text-warning" style="font-weight:bold">',
          post: "</span>",
          extract: (function(_this) {
            return function(el) {
              if (_this.getFilterKey() != null) {
                return el[_this.getFilterKey()];
              } else {
                return el;
              }
            };
          })(this)
        };
        filteredItems = fuzzy(filterQuery, this.items, options);
      } else {
        filteredItems = this.items;
      }
      this.list.empty();
      if (filteredItems.length) {
        this.setError(null);
        for (i = _i = 0, _ref1 = Math.min(filteredItems.length, this.maxItems); 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          item = (_ref2 = filteredItems[i].original) != null ? _ref2 : filteredItems[i];
          itemView = $(this.viewForItem(item, (_ref3 = filteredItems[i].string) != null ? _ref3 : null));
          itemView.data('select-list-item', item);
          this.list.append(itemView);
        }
        return this.selectItemView(this.list.find('li:first'));
      } else {
        return this.setError(this.getEmptyMessage(this.items.length, filteredItems.length));
      }
    };

    GitPaletteView.prototype.viewForItem = function(_arg, matchedStr) {
      var description, name;
      name = _arg.name, description = _arg.description;
      return $$(function() {
        return this.li({
          "class": 'command',
          'data-command-name': name
        }, (function(_this) {
          return function() {
            if (matchedStr != null) {
              return _this.raw(matchedStr);
            } else {
              return _this.span(description);
            }
          };
        })(this));
      });
    };

    GitPaletteView.prototype.confirmed = function(_arg) {
      var func;
      func = _arg.func;
      this.cancel();
      return func();
    };

    return GitPaletteView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDJFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLGlCQUFSLENBQUosQ0FBQTs7QUFBQSxFQUNBLE9BQTBCLE9BQUEsQ0FBUSxNQUFSLENBQTFCLEVBQUMsU0FBQSxDQUFELEVBQUksVUFBQSxFQUFKLEVBQVEsc0JBQUEsY0FEUixDQUFBOztBQUFBLEVBRUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBRk4sQ0FBQTs7QUFBQSxFQUdBLGVBQUEsR0FBa0IsT0FBQSxDQUFRLHNCQUFSLENBSGxCLENBQUE7O0FBQUEsRUFJQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGlCQUFSLENBQTBCLENBQUMsTUFKbkMsQ0FBQTs7QUFBQSxFQU1BLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFSixxQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsNkJBQUEsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsZ0RBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELENBQVUsOEJBQVYsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUhVO0lBQUEsQ0FBWixDQUFBOztBQUFBLDZCQUtBLFlBQUEsR0FBYyxTQUFBLEdBQUE7YUFDWixjQURZO0lBQUEsQ0FMZCxDQUFBOztBQUFBLDZCQVFBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLElBQUcsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURGO09BQUEsTUFBQTtlQUdFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFIRjtPQURNO0lBQUEsQ0FSUixDQUFBOztBQUFBLDZCQWNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixVQUFB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/git-palette-view.coffee