var Q = require('q');
var exists = require('fs').existsSync;
var read = require('fs').readFileSync;

function commitMessage() {
  var filename = require('./git-folder')() + '/COMMIT_EDITMSG';
  if (!exists(filename)) {
      return Q.reject(new Error('Cannot find file ' + filename));
  }

  var text = read(filename, 'utf8');
  /* jshint -W064 */
  return Q(text);

}

module.exports = commitMessage;
