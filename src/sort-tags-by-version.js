const R = require('ramda')
const semver = require('semver')

// text: output of command "git tag"
function sortTagsByVersion (text) {
  const tags = R.reject(R.isEmpty, R.map(R.trim, R.split('\n', R.trim(text))))
  return tags.sort(semver.compare)
}

module.exports = sortTagsByVersion
