require('lazy-ass');
var gitBlame = require('./blame');
var check = require('check-more-types');
var q = require('q');
var R = require('ramda');

function toArray(x) {
  return Array.isArray(x) ? x : [x];
}

function zipBlames(filenames, blames) {
  la(check.array(blames), 'blame info', blames);
  console.log('found blame info for', blames.length, 'files');
  la(check.sameLength(filenames, blames),
    'mismatch in blame lengths', filenames, blames);

  var lineBlames = blames.map(toArray);
  var fileBlame = R.zipObj(filenames, lineBlames);
  return fileBlame;
}

// assumes we are inside folder where filenames make sense
// probably inside git repo folder and filenames are relative
// to the repo's root
function commitForEachLine(filenames) {
  console.log('blames for', filenames);

  var blamePromises = filenames.map(function (name) {
    return R.lPartial(gitBlame, name);
  });

  var blameInfo = [];
  function keepBlameInfo(chain, fn) {
    return chain
      .then(fn)
      .then(function (blameForFile) {
        blameInfo.push(blameForFile);
      });
  }

  return blamePromises.reduce(keepBlameInfo, q())
    .then(R.always(blameInfo))
    .then(
      R.lPartial(zipBlames, filenames)
    );
}

module.exports = check.defend(commitForEachLine,
  check.arrayOfStrings, 'need filenames');
