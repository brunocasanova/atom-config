(function() {
  var findFile, fs, path;

  path = require('path');

  fs = require('fs');

  findFile = function(startDir, name, parent, limit, aux_dirs) {
    var climb, dir, item, n, nameType, target, _i, _j, _len, _len1;
    if (parent == null) {
      parent = false;
    }
    if (limit == null) {
      limit = null;
    }
    if (aux_dirs == null) {
      aux_dirs = [];
    }
    climb = startDir.split(path.sep);
    for (_i = 0, _len = climb.length; _i < _len; _i++) {
      item = climb[_i];
      dir = climb.join(path.sep) + path.sep;
      nameType = {}.toString.call(name);
      if (nameType === '[object Array]') {
        for (_j = 0, _len1 = name.length; _j < _len1; _j++) {
          n = name[_j];
          target = path.join(dir, n);
          if (fs.existsSync(target)) {
            if (parent) {
              return dir;
            }
            return target;
          }
        }
      }
      if (nameType === '[object String]') {
        target = path.join(dir, name);
        if (fs.existsSync(target)) {
          if (parent) {
            return dir;
          }
          return target;
        }
      }
      climb.splice(-1, 1);
    }
  };

  module.exports = findFile;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBOztBQUFBLEVBQUEsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBQVAsQ0FBQTs7QUFBQSxFQUNBLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsRUFHQSxRQUFBLEdBQVcsU0FBQyxRQUFELEVBQVcsSUFBWCxFQUFpQixNQUFqQixFQUFpQyxLQUFqQyxFQUErQyxRQUEvQyxHQUFBO0FBWVQsUUFBQSwwREFBQTs7TUFaMEIsU0FBUztLQVluQzs7TUFaMEMsUUFBUTtLQVlsRDs7TUFad0QsV0FBVztLQVluRTtBQUFBLElBQUEsS0FBQSxHQUFRLFFBQVEsQ0FBQyxLQUFULENBQWUsSUFBSSxDQUFDLEdBQXBCLENBQVIsQ0FBQTtBQUNBLFNBQUEsNENBQUE7dUJBQUE7QUFDRSxNQUFBLEdBQUEsR0FBTSxLQUFLLENBQUMsSUFBTixDQUFXLElBQUksQ0FBQyxHQUFoQixDQUFBLEdBQXVCLElBQUksQ0FBQyxHQUFsQyxDQUFBO0FBQUEsTUFFQSxRQUFBLEdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFaLENBQWlCLElBQWpCLENBRlgsQ0FBQTtBQUdBLE1BQUEsSUFBRyxRQUFBLEtBQVksZ0JBQWY7QUFDRSxhQUFBLDZDQUFBO3VCQUFBO0FBQ0UsVUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLElBQUwsQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFULENBQUE7QUFFQSxVQUFBLElBQUcsRUFBRSxDQUFDLFVBQUgsQ0FBYyxNQUFkLENBQUg7QUFDRSxZQUFBLElBQUcsTUFBSDtBQUNFLHFCQUFPLEdBQVAsQ0FERjthQUFBO0FBRUEsbUJBQU8sTUFBUCxDQUhGO1dBSEY7QUFBQSxTQURGO09BSEE7QUFZQSxNQUFBLElBQUcsUUFBQSxLQUFZLGlCQUFmO0FBQ0UsUUFBQSxNQUFBLEdBQVMsSUFBSSxDQUFDLElBQUwsQ0FBVSxHQUFWLEVBQWUsSUFBZixDQUFULENBQUE7QUFFQSxRQUFBLElBQUcsRUFBRSxDQUFDLFVBQUgsQ0FBYyxNQUFkLENBQUg7QUFDRSxVQUFBLElBQUcsTUFBSDtBQUNFLG1CQUFPLEdBQVAsQ0FERjtXQUFBO0FBRUEsaUJBQU8sTUFBUCxDQUhGO1NBSEY7T0FaQTtBQUFBLE1Bb0JBLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBQSxDQUFiLEVBQWdCLENBQWhCLENBcEJBLENBREY7QUFBQSxLQWJTO0VBQUEsQ0FIWCxDQUFBOztBQUFBLEVBeUNBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFFBekNqQixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/linter/lib/util.coffee