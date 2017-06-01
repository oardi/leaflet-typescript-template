const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");

const basePlugins = [];
const prodPlugins = [
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: { warnings: false }
  // }),
  //new ContextReplacementPlugin(/highlight\.js[\\\/]lib[\\\/]languages/)
  new webpack.ContextReplacementPlugin(
    /highlight\.js\/lib\/languages$/,
    new RegExp(`^./(${['javascript', 'python', 'bash'].join('|')})$`)
  )
];

const plugins = basePlugins;
// basePlugins
//   .concat((process.env.NODE_ENV === 'production') ? prodPlugins : []);

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './app.ts',
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  // Source maps support ('inline-source-map' also works) 
  devtool: 'source-map',

  // Add the loader for .ts files. 
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url-loader' },
      { test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, loader: 'url-loader' }
    ]
  },
  plugins: plugins
};