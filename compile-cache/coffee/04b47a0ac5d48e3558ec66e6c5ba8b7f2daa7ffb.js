(function() {
  var path;

  path = require('path');

  module.exports = {
    configDefaults: {
      jshintExecutablePath: path.join(__dirname, '..', 'node_modules', 'jshint', 'bin')
    },
    activate: function() {
      return console.log('activate linter-jshint');
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLElBQUE7O0FBQUEsRUFBQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FBUCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDRTtBQUFBLElBQUEsY0FBQSxFQUNFO0FBQUEsTUFBQSxvQkFBQSxFQUFzQixJQUFJLENBQUMsSUFBTCxDQUFVLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsY0FBM0IsRUFBMkMsUUFBM0MsRUFBcUQsS0FBckQsQ0FBdEI7S0FERjtBQUFBLElBR0EsUUFBQSxFQUFVLFNBQUEsR0FBQTthQUNSLE9BQU8sQ0FBQyxHQUFSLENBQVksd0JBQVosRUFEUTtJQUFBLENBSFY7R0FIRixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/linter-jshint/lib/init.coffee