var path = require('path');
var wallabyWebpack = require('wallaby-webpack');

module.exports = function (wallaby) {

    var webpackPostprocessor = wallabyWebpack({
        resolve: {
            extensions: ['', '.js', '.jsx', '.json']
        },
        module: {
            loaders: [
                {test: /\.json$/, loader: 'json'}
            ]
        },
        externals: {
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        }
    });

    var babelCompiler = wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['es2015', 'react']
    });

    return {
        files: [
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
            {pattern: 'src/**/*.js*', load: false}
        ],

        tests: [
            {pattern: 'src-test/**/*Spec.js*', load: false}
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