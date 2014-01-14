# ggit v0.0.10

> Local git command wrappers

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

