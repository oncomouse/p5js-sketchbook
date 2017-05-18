const webpack = require('webpack');
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const glob = require('glob');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

var productionPlugins = [
	new webpack.LoaderOptionsPlugin({
		minimize: true,
		debug: false
	}),
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		},
		sourceMap: false
	})
];

var webpackConfig = {
	devtool: isProd ? 'hidden-source-map' : 'eval',
	entry: {
		sketch: [
			'index'
		]
	},
	output: {
		path: path.join(__dirname, 'app', 'build', 'javascripts'),
		filename: '[name].js',
		publicPath: '/javascripts/'
	},
	module: {
		loaders: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules)/,
				loaders: [
					{
						loader: 'babel-loader',
						query: {
							cacheDirectory: true,
							presets: [['es2015', { "modules": false }], 'react', 'stage-0'],
							plugins: ['lodash', 'transform-runtime', 'syntax-dynamic-import']
						},
						
					}
				]
			}
		],
	},
	resolve: {
		extensions: ['.js'],
		modules: [
			path.resolve('./app/'),
			path.resolve('./node_modules')
		]
	},
	plugins: [
		new LodashModuleReplacementPlugin,
		new webpack.optimize.OccurrenceOrderPlugin,
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
			'sketchbook': JSON.stringify(glob.sync(path.join(__dirname, 'app', 'sketches', '**', '*.js')).map((x) => x.replace(path.join(__dirname, 'app/'), '').replace(/\.js$/,'')))
		})
	],
	devServer: {
		contentBase: './app',
		noInfo: false,
		historyApiFallback: true
	}
};

if(isProd) {
	webpackConfig.plugins = webpackConfig.plugins.concat(productionPlugins)
}

module.exports = webpackConfig