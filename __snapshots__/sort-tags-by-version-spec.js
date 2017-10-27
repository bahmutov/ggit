exports['sort tags by version sorts tags 1'] = [
  "1.3.0",
  "1.4.0",
  "1.5.0",
  "1.15.1",
  "1.16.0"
]

exports['sort tags by version sorts v- tags 1'] = [
  "v1.3.0",
  "v1.4.0",
  "v1.5.0",
  "v1.15.1",
  "v1.16.0"
]

exports['sort tags by version sorts mixture of tags and -v tags 1'] = [
  "1.3.0",
  "v1.3.0",
  "v1.4.0",
  "v1.5.0",
  "v1.15.1",
  "1.16.0"
]

exports['sort tags by version handles alpha releases 1'] = [
  "v1.3.0-2",
  "1.3.0",
  "v1.4.0-beta.2",
  "v1.4.0",
  "v1.5.0",
  "v1.15.1",
  "1.16.0-alpha"
]
