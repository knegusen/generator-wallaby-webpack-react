'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');

var REACT_FOLDER = "src/react";
var REACT_TEST_FOLDER = "src-test/react";

module.exports = generators.Base.extend({

    prompting: function () {
        var done = this.async();
        this.prompt([
            {
                type: 'input',
                name: 'useGit',
                message: 'Do you want to initialize git repo? (y/n)',
                default: 'y'
            },
            {
                type: 'input',
                name: 'useKarma',
                message: 'Do you want to be able to run your test using node and karma? (y/n)',
                default: 'y'
            }], function (answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },

    directoryCreation: function () {
        this._createSrcFolder();
        this._createSrcTestFolder();
    },

    copyFiles: function () {
        this._createPackageJson();
        this._createWallabyJS();
        this._createDevServerJS();
        this._createWebpackConfig();
        this._createBabelRC();
        this._createESLintRC();
        this._createReadme();
        this._createGitignore();
    },

    reactRelatedFiles: function () {
        this._copyPhantomJSShims();
        this._copyToRoot('index.html');
        this._copyReactFile('App.jsx');
        this._copyReactFile('ExampleComponent.jsx');
        this._copyReactTestFile('ExampleComponentSpec.jsx');
    },

    karmaFiles: function () {
        if (this._useKarma()) {
            this._copyToRoot('karma-conf.js');
            this._copyToRoot('karmaTests.js');
            this._copyToRoot('webpack.config.karma.js');
        }
    },

    install: function () {
        if (!this.options.skipInstall) {
            this.npmInstall();
        }
    },

    end: function () {
        this._createGitRepo();
    },

    _createBabelRC: function () {
        this.copy('babelrc', '.babelrc');
    },

    _createESLintRC: function () {
        this.copy('eslintrc', '.eslintrc');
    },

    _createGitignore: function () {
        this.copy('gitignore', '.gitignore');
    },

    _createReadme: function () {
        this._copyToRoot('readme.md');
    },

    _copyPhantomJSShims: function () {
        var file = path.join("src-test", 'phantomjs-shims.js');
        this.copy(file, file);
    },

    _copyReactFile: function (fileName) {
        var file = path.join(REACT_FOLDER, fileName);
        this.copy(file, file);
    },

    _copyReactTestFile: function (fileName) {
        var file = path.join(REACT_TEST_FOLDER, fileName);
        this.copy(file, file);
    },

    _createWebpackConfig: function () {
        this._copyToRoot('webpack.config.dev.js');
        this._copyToRoot('webpack.config.prod.js');
    },

    _createWallabyJS: function () {
        this._copyToRoot('wallaby.js');
    },

    _createDevServerJS: function () {
        this._copyToRoot('devServer.js');
    },

    _copyToRoot: function (fileName) {
        this.copy(fileName, fileName);
    },

    _createPackageJson: function () {
        if (this._useKarma()) {
            this.template('packageWithKarma.json', 'package.json', {
                packageName: 'packageName'
            });
        } else {
            this.template('package.json', 'package.json', {
                packageName: 'packageName'
            });
        }
    },

    _createSrcFolder: function () {
        mkdirp("src");
    },

    _createSrcTestFolder: function (name) {
        mkdirp("src-test");
    },

    _createGitRepo: function () {
        if (this.answers.useGit == 'y') {
            var done = this.async();
            var async = require('async');
            this.log('\n\nInitializing Git repository. If this fail, try running ' +
                chalk.yellow.bold('git init') +
                ' and make a first commit manually');
            async.series([
                function (taskDone) {
                    exec('git init', taskDone);
                },
                function (taskDone) {
                    exec('git add . --all', taskDone);
                },
                function (taskDone) {
                    exec('git commit -m "Initial commit"', taskDone);
                }
            ], function (err) {

                if (err === 127) {
                    this.log('Could not find the ' + chalk.yellow.bold('git') + ' command. Make sure Git is installed on this machine');
                    return;
                }

                this.log(chalk.green('complete') + ' Git repository has been setup');
                done();
            }.bind(this));
        } else {

        }
    },

    _useKarma: function () {
        return this.answers.useKarma == 'y';
    }
});