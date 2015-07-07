'use strict';

var generators = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

var REACT_FOLDER = "src/react";
var REACT_TEST_FOLDER = "src-test/react";

module.exports = generators.NamedBase.extend({

    directoryCreation: function () {
        var _name = this.arguments[0]; // retrieve the name argument
        this.mkdir(_name);
        this._createSrcFolder(_name);
        this._createSrcTestFolder(_name);
    },

    copyFiles: function () {
        this._createPackageJson();
        this._createWallabyJS();
        this._createWebpackConfig();
        this._createReadme();
    },

    reactRelatedFiles: function () {
        this._copyPhantomJSShims('phantomjs-shims.js');
        this._copyToRoot('index.html');
        this._copyReactFile('Main.jsx');
        this._copyReactFile('ExampleComponent.jsx');
        this._copyReactTestFile('ExampleComponentSpec.jsx');
    },

    _createReadme: function () {
        this._copyToRoot('readme.md');
    },

    _copyPhantomJSShims: function (fileName) {
        var file = path.join("src-test", fileName);
        this.copy(file, this._getPathWithRoot(file));
    },

    _copyReactFile: function (fileName) {
        var file = path.join(REACT_FOLDER, fileName);
        this.copy(file, this._getPathWithRoot(file));
    },

    _copyReactTestFile: function (fileName) {
        var file = path.join(REACT_TEST_FOLDER, fileName);
        this.copy(file, this._getPathWithRoot(file));
    },

    _createWebpackConfig: function () {
        this._copyToRoot('webpack.config.js');
    },

    _createWallabyJS: function () {
        this._copyToRoot('wallaby.js');
    },

    _copyToRoot: function (fileName) {
        this.copy(fileName, this._getPathWithRoot(fileName));
    },

    _createPackageJson: function () {
        this.template('package.json', this._getPathWithRoot('package.json'), {packageName: this.arguments[0]});
    },

    _createSrcFolder: function (name) {
        this.mkdir(name + "/src")
    },

    _createSrcTestFolder: function (name) {
        this.mkdir(name + "/src-test")
    },

    _getPathWithRoot: function (src) {
        return path.join(this.arguments[0], src);
    }
});