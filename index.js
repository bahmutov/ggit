var getOneLineLog = require('./src/get-one-line-log')

var actions = {
  getOneLineLog: getOneLineLog,
  cloneRepo: require('./src/clone-repo'),
  exec: require('./src/exec'),
  blame: require('./src/blame'),
  isTracked: require('./src/is-file-tracked'),
  hasChanges: require('./src/has-changes'),
  commit: require('./src/commit'),
  push: require('./src/push'),
  commits: require('./src/commits'),
  trackedFiles: require('./src/tracked-source-files'),
  untrackedFiles: require('./src/untracked-files'),
  commitPerLine: require('./src/commit-per-line'),
  numstat: require('./src/commit-numstat'),
  lastCommitId: require('./src/last-commit-id'),
  branchName: require('./src/branch-name'),
  changedFiles: require('./src/changed-files'),
  changedFilesAfter: require('./src/changed-files-after'),
  fileContents: require('./src/file-contents'),
  commitMessage: require('./src/commit-message'),
  getGitFolder: require('./src/git-folder'),
  tags: require('./src/tags'),
  branchTags: require('./src/tags').getBranchTags,
  fetchTags: require('./src/fetch-tags')
}

module.exports = actions

if (!module.parent) {
  /*
  getOneLineLog({
    n: 4,
    remote: 'origin',
    branch: 'master'
  }) */
  actions.lastCommitId().done(
    function (stdout) {
      console.log(stdout)
    },
    function (err) {
      console.error(err)
    }
  )
}
