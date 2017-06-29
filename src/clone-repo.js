var exec = require('./exec')
var verify = require('check-more-types').verify
var fs = require('fs')

function cloneRepo (opts) {
  verify.object(opts, 'missing clone options')
  verify.unemptyString(opts.url, 'missing repo url')
  verify.unemptyString(opts.folder, 'missing destination folder')
  if (fs.existsSync(opts.folder)) {
    throw new Error('Destination folder ' + opts.folder + ' already exists')
  }
  var cmd = 'git clone --depth 1 ' + opts.url + ' ' + opts.folder
  return exec(cmd)
}

module.exports = cloneRepo
