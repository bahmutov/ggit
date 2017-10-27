var Q = require('q')
var exists = require('fs').existsSync
var read = require('fs').readFileSync
const join = require('path').join
var gitFolder = require('./git-folder')
var exec = require('./exec')
var la = require('lazy-ass')
var is = require('check-more-types')
var debug = require('debug')('ggit')

function currentCommitMessage () {
  debug('getting current commit message')

  return gitFolder()
    .then(root => join(root, '.git', 'COMMIT_EDITMSG'))
    .then(filename => {
      if (!exists(filename)) {
        return Q.reject(new Error('Cannot find file ' + filename))
      }

      var text = read(filename, 'utf8')
      /* jshint -W064 */
      return Q(text.trim())
    })
}

/*
  output of command
    git show --format="%ae%n%s%n%b" --no-patch <sha>
  is something like
    email
    subject
    body (optional)

  this method returns object with these fields
*/
function parseCommitMessage (output) {
  la(is.unemptyString(output), 'expected "git show" command output')
  const lines = output
    .split('\n')
    .map(s => s.trim())
    .filter(is.unemptyString)
  la(
    lines.length >= 2,
    'commit message should at least have email and subject',
    output
  )
  const body = lines.length > 2 ? lines.slice(2).join('\n') : null
  return {
    email: lines[0],
    subject: lines[1],
    body: body
  }
}

function commitMessageFor (sha) {
  la(is.unemptyString(sha), 'expected commit sha', sha)
  debug('getting commit message for', sha)
  const cmd = 'git show --format="%ae%n%s%n%b" --no-patch ' + sha
  return exec(cmd).then(parseCommitMessage)
}

function commitMessage (sha) {
  if (sha) {
    return commitMessageFor(sha)
  }
  return currentCommitMessage()
}

module.exports = {
  commitMessage: commitMessage,
  commitMessageFor: commitMessageFor,
  parseCommitMessage: parseCommitMessage
}

if (!module.parent) {
  const sha = process.argv[2]
  console.log('demo for commit', sha)
  commitMessage(sha).then(console.log, console.error)
}
