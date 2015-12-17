module.exports = function (config) {
    config.set({

        frameworks: [
            'jasmine'
        ],

        files: [
            {pattern: 'karmaTests.js', watched: false}
        ],

        preprocessors: {
            // add webpack as preprocessor
            'karmaTests.js': ['webpack', 'sourcemap']
        },

        webpack: require('./webpack.config.karma.js'),

        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-webpack', 'karma-sourcemap-loader'],

        colors: true,

        browsers: ['PhantomJS'],

        singleRun: true
    });
};