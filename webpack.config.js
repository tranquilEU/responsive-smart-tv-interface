const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	entry: './src/index.tsx',

	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: 'bundle.js',

		// Prevent Webpack from emitting ES6+ syntax
		environment: {
			arrowFunction: false,
			const: false,
			destructuring: false,
			forOf: false,
			module: false
		}
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@public': path.resolve(__dirname, 'public'),
			'@components': path.resolve(__dirname, 'src/shared/components'),
			'@features': path.resolve(__dirname, 'src/features'),
			'@hooks': path.resolve(__dirname, 'src/shared/hooks'),
			'@shared': path.resolve(__dirname, 'src/shared')
		}
	},

	module: {
		rules: [
			// Use Babel for TS + JS
			{
				test: /\.(ts|tsx|js)$/,
				exclude: /node_modules\/(?!.*)/,
				use: {
					loader: 'babel-loader'
				}
			},

			{
				test: /\.css$/i,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' }
				]
			},

			{
				test: /\.(png|jpe?g|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext]'
				}
			},

			{
				test: /\.(eot|svg|ttf|woff|woff2)$/i,
				type: 'asset'
			}
		]
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.EPG_URL': JSON.stringify(process.env.EPG_URL),
			'process.env.PROXY_SERVER_URL': JSON.stringify(
				process.env.PROXY_SERVER_URL
			),
			'process.env.DEFAULT_STREAM_URL': JSON.stringify(
				process.env.DEFAULT_STREAM_URL
			),
			'process.env.DRM_LICENSE_SERVER': JSON.stringify(
				process.env.DRM_LICENSE_SERVER
			),
			'process.env.ANGEL_ONE_STREAM_URL': JSON.stringify(
				process.env.ANGEL_ONE_STREAM_URL
			),
			'process.env.TEARS_OF_STEEL_STREAM_URL': JSON.stringify(
				process.env.TEARS_OF_STEEL_STREAM_URL
			),
			'process.env.BIG_BUCK_BUNNY_STREAM_URL': JSON.stringify(
				process.env.BIG_BUCK_BUNNY_STREAM_URL
			)
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './public/favicon.png'
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx', 'ts', 'tsx'],
			emitWarning: true
		})
	],

	devServer: {
		static: path.join(__dirname, 'dist'),
		compress: true,
		hot: true,
		open: true,
		port: 3001
	}
};
