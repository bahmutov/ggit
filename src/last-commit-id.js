'use strict'

var Promise = require('bluebird')
var la = require('lazy-ass')
var check = require('check-more-types')
var exec = require('./exec')
var R = require('ramda')
var buildInfo = require('./utils').buildInfo

function save (filename, data) {
  var write = require('fs').writeFileSync
  var contents = JSON.stringify(data, null, 2) + '\n'
  write(filename, contents, 'utf8')
}

function saveBuildFile (filename, data) {
  save(filename, data)
  console.log(
    'saved last commit %s (short %s) in file %s',
    data.id,
    data.short,
    filename
  )
}

function saveIntoFile (filename, build) {
  if (check.unemptyString(filename)) {
    saveBuildFile(filename, build)
  }
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
  var resultId
  function addBuildInfo (id) {
    resultId = id
    return buildInfo(options, id)
  }
  return findCommit()
    .then(cleanOutput)
    .then(
      R.tap(function (id) {
        console.log('last commit:', id)
        resultId = id
      })
    )
    .then(addBuildInfo)
    .then(function (build) {
      return saveIntoFile(options.file, build)
    })
    .then(function () {
      return resultId
    })
}

module.exports = lastCommitId
