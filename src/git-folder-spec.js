var la = require('lazy-ass')
var is = require('check-more-types')
const chdir = require('chdir-promise')
const fromThisFolder = require('path').join.bind(null, __dirname)

/* global describe, it, beforeEach, afterEach */
var gitFolder = require('./git-folder')

describe('git-folder', function () {
  it('returns git root folder', function () {
    return gitFolder().then(function (folder) {
      la(is.unemptyString(folder), 'expected git root folder', folder)
    })
  })

  describe('from subfolder', function () {
    let rootFolder

    beforeEach(function () {
      return gitFolder().then(folder => {
        la(is.unemptyString(folder), 'could not grab git folder', folder)
        rootFolder = folder
      })
    })

    beforeEach(function () {
      return chdir.to(__dirname, 'src')
    })

    afterEach(chdir.back)

    it('works from subfolder', function () {
      return gitFolder().then(folder => {
        la(
          folder === rootFolder,
          'not the same folder',
          folder,
          'root folder',
          rootFolder
        )
      })
    })
  })

  // when inside .git folder, the usual command does not work
  // make sure we are returning valid root folder in that case
  describe('from .git folder', function () {
    let rootFolder

    beforeEach(function () {
      return gitFolder().then(folder => {
        la(is.unemptyString(folder), 'could not grab git folder', folder)
        rootFolder = folder
      })
    })

    beforeEach(function () {
      return chdir.to(fromThisFolder('..', '.git'))
    })

    afterEach(chdir.back)

    it('.git subfolder', function () {
      return gitFolder().then(folder => {
        la(
          folder === rootFolder,
          'not the same folder',
          folder,
          'root folder',
          rootFolder
        )
      })
    })
  })
})
