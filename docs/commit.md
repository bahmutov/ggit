## commit

Commit any changes with a given message. Second argument is optional and will 
be added after a blank line to the short main message.

```javascript
var commit = require('ggit').commit;
commit('added foo', 'long text').then(function () {
    // after commit
});
```
