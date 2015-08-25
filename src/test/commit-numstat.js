require('qunit-promises');
var numstat = require('../commit-numstat');
QUnit.module('commit numstat');

QUnit.test('a commit info', function (assert) {
  // should use pretty recent commit id or HEAD - Travis and
  // other build servers usually check out shallow history
  var id = 'HEAD';

  assert.will(numstat(id)
    .then(function (stats) {
      assert.object(stats, 'returned object with stats');
      console.log(stats);
      assert.string(stats.commit, 'has commit id');
      assert.string(stats.message, 'has message string');
    }));
});
