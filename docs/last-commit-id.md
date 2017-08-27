## lastCommitId

Returns last commit id

```js
require('ggit')
    .lastCommitId()
    .then(function (str) {
        // str is full SHA id string
    })
    .done();
```

You can pass options object as in `lastCommitId(options)` where

* **file** - save id into the JSON file with the given `file` name.

When saving into a file, it will grab version from `package.json` (if the file exists),
current ISO timestamp + Eastern Standard Timezon timestamp, so the full JSON will look
something like this

```json
{ 
    "id": "d3d9f1656ded06c490b12a9ec5636d80dfd932eb",
    "short": "d3d9f16",
    "savedAt": "2017-08-24T18:58:27.210Z",
    "EST": "2017-08-24T14:58:27-04:00",
    "version": "1.2.3" ,
    "branch": "master"
}
```

If you pass option `{message: true}` the output will also have cropped commit subject string,
making finding the deploy easier.

```json
{ 
    "id": "d3d9f1656ded06c490b12a9ec5636d80dfd932eb",
    "short": "d3d9f16",
    "savedAt": "2017-08-24T18:58:27.210Z",
    "EST": "2017-08-24T14:58:27-04:00",
    "message": "feat(build): ad...",
    "version": "1.2.3" 
}
```
