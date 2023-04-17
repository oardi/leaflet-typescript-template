import type { Configuration } from 'webpack';
import 'webpack-dev-server';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config: Configuration = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		open: true,
		hot: true,
		port: 8080,
	},
});

export default config;
