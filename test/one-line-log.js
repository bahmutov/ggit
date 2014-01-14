var log = require('../index').getOneLineLog;
var verify = require('check-types').verify;

gt.module('one line log');

gt.test('basics', function () {
  gt.func(log, 'one line log is a function');
});