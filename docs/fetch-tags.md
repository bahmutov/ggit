## fetchTags

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
