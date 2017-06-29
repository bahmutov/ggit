var la = require('lazy-ass')
var exec = require('./exec')
var quote = require('quote')
var check = require('check-more-types')

function commit (msg, longMessage) {
  la(check.unemptyString(msg), 'missing commit message', arguments)
  la(
    check.maybe.unemptyString(longMessage),
    'missing long commit message',
    arguments
  )

  var text = msg
  if (check.unemptyString(longMessage)) {
    text += '\n\n' + longMessage
  }

  var cmd = 'git commit -am ' + quote(text)
  return exec(cmd)
}

module.exports = commit
