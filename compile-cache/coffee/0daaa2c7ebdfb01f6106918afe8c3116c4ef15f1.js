
/* IMPORTS */

(function() {
  var HeaderView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;


  /* EXPORTS */

  module.exports = HeaderView = (function(_super) {
    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }


    /* CONTENT */

    HeaderView.content = function() {
      return this.div({
        "class": "header"
      }, (function(_this) {
        return function() {
          return _this.h2("Timekeeper");
        };
      })(this));
    };

    return HeaderView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxhQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsZ0JBQUE7SUFBQTttU0FBQTs7QUFBQSxFQUVDLE9BQVEsT0FBQSxDQUFRLE1BQVIsRUFBUixJQUZELENBQUE7O0FBSUE7QUFBQSxlQUpBOztBQUFBLEVBS0EsTUFBTSxDQUFDLE9BQVAsR0FDVTtBQUNGLGlDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQTtBQUFBLGlCQUFBOztBQUFBLElBQ0EsVUFBQyxDQUFBLE9BQUQsR0FBVSxTQUFBLEdBQUE7YUFFTixJQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsUUFBQSxPQUFBLEVBQU8sUUFBUDtPQUFMLEVBQXNCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBRWxCLEtBQUMsQ0FBQSxFQUFELENBQUksWUFBSixFQUZrQjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRCLEVBRk07SUFBQSxDQURWLENBQUE7O3NCQUFBOztLQURxQixLQU43QixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/josemoreira/.atom/packages/timekeeper/lib/views/header.coffee