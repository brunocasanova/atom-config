{$$, EditorView, View} = require 'atom'
marked = require 'marked'
_ = require 'lodash'

module.exports =

class GitIssueView extends View
  @content: ->
    @section 'class':'padded pane-item', =>
      @h1 'class':'section-heading', 'GitHub Issues'
      @div 'data-element':'issue-list'
  constructor: (opt={}) ->
    super
    console.log opt
    {@issues} = opt
    issueList = @issues
      .sort (a,b) -> +a.number - +b.number
      .map (issue) ->
        "<h2 class=section-heading>##{issue.number}: #{issue.title}</h2><div>#{(marked issue.body) or ''}</div>"
    issueList.forEach (issue) =>
      @find('[data-element="issue-list"]').append("<div class=block>#{issue}</div>")

  getTitle: -> 'GitHub Issues'
  getUri: -> 'github-issues://list'
