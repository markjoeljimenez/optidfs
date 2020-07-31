import SkipLink from '../components/global/skiplink';

import Header from '../components/global/header';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => (
	<>
		<SkipLink text="Skip to content" />

		<Header />

		<main className="main">
			<div className="main__container">{children}</div>
		</main>
	</>
);

export default Layout;
