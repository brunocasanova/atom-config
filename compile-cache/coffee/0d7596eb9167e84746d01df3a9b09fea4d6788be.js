(function() {
  var GitBridge, MergeState;

  GitBridge = require('./git-bridge').GitBridge;

  module.exports = MergeState = (function() {
    function MergeState(conflicts, isRebase) {
      this.conflicts = conflicts;
      this.isRebase = isRebase;
    }

    MergeState.prototype.conflictPaths = function() {
      var c, _i, _len, _ref, _results;
      _ref = this.conflicts;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        c = _ref[_i];
        _results.push(c.path);
      }
      return _results;
    };

    MergeState.prototype.reread = function(callback) {
      return GitBridge.withConflicts((function(_this) {
        return function(err, conflicts) {
          _this.conflicts = conflicts;
          if (err != null) {
            return callback(err, null);
          } else {
            return callback(null, _this);
          }
        };
      })(this));
    };

    MergeState.prototype.isEmpty = function() {
      return this.conflicts.length === 0;
    };

    MergeState.read = function(callback) {
      var isr;
      isr = GitBridge.isRebasing();
      return GitBridge.withConflicts(function(err, cs) {
        if (err != null) {
          return callback(err, null);
        } else {
          return callback(null, new MergeState(cs, isr));
        }
      });
    };

    return MergeState;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFCQUFBOztBQUFBLEVBQUMsWUFBYSxPQUFBLENBQVEsY0FBUixFQUFiLFNBQUQsQ0FBQTs7QUFBQSxFQUVBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFFUyxJQUFBLG9CQUFFLFNBQUYsRUFBYyxRQUFkLEdBQUE7QUFBeUIsTUFBeEIsSUFBQyxDQUFBLFlBQUEsU0FBdUIsQ0FBQTtBQUFBLE1BQVosSUFBQyxDQUFBLFdBQUEsUUFBVyxDQUF6QjtJQUFBLENBQWI7O0FBQUEseUJBRUEsYUFBQSxHQUFlLFNBQUEsR0FBQTtBQUFHLFVBQUEsMkJBQUE7QUFBQTtBQUFBO1dBQUEsMkNBQUE7cUJBQUE7QUFBQSxzQkFBQSxDQUFDLENBQUMsS0FBRixDQUFBO0FBQUE7c0JBQUg7SUFBQSxDQUZmLENBQUE7O0FBQUEseUJBSUEsTUFBQSxHQUFRLFNBQUMsUUFBRCxHQUFBO2FBQ04sU0FBUyxDQUFDLGFBQVYsQ0FBd0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUMsR0FBRCxFQUFPLFNBQVAsR0FBQTtBQUN0QixVQUQ0QixLQUFDLENBQUEsWUFBQSxTQUM3QixDQUFBO0FBQUEsVUFBQSxJQUFHLFdBQUg7bUJBQ0UsUUFBQSxDQUFTLEdBQVQsRUFBYyxJQUFkLEVBREY7V0FBQSxNQUFBO21CQUdFLFFBQUEsQ0FBUyxJQUFULEVBQWUsS0FBZixFQUhGO1dBRHNCO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBeEIsRUFETTtJQUFBLENBSlIsQ0FBQTs7QUFBQSx5QkFXQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLFNBQVMsQ0FBQyxNQUFYLEtBQXFCLEVBQXhCO0lBQUEsQ0FYVCxDQUFBOztBQUFBLElBYUEsVUFBQyxDQUFBLElBQUQsR0FBTyxTQUFDLFFBQUQsR0FBQTtBQUNMLFVBQUEsR0FBQTtBQUFBLE1BQUEsR0FBQSxHQUFNLFNBQVMsQ0FBQyxVQUFWLENBQUEsQ0FBTixDQUFBO2FBQ0EsU0FBUyxDQUFDLGFBQVYsQ0FBd0IsU0FBQyxHQUFELEVBQU0sRUFBTixHQUFBO0FBQ3RCLFFBQUEsSUFBRyxXQUFIO2lCQUNFLFFBQUEsQ0FBUyxHQUFULEVBQWMsSUFBZCxFQURGO1NBQUEsTUFBQTtpQkFHRSxRQUFBLENBQVMsSUFBVCxFQUFtQixJQUFBLFVBQUEsQ0FBVyxFQUFYLEVBQWUsR0FBZixDQUFuQixFQUhGO1NBRHNCO01BQUEsQ0FBeEIsRUFGSztJQUFBLENBYlAsQ0FBQTs7c0JBQUE7O01BTEYsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/josemoreira/.atom/packages/merge-conflicts/lib/merge-state.coffee