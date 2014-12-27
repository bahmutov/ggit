# ggit v0.6.0

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

Commit any changes with given message

```javascript
var commit = require('ggit').commit;
commit('added foo').then(function () {
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





## Development

Edit source, run unit tests, run end to end tests and release
new version commands:

```sh
npm test
grunt release
npm publish
```


## MIT License

Copyright 2013 Gleb Bahmutov <gleb.bahmutov@gmail.com>
https://github.com/bahmutov/ggit.git

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

