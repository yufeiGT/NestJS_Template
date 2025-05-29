const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = function (options) {
	return {
		...options,
		entry: './src/main.ts',
		output: {
			filename: 'main.js',
			path: path.resolve(__dirname, 'dist'),
		},
		target: 'node',
		externals: [],
		optimization: {
			minimize: false,
		},
	};
};
