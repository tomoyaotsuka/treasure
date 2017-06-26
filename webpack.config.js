// const current = process.cwd();
const path    = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const ENV = process.env.NODE_ENV;

const browsers = [ 'last 2 versions', 'ie >= 9', 'iOS >= 8.2', 'Android >= 4.2' ];
const plugins  = [
  new ExtractTextPlugin({ filename: './bundle.css', disable: false, allChunks: true }),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /.css$/g, // /\.optimize\.css$/g
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: { removeAll: true } },
    canPrint: true
  }),
  new webpack.LoaderOptionsPlugin({ options: { postcss: [ require('autoprefixer')( { browsers: browsers } ) ] } } ),
  new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ) }),
  new webpack.optimize.OccurrenceOrderPlugin()
];

if ( !ENV === 'DEV' ) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }, comments: false, sourceMap: true }),
    new webpack.optimize.AggressiveMergingPlugin()
  );
}

const config = {
  entry: path.join( __dirname, 'src/scripts/app.js' ),
  output: {
    path: path.join( __dirname, 'dist' ),
    filename: "./bundle.js"
  },
  resolve: {
    modules: [
      path.resolve( __dirname, 'app' ),
      "node_modules"
    ]
  },
  plugins: plugins,
  devtool: ENV === 'DEV' ? 'cheap-module-eval-source-map' : false,
  module: {
    loaders: [
      {
        test:    /\.js$/,
        exclude: /node_modules/,
        loader:  'babel-loader'
      }
    ],
    rules: [
      {
        test:   /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        })
      },
      { test: /\.(png|jpg|eot|svg|woff|ttf|gif)$/, loader: 'url-loader' }
    ],
  }
}

module.exports = config;
