const commits = require('./commits')
const numstat = require('./commit-numstat')
const la = require('lazy-ass')
const is = require('check-more-types')
const R = require('ramda')
const debug = require('debug')('ggit')

const ids = R.map(R.prop('id'))
const stats = R.map(numstat)
const wait = list => Promise.all(list)
const changes = R.map(R.prop('changes'))
const justFiles = R.compose(R.uniq, R.flatten, R.map(R.keys))

// returns list of unique changed file after the given commit
function changedFilesAfter (sha) {
  la(is.unemptyString(sha), 'missing from SHA', sha)
  debug('changed files after %s', sha)
  return commits
    .after(sha)
    .then(ids)
    .then(
      R.tap(list => {
        debug('commits')
        debug(list)
      })
    )
    .then(stats)
    .then(wait)
    .then(changes)
    .then(justFiles)
}

if (!module.parent) {
  changedFilesAfter('a12f55f').then(console.log).catch(console.error)
}

module.exports = changedFilesAfter
