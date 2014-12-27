var Q = require('q');
var exec = require('child_process').exec;
var verify = require('check-types').verify;

function execPromise(cmd, verbose) {
  verify.unemptyString(cmd, 'missing command to execute');
  var deferred = Q.defer();
  exec(cmd, function (err, stdout, stderr) {
    if (verbose) {
      console.log('exec result');
      console.log('working folder:', process.cwd());
      console.log('cmd:', cmd);
      console.log('err:', err);
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);
    }

    if (err) {
      return deferred.reject(stderr);
    }
    deferred.resolve(stdout);
  });
  return deferred.promise;
}

module.exports = execPromise;
