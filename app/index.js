'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');

var SRC_FOLDER = "src";
var PUBLIC_FOLDER = "public";
var REACT_FOLDER = "src/components";
var REACT_TEST_FOLDER = "src/components/__tests__/";

module.exports = generators.Base.extend({

    prompting: function () {
        var done = this.async();
        this.prompt([
            {
                type: 'input',
                name: 'useGit',
                message: 'Do you want to initialize git repo? (y/n)',
                default: 'y'
            }], function (answers) {
            this.answers = answers;
            done();
        }.bind(this));
    },

    directoryCreation: function () {
        this._createSrcFolder();
        this._createPublicFolder();
    },

    copyFiles: function () {
        this._createPackageJson();
        this._createWallabyJS();
        this._createDevServerJS();
        this._createWebpackConfig();
        this._createESLintRC();
        this._createReadme();
        if (this.answers.useGit == 'y') {
            this._createGitignore();
        }
    },

    reactRelatedFiles: function () {
        this._copyToPublic('index.html');
        this._copyToSource('App.jsx');
        this._copyReactFile('ExampleComponents.jsx');
        this._copyReactTestFile('ExampleComponentsSpec.jsx');
        this._copyReactFile('ExampleComponent.jsx');
        this._copyReactTestFile('ExampleComponentSpec.jsx');
        this._copyReactFile('ExampleStateComponent.jsx');
        this._copyReactTestFile('ExampleStateComponentSpec.jsx');
    },

    install: function () {
        if (!this.options.skipInstall) {
            this.log('\nRunning npm install\n');
            this.npmInstall();
        }
    },

    end: function () {
        this._createGitRepo();
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

    _copyToSource: function (fileName) {
        var file = path.join(SRC_FOLDER, fileName);
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
        this.copy('babelrc', '.babelrc');
    },

    _createWallabyJS: function () {
      this.copy('wallaby.js', 'wallaby.js');
    },

    _createDevServerJS: function () {
        this._copyToRoot('devServer.js');
    },

    _copyToRoot: function (fileName) {
        this.copy(fileName, fileName);
    },

    _copyToPublic: function (fileName) {
        var file = path.join(PUBLIC_FOLDER, fileName);
        this.copy(file, file);
    },

    _createPackageJson: function () {
      this.template('package.json', 'package.json', {
        packageName: 'packageName'
      });
    },

    _createSrcFolder: function () {
        mkdirp("src");
    },

    _createPublicFolder: function () {
        mkdirp("public");
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
    }
});