var Q = require('q');
var exec = require('child_process').exec;

function execPromise(cmd) {
  var deferred = Q.defer();
  exec(cmd, function (err, stdout, stderr) {
    if (err) {
      return deferred.reject(stderr);
    }
    deferred.resolve(stdout);
  });
  return deferred.promise;
}

module.exports = execPromise;
