const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

var MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'prod_dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
});