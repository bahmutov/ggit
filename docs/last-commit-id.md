## lastCommitId

Returns last commit id

```js
require('ggit')
    .lastCommitId()
    .then(function (str) {
        // str is full SHA id string
    })
    .done();
```

You can pass options object as in `lastCommitId(options)` where

* **file** - save id into the JSON file with the given `file` name.
