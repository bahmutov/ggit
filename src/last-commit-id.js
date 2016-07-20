'use strict';

var Promise = require('bluebird');
var la = require('lazy-ass');
var check = require('check-more-types');
var exec = require('./exec');

function saveIntoFile(options, id) {
  if (check.unemptyString(options.file)) {
    var write = require('fs').writeFileSync;
    var contents = JSON.stringify({ id: id }, null, 2) + '\n';
    write(options.file, contents, 'utf8');
    console.log('saved last commit %s in file %s', id, options.file);
  }
  console.log('last commit:', id);
}

var env = process.env;

function getHerokuCommit() {
  if (env.SOURCE_VERSION &&
    check.unemptyString(env.SOURCE_VERSION)) {
    return env.SOURCE_VERSION;
  }
}

function getCircleCiCommit() {
  if (env.CIRCLE_SHA1 &&
    check.unemptyString(env.CIRCLE_SHA1)) {
    return env.CIRCLE_SHA1;
  }
}

function getGitCommit() {
  var cmd = 'git log --format="%H" -n 1';
  return exec(cmd);
}

function findCommit() {
  var ciSha = getHerokuCommit() || getCircleCiCommit();
  if (ciSha) {
    return Promise.resolve(ciSha);
  }
  return getGitCommit();
}

function cleanOutput(str) {
  la(check.unemptyString(str), 'expected commit id string', str);
  return str.trim();
}

/*
 Returns the last commit id
*/
function lastCommitId(options) {
  options = options || {};
  function saveWithOptions(id) {
    saveIntoFile(options, id);
    return id;
  }
  return findCommit()
    .then(cleanOutput)
    .then(saveWithOptions);
}

module.exports = lastCommitId;
