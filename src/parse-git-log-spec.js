var la = require('lazy-ass');
var is = require('check-more-types');

describe('parse git log', function () {
  var parsers = require('./parse-git-log');

  describe('parse one line log', function () {
    var parse = parsers.parseOneLineLog;

    it('is a function', function () {
      la(is.fn(parse));
    });

    it('parses list of commits', function () {
      var log = [
        '7fbeb0ada137bc93493731df60bada794d95b13b foo',
        '8043da809a8e156311016d289f11160046500f58 bar',
        '55164909476cbcf6788829221e56ff9a51a08933 baz'
      ].join('\n');
      var parsed = parse(log);
      la(is.array(parsed));
      la(parsed.length === 3, 'finds 3 items');
      la(is.object(parsed[0]), 'creates object', parsed[0]);
      la(parsed[0].id === '7fbeb0ada137bc93493731df60bada794d95b13b', 'id');
      la(parsed[0].message === 'foo', 'message');
    });
  });
});
