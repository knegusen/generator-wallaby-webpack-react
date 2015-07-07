describe("generator", function () {

    var yeoman = require('yeoman-generator'); // a reference to the generator module
    var path = require('path'); // reference to the built in path module
    var assert; // will become the Yeoman assert object
    var mockGen;
    var repoRoot = 'repo-root';

    before(function (done) {
        assert = yeoman.assert; // create the yeoman assert object
        mockGen = yeoman.test; // create the yeoman test generator
        // run the mock generator with some options
        mockGen.run(path.join(__dirname, '../../app')) // run the generator from the app directory
            .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
            .withArguments([repoRoot])
            .on('end', done); // when the 'end' event fires, run the done method
    });

    function _pathWithRoot(rest) {
        return path.join(repoRoot, rest);
    }

    describe("directory creation", function () {

        it('should generate a root directory', function () {
            // since we can not assert if a directory exists,
            // we use the file() method and provide a path to the directory itself
            assert.file(repoRoot);
        });

        it("should generate src folder", function () {
            assert.file(_pathWithRoot('src'));
        });

        it("should generate src-test folder", function () {
            assert.file(_pathWithRoot('src-test'));
        });
    });

    describe("package.json", function () {
        it("creates package.json", function () {
            assert.file(_pathWithRoot('package.json'));
        });

        it("updates package.json with package name", function () {
            assert.fileContent(_pathWithRoot('package.json'), /['|"]*name['|"]*[ ]*:[ ]*['|"]repo-root['|"]/);
        });
    });

    describe("wallaby.js", function () {
        it("creates wallaby.js", function () {
            assert.file(_pathWithRoot('wallaby.js'));
        });

        //TODO: Add tests for wallaby.js file
    });

    describe("webpack.config", function () {
        it("creates webpack.config", function () {
            assert.file(_pathWithRoot('webpack.config.js'));
        });

        //TODO: Add test for webpack.config.js
    });

    describe("react examples", function () {
        it("creates index.html file", function () {
            assert.file(_pathWithRoot('index.html'));
            //TODO: Describe index.html?
        });

        it("creates main.jsx file", function () {
            assert.file(_pathWithRoot('src/react/Main.jsx'));
            //TODO: Describe main.jsx?
        });

        describe("example component file", function () {
            it("creates ExampleComponent.jsx file", function () {
                assert.file(_pathWithRoot('src/react/ExampleComponent.jsx'));
            });

            it("creates ExampleComponentSpec.jsx file", function () {
                assert.file(_pathWithRoot('src-test/react/ExampleComponentSpec.jsx'));
            });

            //TODO: Describe ExampleComponent.jsx and ExampleComponentSpec.jsx?
        });
    })
});