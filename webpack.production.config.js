const path = require('path');
// Useless, imported by Neat: var bourbon = require('node-bourbon').includePaths;
// Note: I changed some var/arg names.
const sassNeatPaths = require('node-neat').includePaths;
const sassFontAwesomePath = __dirname + '/node_modules/font-awesome/scss';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    'app': [
      './src/main.jsx'
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'es6', 'scss']
  },
  output: {
    path: __dirname + '/public/static/',
    publicPath: 'static/',
    filename: 'app.js',
    library: 'App',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      '_': 'lodash',
      'Immutable': 'immutable',
      'React': 'react',
      'Promise': 'es6-promise', // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js|\.jsx|\.es6$/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.scss|\.css$/,
        loader: ExtractTextPlugin.extract(['css', 'sass'])
      }, {
        test: /\.png|svg$/,
        loader: 'url-loader?limit=100000'
      }, {
        test: /\.jpg|\.ttf|\.eot|\.svg|\.woff|\.woff2$/,
        loader: 'file-loader'
      }
    ]
  },
  cssLoader: {
    sourceMap: true
  },
  sassLoader: {
    sourceMap: true,
    includePaths: [path.resolve(__dirname, '/src/styles')].concat(sassNeatPaths).concat([sassFontAwesomePath])
  }
};