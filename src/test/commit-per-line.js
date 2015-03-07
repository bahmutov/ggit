require('qunit-promises');
var commitPerLine = require('../commit-per-line');
var join = require('path').join;

QUnit.module('commit per line');

QUnit.test('this file is tracked', function (assert) {
  var filename = join(__dirname, '../../index.js');
  var sourceFiles = [filename];

  assert.will(
    commitPerLine(sourceFiles)
      .then(function (blames) {
        assert.object(blames, 'returns an object');
      })
  );
});
