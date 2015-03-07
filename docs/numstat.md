## numstat

Returns info for a specific commit - number of lines changed, deleted. 
Same as `$ git show --numstat <id>`.

```js
require('ggit')
    .numstat('5d3ee3')
    .then(function (result) {
        /* result is
            {
                commit: <full commit SHA>,
                author:
                message:
                date:
                changes: {
                    'filename 1': {
                        filename: 'filename 1',
                        added: 10,
                        deleted: 3
                    },
                    ...
                }
            }
        */
    })
    .done();
```
