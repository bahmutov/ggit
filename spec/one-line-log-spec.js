const schemaShot = require('schema-shot')
const snapshot = require('snap-shot-it')
const la = require('lazy-ass')
const is = require('check-more-types')
const { stubExecOnce } = require('stub-spawn-once')
const { stripIndent } = require('common-tags')

/* global describe, it */
describe('one line log', () => {
  const log = require('../index').getOneLineLog

  const output = stripIndent`
    bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb commit B
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa commit A
  `

  it('is a function', () => {
    la(is.fn(log))
  })

  it('grabs last 5 commits', () => {
    return log({ n: 5 }).then(commits => {
      la(commits.length === 5)
    })
  })

  it('grabs last 5 commits schema', () => {
    return schemaShot(log({ n: 5 }))
  })

  it('parses mock output', () => {
    stubExecOnce('git log --pretty=oneline -n 2', output)
    return log({ n: 2 }).then(snapshot)
  })

  it('parses mock output with branch name', () => {
    stubExecOnce(
      'git log --pretty=oneline -n 2 --first-parent a-branch',
      output
    )
    return log({ n: 2, firstParent: 'a-branch' }).then(snapshot)
  })
})
