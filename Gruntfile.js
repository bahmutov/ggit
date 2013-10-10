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
        }
    });

    var plugins = module.require('matchdep').filterDev('grunt-*');
    plugins.forEach(grunt.loadNpmTasks);

    grunt.registerTask('default', ['nice-package', 'jshint']);
};
