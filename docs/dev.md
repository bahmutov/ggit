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

## Related projects

* [npm-utils](https://github.com/bahmutov/npm-utils) - small utils for working
with NPM commands.
