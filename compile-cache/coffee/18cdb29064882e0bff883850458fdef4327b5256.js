(function() {
  var $, $$, SelectListMultipleView, SelectListView, View, fuzzyFilter, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  fuzzyFilter = require('../models/fuzzy').filter;

  _ref = require('atom'), $ = _ref.$, $$ = _ref.$$, View = _ref.View, SelectListView = _ref.SelectListView;

  module.exports = SelectListMultipleView = (function(_super) {
    var selectedItems;

    __extends(SelectListMultipleView, _super);

    function SelectListMultipleView() {
      return SelectListMultipleView.__super__.constructor.apply(this, arguments);
    }

    selectedItems = [];

    SelectListMultipleView.prototype.initialize = function() {
      SelectListMultipleView.__super__.initialize.apply(this, arguments);
      selectedItems = [];
      this.list.addClass('mark-active');
      this.on('mousedown', (function(_this) {
        return function(_arg) {
          var target;
          target = _arg.target;
          if (target === _this.list[0] || $(target).hasClass('btn')) {
            return false;
          }
        };
      })(this));
      return this.addButtons();
    };

    SelectListMultipleView.prototype.addButtons = function() {
      var viewButton;
      viewButton = $$(function() {
        return this.div({
          "class": 'buttons'
        }, (function(_this) {
          return function() {
            _this.span({
              "class": 'pull-left'
            }, function() {
              return _this.button({
                "class": 'btn btn-error inline-block-tight btn-cancel-button'
              }, 'Cancel');
            });
            return _this.span({
              "class": 'pull-right'
            }, function() {
              return _this.button({
                "class": 'btn btn-success inline-block-tight btn-complete-button'
              }, 'Confirm');
            });
          };
        })(this));
      });
      viewButton.appendTo(this);
      return this.on('click', 'button', (function(_this) {
        return function(_arg) {
          var target;
          target = _arg.target;
          if ($(target).hasClass('btn-complete-button')) {
            _this.complete();
          }
          if ($(target).hasClass('btn-cancel-button')) {
            return _this.cancel();
          }
        };
      })(this));
    };

    SelectListMultipleView.prototype.confirmSelection = function() {
      var item, viewItem;
      item = this.getSelectedItem();
      viewItem = this.getSelectedItemView();
      if (viewItem != null) {
        return this.confirmed(item, viewItem);
      } else {
        return this.cancel();
      }
    };

    SelectListMultipleView.prototype.confirmed = function(item, viewItem) {
      if (__indexOf.call(selectedItems, item) >= 0) {
        selectedItems = selectedItems.filter(function(i) {
          return i !== item;
        });
        return viewItem.removeClass('active');
      } else {
        selectedItems.push(item);
        return viewItem.addClass('active');
      }
    };

    SelectListMultipleView.prototype.complete = function() {
      if (selectedItems.length > 0) {
        return this.completed(selectedItems);
      } else {
        return this.cancel();
      }
    };

    SelectListMultipleView.prototype.populateList = function() {
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
        filteredItems = fuzzyFilter(filterQuery, this.items, options);
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
          if (__indexOf.call(selectedItems, item) >= 0) {
            itemView.addClass('active');
          }
          this.list.append(itemView);
        }
        return this.selectItemView(this.list.find('li:first'));
      } else {
        return this.setError(this.getEmptyMessage(this.items.length, filteredItems.length));
      }
    };

    SelectListMultipleView.prototype.viewForItem = function(item, matchedStr) {
      throw new Error("Subclass must implement a viewForItem(item) method");
    };

    SelectListMultipleView.prototype.completed = function(items) {
      throw new Error("Subclass must implement a completed(items) method");
    };

    return SelectListMultipleView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHNFQUFBO0lBQUE7O3lKQUFBOztBQUFBLEVBQUEsV0FBQSxHQUFjLE9BQUEsQ0FBUSxpQkFBUixDQUEwQixDQUFDLE1BQXpDLENBQUE7O0FBQUEsRUFDQSxPQUFnQyxPQUFBLENBQVEsTUFBUixDQUFoQyxFQUFDLFNBQUEsQ0FBRCxFQUFJLFVBQUEsRUFBSixFQUFRLFlBQUEsSUFBUixFQUFjLHNCQUFBLGNBRGQsQ0FBQTs7QUFBQSxFQWtDQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosUUFBQSxhQUFBOztBQUFBLDZDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLGFBQUEsR0FBZ0IsRUFBaEIsQ0FBQTs7QUFBQSxxQ0FLQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSx3REFBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsYUFBQSxHQUFnQixFQURoQixDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQU4sQ0FBZSxhQUFmLENBRkEsQ0FBQTtBQUFBLE1BSUEsSUFBQyxDQUFBLEVBQUQsQ0FBSSxXQUFKLEVBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtBQUNmLGNBQUEsTUFBQTtBQUFBLFVBRGlCLFNBQUQsS0FBQyxNQUNqQixDQUFBO0FBQUEsVUFBQSxJQUFTLE1BQUEsS0FBVSxLQUFDLENBQUEsSUFBSyxDQUFBLENBQUEsQ0FBaEIsSUFBc0IsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFFBQVYsQ0FBbUIsS0FBbkIsQ0FBL0I7bUJBQUEsTUFBQTtXQURlO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakIsQ0FKQSxDQUFBO2FBT0EsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQVJVO0lBQUEs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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/views/select-list-multiple-view.coffee