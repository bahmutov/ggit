require('lazy-ass');
var check = require('check-more-types');
var exec = require('./exec');
var log = require('debug')('ggit');
var _ = require('lodash');
var R = require('ramda');
var fileContentsInRepo = require('./file-contents');
la(check.fn(fileContentsInRepo), 'missing file contents function', fileContentsInRepo);
var read = require('fs').readFileSync;
var Q = require('q');
var repoRoot = require('./repo-root');
var join = require('path').join;

var modifications = {
	A: 'added',
	M: 'modified',
	C: 'copied',
	D: 'deleted'
};

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

function changedFiles(needContents) {
	var gitCommand = _.template('git diff --name-status --diff-filter=<%= filter %>');
	log('filter letters Added (A), Copied (C), Deleted (D), Modified (M)');

	var filter = R.keys(modifications).join('');
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

	function addContents(grouped) {
		if (!needContents) {
			return grouped;
		}

		return repoRoot().then(function (repoPath) {
			log('repo root', repoPath);
			return repoPath;
		}).then(function (repoPath) {
			var promise = Q.when(grouped);

			// TODO move full filename setting here

			_.each(grouped, function (list, modification) {
				console.log('fetching contents for modification', modification);
				la(modifications[modification], 'unknown modification', modification);

				if (modification === 'M') {
					// need both repo and local copy
					list.forEach(function (info) {
						la(check.unemptyString(info.name), 'missing file name', info);
						info.filename = join(repoPath, info.name);
						info.after = read(info.filename, 'utf8');
						promise = promise.then(function () {
							return fileContentsInRepo(info.name);
						}).then(function (contents) {
							info.before = contents;
							return grouped;
						});
					});
				} else if (modification === 'A') {
					// for added files, only grab file contents
					list.forEach(function (info) {
						la(check.unemptyString(info.name), 'missing file name', info);
						info.filename = join(repoPath, info.name);
						info.after = read(info.filename, 'utf8');
					});
				} else if (modification === 'D') {
					list.forEach(function (info) {
						la(check.unemptyString(info.name), 'missing file name', info);
						info.filename = join(repoPath, info.name);
						promise = promise.then(function () {
							return fileContentsInRepo(info.name);
						}).then(function (contents) {
							info.before = contents;
							return grouped;
						});
					});
				}


			});

			return promise;
		});
	}

	var stdoutToGrouped = R.pipe(
		parseOutput,
		R.tap(logFoundFiles),
		groupByModification,
		R.tap(logGroupedFiles)
	);
	return exec(cmd)
		.then(stdoutToGrouped)
		.then(addContents);
}

module.exports = changedFiles;

if (!module.parent) {
	(function showChangedFiles() {
		var needContents = true;
		changedFiles(needContents).then(function (files) {
			console.log('changed files in the current repo');
			console.log(files);
		}).done();
	}());
}
