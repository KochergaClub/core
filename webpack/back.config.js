const merge = require('webpack-merge');
const path = require('path');

const base = require('./base.config.js');

module.exports = merge(base, {
  target: 'node',
  entry: path.resolve(__dirname, '..', './scripts/render-server.js'),
  output: {
    path: path.resolve(__dirname, '..', './static/dist'),
    filename: 'render-server.js',
  },
});