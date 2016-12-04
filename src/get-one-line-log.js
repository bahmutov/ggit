var la = require('lazy-ass');
var is = require('check-more-types');
var exec = require('./exec');
var debug = require('debug')('ggit');

var parsers = require('./parse-git-log');
la(is.fn(parsers.parseOneLineLog), 'missing single line parser', parsers);
la(is.fn(parsers.parseCommitLog), 'missing full log parser', parsers);

// returns a promise
function getLog(opts) {
  opts = opts || {};

  var cmd = opts.full ?
    'git log --pretty=full' : 'git log --pretty=oneline';
  var logParser = opts.full ?
    parsers.parseCommitLog : parsers.parseOneLineLog;

  if (opts.n > 0) {
    cmd += ' -n ' + opts.n;
  }
  if (opts.remote && opts.branch) {
    cmd += ' ' + opts.remote + '/' + opts.branch + '..' + opts.branch;
  }
  debug('using log cmd', cmd);

  return exec(cmd)
    .then(logParser);
}

module.exports = getLog;
