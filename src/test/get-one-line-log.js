require('qunit-promises');
var getLog = require('../get-one-line-log');

QUnit.module('getOneLineLog');

QUnit.test('4 commits', function (assert) {
  assert.will(getLog({n: 4}), 'getting 4 commits');
});

QUnit.test('1 commits', function (assert) {
  assert.will(getLog({n: 1}), 'getting 1 commits');
});

QUnit.test('all commits', function (assert) {
  assert.will(getLog(), 'getting all commits');
});

QUnit.test('4 commits number', function (assert) {
  assert.will(getLog({n: 4})
    .then(function (commits) {
      assert.ok(Array.isArray(commits), 'returns array');
      assert.equal(commits.length, 4, '4 commits');
    }));
});

QUnit.test('unpushed commits (if any)', function (assert) {
  assert.will(getLog({
    remote: 'origin',
    branch: 'master'
  })
  .then(function (commits) {
    assert.ok(Array.isArray(commits), 'returns array');
    assert.ok(commits.length >= 0, 'might have commits');
  }));
});
