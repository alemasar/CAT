const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require("glob");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const babelPolyfill = require("babel-polyfill");
const path = require('path');
const pjson = require('./package.json');
// p['./dist/js/' + pjson.name + '.bundle.js'] = './src/js/main.js';
var p = []

p = ['babel-polyfill', './src/js/main.js'];
// , './src/js/main-header.js'

// p['./dist/js/dev/prova1.bundle.js'] = './src/js/dev/prova1.js';

var css = {}
css['./dist/css/' + pjson.name] = './src/sass/' + pjson.name + '.scss';

const extractStyles = (loaders) => {
    return ExtractTextPlugin.extract({
        use: loaders
    });
};

const bundles = ["main", "main-header"]
const js = [];
let entries = ["babel-polyfill"]
bundles.forEach((bundle) =>{
    entries.push("./src/js/"+bundle+".js")
    js.push({
        entry: entries,
        output: {
            //  path: path.resolve(__dirname),
            //  pathinfo: true,
            filename: "./dist/js/"+bundle+".bundle.js"
            //  chunkFilename: "./dist/js/[name].bundle.js"
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: './**/*.html',
                    to: 'dist/js/[path]/[name].html',
                    context: 'src/js'
                }
            ]),
        ]
    })
    entries = []
})

module.exports = [
    ...js,
    {
        entry: css,
        output: {
            path: path.resolve(__dirname),
            pathinfo: true,
            filename: "[name].css"
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: extractStyles(['css-loader', 'sass-loader'])
                },
                {
                    test: /\.css$/,
                    use: extractStyles(['css-loader'])
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({ // define where to save the file
                filename: "[name].css",
                allChunks: true
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devServer: {
            contentBase: './',
            historyApiFallback: true,
            inline: true,
            overlay: {
                errors: true,
                warnings: true,
            }
        }
    }
]
