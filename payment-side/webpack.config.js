/*
1]Setting a NODE_ENV var is the typical way of setting a dev/prod mode. See later how to set it in your script.
2]HtmlWebpackPlugin generates index.html from a template which we are going to create shortly
3]MiniCssExtractPlugin extracts styles to a separate file which otherwise remain in index.html
4]mode tells webpack if your build is for development or production. In production mode webpack minifies the bundle.
5]entry is a module to execute first after your app is loaded on a client. That's a bootstrap that will launch your application.
6]output sets the target dir to put compiled files to
7]module.rules describes how to load (import) different files to a bundle
8]test: /\.(ts|tsx)$/ item loads TS files with ts-loader
9]test: /\.css$/ item loads CSS files
10]devtool sets the config for source maps
11]plugins contains all plugins with their settings
*/
const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require("webpack");

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
    LibraryTarget:'umd'
  },
  devServer: {
    inline: false,
    contentBase: "./dist",
},
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
     
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

