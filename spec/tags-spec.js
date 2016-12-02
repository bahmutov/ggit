'use strict'

const la = require('lazy-ass')
const is = require('check-more-types')
const tags = require('../index').tags

function isGoodTag(o) {
  la(is.commitId(o.commit), 'missing commit', o)
  la(is.unemptyString(o.tag), 'missing tag', o)
}

describe('tags', () => {
  it('has type', () => {
    la(is.fn(tags), 'has tags function')
  })

  it('fetches "v" tags for this repo', () => {
    const vTagsOnly = true
    return tags(vTagsOnly)
      .then(function (list) {
        la(is.array(list), 'has array of tags')
        la(list.length > 1, 'has more than 1 tag')
        list.forEach(isGoodTag)
      })
  })
})

