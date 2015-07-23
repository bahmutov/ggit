require('lazy-ass');
var check = require('check-more-types');
var exec = require('./exec');

/*
 Returns the branch name
*/
function branchName() {
  var cmd = 'git rev-parse --abbrev-ref HEAD';
  return exec(cmd)
    .then(function cleanOutput(str) {
      la(check.unemptyString(str), 'expected branch name string', str);
      return str.trim();
    });
}

module.exports = branchName;

if (!module.parent) {
  (function tryBranchName() {
    branchName()
      .then(function (name) {
        console.log('Current branch name is "%s"', name);
      })
      .done();
  }());
}
