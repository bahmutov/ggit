/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            'default': {
                src: [ 'index.js' ]
            }
        },
        'nice-package': {
            all: {}
        },

        'node-qunit': {
            all: {
                deps: './node_modules/qunit-promises/qunit-promises.js',
                code: './src/getOneLineLog.js',
                tests: './src/test/getOneLineLog.js'
            }
        }
    });

    var plugins = module.require('matchdep').filterDev('grunt-*');
    plugins.forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['nice-package', 'jshint', 'node-qunit']);
};
