const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJason = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8082/'
  },
  devServer: {
    port: 8082,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp' : './src/bootstrap'
      },
      shared: packageJason.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);