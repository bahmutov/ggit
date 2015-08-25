var clone = require('../clone-repo');
var testRepoUrl = 'https://github.com/bahmutov/test-next-updater.git';
var path = require('path');
var fs = require('fs');
var exec = require('../exec');
var destFolder = path.join(__dirname, 'destination1');

function removeTempFolder() {
  if (fs.existsSync(destFolder)) {
    console.log('removing folder', destFolder);
    return exec('rm -rf ' + destFolder);
  }
}

gt.module('clone repo', {
  setup: removeTempFolder,
  teardown: removeTempFolder
});

gt.async('cloning test repo', function () {
  clone({
    url: testRepoUrl,
    folder: destFolder
  }).then(function() {
    gt.ok(fs.existsSync(destFolder), 'destination folder exists');
    gt.start();
  });
});
