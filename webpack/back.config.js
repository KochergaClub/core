const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const base = require('./base.config.js');

module.exports = merge(base, {
  target: 'node',
  externals: [nodeExternals()],
  entry: path.resolve(__dirname, '..', './render/server.ts'),
  output: {
    path: path.resolve(__dirname, '..', './static/dist'),
    filename: 'server.js',
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
