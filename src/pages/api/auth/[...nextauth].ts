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
					redirect_uri: 'https://pbjkqbrh-3000.use.devtunnels.ms/',
					response_type: 'code',
				},
			},
		},
	],
	callbacks: {
		async signIn(test: any) {
			const isAllowedToSignIn = true;

			console.log(test, 'signIn');
			if (isAllowedToSignIn) {
				return true;
			} else {
				// Return false to display a default error message
				return false;
				// Or you can return a URL to redirect to:
				// return '/unauthorized'
			}
		},
		async redirect(test) {
			// Allows relative callback URLs
			console.log(test, 'redirect');
			//   if (url.startsWith("/")) return `${baseUrl}${url}`
			//   // Allows callback URLs on the same origin
			//   else if (new URL(url).origin === baseUrl) return url
			return test.baseUrl;
		},
		async jwt(test: any) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			console.log(test);
		},
		async session(test: any) {
			// Send properties to the client, like an access_token and user id from a provider.
			console.log(test);
		},
	},
};

export default NextAuth(authOptions);
