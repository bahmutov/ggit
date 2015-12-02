var la = require('lazy-ass');
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

var stdoutToGrouped = require('./parse-file-status');

function changedFiles(needContents) {
	var gitCommand = _.template('git diff --name-status --diff-filter=<%= filter %>');
	log('filter letters Added (A), Copied (C), Deleted (D), Modified (M)');

	var filter = R.keys(modifications).join('');
	var cmd = gitCommand({ filter: filter });
	log('changed files command', cmd);

	function addContents(grouped) {
		if (!needContents) {
			return grouped;
		}

		return repoRoot().then(function (repoPath) {
			log('repo root', repoPath);
			return repoPath;
		}).then(function (repoPath) {
			var promise = Q.when(grouped);

			_.each(grouped, function (list) {
				la(check.array(list), 'expected list of modifications', list,
					'in', grouped);
				list.forEach(function (info) {
					la(check.unemptyString(info.name), 'missing file name', info);
					info.filename = join(repoPath, info.name);
				});
			});

			_.each(grouped, function (list, modification) {
				log('fetching contents for modification', modification);
				la(modifications[modification], 'unknown modification', modification);

				if (modification === 'M') {
					// need both repo and local copy
					list.forEach(function (info) {
						info.after = read(info.filename, 'utf8');
						promise = promise.then(function () {
							return fileContentsInRepo(info.name)
								.catch(function fileNotFound() {
									// maybe the file was just added and then modified
									// GIT thinks it is M, but there is no repo content yet
									return '';
								});
						}).then(function (contents) {
							info.before = contents;
							return grouped;
						});
					});
				} else if (modification === 'A') {
					// for added files, only grab file contents
					list.forEach(function (info) {
						info.after = read(info.filename, 'utf8');
					});
				} else if (modification === 'D') {
					list.forEach(function (info) {
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

	// another command that gives status especially for added files
	var secondCommand = 'git status --porcelain';

	return Q.all([exec(cmd), exec(secondCommand)])
		.spread(function (firstOutput, secondOutput) {
			log('first output');
			log(firstOutput);
			log('second output');
			log(secondOutput);
			return firstOutput + '\n' + secondOutput;
		})
		.then(stdoutToGrouped)
		.then(R.tap(log))
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
