const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://127.0.0.1:3008',
    'webpack/hot/only-dev-server',
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/',
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ],

  module: {
    loaders: [{
      test: /(\.jsx|\.js)$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loader: "style!css"
    }]
  }
};