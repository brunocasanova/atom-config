(function() {
  var fs;

  fs = require('fs');

  module.exports = {
    config: {
      showPath: {
        type: 'boolean',
        "default": true
      },
      closeCurrent: {
        type: 'boolean',
        "default": false
      },
      environmentSpecificProjects: {
        type: 'boolean',
        "default": false
      },
      sortBy: {
        type: 'string',
        description: 'Default sorting is the order in which the projects are',
        "default": 'default',
        "enum": ['default', 'title', 'group']
      }
    },
    projectManagerView: null,
    projectManagerAddView: null,
    filepath: null,
    activate: function(state) {
      fs.exists(this.file(), (function(_this) {
        return function(exists) {
          if (!exists) {
            return fs.writeFile(_this.file(), '{}', function(error) {
              if (error) {
                return console.log("Error: Could not create " + (this.file()) + " - " + error);
              }
            });
          } else {
            _this.subscribeToProjectsFile();
            return _this.loadCurrentProject();
          }
        };
      })(this));
      atom.workspaceView.command('project-manager:save-project', (function(_this) {
        return function() {
          return _this.createProjectManagerAddView(state).toggle(_this);
        };
      })(this));
      atom.workspaceView.command('project-manager:toggle', (function(_this) {
        return function() {
          return _this.createProjectManagerView(state).toggle(_this);
        };
      })(this));
      atom.workspaceView.command('project-manager:edit-projects', (function(_this) {
        return function() {
          return atom.workspaceView.open(_this.file());
        };
      })(this));
      atom.workspaceView.command('project-manager:reload-project-settings', (function(_this) {
        return function() {
          return _this.loadCurrentProject();
        };
      })(this));
      return atom.config.observe('project-manager.environmentSpecificProjects', (function(_this) {
        return function(newValue, obj) {
          var previous;
          if (obj == null) {
            obj = {};
          }
          previous = obj.previous != null ? obj.previous : newValue;
          if (newValue !== previous) {
            _this.updateFile();
            return _this.subscribeToProjectsFile();
          }
        };
      })(this));
    },
    file: function(update) {
      var filedir, filename, hostname, os;
      if (update == null) {
        update = false;
      }
      if (update) {
        this.filepath = null;
      }
      if (this.filepath == null) {
        filename = 'projects.cson';
        filedir = atom.getConfigDirPath();
        if (atom.config.get('project-manager.environmentSpecificProjects')) {
          os = require('os');
          hostname = os.hostname().split('.').shift().toLowerCase();
          filename = "projects." + hostname + ".cson";
        }
        this.filepath = "" + filedir + "/" + filename;
      }
      return this.filepath;
    },
    updateFile: function() {
      return fs.exists(this.file(true), (function(_this) {
        return function(exists) {
          if (!exists) {
            return fs.writeFile(_this.file(), '{}', function(error) {
              if (error) {
                return console.log("Error: Could not create " + (this.file()) + " - " + error);
              }
            });
          }
        };
      })(this));
    },
    subscribeToProjectsFile: function() {
      if (this.fileWatcher != null) {
        this.fileWatcher.close();
      }
      return this.fileWatcher = fs.watch(this.file(), (function(_this) {
        return function(event, filename) {
          return _this.loadCurrentProject();
        };
      })(this));
    },
    loadCurrentProject: function() {
      var CSON, _;
      CSON = require('season');
      _ = require('underscore-plus');
      return CSON.readFile(this.file(), (function(_this) {
        return function(error, data) {
          var project;
          if (!error) {
            project = _this.getCurrentProject(data);
            if (project) {
              if ((project.template != null) && (data[project.template] != null)) {
                project = _.deepExtend(project, data[project.template]);
              }
              if (project.settings != null) {
                return _this.enableSettings(project.settings);
              }
            }
          }
        };
      })(this));
    },
    getCurrentProject: function(projects) {
      var path, project, title, _i, _len, _ref;
      for (title in projects) {
        project = projects[title];
        _ref = project.paths;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          if (path === atom.project.getPath()) {
            return project;
          }
        }
      }
      return false;
    },
    enableSettings: function(settings) {
      var projectSettings, setting, value, _;
      _ = require('underscore-plus');
      projectSettings = {};
      for (setting in settings) {
        value = settings[setting];
        _.setValueForKeyPath(projectSettings, setting, value);
        atom.config.settings = _.deepExtend(projectSettings, atom.config.settings);
      }
      return atom.config.emit('updated');
    },
    addProject: function(project) {
      var CSON, projects;
      CSON = require('season');
      projects = CSON.readFileSync(this.file()) || {};
      projects[project.title] = project;
      return CSON.writeFileSync(this.file(), projects);
    },
    openProject: function(_arg) {
      var devMode, options, paths, title;
      title = _arg.title, paths = _arg.paths, devMode = _arg.devMode;
      atom.open(options = {
        pathsToOpen: paths,
        devMode: devMode
      });
      if (atom.config.get('project-manager.closeCurrent')) {
        return setTimeout(function() {
          return atom.close();
        }, 200);
      }
    },
    createProjectManagerView: function(state) {
      var ProjectManagerView;
      if (this.projectManagerView == null) {
        ProjectManagerView = require('./project-manager-view');
        this.projectManagerView = new ProjectManagerView();
      }
      return this.projectManagerView;
    },
    createProjectManagerAddView: function(state) {
      var ProjectManagerAddView;
      if (this.projectManagerAddView == null) {
        ProjectManagerAddView = require('./project-manager-add-view');
        this.projectManagerAddView = new ProjectManagerAddView();
      }
      return this.projectManagerAddView;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLEVBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsTUFBQSxFQUNFO0FBQUEsTUFBQSxRQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsSUFEVDtPQURGO0FBQUEsTUFJQSxZQUFBLEVBQ0U7QUFBQSxRQUFBLElBQUEsRUFBTSxTQUFOO0FBQUEsUUFDQSxTQUFBLEVBQVMsS0FEVDtPQUxGO0FBQUEsTUFRQSwyQkFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sU0FBTjtBQUFBLFFBQ0EsU0FBQSxFQUFTLEtBRFQ7T0FURjtBQUFBLE1BWUEsTUFBQSxFQUNFO0FBQUEsUUFBQSxJQUFBLEVBQU0sUUFBTjtBQUFBLFFBQ0EsV0FBQSxFQUFhLHdEQURiO0FBQUEsUUFFQSxTQUFBLEVBQVMsU0FGVDtBQUFBLFFBR0EsTUFBQSxFQUFNLENBQ0osU0FESSxFQUVKLE9BRkksRUFHSixPQUhJLENBSE47T0FiRjtLQURGO0FBQUEsSUF1QkEsa0JBQUEsRUFBb0IsSUF2QnBCO0FBQUEsSUF3QkEscUJBQUEsRUFBdUIsSUF4QnZCO0FBQUEsSUEwQkEsUUFBQSxFQUFVLElBMUJWO0FBQUEsSUE0QkEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxFQUFFLENBQUMsTUFBSCxDQUFVLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FBVixFQUFtQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxNQUFELEdBQUE7QUFDakIsVUFBQSxJQUFBLENBQUEsTUFBQTttQkFDRSxFQUFFLENBQUMsU0FBSCxDQUFhLEtBQUMsQ0FBQSxJ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
//# sourceURL=/Users/josemoreira/.atom/packages/project-manager/lib/project-manager.coffee