'use strict'

var Promise = require('bluebird')
var la = require('lazy-ass')
var check = require('check-more-types')
var exec = require('./exec')

function addBuildInfo (options, id) {
  la(check.unemptyString(id), 'missing commit id', id)

  var short = id.substr(0, 7)
  var currentTime = new Date()
  var data = {
    id: id,
    short: short,
    savedAt: currentTime.toISOString()
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
  function add (id) {
    return addBuildInfo(options, id)
  }
  return findCommit().then(cleanOutput).then(add)
}

module.exports = {
  buildInfo: buildInfo
}
