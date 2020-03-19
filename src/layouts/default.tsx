import Head from 'next/head';

import SkipLink from '../components/global/skiplink';

import config from '../data/site.json';
import Header from '../components/global/header';

export interface ILayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => (
	<>
		<Head>
			<title>{config.title}</title>
			<link rel="icon" href="/favicon.ico" />
			<meta name="description" content={config.description} />
		</Head>

		<SkipLink text="Skip to content" />

		<Header />

		<main className="main">
			<div className="main__container">{children}</div>
		</main>
	</>
);

export default Layout;
