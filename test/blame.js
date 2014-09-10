var blame = require('../index').blame;
require('lazy-ass');
var check = require('check-types');

gt.module('blame');

gt.async('blame for this file', function () {
  var p = blame(__filename, 1);
  la(check.object(p) && check.fn(p.then),
    'returns a promise', p);
  p.then(function (info) {
    la(check.object(info), 'got blame', info);
    console.log(info);
    la(check.unemptyString(info.author), 'has author');
    la(check.unemptyString(info.line), 'has line');
  }, function onError(err) {
    console.error(err);
    la(check.unemptyString(err) || check.unemptyString(err.message), 'error is a message');
    gt.ok(false, err);
  }).finally(function () {
    gt.start();
  }).done();
});
