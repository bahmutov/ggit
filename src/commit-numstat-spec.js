// require('qunit-promises');
var numstat = require('./commit-numstat')
const la = require('lazy-ass')
const is = require('check-more-types')

describe('commit numstat', () => {
  it('a commit info', function () {
    // should use pretty recent commit id or HEAD - Travis and
    // other build servers usually check out shallow history
    var id = 'HEAD'

    return numstat(id).then(function (stats) {
      la(is.object(stats), 'returned object with stats')
      // console.log(stats);
      la(is.string(stats.commit), 'has commit id')
      la(is.string(stats.message), 'has message string')
    })
  })
})
