module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        mochaTest: {
            unit: {
                src: ['app/src-test/**/*Spec.js']
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js'],
            options: {
                node: true
            }
        }
    });

    grunt.registerTask('test', [
        'jshint:all',
        'mochaTest:unit'
    ]);

    grunt.registerTask('default', ['test']);
};