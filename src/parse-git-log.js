var la = require('lazy-ass')
var is = require('check-more-types')

function parseOneLineLog (data) {
  la(is.string(data), 'expected string data', data)

  var lines = data.split('\n')
  lines = lines.filter(function (line) {
    return !!line
  })
  var splitLines = lines.map(function (line) {
    // should be id space log message
    var firstSpace = line.indexOf(' ')
    return {
      id: line.substr(0, firstSpace),
      message: line.substr(firstSpace).trim()
    }
  })
  return splitLines
}

function isNotMergeLine (s) {
  return !/^Merge: /.test(s)
}

/*
  parses single commit message (several lines), like this one

  commit 7fbeb0ada137bc93493731df60bada794d95b13b
  Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
  Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>

    chore(main): Main file with parsing of the message

    This is the main logic

If this is a merge commit, merge line is removed
*/
function parseCommit (oneCommit) {
  la(is.unemptyString(oneCommit), 'expected commit', oneCommit)
  var lines = oneCommit.split('\n')
  lines = lines.filter(isNotMergeLine)

  return {
    id: lines[0].substr(7).trim(),
    message: lines[4],
    body: lines.slice(6)
  }
}

var commitMessageSchema = {
  id: is.unemptyString,
  message: is.unemptyString,
  body: is.maybe.array
}
var isCommitMessage = is.schema.bind(null, commitMessageSchema)

function trim (parsedInfo) {
  la(isCommitMessage(parsedInfo), 'invalid commit info', parsedInfo)

  parsedInfo.message = parsedInfo.message.trim()
  la(
    is.array(parsedInfo.body),
    'expected list of lines in the body',
    parsedInfo
  )
  parsedInfo.body = parsedInfo.body
    .map(function (line) {
      return line.trim()
    })
    .join('\n')
    .trim()
  return parsedInfo
}

/*
  parses git log generated using
    git log --pretty=full

  only looks at lines starting with "commit <SHA>" to separate the commits
*/
function parseCommitLog (data) {
  la(is.string(data), 'expected string data', data)
  // commit [SHA]
  var commits = data.split(/\n(?=commit [0-9a-f]{40})\n?/g)

  return commits.filter(is.unemptyString).map(parseCommit).map(trim)
}

module.exports = {
  parseOneLineLog: parseOneLineLog,
  parseCommitLog: parseCommitLog
}
