import webpack from 'webpack';

import {productionConfig as webpackConfig} from './webpack.config';

/**
 * Creates application bundles from the source files.
 */
function bundle() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err);
      }

      console.log(stats.toString(webpackConfig.stats));
      return resolve();
    });
  });
}

export default bundle;
