(function() {
  var $, CompositeDisposable, Delegato, Disposable, MinimapIndicator, MinimapOpenQuickSettingsView, MinimapRenderView, MinimapView, TextEditorView, View, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), $ = _ref.$, View = _ref.View, TextEditorView = _ref.TextEditorView;

  Delegato = require('delegato');

  _ref1 = require('event-kit'), CompositeDisposable = _ref1.CompositeDisposable, Disposable = _ref1.Disposable;

  MinimapRenderView = require('./minimap-render-view');

  MinimapIndicator = require('./minimap-indicator');

  MinimapOpenQuickSettingsView = require('./minimap-open-quick-settings-view');

  module.exports = MinimapView = (function(_super) {
    __extends(MinimapView, _super);

    Delegato.includeInto(MinimapView);

    MinimapView.delegatesMethods('getLineHeight', 'getCharHeight', 'getCharWidth', 'getLinesCount', 'getMinimapHeight', 'getMinimapScreenHeight', 'getMinimapHeightInLines', 'getFirstVisibleScreenRow', 'getLastVisibleScreenRow', 'pixelPositionForScreenPosition', 'decorateMarker', 'removeDecoration', 'decorationsForScreenRowRange', 'removeAllDecorationsForMarker', {
      toProperty: 'renderView'
    });

    MinimapView.delegatesMethods('getSelection', 'getSelections', 'getLastSelection', 'bufferRangeForBufferRow', 'getTextInBufferRange', 'getEofBufferPosition', 'scanInBufferRange', 'markBufferRange', {
      toProperty: 'editor'
    });

    MinimapView.delegatesProperty('lineHeight', {
      toMethod: 'getLineHeight'
    });

    MinimapView.delegatesProperty('charWidth', {
      toMethod: 'getCharWidth'
    });

    MinimapView.content = function() {
      return this.div({
        "class": 'minimap'
      }, (function(_this) {
        return function() {
          if (atom.config.get('minimap.displayPluginsControls')) {
            _this.subview('openQuickSettings', new MinimapOpenQuickSettingsView);
          }
          _this.div({
            outlet: 'miniScroller',
            "class": "minimap-scroller"
          });
          return _this.div({
            outlet: 'miniWrapper',
            "class": "minimap-wrapper"
          }, function() {
            _this.div({
              outlet: 'miniUnderlayer',
              "class": "minimap-underlayer"
            });
            _this.subview('renderView', new MinimapRenderView);
            return _this.div({
              outlet: 'miniOverlayer',
              "class": "minimap-overlayer"
            }, function() {
              return _this.div({
                outlet: 'miniVisibleArea',
                "class": "minimap-visible-area"
              });
            });
          });
        };
      })(this));
    };

    MinimapView.prototype.isClicked = false;


    /* Public */

    function MinimapView(editorView) {
      this.editorView = editorView;
      this.onDrag = __bind(this.onDrag, this);
      this.onMove = __bind(this.onMove, this);
      this.onDragStart = __bind(this.onDragStart, this);
      this.onScrollViewResized = __bind(this.onScrollViewResized, this);
      this.onMouseDown = __bind(this.onMouseDown, this);
      this.onMouseWheel = __bind(this.onMouseWheel, this);
      this.onActiveItemChanged = __bind(this.onActiveItemChanged, this);
      this.updateScroll = __bind(this.updateScroll, this);
      this.updateScrollX = __bind(this.updateScrollX, this);
      this.updateScrollY = __bind(this.updateScrollY, this);
      this.updateMinimapSize = __bind(this.updateMinimapSize, this);
      this.updateMinimapRenderView = __bind(this.updateMinimapRenderView, this);
      this.updateMinimapView = __bind(this.updateMinimapView, this);
      this.editor = this.editorView.getEditor();
      this.paneView = this.editorView.getPaneView();
      this.paneView.addClass('with-minimap');
      this.subscriptions = new CompositeDisposable;
      MinimapView.__super__.constructor.apply(this, arguments);
      this.computeScale();
      this.miniScrollView = this.renderView.scrollView;
      this.offsetLeft = 0;
      this.offsetTop = 0;
      this.indicator = new MinimapIndicator();
      this.scrollView = this.editorView.scrollView;
      this.scrollViewLines = this.scrollView.find('.lines');
      this.subscribeToEditor();
      this.renderView.minimapView = this;
      this.renderView.setEditorView(this.editorView);
      this.updateMinimapView();
    }

    MinimapView.prototype.initialize = function() {
      var config;
      this.on('mousewheel', this.onMouseWheel);
      this.on('mousedown', this.onMouseDown);
      this.miniVisibleArea.on('mousedown', this.onDragStart);
      this.obsPane = this.paneView.model.observeActiveItem(this.onActiveItemChanged);
      this.subscriptions.add(this.paneView.model.onDidRemoveItem(function(item) {
        return typeof item.off === "function" ? item.off('.minimap') : void 0;
      }));
      this.subscribe(this.renderView, 'minimap:updated', this.updateMinimapSize);
      this.subscribe(this.renderView, 'minimap:scaleChanged', (function(_this) {
        return function() {
          _this.computeScale();
          return _this.updatePositions();
        };
      })(this));
      this.observer = new MutationObserver((function(_this) {
        return function(mutations) {
          return _this.updateTopPosition();
        };
      })(this));
      config = {
        childList: true
      };
      this.observer.observe(this.paneView.element, config);
      this.subscriptions.add(atom.themes.onDidReloadAll((function(_this) {
        return function() {
          _this.updateTopPosition();
          return _this.updateMinimapView();
        };
      })(this)));
      this.subscribe($(window), 'resize:end', this.onScrollViewResized);
      this.miniScrollVisible = atom.config.get('minimap.minimapScrollIndicator');
      this.miniScroller.toggleClass('visible', this.miniScrollVisible);
      this.displayCodeHighlights = atom.config.get('minimap.displayCodeHighlights');
      this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.minimapScrollIndicator', (function(_this) {
        return function() {
          _this.miniScrollVisible = atom.config.get('minimap.minimapScrollIndicator');
          return _this.miniScroller.toggleClass('visible', _this.miniScrollVisible);
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.useHardwareAcceleration', (function(_this) {
        return function() {
          if (_this.ScrollView != null) {
            return _this.updateScroll();
          }
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.displayCodeHighlights', (function(_this) {
        return function() {
          var newOptionValue;
          newOptionValue = atom.config.get('minimap.displayCodeHighlights');
          return _this.setDisplayCodeHighlights(newOptionValue);
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.adjustMinimapWidthToSoftWrap', (function(_this) {
        return function(value) {
          if (value) {
            return _this.updateMinimapSize();
          } else {
            return _this.resetMinimapWidthWithWrap();
          }
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('editor.lineHeight', (function(_this) {
        return function() {
          _this.computeScale();
          return _this.updateMinimapView();
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('editor.fontSize', (function(_this) {
        return function() {
          _this.computeScale();
          return _this.updateMinimapView();
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('editor.softWrap', (function(_this) {
        return function() {
          _this.updateMinimapSize();
          return _this.updateMinimapView();
        };
      })(this))));
      return this.subscriptions.add(this.asDisposable(atom.config.observe('editor.preferredLineLength', (function(_this) {
        return function() {
          return _this.updateMinimapSize();
        };
      })(this))));
    };

    MinimapView.prototype.computeScale = function() {
      var computedLineHeight, originalLineHeight;
      originalLineHeight = parseInt(this.editorView.find('.lines').css('line-height'));
      computedLineHeight = this.getLineHeight();
      return this.scaleX = this.scaleY = computedLineHeight / originalLineHeight;
    };

    MinimapView.prototype.destroy = function() {
      this.paneView.removeClass('with-minimap');
      this.off();
      this.obsPane.dispose();
      this.unsubscribe();
      this.observer.disconnect();
      this.detachFromPaneView();
      this.renderView.destroy();
      return this.remove();
    };

    MinimapView.prototype.setDisplayCodeHighlights = function(value) {
      if (value !== this.displayCodeHighlights) {
        this.displayCodeHighlights = value;
        return this.renderView.forceUpdate();
      }
    };

    MinimapView.prototype.attachToPaneView = function() {
      this.paneView.append(this);
      return this.updateTopPosition();
    };

    MinimapView.prototype.detachFromPaneView = function() {
      return this.detach();
    };

    MinimapView.prototype.minimapIsAttached = function() {
      return this.paneView.find('.minimap').length === 1;
    };

    MinimapView.prototype.getEditorViewClientRect = function() {
      return this.scrollView[0].getBoundingClientRect();
    };

    MinimapView.prototype.getScrollViewClientRect = function() {
      return this.scrollViewLines[0].getBoundingClientRect();
    };

    MinimapView.prototype.getMinimapClientRect = function() {
      return this[0].getBoundingClientRect();
    };

    MinimapView.prototype.updateMinimapView = function() {
      if (!this.editorView) {
        return;
      }
      if (!this.indicator) {
        return;
      }
      if (this.frameRequested) {
        return;
      }
      this.updateMinimapSize();
      this.frameRequested = true;
      return requestAnimationFrame((function(_this) {
        return function() {
          _this.updateScroll();
          return _this.frameRequested = false;
        };
      })(this));
    };

    MinimapView.prototype.updateMinimapRenderView = function() {
      return this.renderView.update();
    };

    MinimapView.prototype.updateMinimapSize = function() {
      var editorViewRect, evh, evw, height, miniScrollViewRect, minimapVisibilityRatio, msvh, msvw, width, _ref2;
      if (this.indicator == null) {
        return;
      }
      _ref2 = this.getMinimapClientRect(), width = _ref2.width, height = _ref2.height;
      editorViewRect = this.getEditorViewClientRect();
      miniScrollViewRect = this.renderView.getClientRect();
      evw = editorViewRect.width;
      evh = editorViewRect.height;
      minimapVisibilityRatio = miniScrollViewRect.height / height;
      this.miniScroller.height(evh / minimapVisibilityRatio);
      this.miniScroller.toggleClass('visible', minimapVisibilityRatio > 1 && this.miniScrollVisible);
      this.miniWrapper.css({
        width: width
      });
      this.indicator.height = evh * this.scaleY;
      this.indicator.width = width / this.scaleX;
      this.miniVisibleArea.css({
        width: width / this.scaleX,
        height: evh * this.scaleY
      });
      this.updateMinimapWidthWithWrap();
      msvw = miniScrollViewRect.width || 0;
      msvh = miniScrollViewRect.height || 0;
      this.indicator.setWrapperSize(width, Math.min(height, msvh));
      this.indicator.setScrollerSize(msvw, msvh);
      return this.indicator.updateBoundary();
    };

    MinimapView.prototype.updateMinimapWidthWithWrap = function() {
      var adjustWidth, displayLeft, maxWidth, size, wraps;
      this.resetMinimapWidthWithWrap();
      size = atom.config.get('editor.preferredLineLength');
      wraps = atom.config.get('editor.softWrap');
      adjustWidth = atom.config.get('minimap.adjustMinimapWidthToSoftWrap');
      displayLeft = atom.config.get('minimap.displayMinimapOnLeft');
      if (wraps && adjustWidth && size) {
        maxWidth = (size * this.getCharWidth()) + 'px';
        this.css({
          maxWidth: maxWidth
        });
        if (displayLeft) {
          return this.editorView.find('.editor-contents').css({
            paddingLeft: maxWidth
          });
        } else {
          this.editorView.find('.editor-contents').css({
            paddingRight: maxWidth
          });
          return this.editorView.find('.vertical-scrollbar').css({
            right: maxWidth
          });
        }
      }
    };

    MinimapView.prototype.resetMinimapWidthWithWrap = function() {
      this.css({
        maxWidth: ''
      });
      this.editorView.find('.editor-contents').css({
        paddingRight: ''
      });
      this.editorView.find('.editor-contents').css({
        paddingLeft: ''
      });
      return this.editorView.find('.vertical-scrollbar').css({
        right: ''
      });
    };

    MinimapView.prototype.updateScrollY = function(top) {
      var overlayY, overlayerOffset, scrollViewOffset;
      if (top != null) {
        overlayY = top;
      } else {
        scrollViewOffset = this.scrollView.offset().top;
        overlayerOffset = this.scrollView.find('.overlayer').offset().top;
        overlayY = -overlayerOffset + scrollViewOffset;
      }
      this.indicator.setY(overlayY * this.scaleY);
      return this.updatePositions();
    };

    MinimapView.prototype.updateScrollX = function() {
      this.indicator.setX(this.scrollView[0].scrollLeft);
      return this.updatePositions();
    };

    MinimapView.prototype.updateScroll = function() {
      this.indicator.setX(this.scrollView[0].scrollLeft);
      this.updateScrollY();
      return this.trigger('minimap:scroll');
    };

    MinimapView.prototype.updatePositions = function() {
      this.transform(this.miniVisibleArea[0], this.translate(0, this.indicator.y));
      this.renderView.scrollTop(this.indicator.scroller.y * -1);
      this.transform(this.renderView[0], this.translate(0, this.indicator.scroller.y + this.getFirstVisibleScreenRow() * this.getLineHeight()));
      this.transform(this.miniUnderlayer[0], this.translate(0, this.indicator.scroller.y));
      this.transform(this.miniOverlayer[0], this.translate(0, this.indicator.scroller.y));
      return this.updateScrollerPosition();
    };

    MinimapView.prototype.updateScrollerPosition = function() {
      var height, scrollRange, totalHeight;
      height = this.miniScroller.height();
      totalHeight = this.height();
      scrollRange = totalHeight - height;
      return this.transform(this.miniScroller[0], this.translate(0, this.indicator.ratioY * scrollRange));
    };

    MinimapView.prototype.updateTopPosition = function() {
      return this.offset({
        top: (this.offsetTop = this.editorView.offset().top)
      });
    };


    /* Internal */

    MinimapView.prototype.subscribeToEditor = function() {
      this.subscribe(this.editor, 'scroll-top-changed.minimap', this.updateScrollY);
      return this.subscribe(this.scrollView, 'scroll.minimap', this.updateScrollX);
    };

    MinimapView.prototype.unsubscribeFromEditor = function() {
      if (this.editor != null) {
        this.unsubscribe(this.editor, '.minimap');
      }
      if (this.scrollView != null) {
        return this.unsubscribe(this.scrollView, '.minimap');
      }
    };

    MinimapView.prototype.onActiveItemChanged = function(activeItem) {
      if (activeItem === this.editor) {
        if (this.parent().length === 0) {
          this.attachToPaneView();
        }
        this.updateMinimapView();
        return this.renderView.forceUpdate();
      } else {
        if (this.parent().length === 1) {
          return this.detachFromPaneView();
        }
      }
    };

    MinimapView.prototype.onMouseWheel = function(e) {
      var wheelDeltaX, wheelDeltaY, _ref2;
      if (this.isClicked) {
        return;
      }
      _ref2 = e.originalEvent, wheelDeltaX = _ref2.wheelDeltaX, wheelDeltaY = _ref2.wheelDeltaY;
      if (wheelDeltaX) {
        this.editorView.scrollLeft(this.editorView.scrollLeft() - wheelDeltaX);
      }
      if (wheelDeltaY) {
        return this.editorView.scrollTop(this.editorView.scrollTop() - wheelDeltaY);
      }
    };

    MinimapView.prototype.onMouseDown = function(e) {
      var top, y;
      if (e.which !== 1) {
        return;
      }
      this.isClicked = true;
      e.preventDefault();
      e.stopPropagation();
      y = e.pageY - this.offsetTop;
      top = this.indicator.computeFromCenterY(y) / this.scaleY;
      this.editorView.scrollTop(top);
      return setTimeout((function(_this) {
        return function() {
          return _this.isClicked = false;
        };
      })(this), 377);
    };

    MinimapView.prototype.onScrollViewResized = function() {
      this.renderView.lineCanvas.height(this.editorView.height());
      this.updateMinimapSize();
      this.updateMinimapView();
      return this.renderView.forceUpdate();
    };

    MinimapView.prototype.onDragStart = function(e) {
      var y;
      if (e.which !== 1) {
        return;
      }
      this.isClicked = true;
      e.preventDefault();
      e.stopPropagation();
      y = e.pageY - this.offsetTop;
      this.grabY = y - (this.indicator.y + this.indicator.scroller.y);
      return this.on('mousemove.visible-area', this.onMove);
    };

    MinimapView.prototype.onMove = function(e) {
      if (e.which === 1) {
        return this.onDrag(e);
      } else {
        this.isClicked = false;
        return this.off('.visible-area');
      }
    };

    MinimapView.prototype.onDrag = function(e) {
      var top, y;
      y = e.pageY - this.offsetTop;
      top = (y - this.grabY) * (this.indicator.scroller.height - this.indicator.height) / (this.indicator.wrapper.height - this.indicator.height);
      return this.editorView.scrollTop(top / this.scaleY);
    };

    MinimapView.prototype.translate = function(x, y) {
      if (x == null) {
        x = 0;
      }
      if (y == null) {
        y = 0;
      }
      if (atom.config.get('minimap.useHardwareAcceleration')) {
        return "translate3d(" + x + "px, " + y + "px, 0)";
      } else {
        return "translate(" + x + "px, " + y + "px)";
      }
    };

    MinimapView.prototype.scale = function(scale) {
      return " scale(" + scale + ", " + scale + ")";
    };

    MinimapView.prototype.transform = function(el, transform) {
      return el.style.webkitTransform = el.style.transform = transform;
    };

    MinimapView.prototype.asDisposable = function(subscription) {
      return new Disposable(function() {
        return subscription.off();
      });
    };

    return MinimapView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLCtKQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBNEIsT0FBQSxDQUFRLE1BQVIsQ0FBNUIsRUFBQyxTQUFBLENBQUQsRUFBSSxZQUFBLElBQUosRUFBVSxzQkFBQSxjQUFWLENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVIsQ0FEWCxDQUFBOztBQUFBLEVBRUEsUUFBb0MsT0FBQSxDQUFRLFdBQVIsQ0FBcEMsRUFBQyw0QkFBQSxtQkFBRCxFQUFzQixtQkFBQSxVQUZ0QixDQUFBOztBQUFBLEVBSUEsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHVCQUFSLENBSnBCLENBQUE7O0FBQUEsRUFLQSxnQkFBQSxHQUFtQixPQUFBLENBQVEscUJBQVIsQ0FMbkIsQ0FBQTs7QUFBQSxFQU1BLDRCQUFBLEdBQStCLE9BQUEsQ0FBUSxvQ0FBUixDQU4vQixDQUFBOztBQUFBLEVBd0NBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSixrQ0FBQSxDQUFBOztBQUFBLElBQUEsUUFBUSxDQUFDLFdBQVQsQ0FBcUIsV0FBckIsQ0FBQSxDQUFBOztBQUFBLElBRUEsV0FBQyxDQUFBLGdCQUFELENBQWtCLGVBQWxCLEVBQW1DLGVBQW5DLEVBQW9ELGNBQXBELEVBQW9FLGVBQXBFLEVBQXFGLGtCQUFyRixFQUF5Ryx3QkFBekcsRUFBbUkseUJBQW5JLEVBQThKLDBCQUE5SixFQUEwTCx5QkFBMUwsRUFBcU4sZ0NBQXJOLEVBQXVQLGdCQUF2UCxFQUF5USxrQkFBelEsRUFBNlIsOEJBQTdSLEVBQTZULCtCQUE3VCxFQUE4VjtBQUFBLE1BQUEsVUFBQSxFQUFZLFlBQVo7S0FBOVYsQ0FGQSxDQUFBOztBQUFBLElBSUEsV0FBQyxDQUFBLGdCQUFELENBQWtCLGNBQWxCLEVBQWtDLGVB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
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/minimap-view.coffee