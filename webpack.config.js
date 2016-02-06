var webpack = require('webpack');

module.exports = {
  entry: './dispatcher.jsx',
  output: { path: __dirname + '/dist', filename: '/dispatcher.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
