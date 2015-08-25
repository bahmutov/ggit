var spawn = require('child_process').spawn;
var check = require('check-types');
var log = require('debug')('ggit');

exports.changedFiles = changedFiles;

function changedFiles(cb) {
	check.verify.fn(cb, 'expect callback function, not', cb);

	var diff = spawn('git', ['diff', '--name-only']);
	var files = [];

	diff.stdout.setEncoding('utf-8');
	diff.stdout.on('data', function (data) {
		data.trim();
		files = data.split('\n');
		files = files.filter(function (filename) {
			return filename.length;
		});
		log('found changed files');
		log(files);
	});

	diff.stderr.setEncoding('utf-8');
	diff.stderr.on('data', function (data) {
		console.error('git diff error: ' + data);
	});

	diff.on('exit', function () {
		cb(files);
	});
}

if (!module.parent) {
	changedFiles(function (files) {
		console.log('changed files in the current repo');
		console.log(files);
	});
}
