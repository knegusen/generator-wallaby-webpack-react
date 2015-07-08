describe("generator", function () {

    var yeoman = require('yeoman-generator'); // a reference to the generator module
    var path = require('path'); // reference to the built in path module
    var assert; // will become the Yeoman assert object
    var helpers;

    before(function (done) {
        assert = yeoman.assert; // create the yeoman assert object
        helpers = yeoman.test; // create the yeoman test generator
        // run the mock generator with some options
        helpers.run(path.join(__dirname, '../../app')) // run the generator from the app directory
            .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
            .withOptions({skipInstall: true})
            .on('end', done); // when the 'end' event fires, run the done method
    });

    describe("installing dependencies", function () {
        //TODO: Test npm install with and without skipInstall argument
    });

    describe("directory creation", function () {

        it("should generate src folder", function () {
            assert.file('src');
        });

        it("should generate src-test folder", function () {
            assert.file('src-test');
        });
    });

    describe("package.json", function () {
        it("creates package.json", function () {
            assert.file('package.json');
        });

        it("updates package.json with package name", function () {
            assert.fileContent('package.json', /['|"]*name['|"]*[ ]*:[ ]*['|"]package['|"]/);
        });

        it("contains correct dependencies", function () {
            var packageJSonFile = 'package.json';
            assert.fileContent([
                [packageJSonFile, /babel/],
                [packageJSonFile, /babel-core/],
                [packageJSonFile, /babel-loader/],
                [packageJSonFile, /wallaby-webpack/],
                [packageJSonFile, /wallaby/],
                [packageJSonFile, /react/]
            ]);
        });
    });

    describe("wallaby.js", function () {
        it("creates wallaby.js", function () {
            assert.file('wallaby.js');
        });

        //TODO: Add tests for wallaby.js file
    });

    describe("webpack.config", function () {
        it("creates webpack.config", function () {
            assert.file('webpack.config.js');
        });

        //TODO: Add test for webpack.config.js
    });

    describe("react examples", function () {

        it("create phantomjs-shims", function () {
            assert.file('src-test/phantomjs-shims.js');
        });

        it("creates index.html file", function () {
            assert.file('index.html');
            //TODO: Describe index.html?
        });

        it("creates main.jsx file", function () {
            assert.file('src/react/Main.jsx');
            //TODO: Describe main.jsx?
        });

        describe("example component file", function () {
            it("creates ExampleComponent.jsx file", function () {
                assert.file('src/react/ExampleComponent.jsx');
            });

            it("creates ExampleComponentSpec.jsx file", function () {
                assert.file('src-test/react/ExampleComponentSpec.jsx');
            });

            //TODO: Describe ExampleComponent.jsx and ExampleComponentSpec.jsx?
        });
    });

    describe("readme", function () {
        it("creates readme.md file", function () {
            assert.file('readme.md');
        });
    });

    describe("gitignore", function () {
        it("creates .gitignore file", function () {
            assert.file('.gitignore');
        });

        it("contains correct igonre files", function () {
            var ignoreFile = '.gitignore';
            assert.fileContent([
                [ignoreFile, /node_modules/],
                [ignoreFile, /dist/],
                [ignoreFile, /.idea/]
            ]);
        });
    });
});