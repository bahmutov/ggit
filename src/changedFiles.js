var spawn = require('child_process').spawn;
var path = require('path');
var check = require('check-types');

exports.changedFiles = changedFiles;

function changedFiles(repoTopFolder, cb) {
	check.verifyString(repoTopFolder, 'expected git top folder');
	check.verifyFunction(cb, 'expect callback function, not', cb);
	repoTopFolder = repoTopFolder.trim();

	var diff = spawn('git', ['diff', '--name-only']);
	var files = [];

	diff.stdout.setEncoding('utf-8');
	diff.stdout.on('data', function (data) {
		data.trim();
		files = data.split('\n');
		files = files.filter(function (filename) {
			return filename.length;
		});
		files = files.map(function (filename) {
			return path.join(repoTopFolder, filename);
		});
	});

	diff.stderr.setEncoding('utf-8');
	diff.stderr.on('data', function (data) {
		console.log('git diff error: ' + data);
	});

	diff.on('exit', function (code) {
		cb(files);
	});
}