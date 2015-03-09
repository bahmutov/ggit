require('lazy-ass');
var check = require('check-more-types');
var exec = require('./exec');

// parses date, author, message
function commitMeta(lines) {
  la(lines.length > 3, 'expected more lines', lines);

  var commit = lines[0].split(' ')[1].trim();
  var author = lines[1].split(':')[1].trim();
  // remove Date:
  var date = lines[2].substr(5).trim();
  var message = lines[4].trim();

  return {
    commit: commit,
    author: author,
    date: date,
    message: message
  };
}

/*
parses git show --numstat output, which is something like this

$ git show --numstat 46350c2
commit 46350c2c9980551d338ce1ad0d8eff7bea9713ec
Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>
Date:   Mon Jan 13 19:04:06 2014 -0500

    better gruntfile

1       1       .jshintrc
54      25      Gruntfile.js
9       0       complexity.json
2       1       package.json
*/
function isValidLine(line) {
  var rex = /^\s*\d+\s+\d+[\w\W]+$/;
  return line && rex.test(line);
}
la(isValidLine('1  1 time-method-call.js'));
la(isValidLine(' 1  0 README.md'));

function parseNumstat(stdout) {
  la(check.unemptyString(stdout), 'missing numstat output', stdout);
  var lines = stdout.split('\n');
  la(lines.length > 3, 'expected more lines', stdout);

  var info = commitMeta(lines);

  var k = 6;
  var fileChanges = {};
  for (; k < lines.length; k += 1) {
    if (isValidLine(lines[k])) {
      var parts = lines[k].split('\t');
      var added = Number(parts[0].trim());
      var deleted = Number(parts[1].trim());
      var filename = parts[2].trim();
      fileChanges[filename] = {
        filename: filename,
        added: added,
        deleted: deleted
      };
    }
  }

  info.changes = fileChanges;
  return info;
}

function commitNumstat(hash) {
  la(check.unemptyString(hash), 'missing commit hash', hash);

  var cmd = 'git show --numstat ' + hash;
  return exec(cmd)
    .then(parseNumstat);
}

module.exports = commitNumstat;
