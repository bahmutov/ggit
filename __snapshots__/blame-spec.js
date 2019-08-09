exports['blame mocks exec and parses output 1'] = {
  "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
  "author": "Gleb Bahmutov",
  "committer": "Gleb Bahmutov",
  "summary": "mock commit",
  "filename": "spec/blame-spec.js",
  "line": "this is mock line 10000"
}

exports['blame can grab blame for entire file 1'] = [
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\tconst la = require('lazy-ass')"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\tconst is = require('check-more-types')"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\tconst schemaShot = require('schema-shot')"
  },
  {
    "commit": "9a86d902bc83cadc69f27e012ad7e6c3203ac388",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "start work on commit message for any commit",
    "filename": "spec/blame-spec.js",
    "line": "\tconst snapshot = require('snap-shot-it')"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\tconst { stubExecOnce } = require('stub-spawn-once')"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\tconst { stripIndent } = require('common-tags')"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "ca3bf0d54fa3e0782e252e67cc14390a52f3f784",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "restore file system before loading snapshot",
    "filename": "spec/blame-spec.js",
    "line": "\t/* global describe, it, beforeEach */"
  },
  {
    "commit": "a24a1255531ea46f0b721661fac847a5fe6009f9",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "test blame entire file",
    "filename": "spec/blame-spec.js",
    "line": "\tdescribe('blame', () => {"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t  const blame = require('..').blame"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t  it('is a function', () => {"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t    la(is.fn(blame))"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t  })"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t  it('gets blame for 1 line of this file', () => {"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t    const line = 1"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    return schemaShot(blame(__filename, line))"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t  })"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t  it('mocks exec and parses output', () => {"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    // line 10000 does NOT exist in this file!"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    const line = 10000"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    const cmd = `git blame --porcelain -L ${line},${line} ${__filename}`"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    const output = stripIndent`"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      adfb30d5888bb1eb9bad1f482248edec2947dab6 ${line} ${line} 1"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      author Gleb Bahmutov"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      author-mail <gleb.bahmutov@gmail.com>"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      author-time 1499944626"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      author-tz -0400"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      committer Gleb Bahmutov"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      committer-mail <gleb.bahmutov@gmail.com>"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      committer-time 1499944626"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      committer-tz -0400"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      summary mock commit"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      filename spec/blame-spec.js"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t      this is mock line ${line}"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    `"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    stubExecOnce(cmd, output)"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    // can use exact snapshot here, because the output will always be"
  },
  {
    "commit": "b2bf285c40b0c17743d84495b69c51d4c6367089",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mock test",
    "filename": "spec/blame-spec.js",
    "line": "\t    // the same! See __snapshots__/blame-spec.js.snap-shot"
  },
  {
    "commit": "0000000000000000000000000000000000000000",
    "author": "Not Committed Yet",
    "committer": "Not Committed Yet",
    "summary": "Version of spec/blame-spec.js from spec/blame-spec.js",
    "filename": "spec/blame-spec.js",
    "line": "\t    return blame(__filename, line).then(snapshot)"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t  })"
  },
  {
    "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "move blame test",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "a24a1255531ea46f0b721661fac847a5fe6009f9",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "test blame entire file",
    "filename": "spec/blame-spec.js",
    "line": "\t  it('can grab blame for entire file', () => {"
  },
  {
    "commit": "0000000000000000000000000000000000000000",
    "author": "Not Committed Yet",
    "committer": "Not Committed Yet",
    "summary": "Version of spec/blame-spec.js from spec/blame-spec.js",
    "filename": "spec/blame-spec.js",
    "line": "\t    return blame(__filename).then(snapshot)"
  },
  {
    "commit": "a24a1255531ea46f0b721661fac847a5fe6009f9",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "test blame entire file",
    "filename": "spec/blame-spec.js",
    "line": "\t  })"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t  describe('non-existent file', () => {"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    const fs = require('fs')"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    const sinon = require('sinon')"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    const path = require('path')"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    const line = 42"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    const file = 'foo.txt'"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    const fullFilename = path.resolve(file)"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    beforeEach(() => {"
  },
  {
    "commit": "78bf5f3a009f0cab9a176e66e9d81e13feb25a40",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "upgrade deps",
    "filename": "spec/blame-spec.js",
    "line": "\t      sinon"
  },
  {
    "commit": "78bf5f3a009f0cab9a176e66e9d81e13feb25a40",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "upgrade deps",
    "filename": "spec/blame-spec.js",
    "line": "\t        .stub(fs, 'existsSync')"
  },
  {
    "commit": "78bf5f3a009f0cab9a176e66e9d81e13feb25a40",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "upgrade deps",
    "filename": "spec/blame-spec.js",
    "line": "\t        .withArgs(file)"
  },
  {
    "commit": "78bf5f3a009f0cab9a176e66e9d81e13feb25a40",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "upgrade deps",
    "filename": "spec/blame-spec.js",
    "line": "\t        .returns(true)"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t      const cmd = `git blame --porcelain -L ${line},${line} ${fullFilename}`"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t      const output = stripIndent`"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        adfb30d5888bb1eb9bad1f482248edec2947dab6 ${line} ${line} 1"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        author Gleb Bahmutov"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        author-mail <gleb.bahmutov@gmail.com>"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        author-time 1499944626"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        author-tz -0400"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        committer Gleb Bahmutov"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        committer-mail <gleb.bahmutov@gmail.com>"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        committer-time 1499944626"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        committer-tz -0400"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        summary mock commit"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        filename spec/blame-spec.js"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t        this is mock line ${line}"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t      `"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t      stubExecOnce(cmd, output)"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    })"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    it('can mock blame for non-existent file', () => {"
  },
  {
    "commit": "ca3bf0d54fa3e0782e252e67cc14390a52f3f784",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "restore file system before loading snapshot",
    "filename": "spec/blame-spec.js",
    "line": "\t      const result = blame(file, line)"
  },
  {
    "commit": "ca3bf0d54fa3e0782e252e67cc14390a52f3f784",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "restore file system before loading snapshot",
    "filename": "spec/blame-spec.js",
    "line": "\t      // restore file system in order for snapshots to load"
  },
  {
    "commit": "ca3bf0d54fa3e0782e252e67cc14390a52f3f784",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "restore file system before loading snapshot",
    "filename": "spec/blame-spec.js",
    "line": "\t      fs.existsSync.restore()"
  },
  {
    "commit": "ca3bf0d54fa3e0782e252e67cc14390a52f3f784",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "restore file system before loading snapshot",
    "filename": "spec/blame-spec.js",
    "line": "\t      return snapshot(result)"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t    })"
  },
  {
    "commit": "159c3764365be53f9894db6b55aa6dd4dbffd4de",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "mocking blame",
    "filename": "spec/blame-spec.js",
    "line": "\t  })"
  },
  {
    "commit": "a24a1255531ea46f0b721661fac847a5fe6009f9",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "test blame entire file",
    "filename": "spec/blame-spec.js",
    "line": "\t})"
  }
]

exports['blame non-existent file can mock blame for non-existent file 1'] = {
  "commit": "adfb30d5888bb1eb9bad1f482248edec2947dab6",
  "author": "Gleb Bahmutov",
  "committer": "Gleb Bahmutov",
  "summary": "mock commit",
  "filename": "spec/blame-spec.js",
  "line": "this is mock line 42"
}
