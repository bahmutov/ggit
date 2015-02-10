var exec = require('./exec');

module.exports.getGitRootFolder = function (cb) {
	return exec('git rev-parse --show-toplevel')
		.then(function (path) {
			cb(null, path.trim());
			return path;
		}, function (err) {
			cb(err);
		});
};
