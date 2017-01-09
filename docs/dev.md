# Development

Edit source, run unit tests, run end to end tests and push the code
back to Github. The NPM publishing happens automatically using
[semantic release](https://github.com/semantic-release/semantic-release)

```sh
npm test
npm run commit
git push
```

To debug problems, run the command with `DEBUG=ggit` environment variable enabled
to see verbose logging.

## Unit tests

Some of the unit tests rely on extracting private functions from modules
using [scope magic with `describe-it`](https://github.com/bahmutov/describe-it),
which requires Node 4.2.2 and might not work with later Node versions.

## Related projects

* [npm-utils](https://github.com/bahmutov/npm-utils) - small utils for working
with NPM commands.
