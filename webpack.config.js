const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: './main.js',
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    output: {
        filename: 'hive.js',
        path: path.resolve(__dirname, 'dist'),
        library: '',
        libraryTarget: 'commonjs',
    }
}