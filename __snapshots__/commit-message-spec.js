exports['parseCommitMessage parses full commit message 1'] = {
  "email": "foo@email.com",
  "subject": "subject line",
  "body": "message line 1\nmessage line 2"
}

exports['parseCommitMessage parses just subject commit 1'] = {
  "email": "foo@email.com",
  "subject": "subject line",
  "body": null
}

exports['parseCommitMessage trims body 1'] = {
  "email": "foo@email.com",
  "subject": "subject line",
  "body": null
}
