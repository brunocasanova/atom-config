
/* IMPORTS */

(function() {
  var $, DashboardView, HeaderView, ScrollView, TimekeeperView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, ScrollView = _ref.ScrollView;

  HeaderView = require("./header.coffee");

  DashboardView = require("./dashboard.coffee");


  /* EXPORTS */

  module.exports = TimekeeperView = (function(_super) {
    __extends(TimekeeperView, _super);


    /* ATTRIBUTES */

    TimekeeperView.prototype.page = null;

    TimekeeperView.prototype.controller = null;


    /* CONTENT */

    TimekeeperView.content = function() {
      return this.div({
        "class": "timekeeper pane-item",
        tabindex: -1
      }, (function(_this) {
        return function() {
          return _this.div({
            "class": "ui-page"
          }, function() {
            _this.subview({
              outlet: "header"
            }, new HeaderView());
            return _this.div({
              outlet: "content",
              "class": "content"
            });
          });
        };
      })(this));
    };


    /* CONSTRUCTOR */

    function TimekeeperView(_arg) {
      this.page = _arg.page;
      if (this.page != null) {
        this.controller = this.page.substring(1).split("/")[0];
      }
      TimekeeperView.__super__.constructor.apply(this, arguments);
    }


    /* INITIALIZE */

    TimekeeperView.prototype.initialize = function() {
      var viewToDisplay;
      if (this.controller != null) {
        switch (this.controller) {
          case "dashboard":
            viewToDisplay = new DashboardView();
            break;
          default:
            viewToDisplay = new DashboardView();
        }
        return this.content.append(viewToDisplay);
      }
    };


    /* INTERNAL METHODS */


    /* GET TITLE */

    TimekeeperView.prototype.getTitle = function() {
      return "Timekeeper";
    };


    /* GET ICON NAME */

    TimekeeperView.prototype.getIconName = function() {
      return "clock";
    };


    /* GET URI */

    TimekeeperView.prototype.getUri = function() {
      return this.uri;
    };

    return TimekeeperView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsOERBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUVBLE9BQWtCLE9BQUEsQ0FBUSxNQUFSLENBQWxCLEVBQUMsU0FBQSxDQUFELEVBQUksa0JBQUEsVUFGSixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxpQkFBUixDQUxiLENBQUE7O0FBQUEsRUFNQSxhQUFBLEdBQWdCLE9BQUEsQ0FBUSxvQkFBUixDQU5oQixDQUFBOztBQVFBO0FBQUEsZUFSQTs7QUFBQSxFQVNBLE1BQU0sQ0FBQyxPQUFQLEdBQ1U7QUFDRixxQ0FBQSxDQUFBOztBQUFBO0FBQUEsb0JBQUE7O0FBQUEsNkJBQ0EsSUFBQSxHQUFNLElBRE4sQ0FBQTs7QUFBQSw2QkFFQSxVQUFBLEdBQVksSUFGWixDQUFBOztBQUlBO0FBQUEsaUJBSkE7O0FBQUEsSUFLQSxjQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUVOLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxzQkFBUDtBQUFBLFFBQStCLFFBQUEsRUFBVSxDQUFBLENBQXpDO09BQUwsRUFBa0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFFOUMsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsT0FBQSxFQUFPLFNBQVA7V0FBTCxFQUF1QixTQUFBLEdBQUE7QUFFbkIsWUFBQSxLQUFDLENBQUEsT0FBRCxDQUFTO0FBQUEsY0FBQSxNQUFBLEVBQVEsUUFBUjthQUFULEVBQStCLElBQUEsVUFBQSxDQUFBLENBQS9CLENBQUEsQ0FBQTttQkFHQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsY0FBQSxNQUFBLEVBQVEsU0FBUjtBQUFBLGNBQW1CLE9BQUEsRUFBTyxTQUExQjthQUFMLEVBTG1CO1VBQUEsQ0FBdkIsRUFGOEM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFsRCxFQUZNO0lBQUEsQ0FMVixDQUFBOztBQWdCQTtBQUFBLHFCQWhCQTs7QUFpQmEsSUFBQSx3QkFBRSxJQUFGLEdBQUE7QUFFVCxNQUZhLElBQUMsQ0FBQSxPQUFILEtBQUcsSUFFZCxDQUFBO0FBQUEsTUFBQSxJQUFHLGlCQUFIO0FBRUksUUFBQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUMsQ0FBQSxJQUFJLENBQUMsU0FBTixDQUFpQixDQUFqQixDQUFvQixDQUFDLEtBQXJCLENBQTRCLEdBQTVCLENBQWtDLENBQUEsQ0FBQSxDQUFoRCxDQUZKO09BQUE7QUFBQSxNQUtBLGlEQUFBLFNBQUEsQ0FMQSxDQUZTO0lBQUEsQ0FqQmI7O0FBMEJBO0FBQUEsb0JBMUJBOztBQUFBLDZCQTJCQSxVQUFBLEdBQVksU0FBQSxHQUFBO0FBRVIsVUFBQSxhQUFBO0FBQUEsTUFBQSxJQUFHLHVCQUFIO0FBR0ksZ0JBQU8sSUFBQyxDQUFBLFVBQVI7QUFBQSxlQUVTLFdBRlQ7QUFJUSxZQUFBLGFBQUEsR0FBb0IsSUFBQSxhQUFBLENBQUEsQ0FBcEIsQ0FKUjtBQUVTO0FBRlQ7QUFPUSxZQUFBLGFBQUEsR0FBb0IsSUFBQSxhQUFBLENBQUEsQ0FBcEIsQ0FQUjtBQUFBLFNBQUE7ZUFVQSxJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBaUIsYUFBakIsRUFiSjtPQUZRO0lBQUEsQ0EzQlosQ0FBQTs7QUE0Q0E7QUFBQSwwQkE1Q0E7O0FBNkNBO0FBQUEsbUJBN0NBOztBQUFBLDZCQThDQSxRQUFBLEdBQVUsU0FBQSxHQUFBO0FBRU4sYUFBTyxZQUFQLENBRk07SUFBQSxDQTlDVixDQUFBOztBQW1EQTtBQUFBLHVCQW5EQTs7QUFBQSw2QkFvREEsV0FBQSxHQUFhLFNBQUEsR0FBQTtBQUVULGFBQU8sT0FBUCxDQUZTO0lBQUEsQ0FwRGIsQ0FBQTs7QUF3REE7QUFBQSxpQkF4REE7O0FBQUEsNkJBeURBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFFSixhQUFPLElBQUMsQ0FBQSxHQUFSLENBRkk7SUFBQSxDQXpEUixDQUFBOzswQkFBQTs7S0FEeUIsV0FWakMsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/timekeeper/lib/views/index.coffee