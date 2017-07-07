'use strict'

const exec = require('./exec')
const debug = require('debug')('ggit')
const path = require('path')
const alwaysError = require('always-error')
const findUp = require('find-up')
const R = require('ramda')

function parentFolder () {
  return path.normalize(path.join(process.cwd(), '..'))
}

// when we are inside <repo>/.git folder
// the usual command does NOT work
// it just returns nothing, so must detect this
function checkFolder (folder) {
  if (!folder) {
    if (isInDotGit()) {
      debug('could not get git folder, but we are inside .git')
      return parentFolder()
    }
    throw new Error('Could not get git root folder')
  }
  return folder
}

function tryDotGit (err) {
  if (isInDotGit()) {
    debug('failed to get repo root folder, but we are inside .git')
    return parentFolder()
  }
  debug('tryDotGit error', err)
  debug('environment')
  debug(process.env)
  debug('current folder', process.cwd())
  throw alwaysError(err)
}

function isInDotGit () {
  return /\.git$/.test(process.cwd())
}

// if everything else fails (for example during commit)
// we can walk up the parent tree to find the git folder, typically ".git"
function searchUpForGitFolder () {
  const GIT = process.env.GIT_DIR || '.git'
  debug('searching for %s up from %s', GIT, process.cwd())
  return findUp(GIT).then(gitDirectory => {
    if (gitDirectory) {
      if (R.endsWith(GIT, gitDirectory)) {
        gitDirectory = gitDirectory.replace(GIT, '')
      }
      debug('found %s', gitDirectory)
      return gitDirectory
    }
    throw new Error(`Could not find ${GIT} folder up from ${process.cwd()}`)
  })
}

function stripSeparator (folder) {
  if (R.endsWith(path.sep, folder)) {
    return folder.substr(0, folder.length - path.sep.length)
  }
  return folder
}

function getGitFolder () {
  const cmd = 'git rev-parse --show-toplevel'
  const verbose = /ggit/.test(process.env.DEBUG)
  return exec(cmd, verbose)
    .then(checkFolder, tryDotGit)
    .catch(searchUpForGitFolder)
    .then(folder => folder.trim())
    .then(folder => path.normalize(folder))
    .then(stripSeparator)
}

module.exports = getGitFolder
