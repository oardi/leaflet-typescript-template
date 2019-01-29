const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {
	return {
		context: path.resolve(__dirname, './src'),

		entry: {
			app: './app.ts'
		},

		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, './dist')
		},

		resolve: {
			extensions: ['.ts', '.js']
		},

		devtool: 'source-map',

		module: {
			rules: [
				{ test: /\.tsx?$/, loader: 'ts-loader' },
				{ test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
				{ test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader?name=assets/[name].[ext]' },
				{
					test: /\.(png|jpg|gif)$/,
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
				}
			]
		},

		plugins: [
			new HtmlWebpackPlugin({
				template: "./index.html",
				filename: "index.html",
				chunksSortMode: "manual",
				chunks: ['vendors', 'app'],
			})
		]

	}
};
