import path from 'path';
import webpack from 'webpack';
import express from 'express';

import {developmentConfig as webpackConfig} from './webpack.config';

function serve() {
  return new Promise((resolve, reject) => {
    try {
      const app = express();
      const compiler = webpack(webpackConfig);

      const listeningPort = 8080;

      app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        historyApiFallback: true
      }));

      app.use(require('webpack-hot-middleware')(compiler));

      app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '/../../src/index.html'));
      });

      app.listen(listeningPort, 'localhost', function(err) {
        if (err) {
          console.log(err);
        }

        console.log('Listening at http://localhost:' + new String(listeningPort));
      });

      return resolve();
    } catch (error) {
      return reject(error);
    }
  });
}

export default serve;
