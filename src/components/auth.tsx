import { signIn, signOut, useSession } from 'next-auth/react';

export default function Auth() {
	const test = useSession();

	console.log(test);

	if (test.data) {
		return (
			<>
				Signed in as {test.data?.user?.email} <br />
				<button
					onClick={async () => {
						const test = await fetch(
							'https://fantasysports.yahooapis.com/fantasy/v2/users;use_login=1/games',
							{
								credentials: 'include',
							}
						);
						console.log(await test.json());
					}}
				>
					Fetch
				</button>
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}

	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	);
}
