var webpack = require("webpack");

module.exports = {
    entry: "./lib/jquery-selector-style.js",
    output: {
        path: "./dist",
        filename: "jquery-selector-style.min.js",
    },
    external: {
        "jquery": "jQuery"
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: "babel",
              query: {
                loose: "all"
              }
            }
        ]
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({})]
};