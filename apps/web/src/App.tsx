import { AppShell, Burger } from '@mantine/core';
import { Routes } from '@optidfs.rewrite.2/routes';
import { useDisclosure } from '@mantine/hooks';

export function App() {
	const [opened, { toggle }] = useDisclosure();

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: 'sm',
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="sm"
					size="sm"
				/>
				<div>Logo</div>
			</AppShell.Header>

			<AppShell.Navbar p="md">Navbar</AppShell.Navbar>

			<AppShell.Main>
				<Routes />
			</AppShell.Main>
		</AppShell>
	);
}

export default App;
