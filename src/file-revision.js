var spawn = require('child_process').spawn;
var check = require('check-types');

module.exports = {
	getFileRevision: getFileRevision,
	getRepoRevision: getRepoRevision
};

// commit can be SHA-1 or symbolic master~3 type
// filename should be relative to repo root
function getFileRevision(commit, filename, cb) {
	check.verify.string(commit, 'missing commit code');
	check.verify.string(filename, 'missing filename');
	check.verify.fn(cb, 'expected function callback');

	filename = filename.replace(/\\/g, '/');

	var args = ['show', commit + ':' + filename];
	// console.log('getting file revision', args);
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

	git.on('exit', function () {
		cb(contents);
	});
}

function getRepoRevision(filename, cb) {
	getFileRevision('master', filename, cb);
}
