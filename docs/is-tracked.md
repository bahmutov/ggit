## isTracked

Returns `true` if given path is tracked in the repo.

* path

```javascript
var isTracked = require('ggit').isTracked;
isTracked(filename).then(function (result) {
    // result is true or false
});
```
