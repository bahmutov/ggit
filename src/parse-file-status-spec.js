require('lazy-ass');
var check = require('check-more-types');

/* global describe, beforeEach, it */

describe('parse file status', function () {
  var parse = require('./parse-file-status');
  it('is a function', function () {
    la(check.fn(parse));
  });

  function verifySingleModified(result) {
    la(check.object(result) && check.array(result.M),
      'has modified file list', result);
    la(result.M.length === 1, 'single modified file');
    la(result.M[0].name === 'foo.js');
  }

  it('correctly parses output', function () {
    var gitOutput = 'M\tfoo.js';
    var result = parse(gitOutput);
    verifySingleModified(result);
  });

  it('ignores new lines', function () {
    var gitOutput = '\n\nM\tfoo.js\n\n';
    var result = parse(gitOutput);
    verifySingleModified(result);
  });
});

var describeIt = require('describe-it');
var filename = __dirname + '/parse-file-status.js';

describeIt(filename, 'parseLine(line)', function (getParseLine) {
  var parse;
  beforeEach(function () {
    parse = getParseLine();
  });

  it('parses line', function () {
    la(check.fn(parse));

    var result = parse('M\tfoo.js');
    la(result.diff === 'M');
    la(result.name === 'foo.js');
  });

  it('parses A line', function () {
    var result = parse('A foo.js');
    la(result.diff === 'A');
    la(result.name === 'foo.js');
  });

  it('parses AM line', function () {
    var result = parse('AM foo.js');
    la(result.diff === 'A', result);
    la(result.name === 'foo.js', result);
  });
});
