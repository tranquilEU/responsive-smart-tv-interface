const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

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
				exclude: /node_modules/,
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
