GitShowView = require './git-show-view'

module.exports =
  gitShowView: null

  activate: (state) ->
    @gitShowView = new GitShowView(state.gitShowViewState)

  deactivate: ->
    @gitShowView.destroy()

  serialize: ->
    gitShowViewState: @gitShowView.serialize()
