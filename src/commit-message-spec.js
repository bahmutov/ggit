var la = require('lazy-ass');
var check = require('check-more-types');

/* global describe, it */
var commitMessage = require('./commit-message');

describe('commit message', function () {
  it('grabs commit message', function () {
    return commitMessage()
      .then(function (str) {
        la(check.unemptyString(str), 'expected a message', str);
      }, function (err) {
        la(err instanceof Error, 'rejected with error', err);
      });
  });
});
