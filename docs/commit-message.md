## commitMessage

Returns the contents of the Git current commit message,
usually for validation before the commit.

```js
require('ggit').commitMessage()
    .then(function (text) {
      // do something with the message
    },
    function () {
      // file not found
    });
```

If you pass SHA, it will grab that commit's email, subject and body (if exists)
and return as an object

```js
require('ggit').commitMessage('4df4...')
    .then(console.log)
/*
{
    "email": "foo@email.com",
    "subject": "something something",
    "body": "more details about the commit\nanother line"
}
*/
```
