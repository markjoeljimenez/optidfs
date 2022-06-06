const withMDX = require('@next/mdx')({
	extension: /\.(md|mdx)$/,
});

require('dotenv').config();

const { ENDPOINT, GA_TRACKING_ID } = process.env;

const config = {
	env: {
		ENDPOINT,
		GA_TRACKING_ID,
	},
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
