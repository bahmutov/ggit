require('qunit-promises');
var numstat = require('../commit-numstat');
QUnit.module('commit numstat');

QUnit.test('a commit info', function (assert) {
  var id = '46350c2';

  assert.will(numstat(id)
    .then(function (stats) {
      assert.object(stats, 'returned object with stats');
      console.log(stats);
      assert.string(stats.commit, 'has commit id');
      assert.string(stats.message, 'has message string');
    }));
});
