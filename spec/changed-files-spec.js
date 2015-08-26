require('lazy-ass');
var check = require('check-more-types');
var testFn = require('describe-function');
var srcFolder = __dirname + '/../src/';

testFn(srcFolder + 'changed-files', 'parseLine(line)', function (getParseLine) {
  it('parses line', function () {
    var parse = getParseLine();
    la(check.fn(parse));

    var result = parse('M\tfoo.js');
    la(result.diff === 'M');
    la(result.name === 'foo.js');
  });
});
