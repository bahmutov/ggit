'use strict';

var exec = require('./exec');

function fetchTags () {
  var cmd = 'git pull origin --tags';
  return exec(cmd);
}

module.exports = fetchTags;
