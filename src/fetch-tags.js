'use strict'

var debug = require('debug')('ggit')
var exec = require('./exec')

function fetchTags (branch) {
  branch = branch || 'master'
  debug('fetching remote tags for branch', branch)
  var cmd = 'git pull origin ' + branch + ' --tags'
  return exec(cmd)
}

module.exports = fetchTags
