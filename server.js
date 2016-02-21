const path = require('path');
const webpack = require('webpack');
const express = require('express');

const config = require('./webpack.config');

const app = express();
const compiler = webpack(config);

const listeningPort = 8080;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(listeningPort, 'localhost', function(err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at http://localhost:' + new String(listeningPort));
});
