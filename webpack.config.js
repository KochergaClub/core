const path = require('path');

module.exports = {
  entry: './jsx/render-client.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './static/dist'),
    filename: 'bundle.js'
  }
};