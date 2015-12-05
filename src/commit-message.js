var Q = require('q');
var exists = require('fs').existsSync;
var read = require('fs').readFileSync;
var filename = './.git/COMMIT_EDITMSG';

function commitMessage() {
  if (!exists(filename)) {
    return Q.reject(new Error('Cannot find file ' + filename));
  }
  var text = read(filename, 'utf8');
  /* jshint -W064 */
  return Q(text);
}

module.exports = commitMessage;
