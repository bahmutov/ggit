var la = require('lazy-ass');
var check = require('check-more-types');
var log = require('debug')('ggit');
var _ = require('lodash');
var R = require('ramda');

function parseLine(line) {
  var parts = line.trim().split(/\s+/);
  var diff = parts[0];
  if (diff === 'AM') {
    diff = 'A';
  }
  return {
    diff: diff,
    name: parts[1]
  };
}

function parseOutput(data) {
  data = data.trim();

  var lines = data.split('\n');
  var modifications = lines.filter(function (filename) {
    return filename.length;
  }).map(parseLine);

  return modifications;
}

function ensureUniq(list) {
  la(check.array(list), 'expected list', list);
  return _.uniq(list, 'name');
}

function groupByModification(parsedLines) {
  return _.groupBy(parsedLines, 'diff');
}

function logFoundFiles(files) {
  log('found changed files');
  log(files);
}

function logGroupedFiles(grouped) {
  log('grouped by modification');
  log(grouped);
}

var stdoutToGrouped = R.pipe(
  parseOutput,
  ensureUniq,
  R.tap(logFoundFiles),
  groupByModification,
  R.tap(logGroupedFiles)
);

module.exports = stdoutToGrouped;
