AtomGitShow = require '../lib/git-show'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe "Git Show", ->
  activationPromise = null

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    activationPromise = atom.packages.activatePackage('GitShow')

  describe "when the git-show:toggle event is triggered", ->
    it "attaches and then detaches the view", ->
      expect(atom.workspaceView.find('.git-show')).not.toExist()

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.workspaceView.trigger 'git-show:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.workspaceView.find('.git-show')).toExist()
        atom.workspaceView.trigger 'git-show:toggle'
        expect(atom.workspaceView.find('.git-show')).not.toExist()
