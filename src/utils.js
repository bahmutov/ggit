'use strict'

var Promise = require('bluebird')
var la = require('lazy-ass')
var check = require('check-more-types')
var exec = require('./exec')
var moment = require('moment-timezone')
var numstat = require('./commit-numstat')
var R = require('ramda')

function cropString (n, s) {
  if (s.length < n) {
    return s
  }
  return s.substr(0, n) + '...'
}

function addBuildInfo (options, id, message) {
  la(check.unemptyString(id), 'missing commit id', id)
  la(check.maybe.string(message), 'invalid message', message)

  var short = id.substr(0, 7)
  var currentTime = moment()
  var data = {
    id: id,
    short: short,
    savedAt: currentTime.toISOString(),
    EST: currentTime.tz('America/New_York').format()
  }
  if (message) {
    data.message = cropString(15, message)
  }

  if (options.version) {
    data.version = options.version
  } else {
    var exists = require('fs').existsSync
    var read = require('fs').readFileSync
    if (exists('./package.json')) {
      var pkg = JSON.parse(read('./package.json', 'utf8'))
      data.version = pkg.version
    }
  }

  return data
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

function buildInfo (options) {
  options = options || {}

  function getMessage (id) {
    return options.message
      ? numstat(id).then(R.prop('message'))
      : Promise.resolve()
  }

  var commitId
  return findCommit()
    .then(cleanOutput)
    .then(
      R.tap(function (id) {
        commitId = id
      })
    )
    .then(getMessage)
    .then(function (message) {
      return addBuildInfo(options, commitId, message)
    })
}

module.exports = {
  buildInfo: buildInfo
}
