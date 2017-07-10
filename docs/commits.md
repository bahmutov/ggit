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

Each object has at least 'id', 'message' and (maybe empty) 'body' properties.

You can also return just the commits starting from the last version tag
(which usually starts with 'v'). This is useful for semantic release code.

```sh
var commits = require('ggit').commits;
commits.afterLastTag()
  .then(function (list) { ... })
```

You can get commits after certain SHA

```sh
var commits = require('ggit').commits;
commits.after('439...')
  .then(function (list) { ... })
```
