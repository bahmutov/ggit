'use strict'

var debug = require('debug')('ggit')
var la = require('lazy-ass')
var check = require('check-more-types')
var getOneLineLog = require('./get-one-line-log')
la(check.fn(getOneLineLog), 'missing one line log function')
var fs = require('fs')
var folders = require('chdir-promise')
var R = require('ramda')
var getTags = require('./tags')
var pluralize = require('pluralize')

function getLog () {
  return getOneLineLog({ full: true })
}

function getLogAfter (commit, branchName = 'master') {
  return getOneLineLog({
    full: true,
    from: commit,
    firstParent: branchName
  })
}

/*
  // returns commits from given repo folder
  // latest commits first

  // get last 2 commits and print them
  commits.all(gitRepoFolder)
    .then(R.take(2))
    .then(console.table)
    .done();
*/
function commits (gitRepoRootFolder) {
  if (!gitRepoRootFolder) {
    gitRepoRootFolder = process.cwd()
  }
  la(check.unemptyString(gitRepoRootFolder), 'missing git repo folder')
  la(fs.existsSync(gitRepoRootFolder), 'cannot find folder', gitRepoRootFolder)

  return folders.to(gitRepoRootFolder).then(getLog).tap(folders.back)
}

// returns list of commits after given commit sha
function commitsAfter (commit, branchName, gitRepoRootFolder) {
  if (!gitRepoRootFolder) {
    gitRepoRootFolder = process.cwd()
  }
  la(check.unemptyString(gitRepoRootFolder), 'missing git repo folder')
  la(fs.existsSync(gitRepoRootFolder), 'cannot find folder', gitRepoRootFolder)

  return folders
    .to(gitRepoRootFolder)
    .then(() => getLogAfter(commit, branchName))
    .tap(folders.back)
}

/*
  zips list of commits into object where keys = ids, values = messages

  For example to get an object with 2 commit ids as keys

  commits.all(gitRepoFolder)
    .then(R.take(2))
    .then(commits.byId)
    .then(console.log)
    .done();
*/
function byId (commits) {
  var ids = R.map(R.prop('id'))(commits)
  var messages = R.map(R.prop('message'))(commits)
  var commitInfo = R.zipObj(ids, messages)
  return commitInfo
}

function afterLastTag (vTagsOnly) {
  return commits().then(function (list) {
    vTagsOnly = vTagsOnly !== false
    return getTags(vTagsOnly).then(function (tags) {
      debug('found %s', pluralize('tag', tags.length, true))
      if (check.empty(tags)) {
        return list
      }
      var lastTag = tags[tags.length - 1]
      var lastTagCommit = lastTag.commit
      la(
        check.unemptyString(lastTagCommit),
        'missing commit in the last tag',
        lastTag
      )
      debug('last tag %s commit %s', lastTag, lastTagCommit)
      var found
      var lastCommits = list.filter(function (commit) {
        if (found) {
          return
        }
        if (commit.id === lastTagCommit) {
          found = true
          return
        }
        return true
      })
      return lastCommits
    })
  })
}

module.exports = {
  all: commits,
  byId: check.defend(
    byId,
    check.array,
    'need array of commit info objects to zip'
  ),
  afterLastTag: afterLastTag,
  after: commitsAfter
}
