var path = require('path');
var webpack = require('webpack');
var compressionPlugin = require("compression-webpack-plugin");

module.exports = {
  devtool: 'source-map',

  entry: [
    'webpack-dev-server/client?http://0.0.0.0:80',
    'webpack/hot/only-dev-server',
    './scripts/main.js'
  ],

  output: {
    path: path.resolve('build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new compressionPlugin({
    })
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.jpg', 'png']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
        include: [path.resolve('scripts')]
      },
      {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } // inline base64 URLs for <=8k images, direct URLs for the rest
    ]
  },
  stats: {
    colors: true
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 80,
    stats: {
      chunkModules: false,
      colors: true
    }
  }
};
