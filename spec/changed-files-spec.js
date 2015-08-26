require('lazy-ass');
var check = require('check-more-types');
var testFn = require('describe-function');
var filename = __dirname + '/../src/changed-files';

testFn(filename, 'parseLine(line)', function (getParseLine) {
  it('parses line', function () {
    var parse = getParseLine();
    la(check.fn(parse));

    var result = parse('M\tfoo.js');
    la(result.diff === 'M');
    la(result.name === 'foo.js');
  });
});

testFn(filename, 'var stdoutToGrouped', function (getTransform) {
  it('correctly parses output', function () {
    var gitOutput = 'M\tfoo.js';
    var result = getTransform()(gitOutput);
    la(check.object(result) && check.array(result.M),
      'has modified file list', result);
    la(result.M.length === 1, 'single modified file');
    la(result.M[0].name === 'foo.js');
  });
});
