# ggit v1.1.4

> Local promise-returning git command wrappers

[![NPM][ggit-icon] ][ggit-url]

[![Build status][ggit-ci-image] ][ggit-ci-url]
[![dependencies][ggit-dependencies-image] ][ggit-dependencies-url]
[![devdependencies][ggit-devdependencies-image] ][ggit-devdependencies-url]

[ggit-icon]: https://nodei.co/npm/ggit.png?downloads=true
[ggit-url]: https://npmjs.org/package/ggit
[ggit-ci-image]: https://travis-ci.org/bahmutov/ggit.png?branch=master
[ggit-ci-url]: https://travis-ci.org/bahmutov/ggit
[ggit-dependencies-image]: https://david-dm.org/bahmutov/ggit.png
[ggit-dependencies-url]: https://david-dm.org/bahmutov/ggit
[ggit-devdependencies-image]: https://david-dm.org/bahmutov/ggit/dev-status.png
[ggit-devdependencies-url]: https://david-dm.org/bahmutov/ggit#info=devDependencies



## Stand alone tool

You can install and run this tool as a stand alone CLI application.

    npm install -g ggit
    ggit --help
    # get last commit id in the current folder, save into json file
    ggit last -f build.json

## API

### cloneRepo

```javascript
var clone = require('ggit').cloneRepo;
clone({
    url: 'git@github.com:bahmutov/test-next-updater.git',
    folder: 'folder to create, should not exist yet'
}).then(function () {
    console.log('cloned repo to destination folder');
});
```

### exec

```javascript
var exec = require('ggit').exec;
var cmd = 'rm -rf folder';
var verbose = true;
exec(cmd, verbose).then(function () {
    console.log('removed folder');
});
```

### blame

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



### isTracked

Returns `true` if given path is tracked in the repo.

* path

```javascript
var isTracked = require('ggit').isTracked;
isTracked(filename).then(function (result) {
    // result is true or false
});
```


### hasChanges

Returns `true` if there are local uncommitted stages

```javascript
var changed = require('ggit').hasChanges;
changed().then(function (result) {
    // result is true or false
});
```


### commit

Commit any changes with a given message. Second argument is optional and will 
be added after a blank line to the short main message.

```javascript
var commit = require('ggit').commit;
commit('added foo', 'long text').then(function () {
    // after commit
});
```


### push

Push commits to the remote

```javascript
var psuh = require('ggit').psuh;
psuh().then(function () {
    // after the push
});
```


### commits

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


### trackedFiles

Returns all tracked source files in the given folder matching pattern.
Both folder and pattern are optional.

```js
require('ggit')
    .trackedFiles(__dirname, '*.js')
    .then(function (list) {
        console.log('javascript tracked in the current folder are');
        console.log(list);
    })
    .done();
```


### commitPerLine

Returns an object where for each key (filename) there is a list of commits for each line.

* list of filenames

```js
var perLine = require('ggit').commitPerLine;
perLine(['foo.js', 'bar.js']).then(function (result) {
    /*
    {
        'foo.js': [{
            commit: '3c6b01eb3c96db1cbdf277904545107ef97cbb56',
            author: 'Gleb Bahmutov',
            committer: 'Gleb Bahmutov',
            summary: 'cool commit',
            filename: 'foo.js',
            line: '// actual source line' 
        },
            ...
        }],
        'bar.js': [...]
    }
    */
});
```


### numstat

Returns info for a specific commit - number of lines changed, deleted. 
Same as `$ git show --numstat <id>`.

```js
require('ggit')
    .numstat('5d3ee3')
    .then(function (result) {
        /* result is
            {
                commit: <full commit SHA>,
                author:
                message:
                date:
                changes: {
                    'filename 1': {
                        filename: 'filename 1',
                        added: 10,
                        deleted: 3
                    },
                    ...
                }
            }
        */
    })
    .done();
```


### lastCommitId

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


### branchName

Resolves with the current branch name

```js
require('ggit').branchName()
    .then(function (name) {
        // name = "master" or whatever
    });
```


### changed-files

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




### fileContents

Returns the contents of a file at some point

* filename - full or partial filename (from the repo's root)
* at (optional) - checkpoint, HEAD by default

```javascript
var fileContents = require('ggit').fileContents;
fileContents(filename).then(function (text) { ... });
```

Same as `git show <at>:<name>`






## Development

Edit source, run unit tests, run end to end tests and release
new version commands:

```sh
npm test
grunt release
npm publish
```


### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: [MIT](MIT-License.txt) - do anything with the code, but don't blame uTest if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open
[issue on Github](https://github.com/bahmutov/ggit/issues)


