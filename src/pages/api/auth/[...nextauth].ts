import NextAuth, { InitOptions } from 'next-auth';

const { YAHOO_ID, YAHOO_SECRET } = process.env;

const YAHOO = {
	id: 'yahoo',
	name: 'Yahoo',
	type: 'oauth',
	version: '2.0',
	// accessTokenUrl: ACCESS_TOKEN_URL,
	// authorizationUrl: AUTHORIZATION_URL,
	clientId: YAHOO_ID,
	clientSecret: YAHOO_SECRET,
};

const options: InitOptions = {
	providers: [YAHOO],
};

export default (req, res) => NextAuth(req, res, options);
