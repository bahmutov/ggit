## exec

```javascript
var exec = require('ggit').exec;
var cmd = 'rm -rf folder';
var verbose = true;
exec(cmd, verbose).then(function () {
    console.log('removed folder');
});
```