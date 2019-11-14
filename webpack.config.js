require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin")

const env = process.env.NODE_ENV || 'dev';

console.log('NODE_ENV =', env);

let config = {
  mode: (env === 'dev') ? 'development' : 'production',
  entry: {
    index : './src/index.js',
  },
  output: {
    path: __dirname + '/public/js',
    filename: (env === 'dev') ? '[name].js' : '[name]-[hash].min.js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy : true }],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-transform-async-to-generator',
          ],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
                loose: true,
                targets: {
                  browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
                },
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
            '@babel/preset-react',
          ],
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader?sourceMap"
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (env === 'dev') ? 'styles.css' : 'styles-[hash].css',
    }),
    // new BundleAnalyzerPlugin(),
  ]
};

if(env === 'dev') {
  config.devtool = 'source-map';
}

if(env === 'staged' || env === 'production') {
  config.devtool = 'nosources-source-map';

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG: false,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CompressionPlugin({
      include: /.*\.(css|js)$/,
      exclude: /.*\.json/,
      filename: '[file]',
    }),
  );
}
module.exports = config;

