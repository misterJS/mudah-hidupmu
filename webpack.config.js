const path = require('path');

module.exports = {
    mode: 'none', // Set mode to none to disable built-in optimizations
    target: 'node', // Since we are writing for node environment
    entry: './src/extension.ts', // Entry point of our extension
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode' // Exclude vscode module from bundle
    },
    resolve: {
        extensions: ['.ts', '.js'] // Support ts and js extensions
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    }
};
