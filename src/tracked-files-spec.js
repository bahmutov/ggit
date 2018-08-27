const la = require('lazy-ass')
var check = require('check-types')
var tracked = require('../index').trackedFiles

/* eslint-env mocha */
describe('tracked source files', () => {
  it('tracked files in this folder', function () {
    la(check.fn(tracked), 'has tracked function')

    return tracked(__dirname).then(function (list) {
      console.log('got list of tracked files', list)
    })
  })
})
