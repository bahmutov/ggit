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
    "commit": "e3e1877d117f779ea18d5371714a6abc82722dfb",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "fix: handle merge commits",
    "filename": "spec/test-file.txt",
    "line": "\tThis is a file to test getting blame for entire file or individual lines"
  },
  {
    "commit": "e3e1877d117f779ea18d5371714a6abc82722dfb",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "fix: handle merge commits",
    "filename": "spec/test-file.txt",
    "line": "\tline 1"
  },
  {
    "commit": "e3e1877d117f779ea18d5371714a6abc82722dfb",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "fix: handle merge commits",
    "filename": "spec/test-file.txt",
    "line": "\tline 2"
  },
  {
    "commit": "e3e1877d117f779ea18d5371714a6abc82722dfb",
    "author": "Gleb Bahmutov",
    "committer": "Gleb Bahmutov",
    "summary": "fix: handle merge commits",
    "filename": "spec/test-file.txt",
    "line": "\tline 3"
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
