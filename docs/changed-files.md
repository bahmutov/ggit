## changed-files

Returns list of modified files

```javascript
var changedFiles = require('ggit').changedFiles;
changedFiles()
    .then(function (files) {})
    .catch(function (error) {});
```

The object `files` groups filenames by modification property

```js
{
    A: [...], // list of added files
    C: [...], // list of copied files
    M: [...], // list of modified files
    D: [...]  // list of deleted files
}
// each item in the list is
{
    diff: 'A' // or C, M, D
    name: 'src/something.js' // relative to the repo root
    filename: 'full path',
    before: 'file contents', // if available (for example M, D)
    after: 'file contents' // if available (for A, M)
}
```

This is a wrapper around command `git diff --name-status --diff-filter=ACMD`.


