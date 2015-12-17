describe("generator", function () {

    var path = require('path'); // reference to the built in path module
    var assert; // will become the Yeoman assert object
    var testGenerator;

    before(function (done) {
        assert = require('yeoman-assert'); // create the yeoman assert object
        testGenerator = require('yeoman-test'); // create the yeoman test generator
        // run the mock generator with some options

        var mockPrompt = {
            useGit: 'n'
        };

        testGenerator.run(path.join(__dirname, '../../app')) // run the generator from the app directory
            .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
            .withOptions({skipInstall: true, createGitRepo: false})
            .withPrompts(mockPrompt)
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
                [packageJSonFile, /babel-core/],
                [packageJSonFile, /babel-eslint/],
                [packageJSonFile, /babel-loader/],
                [packageJSonFile, /babel-plugin-react-transform/],
                [packageJSonFile, /babel-preset-es2015/],
                [packageJSonFile, /babel-preset-react/],
                [packageJSonFile, /eslint/],
                [packageJSonFile, /eslint-plugin-babel/],
                [packageJSonFile, /eslint-plugin-react/],
                [packageJSonFile, /express/],
                [packageJSonFile, /react-transform-catch-errors/],
                [packageJSonFile, /react-transform-hmr/],
                [packageJSonFile, /redbox-react/],
                [packageJSonFile, /rimraf/],
                [packageJSonFile, /wallaby-webpack/],
                [packageJSonFile, /webpack/],
                [packageJSonFile, /webpack-dev-middleware/],
                [packageJSonFile, /webpack-hot-middleware/],
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

    describe('test', function () {
        it('creates devServer.js', function () {
            assert.file('devServer.js');
        });

        //TODO: Add tests for devServer.js file
    });

    describe("webpack.config.dev", function () {
        it("creates webpack.config.dev", function () {
            assert.file('webpack.config.dev.js');
        });

        //TODO: Add test for webpack.config.dev.js
    });

    describe("webpack.config.prod", function () {
        it("creates webpack.config.prod", function () {
            assert.file('webpack.config.prod.js');
        });

        //TODO: Add test for webpack.config.prod.js
    });

    describe("react examples", function () {

        it("create phantomjs-shims", function () {
            assert.file('src-test/phantomjs-shims.js');
        });

        it("creates index.html file", function () {
            assert.file('index.html');
            //TODO: Describe index.html?
        });

        it("creates App.jsx file", function () {
            assert.file('src/react/App.jsx');
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

        //TODO: Describe readme.md
    });

    describe(".babelrc", function () {
        it("creates .babelrc file", function () {
            assert.file('.babelrc');
        });

        //TODO: Describe .babelrc
    });

    describe(".eslintrc", function () {
        it("creates .eslintrc file", function () {
            assert.file('.eslintrc');
        });

        //TODO: Describe .eslintrc
    });

    describe("git", function () {
        it('initialises a Git repository', function () {
            //TODO: Test that git repo is initialized
        });

        it("creates .gitignore file", function () {
            assert.file('.gitignore');
        });

        it("gitignore ignores correct files", function () {
            var ignoreFile = '.gitignore';
            assert.fileContent([
                [ignoreFile, /node_modules/],
                [ignoreFile, /dist/],
                [ignoreFile, /.idea/]
            ]);
        });
    });
});