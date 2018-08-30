/* eslint-env mocha */
describe('last-commit-id', () => {
  const lastCommitId = require('./last-commit-id')
  const utils = require('./utils')
  const mockedEnv = require('mocked-env')
  const la = require('lazy-ass')
  const sinon = require('sinon')

  context('in Heroku-like environment', () => {
    let restore
    let sandbox
    const commit = '2d40e78a241fe0bd9e185788349f21e320e0248d'

    beforeEach(() => {
      sandbox = sinon.createSandbox()
      sandbox
        .stub(utils, 'addBuildInfo')
        .rejects(new Error('Cannot get git info on Heroku'))
      restore = mockedEnv(
        {
          SOURCE_VERSION: commit
        },
        { clear: true }
      )
    })

    it('returns commit id', () => {
      return lastCommitId().then(sha => {
        la(sha === commit, 'expected commit sha to be', commit, 'got', sha)
      })
    })

    afterEach(() => {
      sandbox.restore()
      restore()
    })
  })

  context('in CircleCI-like environment', () => {
    let restore
    let sandbox
    const commit = '2d40e78a241fe0bd9e185788349f21e320e0248d'

    beforeEach(() => {
      sandbox = sinon.createSandbox()
      sandbox
        .stub(utils, 'addBuildInfo')
        .rejects(new Error('Cannot get git info on Circle'))
      restore = mockedEnv(
        {
          CIRCLE_SHA1: commit
        },
        { clear: true }
      )
    })

    it('returns commit id', () => {
      return lastCommitId().then(sha => {
        la(sha === commit, 'expected commit sha to be', commit, 'got', sha)
      })
    })

    afterEach(() => {
      sandbox.restore()
      restore()
    })
  })
})
