'use strict'

var Promise = require('bluebird')
var la = require('lazy-ass')
var check = require('check-more-types')
var exec = require('./exec')
var moment = require('moment-timezone')
var numstat = require('./commit-numstat')
var branchName = require('./branch-name')
var R = require('ramda')
var debug = require('debug')('ggit')

function cropString (n, s) {
  if (s.length < n) {
    return s
  }
  return s.substr(0, n) + '...'
}

/**
 * Returns object with commit and default build information
 */
function defaultBuildInfo (id) {
  var short = id.substr(0, 7)
  var currentTime = moment()
  var data = {
    id: id,
    short: short,
    savedAt: currentTime.toISOString(),
    // TODO pass timezone?
    EST: currentTime.tz('America/New_York').format()
  }
  return data
}

function addBuildInfo (options, id, message, branch) {
  la(check.unemptyString(id), 'missing commit id', id)
  la(check.maybe.string(message), 'invalid message', message)
  la(check.maybe.string(branch), 'invalid branch name', branch)
  debug('build info for commit', id)

  const data = defaultBuildInfo(id)

  if (message) {
    debug('adding commit message to build data')
    data.message = cropString(15, message)
  }
  if (branch) {
    debug('adding branch name', branch)
    data.branch = branch
  }

  if (options.version) {
    debug('adding version %s from options', options.version)
    la(check.unemptyString(options.version), 'invalid options.version', options)
    data.version = options.version
  } else {
    debug('reading version from package.json?')
    var exists = require('fs').existsSync
    var read = require('fs').readFileSync
    if (exists('./package.json')) {
      var pkg = JSON.parse(read('./package.json', 'utf8'))
      debug('loaded package.json version %s', pkg.version)
      data.version = pkg.version
    }
  }

  return data
}

function getHerokuCommit () {
  const env = process.env
  if (env.SOURCE_VERSION && check.unemptyString(env.SOURCE_VERSION)) {
    return env.SOURCE_VERSION
  }
}

function getCircleCiCommit () {
  const env = process.env
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
      return branchName().then(function (name) {
        return addBuildInfo(options, commitId, message, name)
      })
    })
}

module.exports = {
  buildInfo,
  addBuildInfo,
  getHerokuCommit,
  getCircleCiCommit,
  defaultBuildInfo
}
