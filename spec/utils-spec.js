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
  })
})
