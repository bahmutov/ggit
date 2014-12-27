require('lazy-ass');
var exec = require('./exec');

function push(verbose) {
  var cmd = 'git push origin master --tags';
  return exec(cmd, Boolean(verbose));
}

module.exports = push;
