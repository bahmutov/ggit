require('lazy-ass');
var check = require('check-more-types');
var describeIt = require('describe-it');
var filename = __dirname + '/../src/changed-files';

describeIt(filename, 'parseLine(line)', function (getParseLine) {
  it('parses line', function () {
    var parse = getParseLine();
    la(check.fn(parse));

    var result = parse('M\tfoo.js');
    la(result.diff === 'M');
    la(result.name === 'foo.js');
  });
});

describeIt(filename, 'var stdoutToGrouped', function (getTransform) {
  function verifySingleModified(result) {
    la(check.object(result) && check.array(result.M),
      'has modified file list', result);
    la(result.M.length === 1, 'single modified file');
    la(result.M[0].name === 'foo.js');
  }

  it('correctly parses output', function () {
    var gitOutput = 'M\tfoo.js';
    var result = getTransform()(gitOutput);
    verifySingleModified(result);
  });

  it('ignores new lines', function () {
    var gitOutput = '\n\nM\tfoo.js\n\n';
    var result = getTransform()(gitOutput);
    verifySingleModified(result);
  });
});
