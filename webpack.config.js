'use strict';

const webpack  = require('webpack'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    path = require('path');
    const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'; // trim для удаления лишних пробелов, если платформа Windows

module.exports = {
    entry: {
        ['main-react']: path.join(__dirname, '/src/main/jsx/main.jsx')
    },
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warning: false,
                    output: {
                        beautify: false,
                        comments: false,
                    },
                    compress: {
                        sequences     : true,
                        booleans      : true,
                        loops         : true,
                        unused      : true,
                        warnings    : false,
                        drop_console: true,
                        unsafe      : true
                    }
                }
            })
        ],
        splitChunks: {
            name: true,
            automaticNameDelimiter: "-",
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "all",
                }
            }
        }
    }
};