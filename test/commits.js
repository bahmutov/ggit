require('lazy-ass');
var check = require('check-types');
var R = require('ramda');
var commits = require('../index').commits;

gt.module('commits');

var path = require('path');
var root = path.join(__dirname, '..');

gt.async('commits for this repo', function () {
  la(check.fn(commits.all), 'has commits.all method');

  commits.all(root)
    .then(function (list) {
      console.log('got list of commits', list);
      la(check.array(list), 'has array of commits');
      la(list.length > 1, 'has more than 1 commit');
    })
    .finally(gt.start)
    .done();
});

gt.async('commits by id', function () {
  la(check.fn(commits.all), 'has commits.all method');

  commits.all(root)
    .then(R.take(5))
    .then(commits.byId)
    .then(function (result) {
      la(check.object(result), 'formed commits by id result', result);
    })
    .finally(gt.start)
    .done();
});

