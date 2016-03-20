var Q = require('q');
var exists = require('fs').existsSync;
var fileInfo = require('fs').lstatSync;
var read = require('fs').readFileSync;
var filename = './.git/COMMIT_EDITMSG';

function commitMessage() {
  var commitMsgFile = filename;
  if(!fileInfo('./.git').isDirectory()) {
    var unparsedText = '' + read('./.git');
    commitMsgFile = unparsedText.substring('gitdir: '.length).trim() + '/COMMIT_EDITMSG';
  }

  if (!exists(commitMsgFile)) {
      return Q.reject(new Error('Cannot find file ' + commitMsgFile));
  }

  var text = read(commitMsgFile, 'utf8');
  /* jshint -W064 */
  return Q(text);

}

module.exports = commitMessage;
