var la = require('lazy-ass');
var is = require('check-more-types');
var exec = require('./exec');

var parsers = require('./parse-git-log');
la(is.fn(parsers.parseOneLineLog), 'missing parser', parsers);

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
  console.log('cmd', cmd);
  return exec(cmd)
    .then(parsers.parseOneLineLog);
}

module.exports = getLog;
