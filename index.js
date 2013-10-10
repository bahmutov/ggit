var getLog = require('./src/getOneLineLog');

getLog({n: 4})
.done(function (stdout) {
	console.log(stdout);
}, function (err) {
	console.error(err);
});
