require('lazy-ass');
var check = require('check-more-types');
var exec = require('./exec');

function saveIntoFile(options, id) {
  if (check.unemptyString(options.file)) {
    var write = require('fs').writeFileSync;
    var contents = JSON.stringify({ id: id }, null, 2);
    write(options.file, contents, 'utf8');
    console.log('saved last commit %s in file %s', id, options.file);
  }
  console.log('last commit:', id);
}

/*
 Returns the last commit id
*/
function lastCommitId(options) {
  options = options || {};
  var cmd = 'git log --format="%H" -n 1';
  return exec(cmd)
    .then(function cleanOutput(str) {
      la(check.unemptyString(str), 'expected commit id string', str);
      return str.trim();
    })
    .then(function (id) {
      saveIntoFile(options, id);
      return id;
    });
}

module.exports = lastCommitId;
