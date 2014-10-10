Bacon=require("../dist/Bacon.js")

var stream = Bacon.fromBinder(function(sink) {
  sink("first value")
  sink([new Bacon.Next("2nd"), new Bacon.Next("3rd")])
  sink(new Bacon.Next(function() {
    return "This one will be evaluated lazily"
  }))
  sink(new Bacon.Error("oops, an error"))
  sink(new Bacon.End())
  return function() { 
     // unsub functionality here, this one's a no-op
  }
})
stream.log()
