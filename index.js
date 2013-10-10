var Q = require('q');
var exec = require('child_process').exec;
var execPromise = Q.denodeify(exec);

var promise = execPromise('git log --pretty=oneline');
promise.done(function (stdout) {
	console.log(stdout);
}, function (err) {
	console.error(err);
});
