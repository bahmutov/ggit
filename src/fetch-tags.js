'use strict';

var debug = require('debug')('ggit');
var exec = require('./exec');

function fetchTags () {
  debug('fetching remote tags');
  var cmd = 'git pull origin --tags';
  return exec(cmd);
}

module.exports = fetchTags;
