## blame

Finds last person who has touched specific line in a file

* filename - full or partial filename (from the repo's root)
* lineNumber - starts with 1

```javascript
var blame = require('ggit').blame;
blame(filename, lineNumber).then(function (info) {
  /*
    info is object with fields like
    { commit: '6e65f8ec5ed63cac92ed130b1246d9c23223c04e',
      author: 'Gleb Bahmutov',
      committer: 'Gleb Bahmutov',
      summary: 'adding blame feature',
      filename: 'test/blame.js',
      line: 'var blame = require(\'../index\').blame;' }
  */
});
```

Equivalent to porcelain git output: see [git-blame](http://git-scm.com/docs/git-blame)

