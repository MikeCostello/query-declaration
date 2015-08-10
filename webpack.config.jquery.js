var webpack = require("webpack");
var path = require("path");

module.exports = {
    entry: "./lib/jquery-selector-style.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "jquery-selector-style.js",
    },
    external: {
        "jquery": "jQuery"
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: "babel"
            }
        ]
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({})]
};