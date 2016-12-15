var webpack = require("webpack");
var path = require('path');

module.exports = {
	// entry: {
	// 	app: "./public/app/App.js"
	// },
	// output: {
	// 	filename:"public/build/bundle.js",
 //        sourceMapFilename: "public/build/bundle.map"
	// },
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/dist/bundle.js',
        sourceMapFilename: 'public/dist/bundle.map'
	},    devtool: '#source-map',	
	plugins: process.env.NODE_ENV === 'production' ? [
	    new webpack.DefinePlugin({
	        'process.env': {
	        	'NODE_ENV': JSON.stringify('production')
	        }
	    }),
    	new webpack.optimize.UglifyJsPlugin({
    		minimize: true,
		    compress: {
		        warnings: true
		    }
    	})
	] : [],	
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query:{
					presets:['react', 'es2015']
				}
			}
		]
	}
}

