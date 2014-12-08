var getOneLineLog = require('./src/getOneLineLog');

module.exports = {
	getOneLineLog: getOneLineLog,
	cloneRepo: require('./src/cloneRepo'),
	exec: require('./src/exec'),
	blame: require('./src/blame'),
	isTracked: require('./src/is-file-tracked')
};

if (!module.parent) {
	getOneLineLog({
		n: 4,
		remote: 'origin',
		branch: 'master'
	})
	.done(function (stdout) {
		console.log(stdout);
	}, function (err) {
		console.error(err);
	});
}
