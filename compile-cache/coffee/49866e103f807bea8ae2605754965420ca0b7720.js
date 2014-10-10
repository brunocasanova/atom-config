(function() {
  var getCommands, git;

  git = require('./git');

  getCommands = function() {
    var GitAdd, GitAddAllAndCommit, GitAddAndCommit, GitBranch, GitCheckoutAllFiles, GitCheckoutCurrentFile, GitCherryPick, GitCommit, GitCommitAmend, GitDiff, GitDiffAll, GitFetch, GitInit, GitLog, GitPull, GitPush, GitRemove, GitShow, GitStageFiles, GitStageHunk, GitStashApply, GitStashDrop, GitStashPop, GitStashSave, GitStatus, GitTags, GitUnstageFiles, commands, _ref;
    GitAdd = require('./models/git-add');
    GitAddAllAndCommit = require('./models/git-add-all-and-commit');
    GitAddAndCommit = require('./models/git-add-and-commit');
    GitBranch = require('./models/git-branch');
    GitCheckoutAllFiles = require('./models/git-checkout-all-files');
    GitCheckoutCurrentFile = require('./models/git-checkout-current-file');
    GitCherryPick = require('./models/git-cherry-pick');
    GitCommit = require('./models/git-commit');
    GitCommitAmend = require('./models/git-commit-amend');
    GitDiff = require('./models/git-diff');
    GitDiffAll = require('./models/git-diff-all');
    GitFetch = require('./models/git-fetch');
    GitInit = require('./models/git-init');
    GitLog = require('./models/git-log');
    GitPull = require('./models/git-pull');
    GitPush = require('./models/git-push');
    GitRemove = require('./models/git-remove');
    GitShow = require('./models/git-show');
    GitStageFiles = require('./models/git-stage-files');
    GitStageHunk = require('./models/git-stage-hunk');
    GitStashApply = require('./models/git-stash-apply');
    GitStashDrop = require('./models/git-stash-drop');
    GitStashPop = require('./models/git-stash-pop');
    GitStashSave = require('./models/git-stash-save');
    GitStatus = require('./models/git-status');
    GitTags = require('./models/git-tags');
    GitUnstageFiles = require('./models/git-unstage-files');
    commands = [];
    if (atom.project.getRepo() != null) {
      git.refresh();
      if (((_ref = atom.workspace.getActiveEditor()) != null ? _ref.getPath() : void 0) != null) {
        commands.push([
          'git-plus:add', 'Add', function() {
            return GitAdd();
          }
        ]);
        commands.push([
          'git-plus:log-current-file', 'Log Current File', function() {
            return GitLog(true);
          }
        ]);
        commands.push([
          'git-plus:remove-current-file', 'Remove Current File', function() {
            return GitRemove();
          }
        ]);
        commands.push([
          'git-plus:checkout-current-file', 'Checkout Current File', function() {
            return GitCheckoutCurrentFile();
          }
        ]);
      }
      commands.push([
        'git-plus:add-all', 'Add All', function() {
          return GitAdd(true);
        }
      ]);
      commands.push([
        'git-plus:add-all-and-commit', 'Add All And Commit', function() {
          return GitAddAllAndCommit();
        }
      ]);
      commands.push([
        'git-plus:add-and-commit', 'Add And Commit', function() {
          return GitAddAndCommit();
        }
      ]);
      commands.push([
        'git-plus:checkout', 'Checkout', function() {
          return GitBranch.gitBranches();
        }
      ]);
      commands.push([
        'git-plus:checkout-all-files', 'Checkout All Files', function() {
          return GitCheckoutAllFiles();
        }
      ]);
      commands.push([
        'git-plus:cherry-pick', 'Cherry-Pick', function() {
          return GitCherryPick();
        }
      ]);
      commands.push([
        'git-plus:commit', 'Commit', function() {
          return new GitCommit;
        }
      ]);
      commands.push([
        'git-plus:commit-amend', 'Commit Amend', function() {
          return GitCommitAmend();
        }
      ]);
      commands.push([
        'git-plus:diff', 'Diff', function() {
          return GitDiff();
        }
      ]);
      commands.push([
        'git-plus:diff-all', 'Diff All', function() {
          return GitDiffAll();
        }
      ]);
      commands.push([
        'git-plus:fetch', 'Fetch', function() {
          return GitFetch();
        }
      ]);
      commands.push([
        'git-plus:log', 'Log', function() {
          return GitLog();
        }
      ]);
      commands.push([
        'git-plus:new-branch', 'Checkout New Branch', function() {
          return GitBranch.newBranch();
        }
      ]);
      commands.push([
        'git-plus:pull', 'Pull', function() {
          return GitPull();
        }
      ]);
      commands.push([
        'git-plus:push', 'Push', function() {
          return GitPush();
        }
      ]);
      commands.push([
        'git-plus:remove', 'Remove', function() {
          return GitRemove(true);
        }
      ]);
      commands.push([
        'git-plus:reset', 'Reset HEAD', function() {
          return git.reset();
        }
      ]);
      commands.push([
        'git-plus:show', 'Show', function() {
          return GitShow();
        }
      ]);
      commands.push([
        'git-plus:stage-files', 'Stage Files', function() {
          return GitStageFiles();
        }
      ]);
      commands.push([
        'git-plus:stage-hunk', 'Stage Hunk', function() {
          return GitStageHunk();
        }
      ]);
      commands.push([
        'git-plus:stash-save-changes', 'Stash: Save Changes', function() {
          return GitStashSave();
        }
      ]);
      commands.push([
        'git-plus:stash-pop', 'Stash: Apply (Pop)', function() {
          return GitStashPop();
        }
      ]);
      commands.push([
        'git-plus:stash-apply', 'Stash: Apply (Keep)', function() {
          return GitStashApply();
        }
      ]);
      commands.push([
        'git-plus:stash-delete', 'Stash: Delete (Drop)', function() {
          return GitStashDrop();
        }
      ]);
      commands.push([
        'git-plus:status', 'Status', function() {
          return GitStatus();
        }
      ]);
      commands.push([
        'git-plus:tags', 'Tags', function() {
          return GitTags();
        }
      ]);
      commands.push([
        'git-plus:unstage-files', 'Unstage Files', function() {
          return GitUnstageFiles();
        }
      ]);
    } else {
      commands.push([
        'git-plus:init', 'Init', function() {
          return GitInit();
        }
      ]);
    }
    return commands;
  };

  module.exports = getCommands;

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGdCQUFBOztBQUFBLEVBQUEsR0FBQSxHQUFNLE9BQUEsQ0FBUSxPQUFSLENBQU4sQ0FBQTs7QUFBQSxFQUVBLFdBQUEsR0FBYyxTQUFBLEdBQUE7QUFDWixRQUFBLDZXQUFBO0FBQUEsSUFBQSxNQUFBLEdBQXlCLE9BQUEsQ0FBUSxrQkFBUixDQUF6QixDQUFBO0FBQUEsSUFDQSxrQkFBQSxHQUF5QixPQUFBLENBQVEsaUNBQVIsQ0FEekIsQ0FBQTtBQUFBLElBRUEsZUFBQSxHQUF5QixPQUFBLENBQVEsNkJBQVIsQ0FGekIsQ0FBQTtBQUFBLElBR0EsU0FBQSxHQUF5QixPQUFBLENBQVEscUJBQVIsQ0FIekIsQ0FBQTtBQUFBLElBSUEsbUJBQUEsR0FBeUIsT0FBQSxDQUFRLGlDQUFSLENBSnpCLENBQUE7QUFBQSxJQUtBLHNCQUFBLEdBQXlCLE9BQUEsQ0FBUSxvQ0FBUixDQUx6QixDQUFBO0FBQUEsSUFNQSxhQUFBLEdBQXlCLE9BQUEsQ0FBUSwwQkFBUixDQU56QixDQUFBO0FBQUEsSUFPQSxTQUFBLEdBQXlCLE9BQUEsQ0FBUSxxQkFBUixDQVB6QixDQUFBO0FBQUEsSUFRQSxjQUFBLEdBQXlCLE9BQUEsQ0FBUSwyQkFBUixDQVJ6QixDQUFBO0FBQUEsSUFTQSxPQUFBLEdBQXlCLE9BQUEsQ0FBUSxtQkFBUixDQVR6QixDQUFBO0FBQUEsSUFVQSxVQUFBLEdBQXlCLE9BQUEsQ0FBUSx1QkFBUixDQVZ6QixDQUFBO0FBQUEsSUFXQSxRQUFBLEdBQXlCLE9BQUEsQ0FBUSxvQkFBUixDQVh6QixDQUFBO0FBQUEsSUFZQSxPQUFBLEdBQXlCLE9BQUEsQ0FBUSxtQkFBUixDQVp6QixDQUFBO0FBQUEsSUFhQSxNQUFBLEdBQXlCLE9BQUEsQ0FBUSxrQkFBUixDQWJ6QixDQUFBO0FB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
//# sourceURL=/Users/josemoreira/.atom/packages/git-plus/lib/git-plus-commands.coffee