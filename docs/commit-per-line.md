## commitPerLine

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
