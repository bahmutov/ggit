const la = require('lazy-ass')
const is = require('check-more-types')
const snapshot = require('snap-shot-it')
const { stripIndent } = require('common-tags')

/* global describe, it */

describe('current commit message', function () {
  const commitMessage = require('./commit-message').commitMessage
  it('grabs commit message', function () {
    return commitMessage().then(
      function (str) {
        la(is.unemptyString(str), 'expected a message', str)
      },
      function (err) {
        la(err instanceof Error, 'rejected with error', err)
        console.log(err)
      }
    )
  })
})

describe('parseCommitMessage', () => {
  const parseCommitMessage = require('./commit-message').parseCommitMessage

  it('is a function', () => {
    la(is.fn(parseCommitMessage))
  })

  it('parses just subject commit', () => {
    const msg = stripIndent`
    foo@email.com
    subject line
    `
    snapshot(parseCommitMessage(msg))
  })

  it('trims body', () => {
    const msg =
      stripIndent`
    foo@email.com
    subject line
    ` + '\n'
    snapshot(parseCommitMessage(msg))
  })

  it('parses full commit message', () => {
    const msg = stripIndent`
    foo@email.com
    subject line
    message line 1
    message line 2
    `
    snapshot(parseCommitMessage(msg))
  })
})
