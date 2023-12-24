const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './src/index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: {
                    and: [/node_modules/], // Exclude libraries in node_modules ...
                    not: [
                        // Except for a few of them that needs to be transpiled because they use modern syntax
                        /unfetch/,
                        /d3-array|d3-scale/,
                        /@hapi[\\/]joi-date/
                    ]
                },
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                { targets: { node: 'current' } }
                            ]
                        ]
                    }
                }
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './src'
    },
    optimization: {
        runtimeChunk: 'single'
    }
};
