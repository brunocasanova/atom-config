
/* IMPORTS */

(function() {
  var $, DashboardView, Reporter, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View;

  Reporter = require("../reporter.coffee");


  /* EXPORTS */

  module.exports = DashboardView = (function(_super) {
    __extends(DashboardView, _super);


    /* ATTRIBUTES */

    DashboardView.prototype.reporter = null;


    /* CONTENT */

    DashboardView.content = function() {
      return this.div({
        id: "dashboard",
        "class": "wrapper"
      }, (function(_this) {
        return function() {
          return _this.div({
            outlet: "message",
            "class": "message"
          }, "");
        };
      })(this));
    };


    /* CONSTRUCTOR */

    function DashboardView() {
      this.reporter = new Reporter();
      DashboardView.__super__.constructor.apply(this, arguments);
    }


    /* INITIALIZE */

    DashboardView.prototype.initialize = function() {
      var currentProjects;
      currentProjects = this.reporter.getProjects();
      if (currentProjects.length === 0) {
        this.message.text("You are currently not tracking time for any projects! :(");
      } else {
        this.message.text("You are currently tracking time for " + currentProjects.length + " projects");
      }
      if (currentProjects.length > 0) {
        return this.recentProjects(currentProjects);
      }
    };


    /* BLOCKS */


    /* RECENT PROJECTS */

    DashboardView.prototype.recentProjects = function(currentProjects) {
      var currentProject, headerTitle, projectElement, projectLabel, projectPath, recentProjectsContainer, recentProjectsHeader, recentProjectsList, _i, _len;
      recentProjectsContainer = $("<div></div>", {
        "class": "recent-projects"
      });
      recentProjectsHeader = $("<div></div>", {
        "class": "header"
      });
      headerTitle = $("<h4>Recent Projects</h4>");
      recentProjectsHeader.append(headerTitle);
      recentProjectsContainer.append(recentProjectsHeader);
      recentProjectsList = $("<div></div>", {
        "class": "collection"
      });
      for (_i = 0, _len = currentProjects.length; _i < _len; _i++) {
        currentProject = currentProjects[_i];
        projectElement = $("<div></div>", {
          "class": "item project"
        });
        projectLabel = $("<h6></h6>", {
          "class": "title",
          text: currentProject.label
        });
        projectPath = $("<span></span>", {
          "class": "subtitle",
          text: currentProject.path
        });
        projectElement.append(projectLabel);
        projectElement.append(projectPath);
        recentProjectsList.append(projectElement);
      }
      recentProjectsContainer.append(recentProjectsList);
      return this.append(recentProjectsContainer);
    };

    return DashboardView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsc0NBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUVBLE9BQVksT0FBQSxDQUFRLE1BQVIsQ0FBWixFQUFDLFNBQUEsQ0FBRCxFQUFJLFlBQUEsSUFGSixDQUFBOztBQUFBLEVBS0EsUUFBQSxHQUFXLE9BQUEsQ0FBUSxvQkFBUixDQUxYLENBQUE7O0FBT0E7QUFBQSxlQVBBOztBQUFBLEVBUUEsTUFBTSxDQUFDLE9BQVAsR0FDVTtBQUNGLG9DQUFBLENBQUE7O0FBQUE7QUFBQSxvQkFBQTs7QUFBQSw0QkFDQSxRQUFBLEdBQVUsSUFEVixDQUFBOztBQUdBO0FBQUEsaUJBSEE7O0FBQUEsSUFJQSxhQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUVOLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLEVBQUEsRUFBSSxXQUFKO0FBQUEsUUFBaUIsT0FBQSxFQUFPLFNBQXhCO09BQUwsRUFBd0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFFcEMsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFlBQUEsTUFBQSxFQUFRLFNBQVI7QUFBQSxZQUFtQixPQUFBLEVBQU8sU0FBMUI7V0FBTCxFQUEwQyxFQUExQyxFQUZvQztRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXhDLEVBRk07SUFBQSxDQUpWLENBQUE7O0FBVUE7QUFBQSxxQkFWQTs7QUFXYSxJQUFBLHVCQUFBLEdBQUE7QUFFVCxNQUFBLElBQUMsQ0FBQSxRQUFELEdBQWdCLElBQUEsUUFBQSxDQUFBLENBQWhCLENBQUE7QUFBQSxNQUdBLGdEQUFBLFNBQUEsQ0FIQSxDQUZTO0lBQUEsQ0FYYjs7QUFrQkE7QUFBQSxvQkFsQkE7O0FBQUEsNEJB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
//# sourceURL=/Users/josemoreira/.atom/packages/timekeeper/lib/views/dashboard.coffee