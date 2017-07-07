'use strict'

var la = require('lazy-ass')
var is = require('check-more-types')
var exec = require('./exec')
var Q = require('q')
var debug = require('debug')('ggit')
const sortTagsByVersion = require('./sort-tags-by-version')

la(is.fn(sortTagsByVersion), 'missing sort tags by version')

function toLines (text) {
  return text.split('\n')
}

function trim (lines) {
  return lines.map(function (s) {
    return s.trim()
  })
}

function hasV (line) {
  la(is.string(line), 'expected string', line)
  return /^v/.test(line)
}

// returns commit SHA for the given tag
function getTagCommit (tag) {
  la(is.unemptyString(tag), 'wrong tag', tag)
  var cmd = 'git rev-list -n 1 ' + tag
  debug('getting commit for tag "%s"', tag)
  debug('using command "%s"', cmd)

  return exec(cmd).then(function (commit) {
    return {
      commit: commit.trim(),
      tag: tag
    }
  })
}

function getCommitIds (tags) {
  return Q.all(tags.map(getTagCommit))
}

function parseTags (vTagsOnly, text) {
  la(is.string(text), 'expected text', text)

  var lines = trim(toLines(text)).filter(is.unemptyString)
  if (vTagsOnly) {
    lines = lines.filter(hasV)
  }
  return lines
}

function getBranchTags (vTagsOnly) {
  // returns each tag on its own line
  // oldest tags first, latest tags last]
  // only tags accessible from the current branch are returned
  var cmd = 'git tag --sort version:refname --merged'
  var parseSomeTags = parseTags.bind(null, vTagsOnly)
  return exec(cmd).then(parseSomeTags).then(getCommitIds)
}

function getTagsSortByVersion () {
  const cmd = 'git tag'
  // return single string so other pieces work as expected
  return exec(cmd).then(sortTagsByVersion).then(tags => tags.join('\n'))
}

function getTags (vTagsOnly) {
  // returns each tag on its own line
  // oldest tags first, latest tags last
  var cmd = 'git tag --sort version:refname'
  var parseSomeTags = parseTags.bind(null, vTagsOnly)
  return exec(cmd)
    .catch(getTagsSortByVersion)
    .then(parseSomeTags)
    .then(getCommitIds)
}

getTags.getBranchTags = getBranchTags

module.exports = getTags
