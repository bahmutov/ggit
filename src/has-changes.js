var exec = require('./exec');
var d3h = require('d3-helpers');

// returns true if there are local uncommitted changes
// see discussion
// http://stackoverflow.com/questions/3878624/
function hasChanges() {
  var cmd = 'git diff --exit-code HEAD';
  // returns exit code 1 if there are changes
  // thus we reverse the true / false order
  return exec(cmd)
    .then(d3h.no, d3h.yes);
}

module.exports = hasChanges;
