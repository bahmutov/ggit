var spawn = require('child_process').spawn;
var path = require('path');
var fs = require('fs');
var moment = require('moment');

// todo: get back to working state
// var metrics = require('./metrics');
var optimist = require('optimist');
var Table = require('cli-table');

var config = {
	filename: '',
	report: '',
	commits: 30
};

function parseCommit(data) {
	console.assert(data, 'null commit data');
	var lines = data.split('\n');
	console.assert(lines.length > 3, 'invalid commit\n', data);
	// console.log('commit lines\n', lines);
	var commitLine = lines[0].trim();
	var authorLine = lines[1].split(':')[1].trim();
	var dateLine = lines[2];
	dateLine = dateLine.substr(dateLine.indexOf(':') + 1);
	dateLine = dateLine.trim();
	// console.log(dateLine);

	lines.splice(0, 3);
	lines = lines.filter(function (str) {
		return str;
	});
	lines = lines.map(function (str) {
		str = str.trim();
		return str;
	});
	var description = lines.join('\n');
	return {
		commit: commitLine,
		author: authorLine,
		date: moment(dateLine),
		description: description
	};
}

function getGitRootFolder(cb) {
	console.assert(typeof cb === 'function', 'expect callback function, not', cb);
	var git = spawn('git', ['rev-parse', '--show-toplevel']);
	var topLevelFolder = null;

	git.stdout.setEncoding('utf-8');
	git.stdout.on('data', function (data) {
		data.trim();
		if (/fatal/.test(data)) {
			throw new Error('Could not determine git top folder\n' + data);
		}
		topLevelFolder = data.trim();
	});

	git.stderr.setEncoding('utf-8');
	git.stderr.on('data', function (data) {
		throw new Error('Could not determine git top folder\n' + data);
	});

	git.on('exit', function (code) {
		cb(topLevelFolder);
	});
}

function getFileRevision(commit, filename, cb) {
	console.assert(commit, 'missing commit code');
	console.assert(filename, 'missing filename');

	var args = ['show', commit + ':' + filename];
	console.log('getting file revision', args);
	var git = spawn('git', args);

	var contents = '';
	git.stdout.setEncoding('utf-8');
	git.stdout.on('data', function (data) {
		data.trim();
		// console.log(data);
		contents += data;
	});

	git.stderr.setEncoding('utf-8');
	git.stderr.on('data', function (data) {
		throw new Error('Could not get file\n' + filename +
			'\n' + data);
	});

	git.on('exit', function (code) {
		cb(contents);
	});
}

function getGitLog(filename, cb) {
	console.assert(typeof cb === 'function', 'expect callback function, not', cb);
	filename = path.resolve(filename);
	console.log('fetching history for', filename);

	getGitRootFolder(function (rootFolder) {
		console.assert(rootFolder, 'could not find git root folder');
		rootFolder = rootFolder.trim();
		rootFolder = rootFolder.replace(/\//g, '\\');

		console.log('filename', filename);
		console.log('repo root folder', rootFolder);
		var workingFolder = process.cwd();
		console.log('working folder', workingFolder);

		var relativePath = path.relative(workingFolder, filename);
		var repoPath = path.relative(rootFolder, filename);

		// use -n <number> to limit history
		// oe --since <date>
		var args = ['log', '--no-decorate', '-n ' + config.commits];
		args.push(relativePath);
		console.log('git log command', args);
		var git = spawn('git', args);

		var commits = [];
		git.stdout.setEncoding('utf-8');
		git.stdout.on('data', function (data) {
			data.trim();
			var separatedData = data.split('commit');
			separatedData = separatedData.filter(function (str) {
				str.trim();
				return str && str !== '\n';
			});
			var info = separatedData.map(parseCommit);
			commits = commits.concat(info);
		});

		git.stderr.setEncoding('utf-8');
		git.stderr.on('data', function (data) {
			throw new Error('Could not get git log for\n' + filename +
				'\n' + data);
		});

		git.on('exit', function (code) {
			cb(repoPath, commits);
		});
	});
}

function run(options) {
	console.assert(options, 'missing options');
	console.assert(options.filename, 'missing input filename');
	config.filename = options.filename;
	config.report = options.report || path.basename(args.filename) + '.complexityHistory.json';
	config.commits = options.commits || config.commits;
	getGitLog(options.filename, writeComplexityHistory);
}

function writeComplexityHistory(filename, commits) {
	console.assert(filename, 'missing filename');
	console.assert(Array.isArray(commits), 'expected commits');
	filename = filename.replace(/\\/g, '/');
	console.log('fetching revisions for', filename, 'for', commits.length, 'revisions');
	var titles = ['Date', 'LOC', 'Cyclomatic', 'Halstead', 'Author'];
	var rows = [];
	commits.forEach(function (revision) {
		getFileRevision(revision.commit, filename, function (contents) {
			var report = metrics.getSourceComplexity(contents);
			console.assert(report, 'missing report for', filename, 'commit', revision.commit);
			//console.log(revision.date, 'LOC', report.aggregate.complexity.cyclomatic,
			//	'Halstead', report.aggregate.complexity.halstead.difficulty.toFixed(0));
			rows.push([revision.date,
				report.aggregate.complexity.sloc.logical,
				report.aggregate.complexity.cyclomatic,
				+report.aggregate.complexity.halstead.difficulty.toFixed(0),
				revision.author,
				revision.description]);
			if (rows.length === commits.length) {
				var comparison = function (a, b) {
					var first = a[0];
					var second = b[0];
					if (first < second) {
						return -1;
					} else if (first > second) {
						return 1;
					} else {
						return 0;
					}
				};
				rows.sort(comparison);
				rows = rows.map(function (row) {
					row[0] = row[0].format('YYYY/MM/DD HH:mm:ss');
					return row;
				});

				var table = new Table({
					head: titles
				});
				rows.forEach(function (row) {
					table.push(row.slice(0, 5));
				});
				console.log(table.toString());

				var reportArray = rows.map(function (row) {
					return {
						date: row[0],
						loc: row[1],
						cyclomatic: row[2],
						halstead: row[3],
						author: row[4],
						description: row[5]
					};
				});
				var fileReport = {
					filename: filename,
					complexityHistory: reportArray
				};
				fs.writeFileSync(config.report, JSON.stringify(fileReport, null, 2), 'utf-8');
				console.log('Saved report text', config.report);
			}
		});
	});
}

if (!module.parent) {
	var args = optimist.usage('Report file source complexity through history.\n' +
		'Usage: $0 <source filename>')
		.default({
			help: false,
			filename: '',
			report: '',
			commits: 20
		}).alias('h', 'help').describe('help', 'show usage help and exit')
		.alias('i', 'filename').alias('f', 'filename').string('filename')
		.describe('filename', 'input source filename')
		.alias('r', 'report').string('report')
		.describe('report', 'output report filename')
		.alias('n', 'commits').describe('commits', 'maximum commits to trace, should be positive')
		.argv;
	if (!args.filename) {
		args.filename = args._[0];
	}
	if (!args.filename || args.help) {
		optimist.showHelp();
		console.error('missing input filename');
		process.exit(1);
	}
	if (!args.filename || args.help) {
		optimist.showHelp();
		console.log('Current command line arguments\n', args);
		process.exit(0);
	}
	if (!args.report) {
		args.report = path.basename(args.filename) + '.complexityHistory.json';
	}
	if (typeof args.commits !== 'number' || args.commits < 1) {
		optimist.showHelp();
		console.error('invalid maximum commits', args.commits);
		process.exit(1);
	}

	run({
		filename: args.filename,
		report: args.report,
		commits: args.commits
	});
}

module.exports = {
	fileComplexityHistorian: {
		run: run
	}
};