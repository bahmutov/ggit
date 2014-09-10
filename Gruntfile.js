/*global module:false*/
module.exports = function (grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      'default': {
        src: ['index.js', 'Gruntfile.js', 'src/*.js', '!src/**/test/cover']
      }
    },
    'node-qunit': {
      all: {
        deps: './node_modules/qunit-promises/qunit-promises.js',
        code: './src/getOneLineLog.js',
        tests: './src/test/getOneLineLog.js'
      }
    },
    jsonlint: {
      all: {
        src: ['*.json']
      }
    },
    complexity: {
      default: grunt.file.readJSON('complexity.json')
    },
    readme: {
      options: {
        readme: './docs/README.tmpl.md',
        docs: '.',
        templates: './docs'
      }
    },
    /* to bump version, then run grunt (to update readme), then commit
    grunt release
    */
    bump: {
      options: {
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['-a'], // '-a' for all files
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'origin'
      }
    }
  });

  var plugins = module.require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  grunt.registerTask('pre-check', ['deps-ok', 'jsonlint',
    'jshint', 'nice-package', 'complexity']);
  grunt.registerTask('release', ['bump-only:patch', 'readme', 'bump-commit']);

  grunt.registerTask('default', ['pre-check', 'readme']);
};
