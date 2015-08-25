var exec = require('./exec');
var log = require('debug')('ggit');
var _ = require('lodash');

exports.changedFiles = changedFiles;

function parseLine(line) {
	var parts = line.split('\t');
	return {
		diff: parts[0],
		name: parts[1]
	};
}

function changedFiles() {
	var gitCommand = _.template('git diff --name-status --diff-filter=<%= filter %>');
	log('filter letters Added (A), Copied (C), Deleted (D), Modified (M)');
	var filter = 'AMCD';
	var cmd = gitCommand({ filter: filter });
	log('changed files command', cmd);

	return exec(cmd)
		.then(function (data) {
			data.trim();
			var files = data.split('\n');
			files = files.filter(function (filename) {
				return filename.length;
			}).map(parseLine);

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
