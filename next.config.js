const withMDX = require('@next/mdx')({
	extension: /\.(md|mdx)$/,
});
const StylelintPlugin = require('stylelint-webpack-plugin');

require('dotenv').config();

const config = {
	env: {
		ENDPOINT: process.env.ENDPOINT,
		GA_TRACKING_ID: process.env.GA_TRACKING_ID,
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

module.exports = withMDX(config);
