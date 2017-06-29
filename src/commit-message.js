var Q = require('q')
var exists = require('fs').existsSync
var read = require('fs').readFileSync
const join = require('path').join
var gitFolder = require('./git-folder')

function commitMessage () {
  return gitFolder()
    .then(root => join(root, '.git', 'COMMIT_EDITMSG'))
    .then(filename => {
      if (!exists(filename)) {
        return Q.reject(new Error('Cannot find file ' + filename))
      }

      var text = read(filename, 'utf8')
      /* jshint -W064 */
      return Q(text.trim())
    })
}

module.exports = commitMessage
