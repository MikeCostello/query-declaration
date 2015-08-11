var path = require("path");

module.exports = {
    entry: "./lib/query-declaration.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "query-declaration.js",
        library: "queryDeclarationAll",
        libraryTarget: "umd"
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
    plugins: []
};