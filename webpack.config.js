'use strict';

const webpack  = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        scripts: __dirname + '/src/main/jsx/main.jsx'
    },
    output: {
        path: __dirname + '/build/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
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
        // splitChunks: {
        //     cacheGroups: {
        //         commons: {
        //             test: /[\\/]node_modules[\\/]/,
        //             name: "vendorsReact",
        //             chunks: "all"
        //         }
        //     }
        // }
    }
};