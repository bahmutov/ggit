## hasChanges

Returns `true` if there are local uncommitted stages

```javascript
var changed = require('ggit').hasChanges;
changed().then(function (result) {
    // result is true or false
});
```
