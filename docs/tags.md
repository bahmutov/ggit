## tags

Returns list of tags in the given folder, including commit ids.

```js
var tags = require('ggit').tags;
tags().then(function (list) {
  /*
    each object in list is like
  {
    "commit": "7756b5609c5aae651f267fa3fc00763bcd276bf6",
    "tag": "v1.3.0"
  }
  */
})
```
You can return just tags that start with "v" by passing
`true` to `tags`.

```js
tags(true).then(function (list) {...})
```

Oldest tag is returns as first object, latest tag is the
last object in the list.

## branchTags

Similar to `tags`, `branchTags` returns tags in the given folder,
but only those tags accessible from the current branch. Any tags
in the repository that point to a commit on another branch will
not be returned by `branchTags`.

```js
var branchTags = require('ggit').branchTags;
branchTags().then(function (list) {
  /*
    each object in list is like
  {
    "commit": "7756b5609c5aae651f267fa3fc00763bcd276bf6",
    "tag": "v1.3.0"
  }
  */
})
```
You can return just tags that start with "v" by passing
`true` to `branchTags`.

```js
branchTags(true).then(function (list) {...})
```

Oldest tag is returned as first object, latest tag is the
last object in the list.
