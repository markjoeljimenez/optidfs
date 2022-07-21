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
		domains: ['www.paypal.com', 'dkn.gs', 's.yimg.com'],
	},
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
	async redirects() {
		return [
			{
				destination: '/optimize',
				permanent: true,
				source: '/',
			},
		];
	},
	swcMinify: true,
};

module.exports = withMDX(config);
