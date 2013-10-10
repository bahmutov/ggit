var Q = require('q');
var exec = require('child_process').exec;

function execPromise(cmd) {
	var deferred = Q.defer();
	exec(cmd, function (err, stdout, stderr) {
		if (err) return deferred.reject(stderr);
		deferred.resolve(stdout);
	});
	return deferred.promise;
}

function parsePrettyLog(data) {
	var lines = data.split('\n');
	lines = lines.filter(function (line) {
		return !!line;
	});
	var splitLines = lines.map(function (line) {
		// should be id space log message
		var firstSpace = line.indexOf(' ');
		return {
			id: line.substr(0, firstSpace),
			message: line.substr(firstSpace).trim()
		};
	});
	return splitLines;
}

// returns a promise
function getLog(opts) {
	opts = opts || {};
	opts.n = opts.n || 10;

	var cmd = 'git log --pretty=oneline -n ' + opts.n;
	return execPromise(cmd).then(parsePrettyLog);
}

getLog({n: 4})
.done(function (stdout) {
	console.log(stdout);
}, function (err) {
	console.error(err);
});
