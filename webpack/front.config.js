const merge = require('webpack-merge');
const path = require('path');

const base = require('./base.config.js');

module.exports = merge(base, {
  entry: path.resolve(__dirname, '..', './render/render-client.ts'),
  output: {
    path: path.resolve(__dirname, '..', './static/dist'),
    filename: 'bundle.js',
  },
});
