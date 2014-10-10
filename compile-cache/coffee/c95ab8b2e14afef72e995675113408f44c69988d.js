(function() {
  var MaybeLaterView, MessageView, NothingToMergeView, SuccessView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  MessageView = (function(_super) {
    __extends(MessageView, _super);

    function MessageView() {
      return MessageView.__super__.constructor.apply(this, arguments);
    }

    MessageView.content = function(state) {
      return this.div({
        "class": 'overlay from-top merge-conflicts-message'
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": 'panel',
            click: 'dismiss'
          }, function() {
            _this.div({
              "class": "panel-heading text-" + _this.headingClass
            }, _this.headingText);
            return _this.div({
              "class": 'panel-body'
            }, function() {
              _this.div({
                "class": 'block'
              }, function() {
                return _this.bodyMarkup(state);
              });
              return _this.div({
                "class": 'block text-subtle'
              }, 'click to dismiss');
            });
          });
        };
      })(this));
    };

    MessageView.prototype.dismiss = function() {
      return this.hide('fast', (function(_this) {
        return function() {
          return _this.remove();
        };
      })(this));
    };

    return MessageView;

  })(View);

  SuccessView = (function(_super) {
    __extends(SuccessView, _super);

    function SuccessView() {
      return SuccessView.__super__.constructor.apply(this, arguments);
    }

    SuccessView.headingText = 'Merge Complete';

    SuccessView.headingClass = 'success';

    SuccessView.bodyMarkup = function(state) {
      this.text("That's everything. ");
      if (state.isRebase) {
        this.code('git rebase --continue');
        return this.text(' at will to resume rebasing.');
      } else {
        this.code('git commit');
        return this.text(' at will to finish the merge.');
      }
    };

    return SuccessView;

  })(MessageView);

  NothingToMergeView = (function(_super) {
    __extends(NothingToMergeView, _super);

    function NothingToMergeView() {
      return NothingToMergeView.__super__.constructor.apply(this, arguments);
    }

    NothingToMergeView.headingText = 'Nothing to Merge';

    NothingToMergeView.headingClass = 'info';

    NothingToMergeView.bodyMarkup = function(state) {
      return this.text('No conflicts here!');
    };

    return NothingToMergeView;

  })(MessageView);

  MaybeLaterView = (function(_super) {
    __extends(MaybeLaterView, _super);

    function MaybeLaterView() {
      return MaybeLaterView.__super__.constructor.apply(this, arguments);
    }

    MaybeLaterView.headingText = 'Maybe Later';

    MaybeLaterView.headingClass = 'warning';

    MaybeLaterView.bodyMarkup = function(state) {
      this.text("Careful, you've still got conflict markers left! ");
      if (state.isRebase) {
        this.code('git rebase --abort');
      } else {
        this.code('git merge --abort');
      }
      return this.text(' if you just want to give up on this one.');
    };

    return MaybeLaterView;

  })(MessageView);

  module.exports = {
    SuccessView: SuccessView,
    MaybeLaterView: MaybeLaterView,
    NothingToMergeView: NothingToMergeView
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtFQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRU07QUFFSixrQ0FBQSxDQUFBOzs7O0tBQUE7O0FBQUEsSUFBQSxXQUFDLENBQUEsT0FBRCxHQUFVLFNBQUMsS0FBRCxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDBDQUFQO09BQUwsRUFBd0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDdEQsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLE9BQVA7QUFBQSxZQUFnQixLQUFBLEVBQU8sU0FBdkI7V0FBTCxFQUF1QyxTQUFBLEdBQUE7QUFDckMsWUFBQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQVEscUJBQUEsR0FBb0IsS0FBQyxDQUFBLFlBQTdCO2FBQUwsRUFBbUQsS0FBQyxDQUFBLFdBQXBELENBQUEsQ0FBQTttQkFDQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxPQUFBLEVBQU8sWUFBUDthQUFMLEVBQTBCLFNBQUEsR0FBQTtBQUN4QixjQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxnQkFBQSxPQUFBLEVBQU8sT0FBUDtlQUFMLEVBQXFCLFNBQUEsR0FBQTt1QkFDbkIsS0FBQyxDQUFBLFVBQUQsQ0FBWSxLQUFaLEVBRG1CO2NBQUEsQ0FBckIsQ0FBQSxDQUFBO3FCQUVBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxnQkFBQSxPQUFBLEVBQU8sbUJBQVA7ZUFBTCxFQUFpQyxrQkFBakMsRUFId0I7WUFBQSxDQUExQixFQUZxQztVQUFBLENBQXZDLEVBRHNE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
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/message-views.coffee