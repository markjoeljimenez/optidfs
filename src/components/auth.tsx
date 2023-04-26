import { signIn, signOut, useSession } from 'next-auth/react';

export default function Auth() {
	const { data: session } = useSession();

	if (session) {
		return (
			<>
				Signed in as {session?.user?.email} <br />
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
