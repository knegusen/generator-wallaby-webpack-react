'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

var REACT_FOLDER = "src/react";
var REACT_TEST_FOLDER = "src-test/react";

module.exports = generators.Base.extend({

    directoryCreation: function () {
        this._createSrcFolder();
        this._createSrcTestFolder();
    },

    copyFiles: function () {
        this._createPackageJson();
        this._createWallabyJS();
        this._createWebpackConfig();
        this._createReadme();
        this._createGitignore();
    },

    reactRelatedFiles: function () {
        this._copyPhantomJSShims();
        this._copyToRoot('index.html');
        this._copyReactFile('Main.jsx');
        this._copyReactFile('ExampleComponent.jsx');
        this._copyReactTestFile('ExampleComponentSpec.jsx');
    },

    installDependencies: function () {
        if (this.options.skipInstall) {
            this.log('You need to manually run ' + chalk.yellow.bold('npm install'));
        } else {
            this.npmInstall([''], {});
        }
    },

    _createReadme: function () {
        this._copyToRoot('readme.md');
    },

    _createGitignore: function () {
        this.copy('gitignore', '.gitignore');
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
        this._copyToRoot('webpack.config.js');
    },

    _createWallabyJS: function () {
        this._copyToRoot('wallaby.js');
    },

    _copyToRoot: function (fileName) {
        this.copy(fileName, fileName);
    },

    _createPackageJson: function () {
        this.template('package.json', 'package.json', {packageName: "package"});
    },

    _createSrcFolder: function () {
        this.mkdir("src");
    },

    _createSrcTestFolder: function (name) {
        this.mkdir("/src-test");
    }
});