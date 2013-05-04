var parseCommit = require('../gitLog').parseCommit;
var getGitLog = require('../gitLog').getGitLog;

gt.module('parse commit');

gt.test(function stringComparison() {
	gt.equal('foo', 'foo', 'two strings are equal');
	var foo = 'foo';
	gt.equal('foo', foo, 'two strings are equal');
	var o = {
		foo: 'foo'
	};
	gt.equal('foo', o.foo, 'two strings are equal');
});

gt.test(function compareIds() {
	var id1 = '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348';
	var id2 = '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348';
	gt.equal(id1, id2, 'same strings');
});

gt.test(function basic() {
	gt.func(parseCommit, 'is a function');
	var data = 
	'commit 4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
	'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
	'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
  '  simpler history module structure\n\n' + 
	'M       index.js\n' +
	'M       src/fileHistory.js\n';
	var info = parseCommit(data);
	gt.object(info, 'got back object');
	gt.equal(info.commit, '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348', 'commit id');
	gt.ok(/Gleb Bahmutov/.test(info.author), 'correct author');
	gt.string(info.description, 'has description');
	gt.ok(info.description.length > 0, 'non empty description');
});

gt.test(function withoutFileInformation() {
	gt.func(parseCommit, 'is a function');
	var data = '\n\n' +
	'commit 4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
	'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
	'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
  '  simpler history module structure\n';
	var info = parseCommit(data);
	gt.object(info, 'got back object');
	gt.equal(info.commit, '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348', 'commit id');
	gt.equal(info.files.length, 0, 'no files');
});

gt.test(function basicWithSpaces() {
	gt.func(parseCommit, 'is a function');
	var data = '\n\n' +
	'commit 4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
	'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
	'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
  '  simpler history module structure\n\n' + 
	'M       index.js\n' +
	'M       src/fileHistory.js\n';
	var info = parseCommit(data);
	gt.object(info, 'got back object');
	gt.equal(info.commit, '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348', 'commit id');
	gt.equal(info.files.length, 2, 'two files');
});

gt.test(function basicWithoutCommitKeyword() {
	gt.func(parseCommit, 'is a function');
	var data = 
	'4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348\n' +
	'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
	'Date:   Tue Feb 12 23:09:26 2013 -0500\n\n' +
  '  simpler history module structure\n\n' + 
	'M       index.js\n' +
	'A       src/fileHistory.js\n';
	var info = parseCommit(data);
	gt.object(info, 'got back object');
	gt.equal(info.commit, '4ec3c78ffd07a526a0e1bcf5aca8ba383cfab348', 'commit id');
	gt.equal(info.files.length, 2, 'two files');
});

gt.test(function largerCommit() {
	var data =
	' 935e39e573f86776a4a657c35fd135b593358044\n' +
	'Author: Gleb Bahmutov <gleb.bahmutov@gmail.com>\n' +
	'Date:   Wed Feb 13 00:52:31 2013 -0500\n\n' +
  '\ttesting\n' +
	'parsing commit\n' +
	' parsing, adding individual file information\n\n' +

	'M       .gitignore\n' +
	'M       index.js\n' +
	'M       src/fileHistory.js\n' +
	'M       src/gitLog.js\n' +
	'A       test/parseCommit.js\n';
	var info = parseCommit(data);
	gt.object(info, 'got back object');
});

gt.module('getGitLog');
gt.test(function getLogBasics() {
	gt.arity(getGitLog, 3, 'function arity');
});

gt.async(function getThisFileLog() {
	getGitLog(__filename, 5, function(commits) {
		gt.array(commits, 'got commits array');
		gt.ok(commits.length <= 5, '5 commits at most');
		gt.start();
	});
});