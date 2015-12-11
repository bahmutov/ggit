var la = require('lazy-ass');
var is = require('check-more-types');

function parseOneLineLog(data) {
  la(is.unemptyString(data), 'expected string data', data);

  var lines = data.split('\n');
  lines = lines.filter(function (line) {
    return !!line;
  });
  var splitLines = lines.map(function (line) {
    // should be id space log message
    var firstSpace = line.indexOf(' ');
    return {
      id: line.substr(0, firstSpace),
      message: line.substr(firstSpace).trim()
    };
  });
  return splitLines;
}

module.exports = {
  parseOneLineLog: parseOneLineLog
};
