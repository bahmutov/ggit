/* eslint-env mocha */
const { stripIndent } = require('common-tags')
const debug = require('debug')('test')
const snapshot = require('snap-shot-it')
const la = require('lazy-ass')

describe('parsing commit numstat', () => {
  const { commitMeta } = require('./commit-numstat-utils')

  it('regular commit', function () {
    // output from "git show --numstat <commit id>" command
    const stdout = stripIndent`
      commit 0b3342816ac2db82d051233e884ff93ddb811b17
      Author: Renovate Bot <bot@renovateapp.com>
      Date:   Sat Dec 22 22:15:32 2018 +0000

          chore(deps): update dependency mocked-env to v1.2.4

      5   22  package-lock.json
      1   1   package.json
    `
    const meta = commitMeta(stdout.split('\n'))
    debug('meta is %o', meta)
    la(meta.message, 'has parsed message text', meta)
    snapshot(meta)
  })

  it('merged commit', function () {
    // output from "git show --numstat <commit id>" command
    // for a merge commit
    const stdout = stripIndent`
      commit f2d8d7f2b2de0df9cfc14845d284521eb2513c0c (HEAD -> master, origin/master, origin/HEAD)
      Merge: 4fe1eaf 884c7bd
      Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
      Date:   Fri Aug 9 10:59:17 2019 -0400

          fix: update lodash

          Update lodash

      3   3   package-lock.json
      1   1   package.json
    `
    const meta = commitMeta(stdout.split('\n'))
    debug('meta is %o', meta)
    la(meta.message, 'has parsed message text', meta)
    snapshot(meta)
  })
})
