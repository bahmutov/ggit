/* eslint-env mocha */
describe('clone-repo', () => {
  var clone = require('./clone-repo')
  var testRepoUrl = 'https://github.com/bahmutov/test-next-updater.git'
  var path = require('path')
  var fs = require('fs')
  const la = require('lazy-ass')
  var exec = require('./exec')
  var destFolder = path.join(__dirname, 'destination1')

  function removeTempFolder () {
    if (fs.existsSync(destFolder)) {
      console.log('removing folder', destFolder)
      return exec('rm -rf ' + destFolder)
    }
  }

  beforeEach(removeTempFolder)

  afterEach(removeTempFolder)

  it('cloning test repo', function () {
    return clone({
      url: testRepoUrl,
      folder: destFolder
    }).then(function () {
      la(fs.existsSync(destFolder), 'destination folder exists')
    })
  })
})
