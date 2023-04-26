/* eslint-disable sort-keys */
import NextAuth from 'next-auth';

const { YAHOO_CLIENT_ID } = process.env;

export const authOptions: any = {
	debug: true,
	// Configure one or more authentication providers
	providers: [
		{
			id: 'yahoo',
			name: 'Yahoo',
			type: 'oauth',
			clientId: YAHOO_CLIENT_ID,
			authorization: {
				url: 'https://api.login.yahoo.com/oauth2/request_auth',
				params: {
					client_id: YAHOO_CLIENT_ID,
					redirect_uri:
						'https://auth-test.optidfs.com/optimize/start/1',
					response_type: 'code',
				},
			},
			// idToken: true,
			// checks: ["pkce", "state"],
			// profile(profile) {
			//   return {
			//     id: profile.sub,
			//     name: profile.name,
			//     email: profile.email,
			//     image: profile.picture,
			//   }
		},
	],
};

export default NextAuth(authOptions);
