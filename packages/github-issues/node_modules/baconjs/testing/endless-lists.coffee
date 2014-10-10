Bacon=require "../src/Bacon.coffee"

integers = ->
  i = 1
  Bacon.fromSynchronousGenerator -> new Bacon.Next(-> i++)

integers()
  .flatMap((x) ->
    integers().take(x)
  )
  .take(10).log()
