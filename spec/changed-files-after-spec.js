var la = require('lazy-ass')
var is = require('check-more-types')

/* global describe, it */
describe('changed files after', function () {
  var changedFilesAfter = require('..').changedFilesAfter

  it('is a function', function () {
    la(is.fn(changedFilesAfter))
  })
})
