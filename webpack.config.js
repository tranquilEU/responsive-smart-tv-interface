const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',

	output: {
		path: path.resolve(__dirname, 'dist'),
		clean: true,
		filename: 'bundle.js'
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
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
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
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images'
						}
					}
				]
			},
			{
				test: /\.(?:js|mjs|cjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [['@babel/preset-env']]
					}
				}
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset'
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './public/favicon.png'
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
