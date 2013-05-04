var check = require('check-types');
var moment = require('moment');
var spawn = require('child_process').spawn;
var path = require('path');
var getGitRootFolder = require('./repoRoot').getGitRootFolder;

// returns commits in reverse chronological order
function gitLog(filename, commits, cb, err, rootFolder) {
	if (err) {
		throw err;
	}
	check.verifyString(filename, 'missing filename');
	check.verifyPositiveNumber(commits, 'invalid number of commits', commits);
	check.verifyFunction(cb, 'callback should be a function');

	// use -n <number> to limit history
	// oe --since <date>
	// var args = ['log', '--no-decorate', '-n ' + commits];
	var args = ['log', '--name-status', '-n ' + commits];
	
	if (filename) {
		check.verifyString(rootFolder, 'could not find git root folder');
		rootFolder = rootFolder.trim();
		rootFolder = rootFolder.replace(/\//g, '\\');

		console.log('filename', filename);
		console.log('repo root folder', rootFolder);
		var workingFolder = process.cwd();
		console.log('working folder', workingFolder);

		var relativePath = path.relative(workingFolder, filename);
		var repoPath = path.relative(rootFolder, filename);
		args.push(relativePath);		
	}
	
	console.log('git log command', args);
	var git = spawn('git', args);

	var commits = [];
	git.stdout.setEncoding('utf-8');
	git.stdout.on('data', function (data) {
		data.trim();
		// console.log('git data\n', data);
		
		var separatedData = data.split('\ncommit ');
		separatedData = separatedData.filter(function(str) {
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
		console.log('returning', commits.length, 'commits');
		cb(commits);
	});
}

function parseCommit(data) {
	check.verifyString(data, 'null commit data');
	data = data.trim();
	// console.log('parsing commit\n', data);
	var lines = data.split('\n');
	console.assert(lines.length > 3, 'invalid commit\n', data);
	// console.log('commit lines\n', lines);
	var commitLine = lines[0].trim();
	if (commitLine.indexOf('commit ') === 0) {
		commitLine = commitLine.substr('commit '.length);
	}
	
	var authorLine = lines[1].split(':')[1].trim();
	var dateLine = lines[2];
	dateLine = dateLine.substr(dateLine.indexOf(':') + 1);
	dateLine = dateLine.trim();
	// console.log(dateLine);

	lines.splice(0, 3);
	lines = lines.filter(function(str) {
		return str;
	});
	lines = lines.map(function(str) {
		str = str.trim();
		return str;
	});
	
	var files = [];
	lines = lines.filter(function(str) {
		// console.log('checking line', str);
		if (str.indexOf('M') === 0 ||
			str.indexOf('A') === 0 ||
			str.indexOf('D') === 0) {
			files.push({
				name: str.substr(1).trim(),
				status: str[0]
			});
			return false;
		} else {
			return true;
		}
	});
	
	var description = lines.join('\n');
	return {
		commit: '' + commitLine.trim(),
		author: authorLine.trim(),
		date: moment(dateLine),
		description: description.trim(),
		files: files
	};
}

function getGitLog(filename, commits, cb) {
	if (filename) {
		check.verifyString(filename, 'expected filename');
		filename = path.resolve(filename);
		console.log('fetching', commits, 'history for', filename);
	}
	commits = commits || 30;
	check.verifyPositiveNumber(commits, 'invalid max number of commits', commits);
	check.verifyFunction(cb, 'expect callback function, not', cb);
	
	getGitRootFolder(gitLog.bind(null, filename, commits, cb));
}

module.exports = {
	getGitLog: getGitLog,
	parseCommit: parseCommit
};