require('lazy-ass');
var check = require('check-types');
var exec = require('./exec');
var path = require('path');
var fs = require('fs');

// from git blame --porcelain string output to object
function toBlameInfo(blamePorcelainOutput) {
  la(check.unemptyString(blamePorcelainOutput),
    'expected string output', blamePorcelainOutput);
  /*
    full-commit-id 73 79 1
    author Joe
    author-mail <joe@email.com>
    author-time 1401904426
    author-tz -0400
    committer Andy
    committer-mail <andy@email.com>
    committer-time 1401904426
    committer-tz -0400
    summary Blah blah blah
    filename path/to/file/from/repo/root
    // current line from file
  */
  var lines = blamePorcelainOutput.split('\n');
  la(lines.length > 3, 'few lines in output', blamePorcelainOutput);
  return {
    commit: lines[0].split(' ')[0],
    author: lines[1].replace('author ', ''),
    committer: lines[5].replace('committer ', ''),
    summary: lines[9].replace('summary ', ''),
    filename: lines[10].replace('filename ', ''), // wrt repo root
    line: lines[11].trim()
  };
}

function blame(filename, lineNumber) {
  la(check.unemptyString(filename), 'missing filename');
  la(check.positiveNumber(lineNumber),
    'file', filename, 'missing line number (starting with 1)', lineNumber);
  var fullFilename = path.resolve(filename);
  la(fs.existsSync(filename), 'file', fullFilename, 'not found, based on', filename);

  console.log('who to blame for', fullFilename, lineNumber);
  // http://git-scm.com/docs/git-blame
  var cmd = 'git blame --porcelain -L ' + lineNumber + ',' + lineNumber + ' ' + fullFilename;
  return exec(cmd).then(toBlameInfo);
}

module.exports = blame;
