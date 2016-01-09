## trackedFiles

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
