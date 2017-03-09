var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 2500
    },

    context: __dirname,
    entry: './app/main.js',

    module: {
        loaders: [{
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: "sass-loader",
                        loader: "css-loader!sass-loader",
                    })
                }]
    },
    externals: {
        "createjs":"createjs"
    },
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        // new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({filename:'style/main.css', allChunks: true }),
        new CopyWebpackPlugin([
           { from: 'app/assets', to: 'assets' }
       ])
    ]
};
