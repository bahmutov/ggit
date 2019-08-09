var la = require('lazy-ass')
var check = require('check-more-types')
var exec = require('./exec')
var { parseNumstat } = require('./commit-numstat-utils')

function commitNumstat (hash) {
  la(check.unemptyString(hash), 'missing commit hash', hash)

  var cmd = 'git show --numstat ' + hash
  return exec.exec(cmd).then(parseNumstat)
}

module.exports = commitNumstat
