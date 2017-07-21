'use strict'

var Promise = require('bluebird')
var la = require('lazy-ass')
var check = require('check-more-types')
var exec = require('./exec')

function save (filename, data) {
  var write = require('fs').writeFileSync
  var contents = JSON.stringify(data, null, 2) + '\n'
  write(filename, contents, 'utf8')
}

function saveBuildFile (filename, id) {
  var exists = require('fs').existsSync
  var read = require('fs').readFileSync

  var short = id.substr(0, 7)
  var currentTime = new Date()
  var data = {
    id: id,
    short: short,
    savedAt: currentTime.toISOString()
  }
  if (exists('./package.json')) {
    var pkg = JSON.parse(read('./package.json', 'utf8'))
    data.version = pkg.version
  }
  save(filename, data)
  console.log('saved last commit %s (short %s) in file %s', id, short, filename)
}

function saveIntoFile (options, id) {
  if (check.unemptyString(options.file)) {
    saveBuildFile(options.file, id)
  }
  console.log('last commit:', id)
}

var env = process.env

function getHerokuCommit () {
  if (env.SOURCE_VERSION && check.unemptyString(env.SOURCE_VERSION)) {
    return env.SOURCE_VERSION
  }
}

function getCircleCiCommit () {
  if (env.CIRCLE_SHA1 && check.unemptyString(env.CIRCLE_SHA1)) {
    return env.CIRCLE_SHA1
  }
}

function getGitCommit () {
  var cmd = 'git log --format="%H" -n 1'
  return exec(cmd)
}

function findCommit () {
  var ciSha = getHerokuCommit() || getCircleCiCommit()
  if (ciSha) {
    return Promise.resolve(ciSha)
  }
  return getGitCommit()
}

function cleanOutput (str) {
  la(check.unemptyString(str), 'expected commit id string', str)
  return str.trim()
}

/*
 Returns the last commit id
*/
function lastCommitId (options) {
  options = options || {}
  function saveWithOptions (id) {
    saveIntoFile(options, id)
    return id
  }
  return findCommit().then(cleanOutput).then(saveWithOptions)
}

module.exports = lastCommitId
