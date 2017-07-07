const snapshot = require('snap-shot')
const sort = require('./sort-tags-by-version')

/* global describe, it */
describe('sort tags by version', function () {
  it('sorts tags', function () {
    const text = `
    1.15.1
    1.16.0
    1.3.0
    1.4.0
    1.5.0
    `
    const sorted = sort(text)
    snapshot(sorted)
  })

  it('sorts v- tags', function () {
    const text = `
    v1.15.1
    v1.16.0
    v1.3.0
    v1.4.0
    v1.5.0
    `
    const sorted = sort(text)
    snapshot(sorted)
  })

  it('sorts mixture of tags and -v tags', function () {
    const text = `
    v1.15.1
    1.16.0
    1.3.0
    v1.3.0
    v1.4.0
    v1.5.0
    `
    const sorted = sort(text)
    snapshot(sorted)
  })

  it('handles alpha releases', function () {
    const text = `
    v1.15.1
    1.16.0-alpha
    1.3.0
    v1.3.0-2
    v1.4.0
    v1.4.0-beta.2
    v1.5.0
    `
    const sorted = sort(text)
    snapshot(sorted)
  })
})
