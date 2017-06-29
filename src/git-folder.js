'use strict'

const exec = require('./exec')
const debug = require('debug')('ggit')
const path = require('path')

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
  throw err
}

function isInDotGit () {
  return /\.git$/.test(process.cwd())
}

function getGitFolder () {
  const cmd = 'git rev-parse --show-toplevel'
  return exec(cmd).then(checkFolder, tryDotGit).then(folder => folder.trim())
}

module.exports = getGitFolder
