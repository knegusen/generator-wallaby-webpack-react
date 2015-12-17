module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        mochaTest: {
            unit: {
                src: ['app/src-test/**/*Spec.js']
            },
            continuous: {
                src: ['app/src-test/**/*Spec.js'],
                clearRequireCache: true
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/**/*.js'],
            options: {
                node: true
            }
        },
        watch: {
            js: {
                options: {
                    spawn: true,
                    interrupt: true,
                    debounceDelay: 250
                },
                files: ['Gruntfile.js', 'src/*.js', 'test/*.js'],
                tasks: ['mochaTest:continuous']
            }
        }
    });

    grunt.registerTask('test', [
        'jshint:all',
        'mochaTest:unit'
    ]);

    grunt.registerTask('default', ['test']);
};