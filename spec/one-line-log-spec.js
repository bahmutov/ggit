const schemaShot = require('schema-shot')
const la = require('lazy-ass')
const is = require('check-more-types')
// const {} = require('stub-spawn-once')

describe.only('one line log', () => {
  const log = require('../index').getOneLineLog;

  it('is a function', () => {
    la(is.fn(log))
  })

  it('grabs last 5 commits', () => {
    return log({n: 5}).then(commits => {
      la(commits.length === 5)
    })
  })

  it('grabs last 5 commits schema', () => {
    return schemaShot(
      log({n: 5})
    )
  })
})
