(function() {
  var $, CompositeDisposable, DecorationManagement, Delegato, Disposable, Emitter, MinimapRenderView, ScrollView, TextEditorView, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), TextEditorView = _ref.TextEditorView, ScrollView = _ref.ScrollView, $ = _ref.$;

  Emitter = require('emissary').Emitter;

  _ref1 = require('event-kit'), CompositeDisposable = _ref1.CompositeDisposable, Disposable = _ref1.Disposable;

  Delegato = require('delegato');

  DecorationManagement = require('./mixins/decoration-management');

  module.exports = MinimapRenderView = (function(_super) {
    __extends(MinimapRenderView, _super);

    Emitter.includeInto(MinimapRenderView);

    Delegato.includeInto(MinimapRenderView);

    DecorationManagement.includeInto(MinimapRenderView);

    MinimapRenderView.delegatesMethods('getMarker', 'findMarkers', {
      toProperty: 'editor'
    });

    MinimapRenderView.content = function() {
      return this.div({
        "class": 'minimap-editor editor editor-colors'
      }, (function(_this) {
        return function() {
          return _this.tag('canvas', {
            outlet: 'lineCanvas',
            "class": 'minimap-canvas',
            id: 'line-canvas'
          });
        };
      })(this));
    };

    MinimapRenderView.prototype.frameRequested = false;


    /* Public */

    function MinimapRenderView() {
      this.update = __bind(this.update, this);
      this.subscriptions = new CompositeDisposable;
      MinimapRenderView.__super__.constructor.apply(this, arguments);
      this.pendingChanges = [];
      this.context = this.lineCanvas[0].getContext('2d');
      this.tokenColorCache = {};
      this.decorationColorCache = {};
      this.initializeDecorations();
      this.tokenized = false;
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCtxt = this.offscreenCanvas.getContext('2d');
    }

    MinimapRenderView.prototype.initialize = function() {
      this.lineCanvas.webkitImageSmoothingEnabled = false;
      this.interline = atom.config.get('minimap.interline');
      this.charWidth = atom.config.get('minimap.charWidth');
      this.charHeight = atom.config.get('minimap.charHeight');
      this.textOpacity = atom.config.get('minimap.textOpacity');
      this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.interline', (function(_this) {
        return function(interline) {
          _this.interline = interline;
          _this.emit('minimap:scaleChanged');
          return _this.forceUpdate();
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.charWidth', (function(_this) {
        return function(charWidth) {
          _this.charWidth = charWidth;
          _this.emit('minimap:scaleChanged');
          return _this.forceUpdate();
        };
      })(this))));
      this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.charHeight', (function(_this) {
        return function(charHeight) {
          _this.charHeight = charHeight;
          _this.emit('minimap:scaleChanged');
          return _this.forceUpdate();
        };
      })(this))));
      return this.subscriptions.add(this.asDisposable(atom.config.observe('minimap.textOpacity', (function(_this) {
        return function(textOpacity) {
          _this.textOpacity = textOpacity;
          return _this.forceUpdate();
        };
      })(this))));
    };

    MinimapRenderView.prototype.destroy = function() {
      this.unsubscribe();
      this.subscriptions.dispose();
      return this.editorView = null;
    };

    MinimapRenderView.prototype.setEditorView = function(editorView) {
      this.editorView = editorView;
      this.editor = this.editorView.getModel();
      this.buffer = this.editorView.getEditor().getBuffer();
      this.displayBuffer = this.editor.displayBuffer;
      if (this.editor.onDidChangeScreenLines != null) {
        this.subscriptions.add(this.editor.onDidChangeScreenLines((function(_this) {
          return function(changes) {
            return _this.stackChanges(changes);
          };
        })(this)));
      } else {
        this.subscriptions.add(this.editor.onDidChange((function(_this) {
          return function(changes) {
            return _this.stackChanges(changes);
          };
        })(this)));
      }
      this.subscriptions.add(this.displayBuffer.onDidTokenize((function(_this) {
        return function() {
          _this.tokenized = true;
          return _this.forceUpdate();
        };
      })(this)));
      if (this.displayBuffer.tokenizedBuffer.fullyTokenized) {
        return this.tokenized = true;
      }
    };

    MinimapRenderView.prototype.update = function() {
      var firstRow, hasChanges, intact, intactRanges, lastRow, _i, _len;
      if (this.editorView == null) {
        return;
      }
      this.lineCanvas[0].width = this.lineCanvas[0].offsetWidth * devicePixelRatio;
      this.lineCanvas[0].height = this.lineCanvas[0].offsetHeight * devicePixelRatio;
      hasChanges = this.pendingChanges.length > 0;
      firstRow = this.getFirstVisibleScreenRow();
      lastRow = this.getLastVisibleScreenRow();
      intactRanges = this.computeIntactRanges(firstRow, lastRow);
      if (intactRanges.length === 0) {
        this.drawLines(this.context, firstRow, lastRow, 0);
      } else {
        for (_i = 0, _len = intactRanges.length; _i < _len; _i++) {
          intact = intactRanges[_i];
          this.copyBitmapPart(this.context, this.offscreenCanvas, intact.domStart, intact.start - firstRow, intact.end - intact.start);
        }
        this.fillGapsBetweenIntactRanges(this.context, intactRanges, firstRow, lastRow);
      }
      this.offscreenCanvas.width = this.lineCanvas[0].width;
      this.offscreenCanvas.height = this.lineCanvas[0].height;
      this.offscreenCtxt.drawImage(this.lineCanvas[0], 0, 0);
      this.offscreenFirstRow = firstRow;
      this.offscreenLastRow = lastRow;
      if (hasChanges) {
        return this.emit('minimap:updated');
      }
    };

    MinimapRenderView.prototype.requestUpdate = function() {
      if (this.frameRequested) {
        return;
      }
      this.frameRequested = true;
      return requestAnimationFrame((function(_this) {
        return function() {
          _this.update();
          return _this.frameRequested = false;
        };
      })(this));
    };

    MinimapRenderView.prototype.forceUpdate = function() {
      this.tokenColorCache = {};
      this.decorationColorCache = {};
      this.offscreenFirstRow = null;
      this.offscreenLastRow = null;
      return this.requestUpdate();
    };

    MinimapRenderView.prototype.stackChanges = function(changes) {
      this.pendingChanges.push(changes);
      return this.requestUpdate();
    };

    MinimapRenderView.prototype.scrollTop = function(scrollTop) {
      if (scrollTop == null) {
        return this.cachedScrollTop || 0;
      }
      if (scrollTop === this.cachedScrollTop) {
        return;
      }
      this.cachedScrollTop = scrollTop;
      return this.update();
    };

    MinimapRenderView.prototype.getMinimapHeight = function() {
      return this.getLinesCount() * this.getLineHeight();
    };

    MinimapRenderView.prototype.getLineHeight = function() {
      return this.charHeight + this.interline;
    };

    MinimapRenderView.prototype.getCharHeight = function() {
      return this.charHeight;
    };

    MinimapRenderView.prototype.getCharWidth = function() {
      return this.charWidth;
    };

    MinimapRenderView.prototype.getTextOpacity = function() {
      return this.textOpacity;
    };

    MinimapRenderView.prototype.getLinesCount = function() {
      return this.editor.getScreenLineCount();
    };

    MinimapRenderView.prototype.getMinimapScreenHeight = function() {
      return this.minimapView.height();
    };

    MinimapRenderView.prototype.getMinimapHeightInLines = function() {
      return Math.ceil(this.getMinimapScreenHeight() / this.getLineHeight());
    };

    MinimapRenderView.prototype.getFirstVisibleScreenRow = function() {
      var screenRow;
      screenRow = Math.floor(this.scrollTop() / this.getLineHeight());
      if (isNaN(screenRow)) {
        screenRow = 0;
      }
      return screenRow;
    };

    MinimapRenderView.prototype.getLastVisibleScreenRow = function() {
      var calculatedRow, screenRow;
      calculatedRow = Math.ceil((this.scrollTop() + this.getMinimapScreenHeight()) / this.getLineHeight()) - 1;
      screenRow = Math.max(0, Math.min(this.editor.getScreenLineCount() - 1, calculatedRow));
      if (isNaN(screenRow)) {
        screenRow = 0;
      }
      return screenRow;
    };

    MinimapRenderView.prototype.getClientRect = function() {
      var canvas;
      canvas = this.lineCanvas[0];
      return {
        width: canvas.scrollWidth,
        height: this.getMinimapHeight()
      };
    };

    MinimapRenderView.prototype.pixelPositionForScreenPosition = function(position) {
      var actualRow, column, row, _ref2;
      _ref2 = this.buffer.constructor.Point.fromObject(position), row = _ref2.row, column = _ref2.column;
      actualRow = Math.floor(row);
      return {
        top: row * this.getLineHeight() * devicePixelRatio,
        left: column * devicePixelRatio
      };
    };

    MinimapRenderView.prototype.getDefaultColor = function() {
      return this.transparentize(this.minimapView.editorView.css('color'), this.getTextOpacity());
    };

    MinimapRenderView.prototype.getTokenColor = function(token) {
      var color, flatScopes;
      flatScopes = token.scopes.join();
      if (!(flatScopes in this.tokenColorCache)) {
        color = this.retrieveTokenColorFromDom(token);
        this.tokenColorCache[flatScopes] = color;
      }
      return this.tokenColorCache[flatScopes];
    };

    MinimapRenderView.prototype.getDecorationColor = function(decoration) {
      var color, properties;
      properties = decoration.getProperties();
      if (properties.color != null) {
        return properties.color;
      }
      if (!(properties.scope in this.decorationColorCache)) {
        color = this.retrieveDecorationColorFromDom(decoration);
        this.decorationColorCache[properties.scope] = color;
      }
      return this.decorationColorCache[properties.scope];
    };

    MinimapRenderView.prototype.retrieveTokenColorFromDom = function(token) {
      var color;
      color = this.retrieveStyleFromDom(token.scopes, 'color');
      return this.transparentize(color, this.getTextOpacity());
    };

    MinimapRenderView.prototype.retrieveDecorationColorFromDom = function(decoration) {
      return this.retrieveStyleFromDom(decoration.getProperties().scope.split(/\s+/), 'background-color');
    };

    MinimapRenderView.prototype.retrieveStyleFromDom = function(scopes, property) {
      var node, parent, scope, value, _i, _len;
      this.ensureDummyNodeExistence();
      parent = this.dummyNode;
      for (_i = 0, _len = scopes.length; _i < _len; _i++) {
        scope = scopes[_i];
        node = document.createElement('span');
        node.className = scope.replace(/\.+/g, ' ');
        if (parent != null) {
          parent.appendChild(node);
        }
        parent = node;
      }
      value = getComputedStyle(parent).getPropertyValue(property);
      this.dummyNode.innerHTML = '';
      return value;
    };

    MinimapRenderView.prototype.ensureDummyNodeExistence = function() {
      if (this.dummyNode == null) {
        this.dummyNode = document.createElement('span');
        this.dummyNode.style.visibility = 'hidden';
        return this.editorView.append(this.dummyNode);
      }
    };

    MinimapRenderView.prototype.transparentize = function(color, opacity) {
      if (opacity == null) {
        opacity = 1;
      }
      return color.replace('rgb(', 'rgba(').replace(')', ", " + opacity + ")");
    };

    MinimapRenderView.prototype.drawLines = function(context, firstRow, lastRow, offsetRow) {
      var canvasWidth, charHeight, charWidth, color, decoration, decorations, displayCodeHighlights, highlightDecorations, line, lineDecorations, lineHeight, lines, re, row, screenRow, token, value, w, x, y, y0, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref2;
      if (firstRow > lastRow) {
        return;
      }
      lines = this.editor.tokenizedLinesForScreenRows(firstRow, lastRow);
      lineHeight = this.getLineHeight() * devicePixelRatio;
      charHeight = this.getCharHeight() * devicePixelRatio;
      charWidth = this.getCharWidth() * devicePixelRatio;
      canvasWidth = this.lineCanvas.width() * devicePixelRatio;
      displayCodeHighlights = this.minimapView.displayCodeHighlights;
      decorations = this.decorationsForScreenRowRange(firstRow, lastRow);
      line = lines[0];
      if (line.invisibles != null) {
        re = RegExp("" + line.invisibles.cr + "|" + line.invisibles.eol + "|" + line.invisibles.space + "|" + line.invisibles.tab, "g");
      }
      for (row = _i = 0, _len = lines.length; _i < _len; row = ++_i) {
        line = lines[row];
        x = 0;
        y = offsetRow + row;
        screenRow = firstRow + row;
        y0 = y * lineHeight;
        lineDecorations = this.decorationsByTypesForRow(screenRow, 'line', decorations);
        for (_j = 0, _len1 = lineDecorations.length; _j < _len1; _j++) {
          decoration = lineDecorations[_j];
          context.fillStyle = this.getDecorationColor(decoration);
          context.fillRect(0, y0, canvasWidth, lineHeight);
        }
        highlightDecorations = this.decorationsByTypesForRow(firstRow + row, 'highlight-under', decorations);
        for (_k = 0, _len2 = highlightDecorations.length; _k < _len2; _k++) {
          decoration = highlightDecorations[_k];
          this.drawHighlightDecoration(context, decoration, y, screenRow, lineHeight, charWidth, canvasWidth);
        }
        _ref2 = line.tokens;
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
          token = _ref2[_l];
          w = token.screenDelta;
          if (!token.isOnlyWhitespace()) {
            color = displayCodeHighlights && this.tokenized ? this.getTokenColor(token) : this.getDefaultColor();
            value = token.value;
            if (re != null) {
              value = value.replace(re, ' ');
            }
            x = this.drawToken(context, value, color, x, y0, charWidth, charHeight);
          } else {
            x += w * charWidth;
          }
        }
        highlightDecorations = this.decorationsByTypesForRow(firstRow + row, 'highlight', 'highlight-over', decorations);
        for (_m = 0, _len4 = highlightDecorations.length; _m < _len4; _m++) {
          decoration = highlightDecorations[_m];
          this.drawHighlightDecoration(context, decoration, y, screenRow, lineHeight, charWidth, canvasWidth);
        }
      }
      return context.fill();
    };

    MinimapRenderView.prototype.drawToken = function(context, text, color, x, y, charWidth, charHeight) {
      var char, chars, _i, _len;
      context.fillStyle = color;
      chars = 0;
      for (_i = 0, _len = text.length; _i < _len; _i++) {
        char = text[_i];
        if (/\s/.test(char)) {
          if (chars > 0) {
            context.fillRect(x - (chars * charWidth), y, chars * charWidth, charHeight);
          }
          chars = 0;
        } else {
          chars++;
        }
        x += charWidth;
      }
      if (chars > 0) {
        context.fillRect(x - (chars * charWidth), y, chars * charWidth, charHeight);
      }
      return x;
    };

    MinimapRenderView.prototype.drawHighlightDecoration = function(context, decoration, y, screenRow, lineHeight, charWidth, canvasWidth) {
      var colSpan, range, rowSpan, x;
      context.fillStyle = this.getDecorationColor(decoration);
      range = decoration.getMarker().getScreenRange();
      rowSpan = range.end.row - range.start.row;
      if (rowSpan === 0) {
        colSpan = range.end.column - range.start.column;
        return context.fillRect(range.start.column * charWidth, y * lineHeight, colSpan * charWidth, lineHeight);
      } else {
        if (screenRow === range.start.row) {
          x = range.start.column * charWidth;
          return context.fillRect(x, y * lineHeight, canvasWidth - x, lineHeight);
        } else if (screenRow === range.end.row) {
          return context.fillRect(0, y * lineHeight, range.end.column * charWidth, lineHeight);
        } else {
          return context.fillRect(0, y * lineHeight, canvasWidth, lineHeight);
        }
      }
    };

    MinimapRenderView.prototype.copyBitmapPart = function(context, bitmapCanvas, srcRow, destRow, rowCount) {
      var lineHeight;
      lineHeight = this.getLineHeight() * devicePixelRatio;
      return context.drawImage(bitmapCanvas, 0, srcRow * lineHeight, bitmapCanvas.width, rowCount * lineHeight, 0, destRow * lineHeight, bitmapCanvas.width, rowCount * lineHeight);
    };


    /* Internal */

    MinimapRenderView.prototype.fillGapsBetweenIntactRanges = function(context, intactRanges, firstRow, lastRow) {
      var currentRow, intact, _i, _len;
      currentRow = firstRow;
      for (_i = 0, _len = intactRanges.length; _i < _len; _i++) {
        intact = intactRanges[_i];
        this.drawLines(context, currentRow, intact.start - 1, currentRow - firstRow);
        currentRow = intact.end;
      }
      if (currentRow <= lastRow) {
        return this.drawLines(context, currentRow, lastRow, currentRow - firstRow);
      }
    };

    MinimapRenderView.prototype.computeIntactRanges = function(firstRow, lastRow) {
      var change, intactRange, intactRanges, newIntactRanges, range, _i, _j, _len, _len1, _ref2;
      if ((this.offscreenFirstRow == null) && (this.offscreenLastRow == null)) {
        return [];
      }
      intactRanges = [
        {
          start: this.offscreenFirstRow,
          end: this.offscreenLastRow,
          domStart: 0
        }
      ];
      _ref2 = this.pendingChanges;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        change = _ref2[_i];
        newIntactRanges = [];
        for (_j = 0, _len1 = intactRanges.length; _j < _len1; _j++) {
          range = intactRanges[_j];
          if (change.end < range.start && change.screenDelta !== 0) {
            newIntactRanges.push({
              start: range.start + change.screenDelta,
              end: range.end + change.screenDelta,
              domStart: range.domStart
            });
          } else if (change.end < range.start || change.start > range.end) {
            newIntactRanges.push(range);
          } else {
            if (change.start > range.start) {
              newIntactRanges.push({
                start: range.start,
                end: change.start - 1,
                domStart: range.domStart
              });
            }
            if (change.end < range.end) {
              newIntactRanges.push({
                start: change.end + change.screenDelta + 1,
                end: range.end + change.screenDelta,
                domStart: range.domStart + change.end + 1 - range.start
              });
            }
          }
          intactRange = newIntactRanges[newIntactRanges.length - 1];
          if ((intactRange != null) && (isNaN(intactRange.end) || isNaN(intactRange.start))) {
            debugger;
          }
        }
        intactRanges = newIntactRanges;
      }
      this.truncateIntactRanges(intactRanges, firstRow, lastRow);
      this.pendingChanges = [];
      return intactRanges;
    };

    MinimapRenderView.prototype.truncateIntactRanges = function(intactRanges, firstRow, lastRow) {
      var i, range;
      i = 0;
      while (i < intactRanges.length) {
        range = intactRanges[i];
        if (range.start < firstRow) {
          range.domStart += firstRow - range.start;
          range.start = firstRow;
        }
        if (range.end > lastRow) {
          range.end = lastRow;
        }
        if (range.start >= range.end) {
          intactRanges.splice(i--, 1);
        }
        i++;
      }
      return intactRanges.sort(function(a, b) {
        return a.domStart - b.domStart;
      });
    };

    MinimapRenderView.prototype.asDisposable = function(subscription) {
      return new Disposable(function() {
        return subscription.off();
      });
    };

    return MinimapRenderView;

  })(ScrollView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHVJQUFBO0lBQUE7O21TQUFBOztBQUFBLEVBQUEsT0FBa0MsT0FBQSxDQUFRLE1BQVIsQ0FBbEMsRUFBQyxzQkFBQSxjQUFELEVBQWlCLGtCQUFBLFVBQWpCLEVBQTZCLFNBQUEsQ0FBN0IsQ0FBQTs7QUFBQSxFQUNDLFVBQVcsT0FBQSxDQUFRLFVBQVIsRUFBWCxPQURELENBQUE7O0FBQUEsRUFFQSxRQUFvQyxPQUFBLENBQVEsV0FBUixDQUFwQyxFQUFDLDRCQUFBLG1CQUFELEVBQXNCLG1CQUFBLFVBRnRCLENBQUE7O0FBQUEsRUFHQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFVBQVIsQ0FIWCxDQUFBOztBQUFBLEVBSUEsb0JBQUEsR0FBdUIsT0FBQSxDQUFRLGdDQUFSLENBSnZCLENBQUE7O0FBQUEsRUFRQSxNQUFNLENBQUMsT0FBUCxHQUNNO0FBQ0osd0NBQUEsQ0FBQTs7QUFBQSxJQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGlCQUFwQixDQUFBLENBQUE7O0FBQUEsSUFDQSxRQUFRLENBQUMsV0FBVCxDQUFxQixpQkFBckIsQ0FEQSxDQUFBOztBQUFBLElBRUEsb0JBQW9CLENBQUMsV0FBckIsQ0FBaUMsaUJBQWpDLENBRkEsQ0FBQTs7QUFBQSxJQUtBLGlCQUFDLENBQUEsZ0JBQUQsQ0FBa0IsV0FBbEIsRUFBK0IsYUFBL0IsRUFBOEM7QUFBQSxNQUFBLFVBQUEsRUFBWSxRQUFaO0tBQTlDLENBTEEsQ0FBQTs7QUFBQSxJQU9BLGlCQUFDLENBQUEsT0FBRCxHQUFVLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxRQUFBLE9BQUEsRUFBTyxxQ0FBUDtPQUFMLEVBQW1ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ2pELEtBQUMsQ0FBQSxHQUFELENBQUssUUFBTCxFQUFlO0FBQUEsWUFDYixNQUFBLEVBQVEsWUFESztBQUFBLFlBRWIsT0FBQSxFQUFPLGdCQUZNO0FBQUEsWUFHYixFQUFBLEVBQUksYUFIUztXQUFmLEVBRGlEO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBbkQsRUFEUTtJQUFBLENBUFYsQ0FBQTs7QUFBQSxnQ0FlQSxjQUFBLEdBQWdCLEtBZmhCLENBQUE7O0FBaUJBO0FBQUEsZ0JBakJBOztBQTRCYSxJQUFBLDJCQUFBLEdBQUE7QUFDWCw2Q0FBQSxDQUFBO0FBQUEsTUFBQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsbUJBQWpCLENBQUE7QUFBQSxNQUNBLG9EQUFBLFNBQUEsQ0FEQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsY0FBRCxHQUFrQixFQUZsQixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQUMsQ0FBQSxVQUFXLENBQUEsQ0FBQSxDQUFFLENBQUMsVUFBZixDQUEwQixJQUExQixDQUhYLENBQUE7QUFBQSxNQUlBLElBQUMsQ0FBQSxlQUFELEdBQW1CLEVBSm5CLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxvQkFBRCxHQUF3QixFQUx4QixDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEscUJBQUQsQ0FBQSxDQU5BLENBQUE7QUFBQSxNQU9BLElBQUMsQ0FBQSxTQUFELEdBQWEsS0FQYixDQUFBO0FBQUEsTUFTQSxJQUFDLENBQUEsZUFBRCxHQUFtQixRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQVRuQixDQUFBO0FBQUEsTUFVQSxJQUFDLENBQUEsYUFBRCxHQUFpQixJQUFDLENBQUEsZUFBZSxDQUFDLFVBQWpCLENBQTRCLElBQTVCLENBVmpCLENBRFc7SUFBQSxDQTVCYjs7QUFBQSxnQ0EyQ0EsVUFBQSxHQUFZLFNBQUEsR0FBQTtBQUNWLE1BQUEsSUFBQyxDQUFBLFVBQVUsQ0FBQywyQkFBWixHQUEwQyxLQUExQyxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsU0FBRCxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixtQkFBaEIsQ0FGYixDQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsU0FBRCxHQUFhLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixtQkFBaEIsQ0FIYixDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsVUFBRCxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixvQkFBaEIsQ0FKZCxDQUFBO0FBQUEsTUFLQSxJQUFDLENBQUEsV0FBRCxHQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixxQkFBaEIsQ0FMZixDQUFBO0FBQUEsTUFPQSxJQUFDLENBQUEsYUFBYSxDQUFDLEdBQWYsQ0FBbUIsSUFBQyxDQUFBLFlBQUQsQ0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsbUJBQXBCLEVBQXlDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFFLFNBQUYsR0FBQTtBQUN4RSxVQUR5RSxLQUFDLENBQUEsWUFBQSxTQUMxRSxDQUFBO0FBQUEsVUFBQSxLQUFDLENBQUEsSUFBRCxDQUFNLHNCQUFOLENBQUEsQ0FBQTtpQkFDQSxLQUFDLENBQUEsV0FBRCxDQUFBLEVBRndFO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBekMsQ0FBZCxDQUFuQixDQVBBLENBQUE7QUFBQSxNQVVBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFDLENBQUEsWUFBRCxDQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixtQkFBcEIsRUFBeUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUUsU0FBRixHQUFBO0FBQ3hFLFVBRHlFLEtBQUMsQ0FBQSxZQUFBLFNBQzFFLENBQUE7QUFBQSxVQUFBLEtBQUMsQ0FBQSxJQUFELENBQU0sc0JBQU4sQ0FBQSxDQUFBO2lCQUNBLEtBQUMsQ0FBQSxXQUFELENBQUEsRUFGd0U7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF6QyxDQUFkLENBQW5CLENBVkEsQ0FBQTtBQUFBLE1BYUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxZQUFELENBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLG9CQUFwQixFQUEwQyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBRSxVQUFGLEdBQUE7QUFDekUsVUFEMEUsS0FBQyxDQUFBLGFBQUEsVUFDM0UsQ0FBQTtBQUFBLFVBQUEsS0FBQyxDQUFBLElBQUQsQ0FBTSxzQkFBTixDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLFdBQUQsQ0FBQSxFQUZ5RTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFDLENBQWQsQ0FBbkIsQ0FiQSxDQUFBO2FBZ0JBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFDLENBQUEsWUFBRCxDQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixxQkFBcEIsRUFBMkMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUUsV0FBRixHQUFBO0FBQzFFLFVBRDJFLEtBQUMsQ0FBQSxjQUFBLFdBQzVFLENBQUE7aUJBQUEsS0FBQyxDQUFBLFdBQUQsQ0FBQSxFQUQwRTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTNDLENBQWQsQ0FBbkIsRUFqQlU7SUFBQSxDQTNDWixDQUFBOztBQUFBLGdDQWlFQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFDLENBQUEsV0FBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLGFBQWEsQ0FBQyxPQUFmLENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFVBQUQsR0FBYyxLQUhQO0lBQUEsQ0FqRVQsQ0FBQTs7QUFBQSxnQ0EwRUEsYUFBQSxHQUFlLFNBQUUsVUFBRixHQUFBO0FBQ2IsTUFEYyxJQUFDLENBQUEsYUFBQSxVQUNmLENBQUE7QUFBQSxNQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFaLENBQUEsQ0FBVixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQUMsQ0FBQSxVQUFVLENBQUMsU0FBWixDQUFBLENBQXVCLENBQUMsU0FBeEIsQ0FBQSxDQURWLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUMsQ0FBQSxNQUFNLENBQUMsYUFGekIsQ0FBQTtBQUlBLE1BQUEsSUFBRywwQ0FBSDtBQUNFLFFBQUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxNQUFNLENBQUMsc0JBQVIsQ0FBK0IsQ0FBQSxTQUFBLEtBQUEsR0FBQTtpQkFBQSxTQUFDLE9BQUQsR0FBQTttQkFDaEQsS0FBQyxDQUFBLFlBQUQsQ0FBYyxPQUFkLEVBRGdEO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0IsQ0FBbkIsQ0FBQSxDQURGO09BQUEsTUFBQTtBQUlFLFFBQUEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxHQUFmLENBQW1CLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBUixDQUFvQixDQUFBLFNBQUEsS0FBQSxHQUFBO2lCQUFBLFNBQUMsT0FBRCxHQUFBO21CQUFhLEtBQUMsQ0FBQSxZQUFELENBQWMsT0FBZCxFQUFiO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEIsQ0FBbkIsQ0FBQSxDQUpGO09BSkE7QUFBQSxNQVVBLElBQUMsQ0FBQSxhQUFhLENBQUMsR0FBZixDQUFtQixJQUFDLENBQUEsYUFBYSxDQUFDLGFBQWYsQ0FBNkIsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM5QyxVQUFBLEtBQUMsQ0FBQSxTQUFELEdBQWEsSUFBYixDQUFBO2lCQUNBLEtBQUMsQ0FBQSxXQUFELENBQUEsRUFGOEM7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE3QixDQUFuQixDQVZBLENBQUE7QUFjQSxNQUFBLElBQXFCLElBQUMsQ0FBQSxhQUFhLENBQUMsZUFBZSxDQUFDLGNBQXBEO2VBQUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxLQUFiO09BZmE7SUFBQSxDQTFFZixDQUFBOztBQUFBLGdDQW9HQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ04sVUFBQSw2REFBQTtBQUFBLE1BQUEsSUFBYyx1QkFBZDtBQUFBLGNBQUEsQ0FBQTtPQUFBO0FBQUEsTUFHQSxJQUFDLENBQUEsVUFBVyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBQWYsR0FBdUIsSUFBQyxDQUFBLFVBQVcsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUFmLEdBQTZCLGdCQUhwRCxDQUFBO0FBQUEsTUFJQSxJQUFDLENBQUEsVUFBVyxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BQWYsR0FBd0IsSUFBQyxDQUFBLFVBQVcsQ0FBQSxDQUFBLENBQUUsQ0FBQyxZQUFmLEdBQThCLGdCQUp0RCxDQUFBO0FBQUEsTUFPQSxVQUFBLEdBQWEsSUFBQyxDQUFBLGNBQWMsQ0FBQyxNQUFoQixHQUF5QixDQVB0QyxDQUFBO0FBQUEsTUFTQSxRQUFBLEdBQVcsSUFBQyxDQUFBLHdCQUFELENBQUEsQ0FUWCxDQUFBO0FBQUEsTUFVQSxPQUFBLEdBQVUsSUFBQyxDQUFBLHVCQUFELENBQUEsQ0FWVixDQUFBO0FBQUEsTUFXQSxZQUFBLEdBQWUsSUFBQyxDQUFBLG1CQUFELENBQXFCLFFBQXJCLEVBQStCLE9BQS9CLENBWGYsQ0FBQTtBQVlBLE1BQUEsSUFBRyxZQUFZLENBQUMsTUFBYixLQUF1QixDQUExQjtBQUNFLFFBQUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxJQUFDLENBQUEsT0FBWixFQUFxQixRQUFyQixFQUErQixPQUEvQixFQUF3QyxDQUF4QyxDQUFBLENBREY7T0FBQSxNQUFBO0FBR0UsYUFBQSxtREFBQTtvQ0FBQTtBQUNFLFVBQUEsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsSUFBQyxDQUFBLE9BQWpCLEVBQTBCLElBQUMsQ0FBQSxlQUEzQixFQUE0QyxNQUFNLENBQUMsUUFBbkQsRUFBNkQsTUFBTSxDQUFDLEtBQVAsR0FBYSxRQUExRSxFQUFvRixNQUFNLENBQUMsR0FBUCxHQUFXLE1BQU0sQ0FBQyxLQUF0RyxDQUFBLENBREY7QUFBQSxTQUFBO0FBQUEsUUFFQSxJQUFDLENBQUEsMkJBQUQsQ0FBNkIsSUFBQyxDQUFBLE9BQTlCLEVBQXVDLFlBQXZDLEVBQXFELFFBQXJELEVBQStELE9BQS9ELENBRkEsQ0FIRjtPQVpBO0FBQUEsTUFvQkEsSUFBQyxDQUFBLGVBQWUsQ0FBQyxLQUFqQixHQUF5QixJQUFDLENBQUEsVUFBVyxDQUFBLENBQUEsQ0FBRSxDQUFDLEtBcEJ4QyxDQUFBO0FBQUEsTUFxQkEsSUFBQyxDQUFBLGVBQWUsQ0FBQyxNQUFqQixHQUEwQixJQUFDLENBQUEsVUFBVyxDQUFBLENBQUEsQ0FBRSxDQUFDLE1BckJ6QyxDQUFBO0FBQUEsTUFzQkEsSUFBQyxDQUFBLGFBQWEsQ0FBQyxTQUFmLENBQXlCLElBQUMsQ0FBQSxVQUFXLENBQUEsQ0FBQSxDQUFyQyxFQUF5QyxDQUF6QyxFQUE0QyxDQUE1QyxDQXRCQSxDQUFBO0FBQUEsTUF1QkEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLFFBdkJyQixDQUFBO0FBQUEsTUF3QkEsSUFBQyxDQUFBLGdCQUFELEdBQW9CLE9BeEJwQixDQUFBO0FBMEJBLE1BQUEsSUFBMkIsVUFBM0I7ZUFBQSxJQUFDLENBQUEsSUFBRCxDQUFNLGlCQUFOLEVBQUE7T0EzQk07SUFBQSxDQXBHUixDQUFBOztBQUFBLGdDQXFJQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsTUFBQSxJQUFVLElBQUMsQ0FBQSxjQUFYO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxjQUFELEdBQWtCLElBRGxCLENBQUE7YUFHQSxxQkFBQSxDQUFzQixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO0FBQ3BCLFVBQUEsS0FBQyxDQUFBLE1BQUQsQ0FBQSxDQUFBLENBQUE7aUJBQ0EsS0FBQyxDQUFBLGNBQUQsR0FBa0IsTUFGRTtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQXRCLEVBSmE7SUFBQSxDQXJJZixDQUFBOztBQUFBLGdDQWdKQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1gsTUFBQSxJQUFDLENBQUEsZUFBRCxHQUFtQixFQUFuQixDQUFBO0FBQUEsTUFDQSxJQUFDLENBQUEsb0JBQUQsR0FBd0IsRUFEeEIsQ0FBQTtBQUFBLE1BRUEsSUFBQyxDQUFBLGlCQUFELEdBQXFCLElBRnJCLENBQUE7QUFBQSxNQUdBLElBQUMsQ0FBQSxnQkFBRCxHQUFvQixJQUhwQixDQUFBO2FBSUEsSUFBQyxDQUFBLGFBQUQsQ0FBQSxFQUxXO0lBQUEsQ0FoSmIsQ0FBQTs7QUFBQSxnQ0FpS0EsWUFBQSxHQUFjLFNBQUMsT0FBRCxHQUFBO0FBQ1osTUFBQSxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLE9BQXJCLENBQUEsQ0FBQTthQUNBLElBQUMsQ0FBQSxhQUFELENBQUEsRUFGWTtJQUFBLENBaktkLENBQUE7O0FBQUEsZ0NBMktBLFNBQUEsR0FBVyxTQUFDLFNBQUQsR0FBQTtBQUNULE1BQUEsSUFBb0MsaUJBQXBDO0FBQUEsZUFBTyxJQUFDLENBQUEsZUFBRCxJQUFvQixDQUEzQixDQUFBO09BQUE7QUFDQSxNQUFBLElBQVUsU0FBQSxLQUFhLElBQUMsQ0FBQSxlQUF4QjtBQUFBLGNBQUEsQ0FBQTtPQURBO0FBQUEsTUFHQSxJQUFDLENBQUEsZUFBRCxHQUFtQixTQUhuQixDQUFBO2FBSUEsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQUxTO0lBQUEsQ0EzS1gsQ0FBQTs7QUFBQSxnQ0FtTUEsZ0JBQUEsR0FBa0IsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUFBLEdBQW1CLElBQUMsQ0FBQSxhQUFELENBQUEsRUFBdEI7SUFBQSxDQW5NbEIsQ0FBQTs7QUFBQSxnQ0EyTUEsYUFBQSxHQUFlLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBQyxDQUFBLFVBQWxCO0lBQUEsQ0EzTWYsQ0FBQTs7QUFBQSxnQ0FzTkEsYUFBQSxHQUFlLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxXQUFKO0lBQUEsQ0F0TmYsQ0FBQTs7QUFBQSxnQ0E4TkEsWUFBQSxHQUFjLFNBQUEsR0FBQTthQUFHLElBQUMsQ0FBQSxVQUFKO0lBQUEsQ0E5TmQsQ0FBQTs7QUFBQSxnQ0FtT0EsY0FBQSxHQUFnQixTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsWUFBSjtJQUFBLENBbk9oQixDQUFBOztBQUFBLGdDQXdPQSxhQUFBLEdBQWUsU0FBQSxHQUFBO2FBQUcsSUFBQyxDQUFBLE1BQU0sQ0FBQyxrQkFBUixDQUFBLEVBQUg7SUFBQSxDQXhPZixDQUFBOztBQUFBLGdDQWlQQSxzQkFBQSxHQUF3QixTQUFBLEdBQUE7YUFBRyxJQUFDLENBQUEsV0FBVyxDQUFDLE1BQWIsQ0FBQSxFQUFIO0lBQUEsQ0FqUHhCLENBQUE7O0FBQUEsZ0NBc1BBLHVCQUFBLEdBQXlCLFNBQUEsR0FBQTthQUFHLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBQyxDQUFBLHNCQUFELENBQUEsQ0FBQSxHQUE0QixJQUFDLENBQUEsYUFBRCxDQUFBLENBQXRDLEVBQUg7SUFBQSxDQXRQekIsQ0FBQTs7QUFBQSxnQ0EyUEEsd0JBQUEsR0FBMEIsU0FBQSxHQUFBO0FBQ3hCLFVBQUEsU0FBQTtBQUFBLE1BQUEsU0FBQSxHQUFZLElBQUksQ0FBQyxLQUFMLENBQVcsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFBLEdBQWUsSUFBQyxDQUFBLGFBQUQsQ0FBQSxDQUExQixDQUFaLENBQUE7QUFDQSxNQUFBLElBQWlCLEtBQUEsQ0FBTSxTQUFOLENBQWpCO0FBQUEsUUFBQSxTQUFBLEdBQVksQ0FBWixDQUFBO09BREE7YUFFQSxVQUh3QjtJQUFBLENBM1AxQixDQUFBOztBQUFBLGdDQW1RQSx1QkFBQSxHQUF5QixTQUFBLEdBQUE7QUFDdkIsVUFBQSx3QkFBQTtBQUFBLE1BQUEsYUFBQSxHQUFnQixJQUFJLENBQUMsSUFBTCxDQUFVLENBQUMsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFBLEdBQWUsSUFBQyxDQUFBLHNCQUFELENBQUEsQ0FBaEIsQ0FBQSxHQUE2QyxJQUFDLENBQUEsYUFBRCxDQUFBLENBQXZELENBQUEsR0FBMkUsQ0FBM0YsQ0FBQTtBQUFBLE1BQ0EsU0FBQSxHQUFZLElBQUksQ0FBQyxHQUFMLENBQVMsQ0FBVCxFQUFZLElBQUksQ0FBQyxHQUFMLENBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxrQkFBUixDQUFBLENBQUEsR0FBK0IsQ0FBeEMsRUFBMkMsYUFBM0MsQ0FBWixDQURaLENBQUE7QUFFQSxNQUFBLElBQWlCLEtBQUEsQ0FBTSxTQUFOLENBQWpCO0FBQUEsUUFBQSxTQUFBLEdBQVksQ0FBWixDQUFBO09BRkE7YUFHQSxVQUp1QjtJQUFBLENBblF6QixDQUFBOztBQUFBLGdDQTRRQSxhQUFBLEdBQWUsU0FBQSxHQUFBO0FBQ2IsVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsSUFBQyxDQUFBLFVBQVcsQ0FBQSxDQUFBLENBQXJCLENBQUE7YUFDQTtBQUFBLFFBQ0UsS0FBQSxFQUFPLE1BQU0sQ0FBQyxXQURoQjtBQUFBLFFBRUUsTUFBQSxFQUFRLElBQUMsQ0FBQSxnQkFBRCxDQUFBLENBRlY7UUFGYTtJQUFBLENBNVFmLENBQUE7O0FBQUEsZ0NBNlJBLDhCQUFBLEdBQWdDLFNBQUMsUUFBRCxHQUFBO0FBQzlCLFVBQUEsNkJBQUE7QUFBQSxNQUFBLFFBQWdCLElBQUMsQ0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUExQixDQUFxQyxRQUFyQyxDQUFoQixFQUFDLFlBQUEsR0FBRCxFQUFNLGVBQUEsTUFBTixDQUFBO0FBQUEsTUFDQSxTQUFBLEdBQVksSUFBSSxDQUFDLEtBQUwsQ0FBVyxHQUFYLENBRFosQ0FBQTthQUdBO0FBQUEsUUFDRSxHQUFBLEVBQUssR0FBQSxHQUFNLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBTixHQUF5QixnQkFEaEM7QUFBQSxRQUVFLElBQUEsRUFBTSxNQUFBLEdBQVMsZ0JBRmpCO1FBSjhCO0lBQUEsQ0E3UmhDLENBQUE7O0FBQUEsZ0NBb1RBLGVBQUEsR0FBaUIsU0FBQSxHQUFBO2FBQ2YsSUFBQyxDQUFBLGNBQUQsQ0FBZ0IsSUFBQyxDQUFBLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBeEIsQ0FBNEIsT0FBNUIsQ0FBaEIsRUFBc0QsSUFBQyxDQUFBLGNBQUQsQ0FBQSxDQUF0RCxFQURlO0lBQUEsQ0FwVGpCLENBQUE7O0FBQUEsZ0NBK1RBLGFBQUEsR0FBZSxTQUFDLEtBQUQsR0FBQTtBQUViLFVBQUEsaUJBQUE7QUFBQSxNQUFBLFVBQUEsR0FBYSxLQUFLLENBQUMsTUFBTSxDQUFDLElBQWIsQ0FBQSxDQUFiLENBQUE7QUFDQSxNQUFBLElBQUcsQ0FBQSxDQUFBLFVBQUEsSUFBa0IsSUFBQyxDQUFBLGVBQW5CLENBQUg7QUFDRSxRQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEseUJBQUQsQ0FBMkIsS0FBM0IsQ0FBUixDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsZUFBZ0IsQ0FBQSxVQUFBLENBQWpCLEdBQStCLEtBRC9CLENBREY7T0FEQTthQUlBLElBQUMsQ0FBQSxlQUFnQixDQUFBLFVBQUEsRUFOSjtJQUFBLENBL1RmLENBQUE7O0FBQUEsZ0NBZ1ZBLGtCQUFBLEdBQW9CLFNBQUMsVUFBRCxHQUFBO0FBQ2xCLFVBQUEsaUJBQUE7QUFBQSxNQUFBLFVBQUEsR0FBYSxVQUFVLENBQUMsYUFBWCxDQUFBLENBQWIsQ0FBQTtBQUNBLE1BQUEsSUFBMkIsd0JBQTNCO0FBQUEsZUFBTyxVQUFVLENBQUMsS0FBbEIsQ0FBQTtPQURBO0FBRUEsTUFBQSxJQUFHLENBQUEsQ0FBQSxVQUFVLENBQUMsS0FBWCxJQUF3QixJQUFDLENBQUEsb0JBQXpCLENBQUg7QUFDRSxRQUFBLEtBQUEsR0FBUSxJQUFDLENBQUEsOEJBQUQsQ0FBZ0MsVUFBaEMsQ0FBUixDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsb0JBQXFCLENBQUEsVUFBVSxDQUFDLEtBQVgsQ0FBdEIsR0FBMEMsS0FEMUMsQ0FERjtPQUZBO2FBS0EsSUFBQyxDQUFBLG9CQUFxQixDQUFBLFVBQVUsQ0FBQyxLQUFYLEVBTko7SUFBQSxDQWhWcEIsQ0FBQTs7QUFBQSxnQ0E2VkEseUJBQUEsR0FBMkIsU0FBQyxLQUFELEdBQUE7QUFFekIsVUFBQSxLQUFBO0FBQUEsTUFBQSxLQUFBLEdBQVEsSUFBQyxDQUFBLG9CQUFELENBQXNCLEtBQUssQ0FBQyxNQUE1QixFQUFvQyxPQUFwQyxDQUFSLENBQUE7YUFDQSxJQUFDLENBQUEsY0FBRCxDQUFnQixLQUFoQixFQUF1QixJQUFDLENBQUEsY0FBRCxDQUFBLENBQXZCLEVBSHlCO0lBQUEsQ0E3VjNCLENBQUE7O0FBQUEsZ0NBdVdBLDhCQUFBLEdBQWdDLFNBQUMsVUFBRCxHQUFBO2FBQzlCLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixVQUFVLENBQUMsYUFBWCxDQUFBLENBQTBCLENBQUMsS0FBSyxDQUFDLEtBQWpDLENBQXVDLEtBQXZDLENBQXRCLEVBQXFFLGtCQUFyRSxFQUQ4QjtJQUFBLENBdldoQyxDQUFBOztBQUFBLGdDQWtYQSxvQkFBQSxHQUFzQixTQUFDLE1BQUQsRUFBUyxRQUFULEdBQUE7QUFDcEIsVUFBQSxvQ0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLHdCQUFELENBQUEsQ0FBQSxDQUFBO0FBQUEsTUFFQSxNQUFBLEdBQVMsSUFBQyxDQUFBLFNBRlYsQ0FBQTtBQUdBLFdBQUEsNkNBQUE7MkJBQUE7QUFDRSxRQUFBLElBQUEsR0FBTyxRQUFRLENBQUMsYUFBVCxDQUF1QixNQUF2QixDQUFQLENBQUE7QUFBQSxRQUdBLElBQUksQ0FBQyxTQUFMLEdBQWlCLEtBQUssQ0FBQyxPQUFOLENBQWMsTUFBZCxFQUFzQixHQUF0QixDQUhqQixDQUFBO0FBSUEsUUFBQSxJQUE0QixjQUE1QjtBQUFBLFVBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsSUFBbkIsQ0FBQSxDQUFBO1NBSkE7QUFBQSxRQUtBLE1BQUEsR0FBUyxJQUxULENBREY7QUFBQSxPQUhBO0FBQUEsTUFXQSxLQUFBLEdBQVEsZ0JBQUEsQ0FBaUIsTUFBakIsQ0FBd0IsQ0FBQyxnQkFBekIsQ0FBMEMsUUFBMUMsQ0FYUixDQUFBO0FBQUEsTUFZQSxJQUFDLENBQUEsU0FBUyxDQUFDLFNBQVgsR0FBdUIsRUFadkIsQ0FBQTthQWNBLE1BZm9CO0lBQUEsQ0FsWHRCLENBQUE7O0FBQUEsZ0NBcVlBLHdCQUFBLEdBQTBCLFNBQUEsR0FBQTtBQUN4QixNQUFBLElBQU8sc0JBQVA7QUFDRSxRQUFBLElBQUMsQ0FBQSxTQUFELEdBQWEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBYixDQUFBO0FBQUEsUUFDQSxJQUFDLENBQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFqQixHQUE4QixRQUQ5QixDQUFBO2VBRUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFaLENBQW1CLElBQUMsQ0FBQSxTQUFwQixFQUhGO09BRHdCO0lBQUEsQ0FyWTFCLENBQUE7O0FBQUEsZ0NBa1pBLGNBQUEsR0FBZ0IsU0FBQyxLQUFELEVBQVEsT0FBUixHQUFBOztRQUFRLFVBQVE7T0FDOUI7YUFBQSxLQUFLLENBQUMsT0FBTixDQUFjLE1BQWQsRUFBc0IsT0FBdEIsQ0FBOEIsQ0FBQyxPQUEvQixDQUF1QyxHQUF2QyxFQUE2QyxJQUFBLEdBQUcsT0FBSCxHQUFZLEdBQXpELEVBRGM7SUFBQSxDQWxaaEIsQ0FBQTs7QUFBQSxnQ0FzYUEsU0FBQSxHQUFXLFNBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0IsT0FBcEIsRUFBNkIsU0FBN0IsR0FBQTtBQUNULFVBQUEscVFBQUE7QUFBQSxNQUFBLElBQVUsUUFBQSxHQUFXLE9BQXJCO0FBQUEsY0FBQSxDQUFBO09BQUE7QUFBQSxNQUVBLEtBQUEsR0FBUSxJQUFDLENBQUEsTUFBTSxDQUFDLDJCQUFSLENBQW9DLFFBQXBDLEVBQThDLE9BQTlDLENBRlIsQ0FBQTtBQUFBLE1BR0EsVUFBQSxHQUFhLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxHQUFtQixnQkFIaEMsQ0FBQTtBQUFBLE1BSUEsVUFBQSxHQUFhLElBQUMsQ0FBQSxhQUFELENBQUEsQ0FBQSxHQUFtQixnQkFKaEMsQ0FBQTtBQUFBLE1BS0EsU0FBQSxHQUFZLElBQUMsQ0FBQSxZQUFELENBQUEsQ0FBQSxHQUFrQixnQkFMOUIsQ0FBQTtBQUFBLE1BTUEsV0FBQSxHQUFjLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBWixDQUFBLENBQUEsR0FBc0IsZ0JBTnBDLENBQUE7QUFBQSxNQU9BLHFCQUFBLEdBQXdCLElBQUMsQ0FBQSxXQUFXLENBQUMscUJBUHJDLENBQUE7QUFBQSxNQVFBLFdBQUEsR0FBYyxJQUFDLENBQUEsNEJBQUQsQ0FBOEIsUUFBOUIsRUFBd0MsT0FBeEMsQ0FSZCxDQUFBO0FBQUEsTUFVQSxJQUFBLEdBQU8sS0FBTSxDQUFBLENBQUEsQ0FWYixDQUFBO0FBY0EsTUFBQSxJQUFHLHVCQUFIO0FBQ0UsUUFBQSxFQUFBLEdBQUssTUFBQSxDQUFBLEVBQUEsR0FDUCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBRFQsR0FDYSxHQURiLEdBRVAsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUZULEdBRWMsR0FGZCxHQUdQLElBQUksQ0FBQyxVQUFVLENBQUMsS0FIVCxHQUdnQixHQUhoQixHQUlQLElBQUksQ0FBQyxVQUFVLENBQUMsR0FKVCxFQUtGLEdBTEUsQ0FBTCxDQURGO09BZEE7QUFzQkEsV0FBQSx3REFBQTswQkFBQTtBQUNFLFFBQUEsQ0FBQSxHQUFJLENBQUosQ0FBQTtBQUFBLFFBQ0EsQ0FBQSxHQUFJLFNBQUEsR0FBWSxHQURoQixDQUFBO0FBQUEsUUFFQSxTQUFBLEdBQVksUUFBQSxHQUFXLEdBRnZCLENBQUE7QUFBQSxRQUdBLEVBQUEsR0FBSyxDQUFBLEdBQUUsVUFIUCxDQUFBO0FBQUEsUUFNQSxlQUFBLEdBQWtCLElBQUMsQ0FBQSx3QkFBRCxDQUEwQixTQUExQixFQUFxQyxNQUFyQyxFQUE2QyxXQUE3QyxDQU5sQixDQUFBO0FBT0EsYUFBQSx3REFBQTsyQ0FBQTtBQUNFLFVBQUEsT0FBTyxDQUFDLFNBQVIsR0FBb0IsSUFBQyxDQUFBLGtCQUFELENBQW9CLFVBQXBCLENBQXBCLENBQUE7QUFBQSxVQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLENBQWpCLEVBQW1CLEVBQW5CLEVBQXNCLFdBQXRCLEVBQWtDLFVBQWxDLENBREEsQ0FERjtBQUFBLFNBUEE7QUFBQSxRQVlBLG9CQUFBLEdBQXVCLElBQUMsQ0FBQSx3QkFBRCxDQUEwQixRQUFBLEdBQVcsR0FBckMsRUFBMEMsaUJBQTFDLEVBQTZELFdBQTdELENBWnZCLENBQUE7QUFhQSxhQUFBLDZEQUFBO2dEQUFBO0FBQ0UsVUFBQSxJQUFDLENBQUEsdUJBQUQsQ0FBeUIsT0FBekIsRUFBa0MsVUFBbEMsRUFBOEMsQ0FBOUMsRUFBaUQsU0FBakQsRUFBNEQsVUFBNUQsRUFBd0UsU0FBeEUsRUFBbUYsV0FBbkYsQ0FBQSxDQURGO0FBQUEsU0FiQTtBQWlCQTtBQUFBLGFBQUEsOENBQUE7NEJBQUE7QUFDRSxVQUFBLENBQUEsR0FBSSxLQUFLLENBQUMsV0FBVixDQUFBO0FBQ0EsVUFBQSxJQUFBLENBQUEsS0FBWSxDQUFDLGdCQUFOLENBQUEsQ0FBUDtBQUNFLFlBQUEsS0FBQSxHQUFXLHFCQUFBLElBQTBCLElBQUMsQ0FBQSxTQUE5QixHQUNOLElBQUMsQ0FBQSxhQUFELENBQWUsS0FBZixDQURNLEdBR04sSUFBQyxDQUFBLGVBQUQsQ0FBQSxDQUhGLENBQUE7QUFBQSxZQUtBLEtBQUEsR0FBUSxLQUFLLENBQUMsS0FMZCxDQUFBO0FBTUEsWUFBQSxJQUFrQyxVQUFsQztBQUFBLGNBQUEsS0FBQSxHQUFRLEtBQUssQ0FBQyxPQUFOLENBQWMsRUFBZCxFQUFrQixHQUFsQixDQUFSLENBQUE7YUFOQTtBQUFBLFlBUUEsQ0FBQSxHQUFJLElBQUMsQ0FBQSxTQUFELENBQVcsT0FBWCxFQUFvQixLQUFwQixFQUEyQixLQUEzQixFQUFrQyxDQUFsQyxFQUFxQyxFQUFyQyxFQUF5QyxTQUF6QyxFQUFvRCxVQUFwRCxDQVJKLENBREY7V0FBQSxNQUFBO0FBV0UsWUFBQSxDQUFBLElBQUssQ0FBQSxHQUFJLFNBQVQsQ0FYRjtXQUZGO0FBQUEsU0FqQkE7QUFBQSxRQWlDQSxvQkFBQSxHQUF1QixJQUFDLENBQUEsd0JBQUQsQ0FBMEIsUUFBQSxHQUFXLEdBQXJDLEVBQTBDLFdBQTFDLEVBQXVELGdCQUF2RCxFQUF5RSxXQUF6RSxDQWpDdkIsQ0FBQTtBQWtDQSxhQUFBLDZEQUFBO2dEQUFBO0FBQ0UsVUFBQSxJQUFDLENBQUEsdUJBQUQsQ0FBeUIsT0FBekIsRUFBa0MsVUFBbEMsRUFBOEMsQ0FBOUMsRUFBaUQsU0FBakQsRUFBNEQsVUFBNUQsRUFBd0UsU0FBeEUsRUFBbUYsV0FBbkYsQ0FBQSxDQURGO0FBQUEsU0FuQ0Y7QUFBQSxPQXRCQTthQTREQSxPQUFPLENBQUMsSUFBUixDQUFBLEVBN0RTO0lBQUEsQ0F0YVgsQ0FBQTs7QUFBQSxnQ0FnZkEsU0FBQSxHQUFXLFNBQUMsT0FBRCxFQUFVLElBQVYsRUFBZ0IsS0FBaEIsRUFBdUIsQ0FBdkIsRUFBMEIsQ0FBMUIsRUFBNkIsU0FBN0IsRUFBd0MsVUFBeEMsR0FBQTtBQUNULFVBQUEscUJBQUE7QUFBQSxNQUFBLE9BQU8sQ0FBQyxTQUFSLEdBQW9CLEtBQXBCLENBQUE7QUFBQSxNQUNBLEtBQUEsR0FBUSxDQURSLENBQUE7QUFFQSxXQUFBLDJDQUFBO3dCQUFBO0FBQ0UsUUFBQSxJQUFHLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBVixDQUFIO0FBQ0UsVUFBQSxJQUFHLEtBQUEsR0FBUSxDQUFYO0FBQ0UsWUFBQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFBLEdBQUUsQ0FBQyxLQUFBLEdBQVEsU0FBVCxDQUFuQixFQUF3QyxDQUF4QyxFQUEyQyxLQUFBLEdBQU0sU0FBakQsRUFBNEQsVUFBNUQsQ0FBQSxDQURGO1dBQUE7QUFBQSxVQUVBLEtBQUEsR0FBUSxDQUZSLENBREY7U0FBQSxNQUFBO0FBS0UsVUFBQSxLQUFBLEVBQUEsQ0FMRjtTQUFBO0FBQUEsUUFPQSxDQUFBLElBQUssU0FQTCxDQURGO0FBQUEsT0FGQTtBQVlBLE1BQUEsSUFBMkUsS0FBQSxHQUFRLENBQW5GO0FBQUEsUUFBQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFBLEdBQUUsQ0FBQyxLQUFBLEdBQVEsU0FBVCxDQUFuQixFQUF3QyxDQUF4QyxFQUEyQyxLQUFBLEdBQU0sU0FBakQsRUFBNEQsVUFBNUQsQ0FBQSxDQUFBO09BWkE7YUFjQSxFQWZTO0lBQUEsQ0FoZlgsQ0FBQTs7QUFBQSxnQ0E2Z0JBLHVCQUFBLEdBQXlCLFNBQUMsT0FBRCxFQUFVLFVBQVYsRUFBc0IsQ0FBdEIsRUFBeUIsU0FBekIsRUFBb0MsVUFBcEMsRUFBZ0QsU0FBaEQsRUFBMkQsV0FBM0QsR0FBQTtBQUN2QixVQUFBLDBCQUFBO0FBQUEsTUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixJQUFDLENBQUEsa0JBQUQsQ0FBb0IsVUFBcEIsQ0FBcEIsQ0FBQTtBQUFBLE1BQ0EsS0FBQSxHQUFRLFVBQVUsQ0FBQyxTQUFYLENBQUEsQ0FBc0IsQ0FBQyxjQUF2QixDQUFBLENBRFIsQ0FBQTtBQUFBLE1BRUEsT0FBQSxHQUFVLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBVixHQUFnQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBRnRDLENBQUE7QUFJQSxNQUFBLElBQUcsT0FBQSxLQUFXLENBQWQ7QUFDRSxRQUFBLE9BQUEsR0FBVSxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQVYsR0FBbUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUF6QyxDQUFBO2VBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFaLEdBQW1CLFNBQXBDLEVBQThDLENBQUEsR0FBRSxVQUFoRCxFQUEyRCxPQUFBLEdBQVEsU0FBbkUsRUFBNkUsVUFBN0UsRUFGRjtPQUFBLE1BQUE7QUFJRSxRQUFBLElBQUcsU0FBQSxLQUFhLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBNUI7QUFDRSxVQUFBLENBQUEsR0FBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQVosR0FBcUIsU0FBekIsQ0FBQTtpQkFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFBLEdBQUUsVUFBckIsRUFBZ0MsV0FBQSxHQUFZLENBQTVDLEVBQThDLFVBQTlDLEVBRkY7U0FBQSxNQUdLLElBQUcsU0FBQSxLQUFhLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBMUI7aUJBQ0gsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsQ0FBakIsRUFBbUIsQ0FBQSxHQUFFLFVBQXJCLEVBQWdDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBVixHQUFtQixTQUFuRCxFQUE2RCxVQUE3RCxFQURHO1NBQUEsTUFBQTtpQkFHSCxPQUFPLENBQUMsUUFBUixDQUFpQixDQUFqQixFQUFtQixDQUFBLEdBQUUsVUFBckIsRUFBZ0MsV0FBaEMsRUFBNEMsVUFBNUMsRUFIRztTQVBQO09BTHVCO0lBQUEsQ0E3Z0J6QixDQUFBOztBQUFBLGdDQXNpQkEsY0FBQSxHQUFnQixTQUFDLE9BQUQsRUFBVSxZQUFWLEVBQXdCLE1BQXhCLEVBQWdDLE9BQWhDLEVBQXlDLFFBQXpDLEdBQUE7QUFDZCxVQUFBLFVBQUE7QUFBQSxNQUFBLFVBQUEsR0FBYSxJQUFDLENBQUEsYUFBRCxDQUFBLENBQUEsR0FBbUIsZ0JBQWhDLENBQUE7YUFDQSxPQUFPLENBQUMsU0FBUixDQUFrQixZQUFsQixFQUNJLENBREosRUFDTyxNQUFBLEdBQVMsVUFEaEIsRUFFSSxZQUFZLENBQUMsS0FGakIsRUFFd0IsUUFBQSxHQUFXLFVBRm5DLEVBR0ksQ0FISixFQUdPLE9BQUEsR0FBVSxVQUhqQixFQUlJLFlBQVksQ0FBQyxLQUpqQixFQUl3QixRQUFBLEdBQVcsVUFKbkMsRUFGYztJQUFBLENBdGlCaEIsQ0FBQTs7QUFzakJBO0FBQUEsa0JBdGpCQTs7QUFBQSxnQ0ErakJBLDJCQUFBLEdBQTZCLFNBQUMsT0FBRCxFQUFVLFlBQVYsRUFBd0IsUUFBeEIsRUFBa0MsT0FBbEMsR0FBQTtBQUMzQixVQUFBLDRCQUFBO0FBQUEsTUFBQSxVQUFBLEdBQWEsUUFBYixDQUFBO0FBRUEsV0FBQSxtREFBQTtrQ0FBQTtBQUNFLFFBQUEsSUFBQyxDQUFBLFNBQUQsQ0FBVyxPQUFYLEVBQW9CLFVBQXBCLEVBQWdDLE1BQU0sQ0FBQyxLQUFQLEdBQWEsQ0FBN0MsRUFBZ0QsVUFBQSxHQUFXLFFBQTNELENBQUEsQ0FBQTtBQUFBLFFBQ0EsVUFBQSxHQUFhLE1BQU0sQ0FBQyxHQURwQixDQURGO0FBQUEsT0FGQTtBQUtBLE1BQUEsSUFBRyxVQUFBLElBQWMsT0FBakI7ZUFDRSxJQUFDLENBQUEsU0FBRCxDQUFXLE9BQVgsRUFBb0IsVUFBcEIsRUFBZ0MsT0FBaEMsRUFBeUMsVUFBQSxHQUFXLFFBQXBELEVBREY7T0FOMkI7SUFBQSxDQS9qQjdCLENBQUE7O0FBQUEsZ0NBOGtCQSxtQkFBQSxHQUFxQixTQUFDLFFBQUQsRUFBVyxPQUFYLEdBQUE7QUFDbkIsVUFBQSxxRkFBQTtBQUFBLE1BQUEsSUFBYyxnQ0FBRCxJQUEwQiwrQkFBdkM7QUFBQSxlQUFPLEVBQVAsQ0FBQTtPQUFBO0FBQUEsTUFFQSxZQUFBLEdBQWU7UUFBQztBQUFBLFVBQUMsS0FBQSxFQUFPLElBQUMsQ0FBQSxpQkFBVDtBQUFBLFVBQTRCLEdBQUEsRUFBSyxJQUFDLENBQUEsZ0JBQWxDO0FBQUEsVUFBb0QsUUFBQSxFQUFVLENBQTlEO1NBQUQ7T0FGZixDQUFBO0FBSUE7QUFBQSxXQUFBLDRDQUFBOzJCQUFBO0FBQ0UsUUFBQSxlQUFBLEdBQWtCLEVBQWxCLENBQUE7QUFDQSxhQUFBLHFEQUFBO21DQUFBO0FBQ0UsVUFBQSxJQUFHLE1BQU0sQ0FBQyxHQUFQLEdBQWEsS0FBSyxDQUFDLEtBQW5CLElBQTZCLE1BQU0sQ0FBQyxXQUFQLEtBQXNCLENBQXREO0FBQ0UsWUFBQSxlQUFlLENBQUMsSUFBaEIsQ0FDRTtBQUFBLGNBQUEsS0FBQSxFQUFPLEtBQUssQ0FBQyxLQUFOLEdBQWMsTUFBTSxDQUFDLFdBQTVCO0FBQUEsY0FDQSxHQUFBLEVBQUssS0FBSyxDQUFDLEdBQU4sR0FBWSxNQUFNLENBQUMsV0FEeEI7QUFBQSxjQUVBLFFBQUEsRUFBVSxLQUFLLENBQUMsUUFGaEI7YUFERixDQUFBLENBREY7V0FBQSxNQU1LLElBQUcsTUFBTSxDQUFDLEdBQVAsR0FBYSxLQUFLLENBQUMsS0FBbkIsSUFBNEIsTUFBTSxDQUFDLEtBQVAsR0FBZSxLQUFLLENBQUMsR0FBcEQ7QUFDSCxZQUFBLGVBQWUsQ0FBQyxJQUFoQixDQUFxQixLQUFyQixDQUFBLENBREc7V0FBQSxNQUFBO0FBR0gsWUFBQSxJQUFHLE1BQU0sQ0FBQyxLQUFQLEdBQWUsS0FBSyxDQUFDLEtBQXhCO0FBQ0UsY0FBQSxlQUFlLENBQUMsSUFBaEIsQ0FDRTtBQUFBLGdCQUFBLEtBQUEsRUFBTyxLQUFLLENBQUMsS0FBYjtBQUFBLGdCQUNBLEdBQUEsRUFBSyxNQUFNLENBQUMsS0FBUCxHQUFlLENBRHBCO0FBQUEsZ0JBRUEsUUFBQSxFQUFVLEtBQUssQ0FBQyxRQUZoQjtlQURGLENBQUEsQ0FERjthQUFBO0FBS0EsWUFBQSxJQUFHLE1BQU0sQ0FBQyxHQUFQLEdBQWEsS0FBSyxDQUFDLEdBQXRCO0FBQ0UsY0FBQSxlQUFlLENBQUMsSUFBaEIsQ0FDRTtBQUFBLGdCQUFBLEtBQUEsRUFBTyxNQUFNLENBQUMsR0FBUCxHQUFhLE1BQU0sQ0FBQyxXQUFwQixHQUFrQyxDQUF6QztBQUFBLGdCQUNBLEdBQUEsRUFBSyxLQUFLLENBQUMsR0FBTixHQUFZLE1BQU0sQ0FBQyxXQUR4QjtBQUFBLGdCQUVBLFFBQUEsRUFBVSxLQUFLLENBQUMsUUFBTixHQUFpQixNQUFNLENBQUMsR0FBeEIsR0FBOEIsQ0FBOUIsR0FBa0MsS0FBSyxDQUFDLEtBRmxEO2VBREYsQ0FBQSxDQURGO2FBUkc7V0FOTDtBQUFBLFVBcUJBLFdBQUEsR0FBYyxlQUFnQixDQUFBLGVBQWUsQ0FBQyxNQUFoQixHQUF5QixDQUF6QixDQXJCOUIsQ0FBQTtBQXNCQSxVQUFBLElBQUcscUJBQUEsSUFBaUIsQ0FBQyxLQUFBLENBQU0sV0FBVyxDQUFDLEdBQWxCLENBQUEsSUFBMEIsS0FBQSxDQUFNLFdBQVcsQ0FBQyxLQUFsQixDQUEzQixDQUFwQjtBQUNFLHFCQURGO1dBdkJGO0FBQUEsU0FEQTtBQUFBLFFBMkJBLFlBQUEsR0FBZSxlQTNCZixDQURGO0FBQUEsT0FKQTtBQUFBLE1Ba0NBLElBQUMsQ0FBQSxvQkFBRCxDQUFzQixZQUF0QixFQUFvQyxRQUFwQyxFQUE4QyxPQUE5QyxDQWxDQSxDQUFBO0FBQUEsTUFvQ0EsSUFBQyxDQUFBLGNBQUQsR0FBa0IsRUFwQ2xCLENBQUE7YUFzQ0EsYUF2Q21CO0lBQUEsQ0E5a0JyQixDQUFBOztBQUFBLGdDQStuQkEsb0JBQUEsR0FBc0IsU0FBQyxZQUFELEVBQWUsUUFBZixFQUF5QixPQUF6QixHQUFBO0FBQ3BCLFVBQUEsUUFBQTtBQUFBLE1BQUEsQ0FBQSxHQUFJLENBQUosQ0FBQTtBQUNBLGFBQU0sQ0FBQSxHQUFJLFlBQVksQ0FBQyxNQUF2QixHQUFBO0FBQ0UsUUFBQSxLQUFBLEdBQVEsWUFBYSxDQUFBLENBQUEsQ0FBckIsQ0FBQTtBQUNBLFFBQUEsSUFBRyxLQUFLLENBQUMsS0FBTixHQUFjLFFBQWpCO0FBQ0UsVUFBQSxLQUFLLENBQUMsUUFBTixJQUFrQixRQUFBLEdBQVcsS0FBSyxDQUFDLEtBQW5DLENBQUE7QUFBQSxVQUNBLEtBQUssQ0FBQyxLQUFOLEdBQWMsUUFEZCxDQURGO1NBREE7QUFJQSxRQUFBLElBQUcsS0FBSyxDQUFDLEdBQU4sR0FBWSxPQUFmO0FBQ0UsVUFBQSxLQUFLLENBQUMsR0FBTixHQUFZLE9BQVosQ0FERjtTQUpBO0FBTUEsUUFBQSxJQUFHLEtBQUssQ0FBQyxLQUFOLElBQWUsS0FBSyxDQUFDLEdBQXhCO0FBQ0UsVUFBQSxZQUFZLENBQUMsTUFBYixDQUFvQixDQUFBLEVBQXBCLEVBQXlCLENBQXpCLENBQUEsQ0FERjtTQU5BO0FBQUEsUUFRQSxDQUFBLEVBUkEsQ0FERjtNQUFBLENBREE7YUFXQSxZQUFZLENBQUMsSUFBYixDQUFrQixTQUFDLENBQUQsRUFBSSxDQUFKLEdBQUE7ZUFBVSxDQUFDLENBQUMsUUFBRixHQUFhLENBQUMsQ0FBQyxTQUF6QjtNQUFBLENBQWxCLEVBWm9CO0lBQUEsQ0EvbkJ0QixDQUFBOztBQUFBLGdDQTJwQkEsWUFBQSxHQUFjLFNBQUMsWUFBRCxHQUFBO2FBQXNCLElBQUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtlQUFHLFlBQVksQ0FBQyxHQUFiLENBQUEsRUFBSDtNQUFBLENBQVgsRUFBdEI7SUFBQSxDQTNwQmQsQ0FBQTs7NkJBQUE7O0tBRDhCLFdBVGhDLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/josemoreira/.atom/packages/minimap/lib/minimap-render-view.coffee