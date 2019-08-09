const la = require('lazy-ass')
const is = require('check-more-types')
const R = require('ramda')

/* eslint-env mocha */
describe('utils', () => {
  describe('buildInfo', () => {
    const buildInfo = require('../src/utils').buildInfo
    const options = {
      version: '1.2.3'
    }

    const isGoodBuild = is.schema({
      id: is.commitId,
      short: is.shortCommitId,
      savedAt: is.unemptyString,
      version: R.equals(options.version)
    })

    it('is a function', () => {
      la(is.fn(buildInfo))
    })

    it('returns an object', () => {
      return buildInfo(options).then(result => {
        la(is.object(result))
        la(isGoodBuild(result), 'bad build', result)
      })
    })

    it('has EST timestamp', () => {
      return buildInfo(options).then(result => {
        la(is.unemptyString(result.EST), 'is a string', result.EST)
      })
    })

    // on Travis pull requests do not have commit message
    const isTravisPR =
      process.env.TRAVIS && process.env.TRAVIS_PULL_REQUEST !== 'false'

    if (!isTravisPR) {
      it('has abbreviated commit message if .message is true', () => {
        // hmm, fails if last commit was a merge commit
        const opts = R.merge(options, { message: true })
        return buildInfo(opts).then(result => {
          la(
            is.unemptyString(result.message),
            'is a string',
            result.message,
            'in',
            result
          )
        })
      })
    } else {
      console.log('skipping test with message because Travis PR')
    }

    it('has no abbreviated commit message by default', () => {
      return buildInfo(options).then(result => {
        la(!result.message, 'message is present', result.message)
      })
    })

    it('has branch name', () => {
      return buildInfo(options).then(result => {
        la(is.unemptyString(result.branch), 'missing branch name', result)
      })
    })
  })
})
