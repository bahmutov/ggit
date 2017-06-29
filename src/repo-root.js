var exec = require('./exec')

function getGitRootFolder (cb) {
  return exec('git rev-parse --show-toplevel').then(
    function (path) {
      path = path.trim()
      if (cb) {
        cb(null, path)
      }
      return path
    },
    function (err) {
      if (cb) {
        cb(err)
      } else {
        throw err
      }
    }
  )
}

module.exports = getGitRootFolder
