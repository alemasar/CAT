/* eslint-disable no-undef */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtract = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const load = require('app-etc-load');
const cat_config = load('./src/index.cat', 'json');

const config = cat_config["cat-config"];
const alias = {};

Object.keys(config["components-alias"]).forEach((alias_key) => {
  alias[alias_key] = path.resolve(__dirname, "src/" + config["components-alias"][alias_key]);
})

const entries = ['@babel/polyfill', './src/index.cat', './src/cat/index.js'];
config["main-scss"].forEach(scss => {
  entries.push("./src/" + scss);
})


const basePath = __dirname;
const distPath = 'dist';
const indextInput = './src/index.html';
const indexOutput = 'index.html';

module.exports = {
  mode: 'production',
  devtool: 'none',
  resolve: {
    extensions: ['.js'],
    alias: alias
  },
  entry: {
    app: entries,
  },
  output: {
    path: path.join(basePath, distPath),
    filename: '[chunkhash][name].js'
  },
  module: {
    rules: [

      {
        test: /\.cat/,
        use: {
          loader: path.resolve('./cat-loader/lib/index.js'),
          options: {
            context: path.join(__dirname, "src"),
            public: path.join(__dirname, "public"),
            //			  name: '[name].[ext]',
            //			  useRelativePath: true,
            //			  outputPath: '../dist/',
            //			  publicPath: '../images/'
          },
        }
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
              name: '[name].[ext]',
              outputPath: 'assets/images'
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'public/index.html'
    }),
    new MiniCSSExtract({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([{
      from:'./src/img',
      to:'assets/images'
    }])
  ],
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true
  }
};