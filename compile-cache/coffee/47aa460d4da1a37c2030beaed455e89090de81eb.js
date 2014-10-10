(function() {
  var $, EditorView, InputView, ListView, Os, Path, View, fs, git, prepFile, showCommitFilePath, showFile, showObject, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Os = require('os');

  Path = require('path');

  fs = require('fs-plus');

  _ref = require('atom'), $ = _ref.$, EditorView = _ref.EditorView, View = _ref.View;

  git = require('../git');

  ListView = require('../views/branch-list-view');

  showCommitFilePath = function() {
    return Path.join(Os.tmpDir(), "atom_git_plus_commit.diff");
  };

  showObject = function(objectHash, file) {
    var args;
    args = ['show'];
    if (atom.config.get('git-plus.wordDiff')) {
      args.push('--word-diff');
    }
    args.push(objectHash);
    if (file != null) {
      args.push('--');
      args.push(file);
    }
    return git.cmd({
      args: args,
      stdout: function(data) {
        return prepFile(data);
      }
    });
  };

  prepFile = function(text) {
    fs.writeFileSync(showCommitFilePath(), text, {
      flag: 'w+'
    });
    return showFile();
  };

  showFile = function() {
    var split;
    split = atom.config.get('git-plus.openInPane') ? atom.config.get('git-plus.splitPane') : void 0;
    return atom.workspace.open(showCommitFilePath(), {
      split: split,
      activatePane: true
    });
  };

  InputView = (function(_super) {
    __extends(InputView, _super);

    function InputView() {
      return InputView.__super__.constructor.apply(this, arguments);
    }

    InputView.content = function() {
      return this.div({
        "class": 'overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.subview('objectHash', new EditorView({
            mini: true,
            placeholderText: 'Commit hash to show'
          }));
        };
      })(this));
    };

    InputView.prototype.initialize = function(callback) {
      atom.workspaceView.append(this);
      this.objectHash.focus();
      return this.objectHash.on('core:confirm', (function(_this) {
        return function() {
          var name, text;
          text = $(_this).text().split(' ');
          name = text.length === 2 ? text[1] : text[0];
          callback(text);
          return _this.detach();
        };
      })(this));
    };

    return InputView;

  })(View);

  module.exports = function(objectHash, file) {
    if (objectHash == null) {
      return new InputView(showObject);
    } else {
      return showObject(objectHash, file);
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLHFIQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQSxFQUFBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FBTCxDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLEVBQUEsR0FBSyxPQUFBLENBQVEsU0FBUixDQUZMLENBQUE7O0FBQUEsRUFJQSxPQUF3QixPQUFBLENBQVEsTUFBUixDQUF4QixFQUFDLFNBQUEsQ0FBRCxFQUFJLGtCQUFBLFVBQUosRUFBZ0IsWUFBQSxJQUpoQixDQUFBOztBQUFBLEVBTUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxRQUFSLENBTk4sQ0FBQTs7QUFBQSxFQU9BLFFBQUEsR0FBVyxPQUFBLENBQVEsMkJBQVIsQ0FQWCxDQUFBOztBQUFBLEVBU0Esa0JBQUEsR0FBcUIsU0FBQSxHQUFBO1dBQ25CLElBQUksQ0FBQyxJQUFMLENBQVUsRUFBRSxDQUFDLE1BQUgsQ0FBQSxDQUFWLEVBQXVCLDJCQUF2QixFQURtQjtFQUFBLENBVHJCLENBQUE7O0FBQUEsRUFZQSxVQUFBLEdBQWEsU0FBQyxVQUFELEVBQWEsSUFBYixHQUFBO0FBQ1gsUUFBQSxJQUFBO0FBQUEsSUFBQSxJQUFBLEdBQU8sQ0FBQyxNQUFELENBQVAsQ0FBQTtBQUNBLElBQUEsSUFBMkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLG1CQUFoQixDQUEzQjtBQUFBLE1BQUEsSUFBSSxDQUFDLElBQUwsQ0FBVSxhQUFWLENBQUEsQ0FBQTtLQURBO0FBQUEsSUFFQSxJQUFJLENBQUMsSUFBTCxDQUFVLFVBQVYsQ0FGQSxDQUFBO0FBR0EsSUFBQSxJQUFHLFlBQUg7QUFDRSxNQUFBLElBQUksQ0FBQyxJQUFMLENBQVUsSUFBVixDQUFBLENB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/models/git-show.coffee