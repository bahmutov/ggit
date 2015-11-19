## commit

Commit any changes with a given message. Second argument is optional and will
be added after a blank line to the short main message.

```js
var commit = require('ggit').commit;
commit('added foo', 'long text').then(function () {
    // after commit
});
```

You can pass the entire message if wanted as first argument

```js
var fullMessage = 'first line\n\nbody of message\n';
commit(fullMessage).then(...);
```
