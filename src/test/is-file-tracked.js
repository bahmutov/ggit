require('qunit-promises');
var isTracked = require('../is-file-tracked');
var join = require('path').join;

QUnit.module('is file tracked');

QUnit.test('index file is tracked', function (assert) {
  assert.will(isTracked(join(__dirname, '../../index.js'))
    .then(function (result) {
      console.log('is index.js tracked?', result);
      assert.ok(result, 'index.js should be tracked');
    }));
});

QUnit.test('node_modules folder is not tracked', function (assert) {
  assert.will(isTracked(join(__dirname, '../../node_modules'))
    .then(function (result) {
      console.log('is node_modules tracked?', result);
      assert.ok(!result);
    }));
});
