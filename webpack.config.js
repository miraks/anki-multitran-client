const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const metadata = fs.readFileSync('metadata.txt').toString()
const banner = new webpack.BannerPlugin(metadata, { raw: true })

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
    banner
  ],
  module: {
    loaders: [
      {
        test: /\.s(a|c)ss$/,
        loaders: ['css', 'sass']
      },
      {
        test: /\.js$/,
        loaders: ['babel']
      }
    ]
  }
}
