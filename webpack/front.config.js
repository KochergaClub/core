const merge = require('webpack-merge');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const base = require('./base.config.js');

module.exports = merge(base, {
  entry: path.resolve(__dirname, '..', './render/render-client.ts'),
  output: {
    path: path.resolve(__dirname, '..', './static/dist'),
    filename: 'bundle-[hash].js',
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!render-server*'],
    }),
  ],
});
