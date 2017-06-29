'use strict';

var la = require('lazy-ass');
var is = require('check-more-types');

describe('getGitFolder', function () {

  var getGitFolder = require('..').getGitFolder;

  it('is a function', function () {
    la(is.fn(getGitFolder));
  });

  it('returns folder', function () {
    return getGitFolder()
    .then(function (folder) {
      la(is.unemptyString(folder), 'could not get git folder', folder);
    })
  });

});
