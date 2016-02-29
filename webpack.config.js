/**
 * Created by jxymacbook on 2016-02-27.
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: "source-map", // for debugging
    entry: {
        //index: './public/javascripts/home.js',
        auth: './public/javascripts/auth.js'
        //vendors: ['bootstrap', 'jasny', 'moment', 'pace', 'typed', 'jquery']
    },
    output: {
        path: __dirname,
        filename: '[name].bundle.js' //the real output path is specified in gulp config file
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.js$/, loader: 'jsx-loader' }
        ]
    },
    resolve: {
        /*alias: {
            bootstrap: __dirname + '/public/javascripts/lib/bootstrap.min.js',
            jasny: __dirname + '/public/javascripts/lib/jasny-bootstrap.min.js',
            moment: __dirname + '/public/javascripts/lib/moment.min.js',
            pace: __dirname + '/public/javascripts/lib/pace.min.js',
            typed: __dirname + '/public/javascripts/lib/typed.js',
            jquery: __dirname + '/public/javascripts/lib/jquery-1-12.min.js'
        }*/
    },
    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        }),

        new webpack.optimize.CommonsChunkPlugin('common.js'), // extract common part of module

        new webpack.optimize.UglifyJsPlugin({minimize: true}) //minimized file
    ]

};