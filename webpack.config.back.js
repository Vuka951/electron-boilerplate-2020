const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
module.exports = {
  target: 'node',
  node: false,
  externals: [nodeExternals()],
  entry: {
    app: ['./server/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'server-build'),
    filename: 'bundle-back.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ]},
  plugins: [
    new CleanWebpackPlugin(['server-build', 'dist'], {} ),
    new Dotenv(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
        test: /\.js(\?.*)?$/i,
        exclude: /\/node_modules/,
      }),
    ],
  },
};
