var commitPerLine = require('./commit-per-line')
var join = require('path').join
const la = require('lazy-ass')
const is = require('check-more-types')

/* eslint-env mocha */
describe('commit per line', () => {
  it('this file is tracked', function () {
    var filename = join(__dirname, '../index.js')
    var sourceFiles = [filename]

    return commitPerLine(sourceFiles).then(function (blames) {
      la(is.object(blames), 'returns an object')
    })
  })
})
