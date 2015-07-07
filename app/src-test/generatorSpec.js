describe("generator", function () {

    var yeoman = require('yeoman-generator'); // a reference to the generator module
    var path = require('path'); // reference to the built in path module
    var assert; // will become the Yeoman assert object
    var mockGen;

    before(function (done) {
        assert = yeoman.assert; // create the yeoman assert object
        mockGen = yeoman.test; // create the yeoman test generator
        // run the mock generator with some options
        mockGen.run(path.join(__dirname, '../../app')) // run the generator from the app directory
            .inDir(path.join(__dirname, './tmp')) // generate the generator files in the tmp directory
            .withArguments(['repo-gen-test'])
            .on('end', done); // when the 'end' event fires, run the done method
    });

    it('should generate a root directory', function () {
        // since we can not assert if a directory exists,
        // we use the file() method and provide a path to the directory itself
        assert.file('repo-gen-test/');
    });
});