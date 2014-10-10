Bacon=require "../src/Bacon.coffee"

randomIntervals = Bacon.fromGenerator (push) ->
  setTimeout (-> push new Bacon.Next("hello")), Math.random()*10000

randomIntervals.log()

