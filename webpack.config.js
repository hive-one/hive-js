const path = require('path');

const { NODE_ENV = 'development' } = process.env;

module.exports = {
    mode: NODE_ENV,
    target: 'node',
    entry: './main.js',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
    },
    output: {
        filename: 'hive.js',
        path: path.resolve(__dirname, 'dist'),
        library: '',
        libraryTarget: 'umd',
    },
};
