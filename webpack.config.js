/**
 * Created by jxymacbook on 2016-02-27.
 */
module.exports = {
    entry: ['./public/javascripts/main.js'],
    output: {
        path: __dirname,
        filename: './bundle.js' //this path is relative to gulp output folder path, please refer gulp config file
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
            { test: /\.js$/, loader: 'jsx-loader' }
        ]
    }
};