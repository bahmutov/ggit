var la = require('lazy-ass')
var check = require('check-more-types')

/* eslint-env mocha */
describe('repo root', () => {
  var root = require('./repo-root')

  it('repo-root function', function repoRootFunction () {
    la(root.length === 1, 'expects just callback')
  })

  it('this root', function thisRoot () {
    return root(function (err, pathname) {
      console.log('this root', pathname)
      la(!err, 'there is not an error', err)
      la(check.string(pathname), 'expected to get repo path', pathname)
    })
  })

  it('out of git root', function outOfGitRoot () {
    var cwd = process.cwd()
    process.chdir('../../../..')
    return root(function (err, pathname) {
      console.log('this root', pathname)
      la(err, 'there was an error!')
      la(!pathname, 'there is no repo root path', pathname)
    }).finally(function () {
      process.chdir(cwd)
    })
    // .finally(gt.start);
  })
})
