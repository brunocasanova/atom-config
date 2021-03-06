{$, React, Reactionary} = require 'atom'
{div, span, a} = Reactionary
RP = React.PropTypes
moment = require 'moment'
{formatDate} = require '../util/blameFormatter'

HASH_LENGTH = 7  # github uses this length
BLANK_HASH = '-'.repeat(HASH_LENGTH)

_defaultDate = null
getDefaultDate = ->
  _defaultDate ?= formatDate moment("2014-01-01T13:37:00 Z")


renderLoading = ->
  div className: 'blame-line loading',
    span className: 'hash', BLANK_HASH
    span className: 'date', getDefaultDate()
    span className: 'committer', 'Loading'

BlameLineComponent = React.createClass
  propTypes:
    date: RP.string.isRequired
    hash: RP.string.isRequired
    remoteRevision: RP.object.isRequired
    author: RP.string.isRequired
    committer: RP.string.isRequired
    committerDate: RP.string.isRequired
    summary: RP.string.isRequired
    backgroundClass: RP.string
    noCommit: RP.bool

  render: ->
    if @props.noCommit
      div className: 'blame-line no-commit text-subtle',
        span className: 'hash', BLANK_HASH
        span className: 'date', @props.date
        span className: 'committer', 'Nobody'
    else
      url = @props.remoteRevision.url @props.hash
      div className: 'blame-line ' + @props.backgroundClass,
        a className: 'hash', href: url,
          @props.hash.substring(0, HASH_LENGTH)
        span className: 'date', @props.date
        span className: 'committer text-highlight',
          @props.author.split(' ').slice(-1)[0]

  componentDidMount: ->
    $el = $(@getDOMNode())
    if @props.summary
      $el.setTooltip
        title: @props.summary
        placement: "auto left"

  componentWillUnmount: ->
    $(@getDOMNode()).tooltip "destroy"

  shouldComponentUpdate: ({hash}) ->
    hash isnt @props.hash

module.exports = {BlameLineComponent, renderLoading}
