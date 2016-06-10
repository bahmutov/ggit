'use strict';

var exec = require('./exec');
var is = require('check-more-types');
var R = require('ramda');

function cleanList(list) {
  var names = list.split('\n');
  return names
    .map(R.trim)
    .filter(is.unemptyString);
}

function untrackedFiles() {
  var cmd = 'git ls-files --others --exclude-standard';
  return exec(cmd)
    .then(cleanList);
}

module.exports = untrackedFiles;

if (!module.parent) {
  untrackedFiles()
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
}
