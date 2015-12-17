var path = require('path');
var webpack = require('webpack');

module.exports = {

    basePath: './',

    devtool: 'inline-source-map',

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.join(__dirname, 'src'),
            query: {
                presets: ['react', 'es2015'],
                babelrc: false
            }
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
