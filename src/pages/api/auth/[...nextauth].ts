/* eslint-disable sort-keys */
import NextAuth from 'next-auth';

export const authOptions: any = {
	debug: true,
	// Configure one or more authentication providers
	providers: [
		{
			id: 'yahoo',
			name: 'Yahoo',
			type: 'oauth',
			clientId:
				'dj0yJmk9WjA0QXFKSGdvUk40JmQ9WVdrOWIyaEJZMEZDU0hRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTdm',
			authorization: {
				url: 'https://api.login.yahoo.com/oauth2/request_auth',
				params: {
					client_id:
						'dj0yJmk9WjA0QXFKSGdvUk40JmQ9WVdrOWIyaEJZMEZDU0hRbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTdm',
					redirect_uri: 'http://localhost:3000/',
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
