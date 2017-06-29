## getGitFolder

Returns the root folder, equivalent to command
line `git rev-parse --show-toplevel`

```javascript
require('ggit').getGitFolder()
  .then(folder => {
    ...
  })
```
