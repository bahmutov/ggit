## commitMessage

Returns the contents of the Git current commit message,
usually for validation before the commit.

```js
require('ggit').commitMessage()
    .then(function (text) {});
```
