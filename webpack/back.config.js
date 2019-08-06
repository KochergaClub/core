const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const base = require('./base.config.js');

module.exports = merge(base, {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, '..', './jsx/render/server/index.ts'),
  devtool:
    process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'none',
  output: {
    path: path.resolve(__dirname, '..', './static/dist'),
    filename: 'server.js',
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
});
