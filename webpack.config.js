const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const path = require('path');

const PATHS = {
  src: path.join(__dirname, 'src'),
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: 'css-loader', options: {url: false}},
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /images/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../fonts/',
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      'jquery': 'jquery/dist/jquery.slim.min.js',
    },
  },
  plugins: [
    new CleanWebpackPlugin('dist', {} ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Popper: ['popper,js', 'default'],
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}), whitelistPatterns: [/collaps/, /dropdown/, /show/],
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendors chunk
        vendor: {
          chunks: 'all',
          test: /node_modules/,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: 'all',
        test: /\.js(\?.*)?$/i,
        exclude: /\/node_modules/,
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          zindex: false,
        },
      }),
    ],
  },
};
