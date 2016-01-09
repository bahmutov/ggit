var la = require('lazy-ass');
var check = require('check-more-types');
var glob = require('glob');
var q = require('q');
var folder = require('chdir-promise');
var isTracked = require('./is-file-tracked');
var R = require('ramda');

la(check.fn(glob), 'missing glob');
la(check.fn(isTracked), 'missing is tracked');

function is3rdParty(filename) {
  return /node\_modules/.test(filename) ||
    /bower\_components/.test(filename);
}

function findFiles(pattern, options) {
  pattern = pattern || '**/*.js';
  var jsFiles = glob.sync(pattern, options);
  var appFiles = jsFiles.filter(R.not(is3rdParty));
  console.log('found files\n' + appFiles.join('\n'));
  return q(appFiles);
}

function leaveTracked(filenames) {
  la(check.arrayOfStrings(filenames), 'expected list of filenames', filenames);
  return q.all(filenames.map(isTracked))
    .then(R.zipObj(filenames))
    .then(R.pickBy(R.eq(true)))
    .then(R.keys);
}

function sourceFiles(folderName, pattern, options) {
  if (folderName) {
    return folder.to(folderName)
      .then(findFiles.bind(null, pattern, options))
      .then(leaveTracked)
      .tap(folder.back);
  }
  return findFiles(pattern, options)
    .then(leaveTracked);
}

module.exports = check.defend(sourceFiles,
  check.maybe.unemptyString, 'expected folder name',
  check.maybe.unemptyString, 'expected glob pattern',
  check.maybe.object, 'expected glob options');

if (!module.parent) {
  sourceFiles('.', '**', { dot: true })
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
}
