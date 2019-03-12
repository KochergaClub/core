const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const base = require('./base.config.js');

module.exports = merge(base, {
  target: 'node',
  entry: path.resolve(__dirname, '..', './render/render-server.ts'),
  output: {
    path: path.resolve(__dirname, '..', './static/dist'),
    filename: 'render-server.js',
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
