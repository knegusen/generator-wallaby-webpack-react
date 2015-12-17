var path = require('path');
var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

    var webpackPostprocessor = wallabyWebpack({
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    });

    var babelCompiler = wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['es2015', 'react'],
        babelrc: false
    });

    return {
        files: [
            {pattern: 'src-test/phantomjs-shims.js', instrument: false},
            {pattern: 'src/**/*.js*', load: false}
        ],

        tests: [
            {pattern: 'src-test/**/ExampleComponentSpec.js*', load: false}
        ],

        compilers: {
            '**/*.js*': babelCompiler
        },

        postprocessor: webpackPostprocessor,

        bootstrap: function () {
            window.__moduleBundler.loadTests();
        }
    };
};