/* eslint-disable no-undef */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const config = require('./src/index.cat.json');
console.log(config["components-alias"]);

const alias = {};

Object.keys(config["components-alias"]).forEach((alias_key) => {
  alias[alias_key]=path.resolve(__dirname, "src/" + config["components-alias"][alias_key]);
})

const basePath = __dirname;
const distPath = 'dist';
const indextInput = './src/index.html';
const indexOutput = 'index.html';

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js'],
    alias: alias
  },
  entry: {
    app: ['@babel/polyfill', './src/cat/index.js'],
  },
  output: {
    path: path.join(basePath, distPath),
    filename: '[chunkhash][name].js'
  },
  module: {
    rules: [

      {
        test: /\.(cat)$/,
        use: {
          loader: path.resolve('./cat-loader/index.js'),
          options: {
            context: path.join(__dirname, "src"),
            public: path.join(__dirname, "public"),
            //			  name: '[name].[ext]',
            //			  useRelativePath: true,
            //			  outputPath: '../dist/',
            //			  publicPath: '../images/'
          }
        },
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader',]
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          MiniCSSExtract.loader,
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        loader: [
          MiniCSSExtract.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              // outputPath: 'images/',
              // publicPath: 'images/',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin(),
    new MiniCSSExtract({
      filename: '[name].css',
      chunkFilename: '[id].css',
    })
  ]
};