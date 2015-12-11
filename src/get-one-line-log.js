var exec = require('./exec');

var parsers = require('./parse-git-log');

// returns a promise
function getLog(opts) {
  opts = opts || {};

  var cmd = 'git log --pretty=oneline';
  if (opts.n > 0) {
    cmd += ' -n ' + opts.n;
  }
  if (opts.remote && opts.branch) {
    cmd += ' ' + opts.remote + '/' + opts.branch + '..' + opts.branch;
  }
  return exec(cmd)
    .then(parsers.parseOneLineLog);
}

module.exports = getLog;
