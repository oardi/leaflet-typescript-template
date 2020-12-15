const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
	return {
		context: path.resolve(__dirname, './src'),

		entry: { app: './app.ts' },

		output: {
			filename: '[name].[fullhash].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},

		devServer: {
			open: true,
			hot: true
		},

		resolve: {
			extensions: ['.ts', '.js']
		},

		devtool: 'source-map',

		module: {
			rules: [
				{ test: /\.tsx?$/, loader: 'ts-loader' },
				{
					test: /\.s[ac]ss$/i,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader"
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'assets/img',
								publicPath: 'assets/img'
							}
						}
					]
				},
			]
		},

		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: "./index.html",
				filename: "index.html",
				chunksSortMode: "manual",
				chunks: ['vendors', 'app'],
				minify: false
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: 'chunk-[id].css'
			})
		],

		optimization: {
			minimize: true,
			minimizer: [new TerserPlugin()],
			splitChunks: {
				cacheGroups: {
					commons: { test: /[\\/]node_modules[\\/]/, name: 'vendors', chunks: 'all' }
				}
			}
		}

	}
};
