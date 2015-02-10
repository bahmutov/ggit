## commits

Returns list of commits in the given folder as a list or object

```js
// commits.all - gets all commits
var commits = require('ggit').commits;
commits.all(gitRepoFolder)
    .then(R.take(2))
    .then(console.table)
    .done();
// commits.byId - transforms list of commits into object
// where keys = ids, values = messages
// For example to get an object with 2 commit ids as keys
commits.all(gitRepoFolder)
    .then(R.take(2))
    .then(commits.byId)
    .then(console.log)
    .done();
```
