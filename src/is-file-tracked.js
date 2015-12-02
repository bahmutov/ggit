var la = require('lazy-ass');
var check = require('check-more-types');
var exec = require('./exec');
var path = require('path');
var d3h = require('d3-helpers');

function isFileTracked(filename) {
  la(check.unemptyString(filename), 'missing filename');
  var fullPath = path.resolve(filename);
  var cmd = 'git ls-files --error-unmatch ' + fullPath;
  return exec(cmd)
    .then(d3h.yes, d3h.no);
}

module.exports = check.defend(isFileTracked,
  check.unemptyString, 'expected filename');
