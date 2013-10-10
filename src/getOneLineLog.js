var exec = require('./exec');

function parsePrettyLog(data) {
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

// returns a promise
function getLog(opts) {
  opts = opts || {};
  opts.n = opts.n || 10;

  var cmd = 'git log --pretty=oneline -n ' + opts.n;
  return exec(cmd).then(parsePrettyLog);
}

module.exports = getLog;
