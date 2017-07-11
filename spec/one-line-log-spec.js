const schemaShot = require('schema-shot')
const snapshot = require('snap-shot')
const la = require('lazy-ass')
const is = require('check-more-types')
const { stubSpawnOnce } = require('stub-spawn-once')
const { stripIndent } = require('common-tags')

/* global describe, it */
describe('one line log', () => {
  const log = require('../index').getOneLineLog

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
    const output = stripIndent`
      bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb commit B
      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa commit A
    `
    stubSpawnOnce('git log --pretty=oneline -n 2', 0, output)
    return snapshot(log({ n: 2 }))
  })
})
