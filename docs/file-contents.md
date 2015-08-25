## fileContents

Returns the contents of a file at some point

* filename - full or partial filename (from the repo's root)
* at (optional) - checkpoint, HEAD by default

```javascript
var fileContents = require('ggit').fileContents;
fileContents(filename).then(function (text) { ... });
```

Same as `git show <at>:<name>`

