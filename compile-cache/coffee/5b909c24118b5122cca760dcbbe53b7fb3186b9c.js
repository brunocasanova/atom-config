(function() {
  var Indicator, Rectangle, Scroller, Wrapper,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Rectangle = (function() {
    function Rectangle(x, y, width, height) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
      this.width = width != null ? width : 0;
      this.height = height != null ? height : 0;
    }

    return Rectangle;

  })();

  Wrapper = (function(_super) {
    __extends(Wrapper, _super);

    function Wrapper() {
      return Wrapper.__super__.constructor.apply(this, arguments);
    }

    return Wrapper;

  })(Rectangle);

  Scroller = (function(_super) {
    __extends(Scroller, _super);

    function Scroller() {
      return Scroller.__super__.constructor.apply(this, arguments);
    }

    return Scroller;

  })(Rectangle);

  module.exports = Indicator = (function(_super) {
    __extends(Indicator, _super);

    function Indicator() {
      Indicator.__super__.constructor.apply(this, arguments);
      this.ratioX = 1;
      this.ratioY = 1;
      this.wrapper = new Wrapper();
      this.scroller = new Scroller();
    }

    Indicator.prototype.setWrapperSize = function(width, height) {
      this.wrapper.width = width;
      return this.wrapper.height = height;
    };

    Indicator.prototype.setScrollerSize = function(width, height) {
      this.scroller.width = width;
      this.scroller.height = height;
      this.scroller.maxScrollX = Math.max(0, this.scroller.width - this.wrapper.width);
      return this.scroller.maxScrollY = Math.max(0, this.scroller.height - this.wrapper.height);
    };

    Indicator.prototype.updateMaxPos = function() {
      this.maxPosX = Math.max(0, this.scroller.width - this.width);
      return this.maxPosY = Math.max(0, this.scroller.height - this.height);
    };

    Indicator.prototype.updateBoundary = function() {
      this.updateMaxPos();
      this.minBoundaryX = 0;
      this.maxBoundaryX = this.maxPosX;
      this.minBoundaryY = 0;
      return this.maxBoundaryY = this.maxPosY;
    };

    Indicator.prototype.setX = function(x) {
      this.x = x;
      this.updateRatioX();
      return this.updateScrollerPositionX();
    };

    Indicator.prototype.setY = function(y) {
      this.y = y;
      this.updateRatioY();
      return this.updateScrollerPositionY();
    };

    Indicator.prototype.updateRatioX = function() {
      if (this.maxPosX !== 0) {
        return this.ratioX = this.x / this.maxPosX;
      }
    };

    Indicator.prototype.updateRatioY = function() {
      if (this.maxPosY !== 0) {
        return this.ratioY = this.y / this.maxPosY;
      }
    };

    Indicator.prototype.updateRatio = function() {
      this.updateRatioX();
      return this.updateRatioY();
    };

    Indicator.prototype.updateScrollerPositionX = function() {
      return this.scroller.x = -this.ratioX * this.scroller.maxScrollX;
    };

    Indicator.prototype.updateScrollerPositionY = function() {
      return this.scroller.y = -this.ratioY * this.scroller.maxScrollY;
    };

    Indicator.prototype.updateScrollerPosition = function() {
      this.updateScrollerPositionX();
      return this.updateScrollerPositionY();
    };

    Indicator.prototype.updatePosition = function() {
      var x, y;
      x = Math.round(this.ratioX * this.scroller.maxScrollX);
      y = Math.round(this.ratioY * this.scroller.maxScrollY);
      x = this.calBoundaryX(x);
      return y = this.calBoundaryY(y);
    };

    Indicator.prototype.calBoundaryX = function(x) {
      x = Math.max(this.minBoundaryX, x);
      return x = Math.min(this.maxBoundaryX, x);
    };

    Indicator.prototype.calBoundaryY = function(y) {
      y = Math.max(this.minBoundaryY, y);
      return y = Math.min(this.maxBoundaryY, y);
    };

    Indicator.prototype.setCenterX = function(cx) {
      var x;
      x = cx - this.width / 2;
      return this.calBoundaryX(x);
    };

    Indicator.prototype.setCenterY = function(cy) {
      var y;
      y = cy - this.height / 2;
      return this.calBoundaryY(y);
    };

    Indicator.prototype.computeFromCenterX = function(cx) {
      return this.setCenterY(cx) - this.scroller.x;
    };

    Indicator.prototype.computeFromCenterY = function(cy) {
      return this.setCenterY(cy) - this.scroller.y;
    };

    return Indicator;

  })(Rectangle);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBa0JBO0FBQUEsTUFBQSx1Q0FBQTtJQUFBO21TQUFBOztBQUFBLEVBQU07QUFDUyxJQUFBLG1CQUFFLENBQUYsRUFBVSxDQUFWLEVBQWtCLEtBQWxCLEVBQThCLE1BQTlCLEdBQUE7QUFBMkMsTUFBMUMsSUFBQyxDQUFBLGdCQUFBLElBQUksQ0FBcUMsQ0FBQTtBQUFBLE1BQWxDLElBQUMsQ0FBQSxnQkFBQSxJQUFJLENBQTZCLENBQUE7QUFBQSxNQUExQixJQUFDLENBQUEsd0JBQUEsUUFBUSxDQUFpQixDQUFBO0FBQUEsTUFBZCxJQUFDLENBQUEsMEJBQUEsU0FBUyxDQUFJLENBQTNDO0lBQUEsQ0FBYjs7cUJBQUE7O01BREYsQ0FBQTs7QUFBQSxFQU1NO0FBQU4sOEJBQUEsQ0FBQTs7OztLQUFBOzttQkFBQTs7S0FBc0IsVUFOdEIsQ0FBQTs7QUFBQSxFQVdNO0FBQU4sK0JBQUEsQ0FBQTs7OztLQUFBOztvQkFBQTs7S0FBdUIsVUFYdkIsQ0FBQTs7QUFBQSxFQWdCQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBRUosZ0NBQUEsQ0FBQTs7QUFBYSxJQUFBLG1CQUFBLEdBQUE7QUFDWCxNQUFBLDRDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsTUFBRCxHQUFVLENBRlYsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQUhWLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxPQUFBLENBQUEsQ0FKZixDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsUUFBRCxHQUFnQixJQUFBLFFBQUEsQ0FBQSxDQUxoQixDQURXO0lBQUEsQ0FBYjs7QUFBQSx3QkFRQSxjQUFBLEdBQWdCLFNBQUMsS0FBRCxFQUFRLE1BQVIsR0FBQTtBQUNkLE1BQUEsSUFBQyxD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
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/minimap-indicator.coffee