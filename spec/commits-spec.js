const la = require('lazy-ass')
const is = require('check-more-types')
const R = require('ramda')
const commits = require('..').commits
const path = require('path')
const root = path.join(__dirname, '..')
const { stubSpawnOnce } = require('stub-spawn-once')
const { stripIndent } = require('common-tags')
const snapshot = require('snap-shot')

/* global describe, it */
describe('commits', () => {
  describe('all', () => {
    it('is a function', () => {
      la(is.fn(commits.all))
    })

    it('returns a list', () => {
      return commits.all(root).then(list => {
        la(is.array(list))
        la(list.length > 1, 'has more than 1 commit')
      })
    })

    it('parses given output', () => {
      stubSpawnOnce(
        'git log --pretty=full',
        0,
        stripIndent`
        commit aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
        Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>

            first commit

        commit bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
        Commit: Gleb Bahmutov <gleb.bahmutov@gmail.com>

            second commit
        `
      )
      return snapshot(commits.all())
    })
  })

  describe('commits by id', () => {
    it('is a function', () => {
      la(is.fn(commits.byId))
    })

    it('returns an object by commit id', () => {
      const last5 = R.take(5)
      return commits.all(root).then(last5).then(commits.byId).then(result => {
        la(is.object(result), 'result is an object')
        const ids = R.keys(result)
        ids.forEach(id => {
          la(is.commitId(id), 'key', id, 'should be a sha in', result)
        })
      })
    })
  })
})
