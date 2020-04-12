const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const withMDX = require('@next/mdx')({
	extension: /\.(md|mdx)$/,
});
const StylelintPlugin = require('stylelint-webpack-plugin');

require('dotenv').config();

const config = {
	env: {
		API: process.env.ENDPOINT,
	},
	webpack: (config, { dev }) => {
		// ESLint config
		config.module.rules.push({
			test: /\.tsx$/,
			enforce: 'pre',
			exclude: /node_modules/,
			loader: 'eslint-loader',
			options: {
				// Emit errors as warnings for dev to not break webpack build.
				emitWarning: dev,
			},
		});

		// Plugins
		config.plugins.push(new StylelintPlugin());

		return config;
	},
	postcssLoaderOptions: {
		sourceMap: true,
	},
	sassLoaderOptions: {
		sourceMap: true,
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

module.exports = withCss(withSass(withMDX(config)));
