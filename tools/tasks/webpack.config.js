import path from 'path';
import extend from 'extend';

import webpack from 'webpack';

// Useless, imported by Neat: var bourbon = require('node-bourbon').includePaths;
// Note: I changed some var/arg names.
import {with as sassNeatPathsAndMore} from 'node-neat';
const sassFontAwesomePath = __dirname + '/../../node_modules/font-awesome/scss';

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extensionDotRegExPrefix = '\\.';
const queryStringRegExSuffix = '(\\?.*)?$'
const extensionMatchRegEx = function(...extensions) {
  return new RegExp(extensionDotRegExPrefix + '(' + extensions.join('|') + ')' + queryStringRegExSuffix);
}

const appEntryPoint = './src/app.jsx';

const loaders = {
  jsLoader: {
    test: extensionMatchRegEx('js', 'jsx', 'es6'),
    exclude: /node_modules/,
    loader: 'babel'
  },
  cssAsStyleLoader: {
    test: extensionMatchRegEx('css', 'scss'),
    loaders: ['style', 'css', 'sass']
  },
  cssAsExternalFileLoader: {
    test: extensionMatchRegEx('css', 'scss'),
    loader: ExtractTextPlugin.extract(['css', 'sass'])
  },
  graphicalResourcesLoader: {
    test: extensionMatchRegEx('png', 'svg', 'jpg', 'jpeg', 'gif', 'ttf', 'eot', 'woff', 'woff2'),
    loader: 'file'
  }
};

const commonPlugins = {
  dedupePlugin: new webpack.optimize.DedupePlugin(),
  occurenceOrderPlugin: new webpack.optimize.OccurenceOrderPlugin(),
  providePlugin: new webpack.ProvidePlugin({
    '_': 'lodash',
    'Immutable': 'immutable',
    'React': 'react',
    'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
  })
};

const commonConfig = {
  resolve: {
    moduleDirectories: ['node_modules', 'src/components'],
    extensions: ['', '.js', '.jsx', '.es6', '.scss']
  },
  output: {
    path: __dirname + '/../../public/static/',
    publicPath: '/static/',
    filename: 'app.js',
    hot: true,
    library: 'App',
    libraryTarget: 'umd'
  },
  cssLoader: {
    sourceMap: true
  },
  sassLoader: {
    sourceMap: true,
    includePaths: sassNeatPathsAndMore(path.resolve(__dirname, '/src/styles', sassFontAwesomePath))
  }
};

const developmentConfig = extend(true, {}, commonConfig, {
  devtool: 'source-map',
  entry: {
    'app': [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      appEntryPoint
    ]
  },
  plugins: [
    commonPlugins.dedupePlugin,
    commonPlugins.occurenceOrderPlugin,
    commonPlugins.providePlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("development")
      }
    })
  ],
  module: {
    loaders: [
      loaders.jsLoader,
      loaders.cssAsStyleLoader,
      loaders.graphicalResourcesLoader
    ]
  }
});

const productionConfig = extend(true, {}, commonConfig, {
  entry: {
    'app': [
      appEntryPoint
    ]
  },
  plugins: [
    commonPlugins.dedupePlugin,
    commonPlugins.occurenceOrderPlugin,
    commonPlugins.providePlugin,
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("production")
      }
    }),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      loaders.jsLoader,
      loaders.cssAsExternalFileLoader,
      loaders.graphicalResourcesLoader
    ]
  }
});

export {
  developmentConfig,
  productionConfig
};
