'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')

function isGoodTag (o) {
  la(is.commitId(o.commit), 'missing commit', o)
  la(is.unemptyString(o.tag), 'missing tag', o)
}

// Travis has very old git version without sorted tags
// https://github.com/travis-ci/travis-ci/issues/6328
if (!process.env.TRAVIS) {
  /* global describe, it */
  describe('tags', () => {
    const tags = require('../index').tags
    it('has type', () => {
      la(is.fn(tags), 'has tags function')
    })

    it('fetches "v" tags for this repo', () => {
      const vTagsOnly = true
      return tags(vTagsOnly).then(function (list) {
        la(is.array(list), 'has array of tags')
        la(list.length > 1, 'has more than 1 tag')
        list.forEach(isGoodTag)
      })
    })
  })

  describe.only('commits after last tag', () => {
    const afterLastTag = require('../index').commits.afterLastTag

    it('fetches commits after latest tag', () => {
      return afterLastTag().then(function (list) {
        la(is.array(list), 'has array of tags')
        console.log('commits after last tag', list)
      })
    })

    it('fetches commits after latest tag when including non-v tags', () => {
      return afterLastTag(false).then(function (list) {
        la(is.array(list), 'has array of tags')
        console.log('commits after last tag', list)
      })
    })
  })
}
