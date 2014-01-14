## cloneRepo

```javascript
var clone = require('ggit').cloneRepo;
clone({
    url: 'git@github.com:bahmutov/test-next-updater.git',
    folder: 'folder to create, should not exist yet'
}).then(function () {
    console.log('cloned repo to destination folder');
});
```