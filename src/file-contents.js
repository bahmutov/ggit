var exec = require('./exec')
var log = require('debug')('ggit')
var _ = require('lodash')

function fileContents (filename, at) {
  if (!at) {
    at = 'HEAD'
  }
  var gitCommand = _.template('git show <%= at %>:<%= filename %>')
  var cmd = gitCommand({
    at: at,
    filename: filename
  })
  log('file contents command', cmd)

  return exec(cmd).then(function (data) {
    return data.trim()
  })
}

module.exports = fileContents

if (!module.parent) {
  fileContents('src/file-contents.js').then(function (text) {
    console.log('the source for this file in the repo HEAD')
    console.log(text)
  })
}
