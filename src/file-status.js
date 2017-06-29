var exec = require('./exec')
var log = require('debug')('ggit')
var R = require('ramda')

var cmd = 'git status --porcelain'

function fileStatus () {
  return exec(cmd).then(R.tap(log)).then(stdoutToGroup).then(R.tap(log))
}

var stdoutToGroup = require('./parse-file-status')

module.exports = fileStatus

if (!module.parent) {
  fileStatus().done()
}
