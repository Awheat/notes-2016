var webpack = require('webpack');
module.exports = {
    entry: [
        'webpack/hot/only-dev-server',
        './app/main'
    ],
    output: {
        filename: 'bundle.js',
        path: './build'
    },
    cache: true,
    debug: true,
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            'styles': __dirname + '/app/styles',
            'components': __dirname + '/app/compontents',
            'data':__dirname + '/app/data'
        }
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /(node_modules)/,
                loaders: ['babel?presets[]=es2015,presets[]=react']
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 2 version", "firefox 15"]}!sass-loader?outputStyle=expanded'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};