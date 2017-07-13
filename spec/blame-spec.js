const la = require('lazy-ass')
const is = require('check-more-types')
const schemaShot = require('schema-shot')
const snapshot = require('snap-shot')
const { stubExecOnce } = require('stub-spawn-once')
const { stripIndent } = require('common-tags')

/* global describe, it */
describe.only('blame', () => {
  const blame = require('..').blame

  it('is a function', () => {
    la(is.fn(blame))
  })

  it('gets blame for 1 line of this file', () => {
    const line = 1
    return schemaShot(blame(__filename, line))
  })

  it('mocks exec and parses output', () => {
    // line 10000 does NOT exist in this file!
    const line = 10000
    const cmd = `git blame --porcelain -L ${line},${line} ${__filename}`
    const output = stripIndent`
      adfb30d5888bb1eb9bad1f482248edec2947dab6 ${line} ${line} 1
      author Gleb Bahmutov
      author-mail <gleb.bahmutov@gmail.com>
      author-time 1499944626
      author-tz -0400
      committer Gleb Bahmutov
      committer-mail <gleb.bahmutov@gmail.com>
      committer-time 1499944626
      committer-tz -0400
      summary mock commit
      filename spec/blame-spec.js
      this is mock line ${line}
    `
    stubExecOnce(cmd, output)
    // can use exact snapshot here, because the output will always be
    // the same! See __snapshots__/blame-spec.js.snap-shot
    return snapshot(blame(__filename, line))
  })
})

// gt.async('blame for this file 1 line', function () {
//   var p = blame(__filename, 1);
//   la(check.object(p) && check.fn(p.then),
//     'returns a promise', p);
//   p.then(function (info) {
//     la(check.object(info), 'got blame', info);
//     console.log(info);
//     la(check.unemptyString(info.author), 'has author');
//     la(check.unemptyString(info.line), 'has line');
//   }, function onError(err) {
//     console.error(err);
//     la(check.unemptyString(err) || check.unemptyString(err.message), 'error is a message');
//     gt.ok(false, err);
//   }).finally(function () {
//     gt.start();
//   }).done();
// });

// gt.async('blame for this entire file', function () {
//   var p = blame(__filename);
//   la(check.object(p) && check.fn(p.then),
//     'returns a promise', p);
//   p.then(function (info) {
//     la(check.array(info), 'got blame array', info);
//     la(info.length > 0, 'blame info has multiple records', info);
//     var firstLineInfo = info[0];
//     // console.log(firstLineInfo);
//     la(check.unemptyString(firstLineInfo.author), 'has author', firstLineInfo);
//     la(check.unemptyString(firstLineInfo.line), 'has line', firstLineInfo);
//     la(check.unemptyString(firstLineInfo.summary), 'has summary', firstLineInfo);
//   }, function onError(err) {
//     console.error(err);
//     la(check.unemptyString(err) || check.unemptyString(err.message), 'error is a message');
//     gt.ok(false, err);
//   }).finally(function () {
//     gt.start();
//   }).done();
// });
