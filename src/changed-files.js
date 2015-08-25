var exec = require('./exec');
var log = require('debug')('ggit');

exports.changedFiles = changedFiles;

function changedFiles() {
	var cmd = 'git diff --name-only';
	return exec(cmd)
		.then(function (data) {
			data.trim();
			var files = data.split('\n');
			files = files.filter(function (filename) {
				return filename.length;
			});
			log('found changed files');
			log(files);
			return files;
		});
}

if (!module.parent) {
	changedFiles().then(function (files) {
		console.log('changed files in the current repo');
		console.log(files);
	});
}
