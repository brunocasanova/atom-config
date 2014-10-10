B = require("../src/Bacon")
fs = require("fs")

stream = fs.createReadStream("README.md")

B.fromEventTarget(stream, "data").takeUntil(B.fromEventTarget(stream, "end")).log()

