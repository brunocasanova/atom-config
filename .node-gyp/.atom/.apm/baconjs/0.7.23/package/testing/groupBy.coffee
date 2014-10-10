Bacon=require "../src/Bacon.coffee"

Bacon.Observable :: takeWhileInclusive = (f) ->
  @withHandler (event) ->
    if event.filter(f)
      @push event
    else
      @push event
      @push new Bacon.End()
      Bacon.noMore

Bacon.Observable :: flattenAndConcat = ->
  this.flatMap((obs) ->
    obs.fold([], (xs,x) ->
      xs.concat(x)))

Bacon.Observable :: flattenAndMerge = ->
  this.flatMap(Bacon._.id)

input = Bacon.sequentially(1000, [
  {req:0, msg:"never complete"}
  {req:1, msg:"foo"}
  {req:2, msg:"bar"}
  {req:1, type: "response"}
  {req:3, msg:"hello"}
  {req:3, type: "response"}
  {req:2, type: "response"}
])

result = input.groupBy(
  (x) -> x.req
  (msgs) -> msgs.takeWhileInclusive((x) -> x.type != "response").takeUntil(Bacon.later(2500))
)

result.flattenAndConcat().log("sub1")
result.flattenAndConcat().log("sub2")
