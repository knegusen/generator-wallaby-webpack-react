describe("generator", function () {

    var yeoman = require('yeoman-generator'); // a reference to the generator module
    var path = require('path'); // reference to the built in path module
    var assert; // will become the Yeoman assert object
    var helpers;
    var repoRoot = 'repo-root';

    before(function (done) {
        assert = yeoman.assert; // create the yeoman assert object
        helpers = yeoman.test; // create the yeoman test generator
        // run the mock generator with some options
        helpers.run(path.join(__dirname, '../../app')) // run the generator from the app directory
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

        it("contains correct dependencies", function () {
            var packageJSonFile = _pathWithRoot('package.json');
            assert.fileContent([
                [packageJSonFile, /babel/],
                [packageJSonFile, /babel-core/],
                [packageJSonFile, /babel-loader/],
                [packageJSonFile, /wallaby-webpack/],
                [packageJSonFile, /wallaby/],
                [packageJSonFile, /react/]
            ]);
        })
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

        it("create phantomjs-shims", function () {
            assert.file(_pathWithRoot('src-test/phantomjs-shims.js'));
        });

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
    });

    describe("readme", function () {
        it("creates readme.md file", function () {
            assert.file(_pathWithRoot('readme.md'));
        });
    });

    describe("gitignore", function () {
        it("creates .gitignore file", function () {
            assert.file(_pathWithRoot('.gitignore'));
        });

        it("contains correct igonre files", function () {
            var ignoreFile = _pathWithRoot('.gitignore');
            assert.fileContent([
                [ignoreFile, /node_modules/],
                [ignoreFile, /dist/],
                [ignoreFile, /.idea/]
            ]);
        });
    });
});