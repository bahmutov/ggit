# ggit

> Local promise-returning git command wrappers

[![NPM][ggit-icon] ][ggit-url]

[![Build status][ggit-ci-image] ][ggit-ci-url]
[![dependencies][ggit-dependencies-image] ][ggit-dependencies-url]
[![devdependencies][ggit-devdependencies-image] ][ggit-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)

[ggit-icon]: https://nodei.co/npm/ggit.svg?downloads=true
[ggit-url]: https://npmjs.org/package/ggit
[ggit-ci-image]: https://travis-ci.org/bahmutov/ggit.svg?branch=master
[ggit-ci-url]: https://travis-ci.org/bahmutov/ggit
[ggit-dependencies-image]: https://david-dm.org/bahmutov/ggit.svg
[ggit-dependencies-url]: https://david-dm.org/bahmutov/ggit
[ggit-devdependencies-image]: https://david-dm.org/bahmutov/ggit/dev-status.svg
[ggit-devdependencies-url]: https://david-dm.org/bahmutov/ggit#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release



## Stand alone tool

You can install and run this tool as a stand alone CLI application.

    npm install -g ggit
    ggit --help
    # get last commit id in the current folder, save into json file
    ggit-last -f build.json

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

```js
var commit = require('ggit').commit;
commit('added foo', 'long text').then(function () {
    // after commit
});
```

You can pass the entire message if wanted as first argument

```js
var fullMessage = 'first line\n\nbody of message\n';
commit(fullMessage).then(...);
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

Each object has at least 'id', 'message' and (maybe empty) 'body' properties.

You can also return just the commits starting from the last version tag
(which usually starts with 'v'). This is useful for semantic release code.

```js
var commits = require('ggit').commits;
commits.afterLastTag()
  .then(function (list) { ... })
```

You can get commits after certain SHA

```js
var commits = require('ggit').commits;
commits.after('439...')
  .then(function (list) { ... })
```


### trackedFiles

Returns all tracked source files in the given folder matching pattern.
Both folder and pattern are optional.

```js
require('ggit')
    .trackedFiles(__dirname, '*.js', options)
    .then(function (list) {
        console.log('javascript tracked in the current folder are');
        console.log(list);
    })
    .done();
```

The `options` argument is optional, and is passed directly to the 
[glob](https://www.npmjs.com/package/glob) package that does file discovery.
The only important option to use is `{ dot: true }` - if you want to find the
filenames that start with `.`. For example to find ALL files in the repo call

```js
require('ggit')
    .trackedFiles(__dirname, '**', { dot: true })
// returns .gitignore, .travis.yml, index.js etc
```


### untrackedFiles

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


### changedFiles

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

This is a wrapper around two commands `git diff --name-status --diff-filter=ACMD`
and `git status --porcelain`




### changedFilesAfter

Returns list of unique files modified / added / deleted after given commit.
The commits are limited to specific branch (usually "master") to avoid mixing
up multiple branches.

```javascript
var changedFilesAfter = require('ggit').changedFilesAfter;
changedFilesAfter('a12f55f', 'master')
    .then(console.log)
    .catch(console.error);
/*
something like
[ 'README.md',
  'docs/commits.md',
  'src/commits.js',
  'src/get-one-line-log.js',
  'package.json',
  'src/last-commit-id.js' ]
*/
```


### fileContents

Returns the contents of a file at some point

* filename - full or partial filename (from the repo's root)
* at (optional) - checkpoint, HEAD by default

```javascript
var fileContents = require('ggit').fileContents;
fileContents(filename).then(function (text) { ... });
```

Same as `git show <at>:<name>`



### commitMessage

Returns the contents of the Git current commit message,
usually for validation before the commit.

```js
require('ggit').commitMessage()
    .then(function (text) {
      // do something with the message
    },
    function () {
      // file not found
    });
```


### getGitFolder

Returns the root folder, equivalent to command
line `git rev-parse --show-toplevel`

```javascript
require('ggit').getGitFolder()
  .then(folder => {
    ...
  })
```


### tags

> Requires `git` >= 2.0

Returns list of tags in the given folder, including commit ids.

```js
var tags = require('ggit').tags;
tags().then(function (list) {
  /*
    each object in list is like
  {
    "commit": "7756b5609c5aae651f267fa3fc00763bcd276bf6",
    "tag": "v1.3.0"
  }
  */
})
```
You can return just tags that start with "v" by passing
`true` to `tags`.

```js
tags(true).then(function (list) {...})
```

Oldest tag is returns as first object, latest tag is the
last object in the list.

If you have older `git` (like Travis does), it will automatically try to
grab all the tags and sort them using
[semantic sort](https://github.com/semver/node-semver#comparison)

### branchTags

> Requires `git` >= 2.7

Similar to `tags`, `branchTags` returns tags in the given folder,
but only those tags accessible from the current branch. Any tags
in the repository that point to a commit on another branch will
not be returned by `branchTags`.

```js
var branchTags = require('ggit').branchTags;
branchTags().then(function (list) {
  /*
    each object in list is like
  {
    "commit": "7756b5609c5aae651f267fa3fc00763bcd276bf6",
    "tag": "v1.3.0"
  }
  */
})
```
You can return just tags that start with "v" by passing
`true` to `branchTags`.

```js
branchTags(true).then(function (list) {...})
```

Oldest tag is returned as first object, latest tag is the
last object in the list.


### fetchTags

Fetches remote tags from origin.

```js
var fetchTags = require('ggit').fetchTags;
fetchTags().then(function () {
  // should be same as running command
  // git pull origin --tags
})
```

You can pass the branch name, by default will fetch
from master

```js
fetchTags('development')
```





## Development

Edit source, run unit tests, run end to end tests and push the code
back to Github. The NPM publishing happens automatically using
[semantic release](https://github.com/semantic-release/semantic-release)

```sh
npm test
npm run commit
git push
```

To debug problems, run the command with `DEBUG=ggit` environment variable enabled
to see verbose logging.

### Unit tests

Some of the unit tests rely on extracting private functions from modules
using [scope magic with `describe-it`](https://github.com/bahmutov/describe-it),
which requires Node 4.2.2 and might not work with later Node versions.

### Related projects

* [npm-utils](https://github.com/bahmutov/npm-utils) - small utils for working
with NPM commands.



### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: [MIT](LICENSE) - do anything with the code, but don't blame uTest if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet / open
[issue on Github](https://github.com/bahmutov/ggit/issues)


