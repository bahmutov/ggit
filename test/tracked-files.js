require('lazy-ass');
var check = require('check-types');
var R = require('ramda');
var tracked = require('../index').trackedFiles;

gt.module('tracked source files');

gt.async('tracked files in this folder', function () {
  la(check.fn(tracked), 'has tracked function');

  tracked(__dirname)
    .then(function (list) {
      console.log('got list of tracked files', list);
    })
    .finally(gt.start)
    .done();
});

