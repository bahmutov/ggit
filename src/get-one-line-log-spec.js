var getLog = require('./get-one-line-log')
const la = require('lazy-ass')
const is = require('check-more-types')

/* eslint-env mocha */
describe('getOneLineLog', () => {
  it('4 commits', function () {
    return getLog({ n: 4 })
  })

  it('1 commit', function () {
    return getLog({ n: 1 })
  })

  it('all commits', function () {
    return getLog()
  })

  it('4 commits number', function () {
    return getLog({ n: 4 }).then(function (commits) {
      la(is.array(commits), 'returns array', commits)
      la(commits.length === 4, '4 commits', commits)
    })
  })

  const isTravisPR =
    process.env.TRAVIS && process.env.TRAVIS_PULL_REQUEST !== 'false'

  if (!isTravisPR) {
    // on Travis pull requests, we have trouble determining remote branch
    it('unpushed commits (if any)', function () {
      return getLog({
        remote: 'origin',
        branch: 'master'
      }).then(function (commits) {
        la(is.array(commits), 'returns array', commits)
        la(commits.length >= 0, 'might have commits', commits)
      })
    })
  } else {
    console.log('skipping unpushed commits test on Travis PR')
  }
})
