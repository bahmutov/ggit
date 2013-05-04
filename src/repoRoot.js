var spawn = require('child_process').spawn;
var check = require('check-types');

module.exports.getGitRootFolder = function(cb) {
	check.verifyFunction(cb, 'expect callback function, not', cb);
	var git = spawn('git', ['rev-parse', '--show-toplevel']);
	var topLevelFolder = null;
	var err = undefined;

	git.stdout.setEncoding('utf-8');
	git.stdout.on('data', function (data) {
		data.trim();
		if (/fatal/.test(data)) {
			err = 'Could not determine git top folder\n' + data;
			return;
		}
		topLevelFolder = data.trim();
	});

	git.stderr.setEncoding('utf-8');
	git.stderr.on('data', function (data) {
		err = 'Could not determine git top folder\n' + data;
		return;
	});

	git.on('exit', function (code) {
		cb(err, topLevelFolder);
	});
};