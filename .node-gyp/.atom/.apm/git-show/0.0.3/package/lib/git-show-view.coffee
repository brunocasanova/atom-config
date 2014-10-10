{View} = require 'atom'

module.exports =
class GitShowView extends View
  @content: ->
    @div class: 'git-show overlay from-top', =>
      @div "The GitShow package is Alive! It's ALIVE!", class: "message"

  initialize: (serializeState) ->
    atom.workspaceView.command "git-show:toggle", => @toggle()

  # Returns an object that can be retrieved when package is activated
  serialize: ->

  # Tear down any state and detach
  destroy: ->
    @detach()

  toggle: ->
    console.log "GitShowView was toggled!"
    if @hasParent()
      @detach()
    else
      atom.workspaceView.append(this)
