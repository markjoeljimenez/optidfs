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
						const test2 = await fetch(
							'https://auth-test.optidfs.com/api/test'
						);
						console.log(await test2.json());
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
