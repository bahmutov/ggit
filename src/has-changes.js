require('lazy-ass');
var exec = require('./exec');
var d3h = require('d3-helpers');

// returns true if there are local uncommitted changes
// see discussion
// http://stackoverflow.com/questions/3878624/
function hasChanges() {
  var cmd = 'git diff --exit-code HEAD';
  return exec(cmd)
    .then(d3h.yes, d3h.no);
}

module.exports = hasChanges;
