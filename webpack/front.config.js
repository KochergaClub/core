const merge = require('webpack-merge');
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const base = require('./base.config.js');

module.exports = merge(base, {
  entry: path.resolve(__dirname, '..', './render/render-client.ts'),
  devtool:
    process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'none',
  output: {
    path: path.resolve(__dirname, '..', './static/dist'),
    publicPath: '/static/dist/',
    filename: 'bundle-[hash].js',
  },
  devServer: {
    contentBase: './static/dist',
    publicPath: '/static/dist/',
    public: 'localhost:8080',
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    writeToDisk: true, // https://github.com/webpack/webpack-dev-server/issues/1591
  },
  plugins: [
    new BundleTracker({ filename: './webpack-stats.json' }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!render-server*'],
    }),
  ],
});
