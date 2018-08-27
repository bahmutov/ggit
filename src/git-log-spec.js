var parseCommit = require('./git-log').parseCommit
var getGitLog = require('./git-log').getGitLog
const la = require('lazy-ass')
const is = require('check-more-types')

/* eslint-env mocha */
describe('parse commit', () => {
  it('string comparison', function stringComparison () {
    la('foo', 'foo', 'two strings are equal')
    var foo = 'foo'
    la(foo === 'foo', 'two strings are equal')
    var o = {
      foo: 'foo'
    }
    la(o.foo === 'foo', 'two strings are equal')
  })

  it('compares ids', function compareIds () {
    var id1 = '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348'
    var id2 = '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348'
    la(id1 === id2, 'same strings')
  })

  it('is a function', () => {
    la(is.fn(parseCommit), 'is a function')
  })

  it('basic', function basic () {
    var data =
      'commit 4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
      'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
      'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
      '  simpler history module structure\n\n' +
      'M       index.js\n' +
      'M       src/fileHistory.js\n'
    var info = parseCommit(data)
    la(is.object(info), 'got back object')
    la(
      info.commit === '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348',
      'commit id',
      info
    )
    la(/Gleb Bahmutov/.test(info.author), 'correct author', info)
    la(is.unemptyString(info.description), 'has description', info)
  })

  it('without file information', function withoutFileInformation () {
    var data =
      '\n\n' +
      'commit 4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
      'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
      'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
      '  simpler history module structure\n'
    var info = parseCommit(data)
    la(is.object(info), 'got back object')
    la(
      info.commit === '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348',
      'commit id',
      info
    )
    la(info.files.length === 0, 'no files', info)
  })

  it('basic with spaces', function basicWithSpaces () {
    var data =
      '\n\n' +
      'commit 4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
      'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
      'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
      '  simpler history module structure\n\n' +
      'M       index.js\n' +
      'M       src/fileHistory.js\n'
    var info = parseCommit(data)
    la(is.object(info), 'got back object', info)
    la(
      info.commit === '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348',
      'commit id',
      info
    )
    la(info.files.length === 2, 'two files', info)
  })

  la('basic without commit keyword', function basicWithoutCommitKeyword () {
    var data =
      '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
      'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
      'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
      '  simpler history module structure\n\n' +
      'M       index.js\n' +
      'A       src/fileHistory.js\n'
    var info = parseCommit(data)
    la(is.object(info), 'got back object')
    la(
      info.commit === '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348',
      'commit id',
      info
    )
    la(info.files.length === 2, 'two files', info)
  })

  it('large commit', function largerCommit () {
    var data =
      ' 935e39e573f86776a4a657c35fd135b593358044\n' +
      'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
      'Date:   Wed Feb 13 00:52:31 2013 -0500\n\n' +
      '\ttesting\n' +
      'parsing commit\n' +
      ' parsing, adding individual file information\n\n' +
      'M       .gitignore\n' +
      'M       index.js\n' +
      'M       src/fileHistory.js\n' +
      'M       src/gitLog.js\n' +
      'A       test/parseCommit.js\n'
    var info = parseCommit(data)
    la(is.object(info), 'got back object', info)
  })
})

describe('getGitLog', () => {
  it('get log basics', function getLogBasics () {
    la(is.fn(getGitLog) && getGitLog.length === 3, 'function arity')
  })

  it('get this file log', function getThisFileLog () {
    return getGitLog(__filename, 5, function (commits) {
      la(is.array(commits), 'got commits array', commits)
      la(commits.length <= 5, '5 commits at most', commits)
    })
  })
})
