'use strict'

const Promise = require('bluebird')
const la = require('lazy-ass')
const check = require('check-more-types')
const exec = require('./exec')
const R = require('ramda')
const utils = require('./utils')
const debug = require('debug')('ggit')

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
  } else {
    debug('there is no filename, not saving build info')
    debug(build)
  }
}

function getGitCommit () {
  var cmd = 'git log --format="%H" -n 1'
  return exec(cmd)
}

function findCommit () {
  var ciSha = utils.getHerokuCommit() || utils.getCircleCiCommit()
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

    try {
      return utils.addBuildInfo(options, id)
    } catch (e) {
      console.error('Problem adding build information to commit SHA')
      console.error(e.message)
      return utils.defaultBuildInfo(id)
    }
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
