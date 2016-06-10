## untrackedFiles

Returns all untracked source files in the repo.

```js
require('ggit')
    .untrackedFiles()
    .then(function (list) {
        // list is Array of strings, could be empty
        console.log('untracked files are');
        console.log(list);
    })
    .done();
```
