## trackedFiles

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
