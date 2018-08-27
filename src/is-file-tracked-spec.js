var isTracked = require('./is-file-tracked')
var join = require('path').join
const la = require('lazy-ass')

/* eslint-env mocha */
describe('is file tracked', () => {
  it('index file is tracked', function () {
    var filename = join(__dirname, '../index.js')
    return isTracked(filename).then(function (result) {
      console.log('is index.js tracked?', result)
      la(result, 'index.js should be tracked')
    })
  })

  it('node_modules folder is not tracked', function () {
    var dirname = join(__dirname, '../node_modules')
    return isTracked(dirname).then(function (result) {
      console.log('is node_modules tracked?', result)
      la(!result)
    })
  })
})
