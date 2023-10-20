/* eslint-disable sort-keys */
import NextAuth, { AuthOptions } from 'next-auth';

const { REDIRECT_URI, YAHOO_CLIENT_ID, YAHOO_CLIENT_SECRET } = process.env;

export const authOptions: AuthOptions = {
	// debug: true,
	// Configure one or more authentication providers
	providers: [
		{
			id: 'yahoo',
			name: 'Yahoo',
			type: 'oauth',
			clientId: YAHOO_CLIENT_ID,
			clientSecret: YAHOO_CLIENT_SECRET,
			wellKnown:
				'https://api.login.yahoo.com/.well-known/openid-configuration',
			authorization: {
				params: {
					client_id: YAHOO_CLIENT_ID,
					redirect_uri: REDIRECT_URI,
					response_type: 'code',
				},
			},
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
				};
			},
			idToken: true,
			client: {
				authorization_signed_response_alg: 'ES256',
				id_token_signed_response_alg: 'ES256',
			},
		},
	],
	callbacks: {
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
			(session as any).accessToken = token.accessToken;

			return session;
		},
		async jwt({ account, profile, token }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
			}

			return token;
		},
	},
};

export default NextAuth(authOptions);
