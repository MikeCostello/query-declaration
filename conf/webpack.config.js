module.exports = {
    entry: './lib/query-declaration.js',
    output: {
        path: './dist',
        filename: 'query-declaration.js',
        library: 'queryDeclarationAll',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                loose: 'all'
              }
            }
        ]
    },
    plugins: []
};