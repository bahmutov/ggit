var la = require('lazy-ass')
var check = require('check-more-types')
var exec = require('./exec')
var path = require('path')
var fs = require('fs')
var quote = require('quote')
var R = require('ramda')

function isFileNameLine (line) {
  return /^filename/.test(line)
}
var findFilenameLine = R.find(isFileNameLine)

function linesToBlameInfo (lines) {
  la(check.array(lines), 'expected lines', lines)
  la(lines.length > 3, 'few lines in output', lines)
  la(/^author/.test(lines[1]), 'cannot find author line in', lines)

  var info = {
    commit: lines[0].split(' ')[0],
    author: lines[1].replace('author ', ''),
    committer: lines[5].replace('committer ', ''),
    summary: lines[9].replace('summary ', '')
  }

  var filename = findFilenameLine(lines)
  la(
    /^filename/.test(filename),
    'could not find filename line from',
    quote(filename),
    'from',
    lines.length,
    'lines\n---\n' + lines.join('\n') + '\n---'
  )
  info.filename = filename.replace('filename ', '') // wrt repo root

  var line = lines[lines.length - 1]
  info.line = line
  return info
}

// from git blame --porcelain single line string output to object
function toBlameInfo (blamePorcelainOutput) {
  la(
    check.unemptyString(blamePorcelainOutput),
    'expected string output',
    blamePorcelainOutput
  )
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
  var lines = blamePorcelainOutput.trim().split('\n')
  return linesToBlameInfo(lines)
}

function isUncommittedLine (line) {
  la(check.unemptyString(line), 'expected commit id line', line)
  return /^00000/.test(line)
}

function hasPreviousCommitId (lines) {
  la(check.array(lines), 'expected string lines', lines)
  return /^previous/.test(lines[10])
}

function hasBoundaryLine (lines) {
  la(check.array(lines), 'expected string lines', lines)
  return /^boundary/.test(lines[10])
}

function linesPerCommit (lines) {
  return isUncommittedLine(lines[0]) ||
  hasPreviousCommitId(lines) ||
  hasBoundaryLine(lines)
    ? 13
    : 12
}

function toBlameInfoFile (blamePorcelainOutput) {
  la(
    check.unemptyString(blamePorcelainOutput),
    'expected string output',
    blamePorcelainOutput
  )
  /*
    each 12 lines will have information about the commit, something like

    6e65f8ec5ed63cac92ed130b1246d9c23223c04e 1 1 6
    author Gleb Bahmutov
    author-mail <gleb.bahmutov@gmail.com>
    author-time 1410319209
    author-tz -0400
    committer Gleb Bahmutov
    committer-mail <gleb.bahmutov@gmail.com>
    committer-time 1410319209
    committer-tz -0400
    summary adding blame feature
    filename test/blame.js
      var blame = require('../index').blame;
  */
  var lines = blamePorcelainOutput.trim().split('\n')
  la(lines.length > 3, 'few lines in output', blamePorcelainOutput)

  var perLineInfo = []
  var lineInfo
  while (lines.length > 0) {
    var linesPerSourceLine = linesPerCommit(lines)
    la(check.positiveNumber(linesPerSourceLine))
    lineInfo = lines.splice(0, linesPerSourceLine)
    // console.log(lineInfo);
    perLineInfo.push(linesToBlameInfo(lineInfo))
  }

  return perLineInfo
}

function blameOneLine (filename, lineNumber) {
  la(check.unemptyString(filename), 'missing filename')
  la(
    check.positiveNumber(lineNumber),
    'file',
    filename,
    'missing line number (starting with 1)',
    lineNumber
  )
  var fullFilename = path.resolve(filename)
  la(
    fs.existsSync(filename),
    'file',
    fullFilename,
    'not found, based on',
    filename
  )

  console.log('who to blame for', fullFilename, lineNumber)
  // http://git-scm.com/docs/git-blame
  var cmd =
    'git blame --porcelain -L ' +
    lineNumber +
    ',' +
    lineNumber +
    ' ' +
    fullFilename
  return exec(cmd).then(toBlameInfo)
}

function blame (filename, lineNumber) {
  la(check.unemptyString(filename), 'missing filename')

  if (lineNumber) {
    return blameOneLine(filename, lineNumber)
  }

  var fullFilename = path.resolve(filename)
  la(
    fs.existsSync(filename),
    'file',
    fullFilename,
    'not found, based on',
    filename
  )

  console.log('who to blame for', fullFilename)
  // http://git-scm.com/docs/git-blame
  var cmd = 'git blame --porcelain --line-porcelain ' + fullFilename
  return exec(cmd).then(toBlameInfoFile)
}

module.exports = blame
