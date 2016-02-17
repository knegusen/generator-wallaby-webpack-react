module.exports = function (config) {
    config.set({

        frameworks: [
            'jasmine'
        ],

        files: [
            'src-test/**/*Spec.js*'
        ],

        preprocessors: {
            // add webpack as preprocessor
            'src/**/*.js*': ['webpack', 'sourcemap'],
            'src-test/**/*.js*': ['webpack', 'sourcemap']
        },

        webpack: require('./webpack.config.karma.js'),

        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-webpack', 'karma-sourcemap-loader'],

        colors: true,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};