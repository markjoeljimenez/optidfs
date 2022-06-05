const withMDX = require('@next/mdx')({
	extension: /\.(md|mdx)$/,
});
const StylelintPlugin = require('stylelint-webpack-plugin');

require('dotenv').config();

const { env } = process;

const config = {
	env,
	images: {
		domains: ['www.paypal.com'],
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	swcMinify: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/optimize',
				permanent: true,
			},
		];
	},
};

module.exports = withMDX(config);
