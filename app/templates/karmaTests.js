require('./src-test/phantomjs-shims');

var testsContext = require.context("./src-test", true, /Spec\.jsx?$/);
testsContext.keys().forEach(testsContext);