/* eslint-disable sort-keys */
import NextAuth, { AuthOptions } from 'next-auth';

const { YAHOO_CLIENT_ID, YAHOO_CLIENT_SECRET } = process.env;

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
					redirect_uri:
						'https://pbjkqbrh-3000.use.devtunnels.ms/api/auth/callback/yahoo',
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
			// session.accessToken = token.accessToken;
			// session.user.id = token.id;

			console.log(session, token, user, 'session');

			return session;
		},
		async jwt({ account, profile, token }) {
			console.log(token, account, profile, 'jwt');
			return token;
		},
	},
};

export default NextAuth(authOptions);
