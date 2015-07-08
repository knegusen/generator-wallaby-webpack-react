var wallabyWebpack = require('wallaby-webpack');
var babel = require('babel');

module.exports = function (wallaby) {

    var babelCompiler = wallaby.compilers.babel({
        babel: babel,
        // babel options
        stage: 0
    });

    var webpackPostprocessor = wallabyWebpack(require('./webpack.config.js'));

    return {
        files: [
            // you may just add the file separately,
            // like done here https://github.com/wallabyjs/wallaby-react-todomvc-sample/blob/master/wallaby-babel.js
            {pattern: 'src-test/phantomjs-shims.js', instrument: false},
            //{pattern: 'node_modules/react/react.js', instrument: false},

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