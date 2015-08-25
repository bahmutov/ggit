var exec = require('./exec');
var log = require('debug')('ggit');
var _ = require('lodash');
var R = require('ramda');

function parseLine(line) {
	var parts = line.split('\t');
	return {
		diff: parts[0],
		name: parts[1]
	};
}

function parseOutput(data) {
	data = data.trim();
	var files = data.split('\n');
	files = files.filter(function (filename) {
		return filename.length;
	}).map(parseLine);
	return files;
}

function groupByModification(parsedLines) {
	return _.groupBy(parsedLines, 'diff');
}

function changedFiles() {
	var gitCommand = _.template('git diff --name-status --diff-filter=<%= filter %>');
	log('filter letters Added (A), Copied (C), Deleted (D), Modified (M)');
	var filter = 'AMCD';
	var cmd = gitCommand({ filter: filter });
	log('changed files command', cmd);

	function logFoundFiles(files) {
		log('found changed files');
		log(files);
	}

	function logGroupedFiles(grouped) {
		log('grouped by modification');
		log(grouped);
	}

	var stdoutToGrouped = R.pipe(
		parseOutput,
		R.tap(logFoundFiles),
		groupByModification,
		R.tap(logGroupedFiles)
	);
	return exec(cmd)
		.then(stdoutToGrouped);
}

exports.changedFiles = changedFiles;

if (!module.parent) {
	changedFiles().then(function (files) {
		console.log('changed files in the current repo');
		console.log(files);
	});
}
