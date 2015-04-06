require('lazy-ass');
var check = require('check-more-types');
var exec = require('./exec');

/*
Returns the last commit id
*/
function lastCommitId() {
  var cmd = 'git log --format="%H" -n 1';
  return exec(cmd)
    .then(function (str) {
      la(check.unemptyString(str), 'expected commit id string', str);
      return str.trim();
    });
}

module.exports = lastCommitId;
