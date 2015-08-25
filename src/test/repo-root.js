require('lazy-ass');
var check = require('check-types');

var root = require('../repo-root');

gt.module('repo root');

gt.test(function repoRootFunction() {
	gt.arity(root, 1, 'expects just callback');
});

gt.async(function thisRoot() {
	root(function (err, pathname) {
		console.log('this root', pathname);
		la(!err, 'there is not an error', err);
		la(check.string(pathname), 'expected to get repo path', pathname);
	}).finally(gt.start);
});

gt.async(function outOfGitRoot() {
	var cwd = process.cwd();
	process.chdir('../../../..');
	root(function (err, pathname) {
		console.log('this root', pathname);
		la(err, 'there was an error!');
		la(!pathname, 'there is no repo root path', pathname);
	})
	.finally(function () {
		process.chdir(cwd);
	})
	.finally(gt.start);
});

