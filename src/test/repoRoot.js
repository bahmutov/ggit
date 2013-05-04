var root = require('../repoRoot').getGitRootFolder;

gt.module('repo root');

gt.test(function repoRootFunction() {
	gt.arity(root, 1, 'expects just callback');
});

gt.async(function thisRoot() {
	root(function (err, pathname) {
		gt.undefined(err, 'there is not error');
		gt.string(pathname, 'expected to get repo path');
		gt.start();
	});
});

gt.async(function outOfGitRoot() {
	process.chdir('../../..');
	root(function (err, pathname) {
		gt.ok(err, 'there was an error!');
		gt.ok(!pathname, 'there is no repo root path');
		gt.start();
	});
});