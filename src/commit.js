require('lazy-ass');
var exec = require('./exec');
var quote = require('quote');
var check = require('check-more-types');

function commit(msg) {
  la(check.unemptyString(msg), 'missing commit message');
  var cmd = 'git commit -am ' + quote(msg);
  return exec(cmd);
}

module.exports = commit;
