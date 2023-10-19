import { signIn, signOut, useSession } from 'next-auth/react';

export default function Auth() {
	const test = useSession();

	console.log(test);

	if (test.data) {
		return (
			<>
				Signed in as {test.data?.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}

	return (
		<>
			Not signed in <br />
			<button
				onClick={() =>
					signIn('yahoo', {
						callbackUrl: 'https://pbjkqbrh-3000.use.devtunnels.ms/',
					})
				}
			>
				Sign in
			</button>
		</>
	);
}
